import gulp from 'gulp'
import exec from 'gulp-exec';
import moment from 'moment';
import * as path from 'path';
import { exec as execSimple } from 'child_process';
import { deleteFolderRecursive } from "./tasks/util.babel.js";
import { criteria } from "./tasks/criteria.babel.js";
import { developmentColumn } from "./tasks/developmentColumn.babel.js";
import yaml2json from "js-yaml";
import { existsSync, readFileSync, mkdirSync, writeFileSync, copyFileSync, statSync, readdirSync, unlinkSync } from "fs";
import { Configuration } from "./model/model.module.js";

const argv = require('minimist')(process.argv.slice(2));
argv.dir = argv.dir || "";

const nodeModulesRootDirectory = __dirname.replace(path.join("lib", "gulp"), "");

let installedRootDirectory;
if (argv.dir === "") {
    installedRootDirectory = nodeModulesRootDirectory;
} else {
    installedRootDirectory = nodeModulesRootDirectory.replace(argv.dir + "/", "");
}
if (installedRootDirectory.indexOf("node_modules") >= 0) {
    installedRootDirectory = installedRootDirectory.replace("node_modules/ultimate-comparison/",  "")
    installedRootDirectory = installedRootDirectory.replace("node_modules\\ultimate-comparison\\",  "")
}

console.log("Installation directory resolved to:", installedRootDirectory);

const tmp = path.join(installedRootDirectory, 'tmp');
const assetsRoot = path.join(nodeModulesRootDirectory, 'src/assets');
const hasAssetsRoot = existsSync(assetsRoot);
const assetsGenerated = hasAssetsRoot ? path.join(assetsRoot, 'generated') : null;

const paths = {
    json: path.join(tmp, 'data'),
    dist: path.join(installedRootDirectory, 'dist'),
    data: path.join(installedRootDirectory, 'data'),
    config: path.join(installedRootDirectory, 'configuration'),
    assets: assetsRoot,
    assetsGenerated
};

paths.angularAssetsGenerated = path.join(paths.dist, 'ultimate-comparison', 'assets', 'generated');
paths.angularAssetsConfiguration = path.join(paths.dist, 'ultimate-comparison', 'assets', 'configuration');

const assetTargets = [
    { target: paths.assetsGenerated, createIfMissing: true },
    { target: paths.angularAssetsGenerated, createIfMissing: false }
].filter(entry => !!entry.target);

const names = {
    data: 'data.json',
    versionInformation: 'VersionInformation.ts',
    config: 'comparison.yml',
    defaultConfig: 'comparison-default.yml',
    autoConfig: 'comparison-auto-config.yml',
    configJson: 'comparison.json'
};

const files = {
    markdown: [
        path.join(paths.data, '*.md')
    ],
    json: [
        path.join(tmp, 'data', '*.json')
    ],
    config: path.join(paths.config, names.config),
    style: path.join(paths.config, 'style.css'),
    defaultConfig: path.join(paths.config, names.defaultConfig),
    dataJson: path.join(paths.dist, names.data),
    autoConfig: path.join(paths.config, names.autoConfig),
    versionInformation: path.join(paths.assets, names.versionInformation)
};

const manifestPath = path.join(paths.config, 'datasets.manifest.json');
const datasetContexts = loadDatasetContexts(manifestPath);
const defaultDataset = datasetContexts.find(context => context.isDefault) || datasetContexts[0];
datasetContexts.forEach(context => {
    context.isDefault = context.id === defaultDataset.id;
});

const datasetMarkdownGlobs = uniqueEntries(datasetContexts.flatMap(context => (context.sources.dataDirs || [context.sources.dataDir]).map(dir => path.join(dir, '/**/*.md'))));
const datasetConfigFiles = uniqueEntries(
    datasetContexts.flatMap(context => [context.sources.config, ...(context.defaultConfigs || [])])
);
const datasetStyleFiles = uniqueEntries(datasetContexts.map(context => context.sources.style));

function uniqueEntries(entries) {
    return Array.from(new Set((entries || []).filter(Boolean)));
}

function loadDatasetContexts(manifestFile) {
    if (!existsSync(manifestFile)) {
        throw new Error(`Dataset manifest not found at ${manifestFile}`);
    }
    const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
    const datasets = Array.isArray(manifest.datasets) ? manifest.datasets : [];
    if (datasets.length === 0) {
        throw new Error('Dataset manifest must define at least one dataset.');
    }
    return datasets.map(entry => createDatasetContext(entry));
}

function createDatasetContext(entry) {
    if (!entry || typeof entry.id !== 'string' || entry.id.length === 0) {
        throw new Error('Dataset manifest entries must include an id.');
    }
    const sources = entry.sources || {};
    const dataDirs = Array.isArray(sources.dataDirs) && sources.dataDirs.length > 0
        ? sources.dataDirs.map((dir, index) => ensureDirectory(resolveSourcePath(dir, paths.data), `Dataset "${entry.id}" data directories[${index}]`))
        : [ensureDirectory(resolveSourcePath(sources.dataDir, paths.data), `Dataset "${entry.id}" data directory`)];
    const primaryDataDir = dataDirs[0];
    const configFile = ensureFile(resolveSourcePath(sources.config, files.config), `Dataset "${entry.id}" configuration file`);
    const styleFile = ensureFile(resolveSourcePath(sources.style, files.style), `Dataset "${entry.id}" style file`);
    const assetRelativePath = resolveAssetRelativePath(entry.assetDirectory, entry.id);
    const customDefaultConfigs = Array.isArray(sources.configDefaults) ? sources.configDefaults : [];
    const resolvedSharedDefaultConfigs = uniqueEntries(customDefaultConfigs
        .map((configPath, index) => ensureFile(
            resolveSourcePath(configPath, files.defaultConfig),
            `Dataset "${entry.id}" configDefaults[${index}]`
        )));
    const defaultConfigs = uniqueEntries([...resolvedSharedDefaultConfigs, files.defaultConfig]);
    const tmpDir = path.join(tmp, entry.id);
    const tmpJsonDir = path.join(tmpDir, 'data');
    const distDir = entry.isDefault ? paths.dist : path.join(paths.dist, entry.id);
    const dataJsonPath = entry.isDefault ? path.join(paths.dist, names.data) : path.join(distDir, names.data);
    const configJsonPath = path.join(distDir, names.configJson);
    const autoConfigPath = entry.isDefault ? files.autoConfig : path.join(tmpDir, names.autoConfig);

    return {
        id: entry.id,
        isDefault: !!entry.isDefault,
        assetRelativePath,
        assetWebPath: entry.assetDirectory,
        tmpDir,
        tmpJsonDir,
        distDir,
        sources: {
            dataDir: primaryDataDir,
            dataDirs,
            config: configFile,
            style: styleFile,
            configDefaults: defaultConfigs
        },
        dataDirs,
        mergedDataDir: dataDirs.length > 1 ? path.join(tmpDir, 'merged-data') : primaryDataDir,
        defaultConfigs,
        sharedDefaultConfigs: resolvedSharedDefaultConfigs,
        fallbackDefaultConfig: files.defaultConfig,
        files: {
            dataJson: dataJsonPath,
            configJson: configJsonPath,
            autoConfig: autoConfigPath
        },
        errorLog: path.join(tmpDir, 'error.log')
    };
}

function resolveSourcePath(customPath, fallbackPath) {
    const selected = customPath && customPath.length > 0 ? customPath : fallbackPath;
    if (!selected) {
        return fallbackPath;
    }
    return path.isAbsolute(selected) ? selected : path.join(installedRootDirectory, selected);
}

function ensureFile(targetPath, description) {
    if (!existsSync(targetPath)) {
        throw new Error(`${description} not found: ${targetPath}`);
    }
    return targetPath;
}

function ensureDirectory(targetPath, description) {
    const exists = existsSync(targetPath) && statSync(targetPath).isDirectory();
    if (!exists) {
        throw new Error(`${description} not found: ${targetPath}`);
    }
    return targetPath;
}

function resolveAssetRelativePath(assetDirectory, datasetId) {
    if (!assetDirectory || assetDirectory.length === 0) {
        return datasetId;
    }
    const normalized = assetDirectory.replace(/\\/g, '/').replace(/^\/+/g, '').replace(/\/+$/g, '');
    const prefix = 'assets/generated/';
    if (!normalized.startsWith(prefix)) {
        throw new Error(`Dataset "${datasetId}" assetDirectory must start with ${prefix}`);
    }
    const stripped = normalized.substring(prefix.length);
    return stripped.length > 0 ? stripped : datasetId;
}

function loadDefaultConfigurationFromPaths(configPaths) {
    const effectivePaths = uniqueEntries((configPaths || []).filter(Boolean));
    const pathsToLoad = effectivePaths.length > 0 ? effectivePaths : [files.defaultConfig];
    let mergedConfig = null;
    pathsToLoad.forEach(filePath => {
        const source = yaml2json.safeLoad(readFileSync(filePath, "utf8"));
        const loaded = Configuration.load(source);
        mergedConfig = mergedConfig ? mergedConfig.combine(loaded) : loaded;
    });
    return mergedConfig;
}

function cloneConfiguration(configuration) {
    if (!configuration) {
        return null;
    }
    return Configuration.load(configuration.json(), configuration, false);
}

function ensureDirExists(dirPath) {
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
    }
}

function copyToAssets(sourcePath, relativeTargetPath = path.basename(sourcePath)) {
    assetTargets.forEach(({ target, createIfMissing }) => {
        if (!target) {
            return;
        }
        const destination = path.join(target, relativeTargetPath);
        const destinationDir = path.dirname(destination);
        if (!existsSync(destinationDir)) {
            if (createIfMissing) {
                mkdirSync(destinationDir, { recursive: true });
            } else {
                return;
            }
        }
        try {
            copyFileSync(sourcePath, destination);
        } catch (error) {
            console.warn(`Unable to copy ${relativeTargetPath} to assets (${target}): ${error.message}`);
        }
    });
}

function copyDatasetFile(dataset, absolutePath, fileName) {
    copyToAssets(absolutePath, path.join(dataset.assetRelativePath, fileName));
}

function prepareDatasetDataDirectory(dataset) {
    const dataDirs = dataset.dataDirs || dataset.sources.dataDirs || [dataset.sources.dataDir];
    if (!Array.isArray(dataDirs) || dataDirs.length === 0) {
        throw new Error(`Dataset "${dataset.id}" has no data directories configured.`);
    }
    if (dataDirs.length === 1) {
        return dataDirs[0];
    }
    const targetDir = dataset.mergedDataDir || path.join(dataset.tmpDir, 'merged-data');
    deleteFolderRecursive(targetDir);
    ensureDirExists(targetDir);
    dataDirs.forEach(sourceDir => {
        const relativeToRoot = path.relative(installedRootDirectory, sourceDir).replace(/\\/g, '/');
        let relativeRoot = relativeToRoot && !relativeToRoot.startsWith('..') ? relativeToRoot : '';
        if (relativeRoot.length === 0) {
            const normalized = sourceDir.replace(/\\/g, '/');
            const datasetsIndex = normalized.indexOf('/datasets/');
            if (datasetsIndex >= 0) {
                relativeRoot = normalized.substring(datasetsIndex + 1);
            } else {
                relativeRoot = path.basename(sourceDir);
            }
        }
        const destinationRoot = path.join(targetDir, relativeRoot);
        copyDirectoryContents(sourceDir, destinationRoot);
    });
    return targetDir;
}

function copyDirectoryContents(sourceDir, targetDir) {
    ensureDirExists(targetDir);
    readdirSync(sourceDir, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(sourceDir, entry.name);
        const destPath = path.join(targetDir, entry.name);
        if (entry.isDirectory()) {
            copyDirectoryContents(srcPath, destPath);
        } else if (entry.isFile()) {
            ensureDirExists(path.dirname(destPath));
            copyFileSync(srcPath, destPath);
        }
    });
}

function copyManifestToAngularAssets() {
    if (!paths.assets) {
        return;
    }
    const targetDir = path.join(paths.assets, 'configuration');
    ensureDirExists(targetDir);
    copyFileSync(manifestPath, path.join(targetDir, 'datasets.manifest.json'));
    if (existsSync(path.join(paths.dist, 'ultimate-comparison'))) {
        ensureDirExists(paths.angularAssetsConfiguration);
        copyFileSync(manifestPath, path.join(paths.angularAssetsConfiguration, 'datasets.manifest.json'));
    }
}

function runDatasetsSequentially(handler) {
    return datasetContexts.reduce((sequence, dataset) => {
        return sequence.then(() => handler(dataset));
    }, Promise.resolve());
}

const datasetAssetFileNames = ['comparison.json', 'data.json', 'style.css'];
const RESERVED_CRITERIA_IDS = new Set([
    'Label-Criteria',
    'Markdown-Criteria',
    'Text-Criteria',
    'Name-Url-Criteria',
    'Repository-Criteria'
]);

function pruneReservedCriteria(configuration) {
    if (!configuration || !Array.isArray(configuration.criteria)) {
        return;
    }
    configuration.criteria = configuration.criteria.filter(criteria => {
        if (!criteria || typeof criteria.id !== 'string') {
            return true;
        }
        if (criteria.id.startsWith('default-')) {
            return false;
        }
        return !RESERVED_CRITERIA_IDS.has(criteria.id);
    });
}

function cleanupGeneratedAssetDirectories() {
    const allowedDirectories = new Set();
    datasetContexts.forEach(context => {
        const relativePath = (context.assetRelativePath || '')
            .replace(/\\/g, '/')
            .replace(/^\/+/, '')
            .replace(/\/+$/, '');
        if (relativePath.length === 0) {
            return;
        }
        const segments = relativePath.split('/').filter(Boolean);
        if (segments.length === 0) {
            return;
        }
        let prefix = '';
        segments.forEach(segment => {
            prefix = prefix ? `${prefix}/${segment}` : segment;
            allowedDirectories.add(prefix);
        });
    });

    assetTargets.forEach(({ target }) => {
        if (!target || !existsSync(target)) {
            return;
        }
        pruneAssetDirectory(target, '', allowedDirectories);
        removeLegacyRootAssets(target);
    });
}

function pruneAssetDirectory(root, relativePath, allowedDirectories) {
    const directory = relativePath ? path.join(root, relativePath) : root;
    readdirSync(directory, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .forEach(entry => {
            const nextRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name;
            const fullPath = path.join(root, nextRelative);
            pruneAssetDirectory(root, nextRelative, allowedDirectories);
            if (!allowedDirectories.has(nextRelative) && shouldRemoveDirectory(fullPath)) {
                deleteFolderRecursive(fullPath);
            }
        });
}

function shouldRemoveDirectory(dirPath) {
    try {
        const entries = readdirSync(dirPath);
        if (entries.length === 0) {
            return true;
        }
        return datasetAssetFileNames.some(name => entries.includes(name));
    } catch (error) {
        return false;
    }
}

function removeLegacyRootAssets(root) {
    datasetAssetFileNames.forEach(name => {
        const filePath = path.join(root, name);
        if (existsSync(filePath) && statSync(filePath).isFile()) {
            try {
                unlinkSync(filePath);
            } catch (error) {
                console.warn(`Unable to remove legacy asset ${filePath}: ${error.message}`);
            }
        }
    });
}

// BUILD / UPDATE data files -------------------------------------<
function assets() {
    cleanupGeneratedAssetDirectories();
    datasetContexts.forEach(dataset => {
        ensureDirExists(dataset.distDir);
        const styleTarget = path.join(dataset.distDir, 'style.css');
        copyFileSync(dataset.sources.style, styleTarget);
        copyDatasetFile(dataset, styleTarget, 'style.css');
    });
    copyManifestToAngularAssets();
    return Promise.resolve();
}

function config() {
    datasetContexts.forEach(dataset => {
        const fallbackDefaults = loadDefaultConfigurationFromPaths([dataset.fallbackDefaultConfig]);
        const sharedDefaults = loadDefaultConfigurationFromPaths(dataset.sharedDefaultConfigs);
        const userConfigOverrides = Configuration.load(
            yaml2json.safeLoad(readFileSync(dataset.sources.config, "utf8")),
            fallbackDefaults,
            true
        );
        const autoConfigSource = existsSync(dataset.files.autoConfig)
            ? yaml2json.safeLoad(readFileSync(dataset.files.autoConfig, "utf8"))
            : {};
        const autoConfig = Configuration.load(autoConfigSource, fallbackDefaults, true);
        const finalConfig = cloneConfiguration(userConfigOverrides) || userConfigOverrides;
        if (sharedDefaults) {
            finalConfig.combine(sharedDefaults);
        }
        finalConfig.combine(autoConfig);
        pruneReservedCriteria(finalConfig);
        ensureDirExists(dataset.distDir);
        const configOutput = dataset.files.configJson;
        writeFileSync(configOutput, JSON.stringify(finalConfig.json()), "utf8");
        copyDatasetFile(dataset, configOutput, names.configJson);
    });
    return Promise.resolve();
}

gulp.task('release', function () {
    const version = argv.tag;
    const date = moment().format("YYYY-MM-DD");
    if (typeof(version) === 'undefined' || version === null || version === 'undefined') {
        throw new Error('Undefined argument tag use: `npm run release -- --tag=x.x.x`');
    }
    return gulp.src(files.versionInformation)
        .pipe(gulp.dest(paths.assets))
        .pipe(exec('sed -i\'.bak\' "s/tag = \".*\"/tag = \"v' + version + '\"/g" ' + files.versionInformation))
        .pipe(exec('sed -i\'.bak\' "s/tagDate = \".*\"/tagDate = \"' + date + '\"/g" ' + files.versionInformation))
        .pipe(exec('sed -i\'.bak\' -E "s/(tagLink = \".*)\/v.*\"/\\1\/v' + version + '\"/" ' + files.versionInformation));
});

function markdown() {
    const cliPath = path.join(installedRootDirectory, 'lib', 'md2json', 'dist', 'cli.js');
    return runDatasetsSequentially(dataset => {
        return new Promise((resolve, reject) => {
            deleteFolderRecursive(dataset.tmpJsonDir);
            ensureDirExists(dataset.tmpDir);
            const activeDataDir = prepareDatasetDataDirectory(dataset);
            const command = `node "${cliPath}" --input "${activeDataDir}" --output "${dataset.files.dataJson}" --tmp "${dataset.tmpJsonDir}"`;
            console.log(command);

            execSimple(command, function (err, stdout, stderr) {
                ensureDirExists(dataset.tmpDir);
                writeFileSync(dataset.errorLog, stderr || "", "utf8");
                console.log(stdout);
                console.log(stderr);
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}

function changeCriteria(done) {
    return runDatasetsSequentially(dataset => {
        return new Promise((resolve, reject) => {
            ensureDirExists(path.dirname(dataset.files.autoConfig));
            criteria(paths, {
                config: dataset.sources.config,
                autoConfig: dataset.files.autoConfig,
                sharedDefaultConfigs: dataset.sharedDefaultConfigs,
                fallbackConfig: dataset.fallbackDefaultConfig,
                dataJson: dataset.files.dataJson
            }, err => err ? reject(err) : resolve());
        });
    });
}

function copyDist(done) {
    const rootDist = path.join(installedRootDirectory, 'dist');
    const nodeModuleDist = path.join(nodeModulesRootDirectory, 'dist');
    if (rootDist === nodeModuleDist) {
        return done();
    } else {
        return gulp.src([path.join(nodeModuleDist, '**/*')]).pipe(gulp.dest(rootDist));
    }
}

gulp.task('development-column', function () {
    cleanupGeneratedAssetDirectories();
    return runDatasetsSequentially(dataset => {
        return new Promise((resolve, reject) => {
            developmentColumn({
                config: dataset.sources.config,
                autoConfig: dataset.files.autoConfig,
                dataJson: dataset.files.dataJson
            }, function (err) {
                if (!err) {
                    copyDatasetFile(dataset, dataset.files.dataJson, names.data);
                }
                err ? reject(err) : resolve();
            });
        });
    });
});
// --------------------------------------------------------------->

// DEFAULT task --------------------------------------------------<
gulp.task('default', gulp.series(copyDist, markdown, changeCriteria, 'development-column', assets, config));
// --------------------------------------------------------------->

// DEVELOPMENT tasks --------------------------------------------------<
gulp.task('update-data', function () {
    gulp.watch(datasetMarkdownGlobs, gulp.series('default'));
});

gulp.task('update-config', function () {
    gulp.watch(datasetConfigFiles, gulp.series(changeCriteria, assets, config));
});

gulp.task('update-style', function () {
    gulp.watch(datasetStyleFiles, assets);
});

gulp.task('update', gulp.parallel('update-data', 'update-config', 'update-style'));

gulp.task('dev', gulp.series(copyDist, 'default', 'update'));
// --------------------------------------------------------------->
