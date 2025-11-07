# Config Workspace Server

REST API server for the configuration admin GUI that integrates with the existing Gulp-based build system.

## Target

[@generate](../../../lib/gulp/tasks/config-workspace-server.babel.js)

## Capabilities

### Server Lifecycle Management

Exports a `startConfigWorkspaceServer(options)` function that initializes an Express application integrated with the existing Gulp runtime.

- Reuses minimist args and respects `argv.dir` resolution from the main gulpfile
- Returns an object with the started HTTP server instance and a `close()` helper function
- Defaults to port 3100 with overridable host/port/root options via `options` argument or environment variables
- Logs resolved paths similarly to the main gulpfile for consistency
- Fails fast if required configuration folders (`configuration/`, dataset directories) are missing

### Configuration Resource Discovery

Enumerates editable YAML resources by reading the dataset manifest and combining shared defaults with dataset-specific configurations.

- Reads `configuration/datasets.manifest.json` to discover dataset contexts
- Combines shared defaults (`configuration/comparison-default.yml`, `configuration/defaults/*.yml`) with each dataset's `sources.config`
- Generates catalog entries with dataset id/label, absolute/relative paths, last modified timestamps, file size, and `isSharedDefault` flag
- Maintains an in-memory metadata cache for performance

### File Watching and Cache Invalidation

Monitors YAML configuration files for external changes and updates internal state accordingly.

- Uses `fs.watch` to monitor relevant YAML files for changes
- Updates in-memory metadata cache when files are modified externally
- Invalidates etags and checksums when files change outside the server
- Handles file system events gracefully with proper error handling

### REST API Endpoints

Provides HTTP endpoints for reading and writing configuration files with proper validation and concurrency control.

- `GET /api/config/catalog` returns the complete catalog sorted by dataset label and default/shared grouping
- `GET /api/config/:encodedPath` loads YAML file by opaque base64-url safe identifier, responding with raw YAML, parsed JSON, checksum/etag, and metadata
- `PUT /api/config/:encodedPath` accepts structured updates with optimistic locking via etag validation, performs merge operations, and writes updated YAML

### YAML Processing and Round-trip Editing

Uses the `yaml` npm package in CST mode to preserve comments, formatting, and key ordering during edits.

- Preserves comments and whitespace formatting during round-trip edits
- Applies structured updates onto the CST while maintaining document structure
- Merges order and child arrays while keeping unknown keys intact
- Handles YAML parse failures gracefully with structured error responses

### Path Security and File Access Control

Enforces strict path validation to prevent access to files outside the curated configuration set.

- Implements safelist path resolution using only files discovered during catalog generation
- Rejects attempts to access paths not explicitly included in the catalog
- Validates encoded path identifiers against the known file set
- Uses absolute path resolution to prevent directory traversal attacks

### Concurrency Control and File Locking

Implements simple per-file mutex locking to prevent concurrent write operations and data corruption.

- Maintains per-file write locks to prevent concurrent modifications
- Performs optimistic locking using etag validation (returns 409 on mismatch)
- Normalizes line endings to LF and preserves file permissions
- Handles lock timeouts and cleanup gracefully

### Error Handling and Logging

Provides structured error responses and logging for debugging and monitoring.

- Emits structured log messages for success/failure operations
- Surfaces errors with JSON payloads containing status, message, and detail fields
- Handles filesystem errors, YAML parse failures, and merge conflicts gracefully
- Provides meaningful error messages for debugging

### Gulp Task Integration

Registers a Gulp task for starting the server with proper lifecycle management.

- Registers `config-workspace:serve` task that starts the server
- Binds to process signals (SIGINT, SIGTERM) for graceful shutdown
- Documents integration with `npm run dev` to compose with `data:watch` and `ng serve`
- Provides clear startup and shutdown logging

## API

```typescript { .api }
// Main export function
export function startConfigWorkspaceServer(options?: ConfigWorkspaceServerOptions): Promise<ConfigWorkspaceServerInstance>;

// Options interface
interface ConfigWorkspaceServerOptions {
  host?: string;
  port?: number;
  rootDirectory?: string;
  logLevel?: 'error' | 'warn' | 'info' | 'debug';
}

// Server instance interface
interface ConfigWorkspaceServerInstance {
  server: http.Server;
  close(): Promise<void>;
  address(): AddressInfo | string | null;
}

// Catalog item structure
interface ConfigCatalogItem {
  id: string;
  encodedPath: string;
  datasetId: string | null;
  datasetLabel: string | null;
  relativePath: string;
  absolutePath: string;
  lastModified: string; // ISO date string
  size: number;
  isSharedDefault: boolean;
  isDatasetConfig: boolean;
}

// Document payload for GET requests
interface ConfigDocumentResponse {
  rawYaml: string;
  parsedDocument: any; // YAML parsed structure
  checksum: string;
  etag: string;
  metadata: {
    lastModified: string;
    size: number;
    isSharedDefault: boolean;
    isDatasetConfig: boolean;
    datasetId?: string;
  };
}

// Update payload for PUT requests
interface ConfigDocumentUpdate {
  rawYaml: string;
  parsedDocument?: any;
  etag: string;
}

// Error response structure
interface ConfigErrorResponse {
  status: number;
  message: string;
  detail?: string;
  timestamp: string;
}
```

## Dependencies

### Core Node Modules

Standard Node.js modules for server functionality and file system operations.
[@use](http)
[@use](fs)
[@use](path)
[@use](crypto)
[@use](util)

### Express Framework

Web application framework for REST API endpoints.
[@use](express)

### YAML Processing

YAML parsing and serialization with CST support for comment preservation.
[@use](yaml)

### Existing Gulp Utilities

Shared utilities and models from the existing Gulp build system.
[@use](../../../lib/gulp/model/model.module.js)
[@use](../../../lib/gulp/tasks/util.babel.js)

### Command Line Arguments

Minimist for parsing command line arguments consistently with the main gulpfile.
[@use](minimist)