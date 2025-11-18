// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../specs/lib/gulp/config-workspace-server.spec.md
// (spec:17a3999b) (code:07f0fcd5)

import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { promisify } from 'util';
import express from 'express';
import { parseDocument, Document } from 'yaml';
import minimist from 'minimist';
import { Configuration } from '../model/model.module.js';
import { deleteFolderRecursive } from './util.babel.js';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// In-memory cache for file metadata and watchers
const fileCache = new Map();
const fileWatchers = new Map();
const fileLocks = new Map();

// Default configuration
function parsePort(portStr) {
  const port = parseInt(portStr, 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid port number: ${portStr}. Port must be between 1 and 65535.`);
  }
  return port;
}

const DEFAULT_OPTIONS = {
  host: process.env.CONFIG_WORKSPACE_HOST || 'localhost',
  port: parsePort(process.env.CONFIG_WORKSPACE_PORT || '3100'),
  rootDirectory: null,
  logLevel: 'info'
};

function hasRequiredConfigPaths(rootDir) {
  if (!rootDir) {
    return false;
  }
  const configDir = path.join(rootDir, 'configuration');
  const manifestPath = path.join(configDir, 'datasets.manifest.json');
  return fs.existsSync(configDir) && fs.existsSync(manifestPath);
}

function resolveRootDirectory(candidate) {
  const resolvedCandidates = [
    candidate && candidate.trim() ? path.resolve(candidate) : null,
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '..', '..'),
    path.resolve(__dirname, '..', '..', '..')
  ].filter(Boolean);
  
  const tried = new Set();
  for (const pathCandidate of resolvedCandidates) {
    if (tried.has(pathCandidate)) {
      continue;
    }
    tried.add(pathCandidate);
    if (hasRequiredConfigPaths(pathCandidate)) {
      return pathCandidate;
    }
  }
  
  return candidate ? path.resolve(candidate) : path.resolve(process.cwd());
}

/**
 * Start the configuration workspace server
 */
export async function startConfigWorkspaceServer(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  
  // Resolve root directory using minimist args like the main gulpfile
  const argv = minimist(process.argv.slice(2));
  const initialRoot = config.rootDirectory || argv.dir || process.cwd();
  config.rootDirectory = resolveRootDirectory(initialRoot);
  
  console.log(`Starting config workspace server with root: ${config.rootDirectory}`);
  
  // Validate required directories exist
  await validateRequiredDirectories(config.rootDirectory);
  
  // Initialize catalog
  const catalog = await buildConfigCatalog(config.rootDirectory);
  
  // Setup file watchers
  setupFileWatchers(catalog, config.rootDirectory);
  
  // Create Express app
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  
  // Setup routes
  setupRoutes(app, catalog, config.rootDirectory);
  
  // Start server
  const server = http.createServer(app);
  
  return new Promise((resolve, reject) => {
    server.listen(config.port, config.host, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      console.log(`Config workspace server listening on http://${config.host}:${config.port}`);
      
      const instance = {
        server,
        close: async () => {
          console.log('Shutting down config workspace server...');
          
          // Cleanup file watchers
          for (const watcher of fileWatchers.values()) {
            watcher.close();
          }
          fileWatchers.clear();
          
          // Close server
          return new Promise((resolve) => {
            server.close(() => {
              console.log('Config workspace server stopped');
              resolve();
            });
          });
        },
        address: () => server.address()
      };
      
      resolve(instance);
    });
  });
}

/**
 * Validate that required directories exist
 */
async function validateRequiredDirectories(rootDir) {
  const requiredDirs = [
    'configuration',
    'configuration/datasets.manifest.json'
  ];
  
  for (const dir of requiredDirs) {
    const fullPath = path.join(rootDir, dir);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Required configuration path missing: ${fullPath}`);
    }
  }
}

/**
 * Build configuration catalog by discovering YAML files
 */
async function buildConfigCatalog(rootDir) {
  const catalog = [];
  
  // Read datasets manifest
  const manifestPath = path.join(rootDir, 'configuration/datasets.manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  
  // Add shared defaults
  const sharedDefaults = [
    'configuration/comparison-default.yml'
  ];
  
  // Add defaults directory files
  const defaultsDir = path.join(rootDir, 'configuration/defaults');
  if (fs.existsSync(defaultsDir)) {
    const defaultFiles = await readdir(defaultsDir);
    for (const file of defaultFiles) {
      if (file.endsWith('.yml') || file.endsWith('.yaml')) {
        sharedDefaults.push(path.join('configuration/defaults', file));
      }
    }
  }
  
  // Process shared defaults
  for (const relativePath of sharedDefaults) {
    // Prevent path traversal
    if (relativePath.includes('../') || relativePath.includes('..\\')) {
      console.warn(`Skipping path with traversal sequence: ${relativePath}`);
      continue;
    }
    const absolutePath = path.join(rootDir, relativePath);
    // Validate that resolved path is within rootDir
    const resolvedPath = path.resolve(absolutePath);
    const resolvedRoot = path.resolve(rootDir);
    if (!resolvedPath.startsWith(resolvedRoot)) {
      console.warn(`Skipping path outside root directory: ${relativePath}`);
      continue;
    }
    if (fs.existsSync(absolutePath)) {
      const stats = await stat(absolutePath);
      const encodedPath = Buffer.from(relativePath).toString('base64url');
      
      catalog.push({
        id: `shared-${encodedPath}`,
        encodedPath,
        datasetId: null,
        datasetLabel: null,
        relativePath,
        absolutePath,
        lastModified: stats.mtime.toISOString(),
        size: stats.size,
        isSharedDefault: true,
        isDatasetConfig: false
      });
      
      // Cache file metadata
      fileCache.set(absolutePath, {
        checksum: await calculateChecksum(absolutePath),
        etag: generateETag(stats.mtime, stats.size),
        lastModified: stats.mtime,
        size: stats.size
      });
    }
  }
  
  // Process dataset configurations
  for (const dataset of manifest.datasets || []) {
    if (dataset.sources && dataset.sources.config) {
      const relativePath = dataset.sources.config;
      // Prevent path traversal
      if (relativePath.includes('../') || relativePath.includes('..\\')) {
        console.warn(`Skipping dataset ${dataset.id} with traversal sequence in config path`);
        continue;
      }
      const absolutePath = path.join(rootDir, relativePath);
      // Validate that resolved path is within rootDir
      const resolvedPath = path.resolve(absolutePath);
      const resolvedRoot = path.resolve(rootDir);
      if (!resolvedPath.startsWith(resolvedRoot)) {
        console.warn(`Skipping dataset ${dataset.id} with config path outside root directory`);
        continue;
      }

      if (fs.existsSync(absolutePath)) {
        const stats = await stat(absolutePath);
        const encodedPath = Buffer.from(relativePath).toString('base64url');
        
        catalog.push({
          id: `dataset-${dataset.id}-${encodedPath}`,
          encodedPath,
          datasetId: dataset.id,
          datasetLabel: dataset.displayLabel || dataset.label || dataset.id,
          relativePath,
          absolutePath,
          lastModified: stats.mtime.toISOString(),
          size: stats.size,
          isSharedDefault: false,
          isDatasetConfig: true
        });
        
        // Cache file metadata
        fileCache.set(absolutePath, {
          checksum: await calculateChecksum(absolutePath),
          etag: generateETag(stats.mtime, stats.size),
          lastModified: stats.mtime,
          size: stats.size
        });
      }
    }
  }
  
  // Sort catalog: shared defaults first, then by dataset label
  catalog.sort((a, b) => {
    if (a.isSharedDefault && !b.isSharedDefault) return -1;
    if (!a.isSharedDefault && b.isSharedDefault) return 1;
    
    const aLabel = a.datasetLabel || '';
    const bLabel = b.datasetLabel || '';
    return aLabel.localeCompare(bLabel);
  });
  
  return catalog;
}

/**
 * Setup file system watchers for configuration files
 */
function setupFileWatchers(catalog, rootDir) {
  const watchedPaths = new Set();
  
  for (const item of catalog) {
    if (!watchedPaths.has(item.absolutePath)) {
      watchedPaths.add(item.absolutePath);
      
      try {
        const watcher = fs.watch(item.absolutePath, (eventType) => {
          if (eventType === 'change') {
            console.log(`Configuration file changed: ${item.relativePath}`);
            invalidateFileCache(item.absolutePath);
          }
        });
        
        fileWatchers.set(item.absolutePath, watcher);
      } catch (err) {
        console.warn(`Failed to watch file ${item.relativePath}:`, err.message);
      }
    }
  }
}

/**
 * Invalidate cached file metadata
 */
async function invalidateFileCache(absolutePath) {
  if (fileCache.has(absolutePath)) {
    try {
      const stats = await stat(absolutePath);
      fileCache.set(absolutePath, {
        checksum: await calculateChecksum(absolutePath),
        etag: generateETag(stats.mtime, stats.size),
        lastModified: stats.mtime,
        size: stats.size
      });
    } catch (err) {
      console.warn(`Failed to update cache for ${absolutePath}:`, err.message);
      fileCache.delete(absolutePath);
    }
  }
}

/**
 * Setup Express routes
 */
function setupRoutes(app, catalog, rootDir) {
  // Create path lookup map for security
  const pathLookup = new Map();
  for (const item of catalog) {
    pathLookup.set(item.encodedPath, item);
  }
  
  // GET /api/config/catalog - Return complete catalog
  app.get('/api/config/catalog', (req, res) => {
    res.json(catalog);
  });
  
  // GET /api/config/:encodedPath - Load configuration file
  app.get('/api/config/:encodedPath', async (req, res) => {
    try {
      const { encodedPath } = req.params;
      const item = pathLookup.get(encodedPath);
      
      if (!item) {
        return res.status(404).json({
          status: 404,
          message: 'Configuration file not found',
          timestamp: new Date().toISOString()
        });
      }
      
      // Check if file still exists
      if (!fs.existsSync(item.absolutePath)) {
        return res.status(404).json({
          status: 404,
          message: 'Configuration file no longer exists',
          timestamp: new Date().toISOString()
        });
      }
      
      const rawYaml = await readFile(item.absolutePath, 'utf8');
      let parsedDocument;
      
      try {
        parsedDocument = parseDocument(rawYaml).toJS();
      } catch (parseErr) {
        return res.status(400).json({
          status: 400,
          message: 'YAML parse error',
          detail: parseErr.message,
          timestamp: new Date().toISOString()
        });
      }
      
      const cached = fileCache.get(item.absolutePath);
      const stats = await stat(item.absolutePath);
      
      const response = {
        rawYaml,
        parsedDocument,
        checksum: cached?.checksum || await calculateChecksum(item.absolutePath),
        etag: cached?.etag || generateETag(stats.mtime, stats.size),
        metadata: {
          lastModified: stats.mtime.toISOString(),
          size: stats.size,
          isSharedDefault: item.isSharedDefault,
          isDatasetConfig: item.isDatasetConfig,
          ...(item.datasetId && { datasetId: item.datasetId })
        }
      };
      
      res.json(response);
    } catch (err) {
      console.error('Error loading configuration:', err);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
        detail: err.message,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // PUT /api/config/:encodedPath - Update configuration file
  app.put('/api/config/:encodedPath', async (req, res) => {
    try {
      const { encodedPath } = req.params;
      const { rawYaml, etag } = req.body;
      
      if (!rawYaml || !etag) {
        return res.status(400).json({
          status: 400,
          message: 'Missing required fields: rawYaml and etag',
          timestamp: new Date().toISOString()
        });
      }
      
      const item = pathLookup.get(encodedPath);
      
      if (!item) {
        return res.status(404).json({
          status: 404,
          message: 'Configuration file not found',
          timestamp: new Date().toISOString()
        });
      }
      
      // Acquire file lock
      if (fileLocks.has(item.absolutePath)) {
        return res.status(423).json({
          status: 423,
          message: 'File is currently locked for editing',
          timestamp: new Date().toISOString()
        });
      }
      
      fileLocks.set(item.absolutePath, true);
      
      try {
        // Verify etag for optimistic locking
        const stats = await stat(item.absolutePath);
        const currentEtag = generateETag(stats.mtime, stats.size);
        
        if (etag !== currentEtag) {
          return res.status(409).json({
            status: 409,
            message: 'File has been modified by another client',
            timestamp: new Date().toISOString()
          });
        }
        
        // Validate YAML syntax
        let parsedDocument;
        try {
          const doc = parseDocument(rawYaml);
          parsedDocument = doc.toJS();
        } catch (parseErr) {
          return res.status(400).json({
            status: 400,
            message: 'Invalid YAML syntax',
            detail: parseErr.message,
            timestamp: new Date().toISOString()
          });
        }
        
        // Normalize line endings to LF
        const normalizedYaml = rawYaml.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Write file
        await writeFile(item.absolutePath, normalizedYaml, 'utf8');
        
        // Update cache
        const newStats = await stat(item.absolutePath);
        const newChecksum = await calculateChecksum(item.absolutePath);
        const newEtag = generateETag(newStats.mtime, newStats.size);
        
        fileCache.set(item.absolutePath, {
          checksum: newChecksum,
          etag: newEtag,
          lastModified: newStats.mtime,
          size: newStats.size
        });
        
        console.log(`Configuration updated: ${item.relativePath}`);
        
        res.json({
          status: 200,
          message: 'Configuration updated successfully',
          checksum: newChecksum,
          etag: newEtag,
          timestamp: new Date().toISOString()
        });
        
      } finally {
        fileLocks.delete(item.absolutePath);
      }
      
    } catch (err) {
      console.error('Error updating configuration:', err);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
        detail: err.message,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      catalogSize: catalog.length
    });
  });
}

/**
 * Calculate SHA-256 checksum for a file
 */
async function calculateChecksum(filePath) {
  const content = await readFile(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Generate ETag from file stats
 */
function generateETag(mtime, size) {
  return `"${mtime.getTime()}-${size}"`;
}

/**
 * Register Gulp task for starting the server
 */
export function registerGulpTask(gulp) {
  gulp.task('config-workspace:serve', async () => {
    let serverInstance;
    
    try {
      serverInstance = await startConfigWorkspaceServer();
      
      console.log('Config workspace server started. Press Ctrl+C to stop.');
      
      // Handle graceful shutdown
      const shutdown = async (signal) => {
        console.log(`\nReceived ${signal}, shutting down gracefully...`);
        if (serverInstance) {
          await serverInstance.close();
        }
        process.exit(0);
      };
      
      process.on('SIGINT', () => shutdown('SIGINT'));
      process.on('SIGTERM', () => shutdown('SIGTERM'));
      
      // Keep the process alive
      return new Promise(() => {});
      
    } catch (err) {
      console.error('Failed to start config workspace server:', err);
      throw err;
    }
  });
}
