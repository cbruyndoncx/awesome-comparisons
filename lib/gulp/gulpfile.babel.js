import gulp from 'gulp'
import exec from 'gulp-exec';
import moment from 'moment';
import * as path from 'path';
import { exec as execSimple } from 'child_process';
import { deleteFolderRecursive } from "./tasks/util.babel.js";
import { criteria } from "./tasks/criteria.babel.js";
import { developmentColumn } from "./tasks/developmentColumn.babel.js";
import yaml2json from "js-yaml";
import { existsSync, readFileSync, mkdirSync, writeFileSync, copyFileSync } from "fs";
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
    assets: path.join(nodeModulesRootDirectory, 'src/assets'),
    assetsGenerated
};

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
    description: path.join(paths.config, 'description.md'),
    dataJson: path.join(paths.dist, names.data),
    autoConfig: path.join(paths.config, names.autoConfig),
    versionInformation: path.join(paths.assets, names.versionInformation),
    errorLog: path.join(tmp, 'error.log')
};

const globs = {
    markdown: path.join(paths.data, '/**/', '*.md'),
    config: path.join(paths.config, names.config),
    defaultConfig: path.join(paths.config, names.defaultConfig),
    description: path.join(paths.config, '/**/', 'description.md'),
    style: path.join(paths.config, '/**/', 'style.css'),
    bib: path.join(paths.data, '/**/', '*.bib'),
    csl: path.join(paths.data, '/**/', '*.csl')
};

function ensureAssetsGeneratedDir() {
    if (!paths.assetsGenerated) {
        return false;
    }
    if (!existsSync(paths.assetsGenerated)) {
        mkdirSync(paths.assetsGenerated, { recursive: true });
    }
    return true;
}

function copyToAssets(sourcePath, fileName) {
    if (!paths.assetsGenerated) {
        return;
    }
    try {
        ensureAssetsGeneratedDir();
        copyFileSync(sourcePath, path.join(paths.assetsGenerated, fileName));
    } catch (error) {
        console.warn(`Unable to copy ${fileName} to assets: ${error.message}`);
    }
}

// BUILD / UPDATE data files -------------------------------------<
function assets() {
    const stream = gulp.src([files.description, files.style], { allowEmpty: true })
        .pipe(gulp.dest(paths.dist));

    if (paths.assetsGenerated) {
        stream.on('end', () => {
            copyToAssets(files.description, path.basename(files.description));
            copyToAssets(files.style, path.basename(files.style));
        });
    }

    return stream;
}

function config(done) {
    const userConfig = Configuration.load(yaml2json.safeLoad(readFileSync(files.config, "utf8")));
    const autoConfig = Configuration.load(yaml2json.safeLoad(readFileSync(files.autoConfig, "utf8")));
    userConfig.combine(autoConfig);
    const configOutput = path.join(paths.dist, names.configJson);
    writeFileSync(configOutput, JSON.stringify(userConfig.json()), "utf8");
    copyToAssets(configOutput, names.configJson);
    done();
}

gulp.task('release', function () {
    const version = argv.tag;
    const date = moment().format("YYYY-MM-DD");
    if (typeof(version) === 'undefined' || version === null || version === 'undefined') {
        throw new Error('Undefined argument tag use: `npm run release -- --tag=x.x.x`');
    }
    return gulp.src(files.versionInformation)
        .pipe(gulp.dest(paths.assets))
        .pipe(exec('sed -i\'.bak\' "s/tag = \\".*\\"/tag = \\"v' + version + '\\"/g" ' + files.versionInformation))
        .pipe(exec('sed -i\'.bak\' "s/tagDate = \\".*\\"/tagDate = \\"' + date + '\\"/g" ' + files.versionInformation))
        .pipe(exec('sed -i\'.bak\' -E "s/(tagLink = \\".*)\\/v.*\\"/\\1\\/v' + version + '\\"/" ' + files.versionInformation));
});

function markdown(callback) {
    const cmd = process.env.MD_TO_JSON_COMMAND;
    if (!cmd) {
        console.warn("MD_TO_JSON_COMMAND is not set. Skipping markdown conversion. Please set MD_TO_JSON_COMMAND to your Python converter script.");
        return callback();
    }
    
    const extraArgs = process.env.MD_TO_JSON_ARGS || "";
    deleteFolderRecursive(paths.json);
    
    const command = `${cmd} --input "${paths.data}" --output "${files.dataJson}" --tmp "${paths.json}"${extraArgs ? " " + extraArgs : ""}`;
    console.log(command);
    
    execSimple(command, function (err, stdout, stderr) {
        if (!existsSync(tmp)) {
            mkdirSync(tmp);
        }
        writeFileSync(files.errorLog, stderr || "", "utf8");
        console.log(stdout);
        console.log(stderr);
        if (!err) {
            copyToAssets(files.dataJson, names.data);
        }
        callback(err);
    });
}

function changeCriteria(done) {
    criteria(paths, files, done);
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

gulp.task('development-column', function (done) {
    developmentColumn(files, done);
});
// --------------------------------------------------------------->

// DEFAULT task --------------------------------------------------<
gulp.task('default', gulp.series(copyDist, markdown, changeCriteria, 'development-column', assets, config));
// --------------------------------------------------------------->

// DEVELOPMENT tasks --------------------------------------------------<
gulp.task('update-data', function () {
    gulp.watch(globs.markdown, gulp.series('default'));
});

gulp.task('update-config', function () {
    gulp.watch([globs.config, globs.defaultConfig], gulp.series(changeCriteria, assets, config));
});

gulp.task('update-description', function () {
    gulp.watch(globs.description, gulp.series(changeCriteria, assets, config));
});

gulp.task('update-style', function () {
    gulp.watch(globs.style, assets);
});

gulp.task('update-citation', function () {
    gulp.watch([globs.csl, globs.bib], gulp.series(changeCriteria, assets, config));
});

gulp.task('update', gulp.parallel('update-data', 'update-config', 'update-description', 'update-citation', 'update-style'));

gulp.task('dev', gulp.series(copyDist, 'default', 'update'));
// --------------------------------------------------------------->
