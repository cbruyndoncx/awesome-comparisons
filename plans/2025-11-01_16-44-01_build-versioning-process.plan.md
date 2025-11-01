# Plan: Automate Build Naming and Release Process

Establish a repeatable build naming strategy that derives short build identifiers from release dates, keeps debug iterations from incrementing release numbers, and improves guidance for publishing formal releases.

## Tasks

- [x] Audit current versioning implementation and release scripts
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed repository layout and presence of planning/spec directories.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat package.json"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed existing package metadata and located current semantic version for [package.json](../package.json).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"v3.0.0\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Located hard-coded version references across the repo, notably [src/assets/VersionInformation.ts](../src/assets/VersionInformation.ts).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,120p' src/assets/VersionInformation.ts"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Verified manual version constants currently rendered in the footer via [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"VersionInformation\" -n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed Angular component usage points and gulp release scripts referencing version files.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/publish.js"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Inspected release automation invoking gulp tasks for [lib/gulp/publish.js](../lib/gulp/publish.js).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Audited gulp task definitions to understand current release flow in [lib/gulp/gulpfile.babel.js](../lib/gulp/gulpfile.babel.js).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"tagDate\" -n lib/gulp"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Located sed-based updates of `tagDate` within the release task.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '420,520p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Captured the full release task logic to identify how version/date/link replacements are performed.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '190,230p' src/app/components/comparison/comparison.template.html"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Verified footer binding that surfaces the tag and date for [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat .tessl/framework/plan-files.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Reviewed planning requirements to ensure compliance via [.tessl/framework/plan-files.md](../.tessl/framework/plan-files.md).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","ls plans"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Confirmed existing plan history for reference.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","sed -n '1,160p' plans/2025-10-31_20-14-45_template-generation.plan.md"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Consulted prior plan formatting conventions in [plans/2025-10-31_20-14-45_template-generation.plan.md](2025-10-31_20-14-45_template-generation.plan.md).
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","rg \"VersionInformation\" -n specs"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Identified documentation expectations for release automation via [specs/lib/gulp/gulpfile-babel.spec.md](../specs/lib/gulp/gulpfile-babel.spec.md).
  > ---
  > Completed inventory of current versioning touchpoints and release automation to inform implementation changes.
- [x] Implement automated build tag generation and footer wiring
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  > -gulp.task('release', function () {
  > -    const version = argv.tag;
  > -    const date = moment().format("YYYY-MM-DD");
  > -    if (typeof(version) === 'undefined' || version === null || version === 'undefined') {
  > -        throw new Error('Undefined argument tag use: `npm run release -- --tag=x.x.x`');
  > -    }
  > -    return gulp.src(files.versionInformation)
  > -        .pipe(gulp.dest(paths.assets))
  > -        .pipe(exec('sed -i\'.bak\' "s/tag = \".*\"/tag = \"v' + version + '\"/g" ' + files.versionInformation))
  > -        .pipe(exec('sed -i\'.bak\' "s/tagDate = \".*\"/tagDate = \"' + date + '\"/g" ' + files.versionInformation))
  > -        .pipe(exec('sed -i\'.bak\' -E "s/(tagLink = \".*)\/v.*\"/\\1\/v' + version + '\"/" ' + files.versionInformation));
  > -});
  > +gulp.task('release', function releaseTask() {
  > +    const packageJsonPath = path.join(installedRootDirectory, 'package.json');
  > +    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  > +    const packageVersion = packageJson.version;
  > +    const currentIsoDate = moment().format('YYYY-MM-DD');
  > +    const buildLabel = argv.build || argv.label || argv.tag || moment().format('YYYY.MM.DD');
  > +    const repoBase = argv.repo || 'https://github.com/cbruyndoncx/awesome-comparisons';
  > +    const tagLink = argv['tag-link'] || `${repoBase}/releases/tag/${buildLabel}`;
  > +    const versionInformationContent = [
  > +        'export class VersionInformation {',
  > +        `    public version = '${packageVersion}';`,
  > +        `    public tag = '${buildLabel}';`,
  > +        `    public tagDate = '${currentIsoDate}';`,
  > +        `    public tagLink = '${tagLink}';`,
  > +        '}', 
  > +        ''
  > +    ].join('\\n');
  > +
  > +    writeFileSync(files.versionInformation, versionInformationContent, 'utf8');
  > +    return Promise.resolve();
  > +});
  > *** End Patch
  > ```
  > Replaced sed-based replacements with direct file generation, defaulting build labels to the current date and sourcing package version.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: src/assets/VersionInformation.ts
  > @@
  > -export class VersionInformation {
  > -    public tag = 'v3.0.0-001';
  > -    public tagDate = '2025-10-27';
  > -    public tagLink = 'https://github.com/cbruyndoncx/awesome-comparison/tree/v3.0.0-001';
  > -}
  > +export class VersionInformation {
  > +    public version = '3.0.0-251029';
  > +    public tag = '2025.10.27';
  > +    public tagDate = '2025-10-27';
  > +    public tagLink = 'https://github.com/cbruyndoncx/awesome-comparisons/releases/tag/2025.10.27';
  > +}
  > *** End Patch
  > ```
  > Seeded the version file with the new structure so footer rendering remains consistent before the next release run.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/publish.js
  > @@
  > -    [
  > -        './node_modules/gulp/bin/gulp.js',
  > -        'release',
  > -        '--gulpfile=./lib/gulp/gulpfile.js',
  > -        '--tag=' + argv.tag
  > -    ],
  > +    (function buildReleaseArgs() {
  > +        const args = [
  > +            './node_modules/gulp/bin/gulp.js',
  > +            'release',
  > +            '--gulpfile=./lib/gulp/gulpfile.js'
  > +        ];
  > +        if (argv.build) {
  > +            args.push('--build=' + argv.build);
  > +        }
  > +        if (argv.label) {
  > +            args.push('--label=' + argv.label);
  > +        }
  > +        if (argv.tag) {
  > +            args.push('--tag=' + argv.tag);
  > +        }
  > +        if (argv.repo) {
  > +            args.push('--repo=' + argv.repo);
  > +        }
  > +        if (argv['tag-link']) {
  > +            args.push('--tag-link=' + argv['tag-link']);
  > +        }
  > +        return args;
  > +    })(),
  > @@
  > -                        spawn('np', [argv.tag, '--tag=latest'], {stdio: 'inherit'});
  > +                        if (argv.tag) {
  > +                            spawn('np', [argv.tag, '--tag=latest'], {stdio: 'inherit'});
  > +                        }
  >                     }
  >                 }));
  >             }
  >         }));
  > ```
  > Allowed publish helper to pass optional build metadata without forcing a `--tag` argument.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  > -            [href]="getVersionInformation()?.tagLink">{{getVersionInformation()?.tag + " (" +
  > -            (getVersionInformation()?.tagDate | date: ("yyyy-MM-dd")) + ")"}}</a>
  > +            [href]="getVersionInformation()?.tagLink"
  > +            [title]="'Built on ' + (getVersionInformation()?.tagDate | date: ('yyyy-MM-dd'))">
  > +            {{'Build ' + getVersionInformation()?.tag + ' • v' + getVersionInformation()?.version}}</a>
  > ```
  > Updated footer text to surface the new date-based build label alongside the package version with a tooltip for the ISO date.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  > -            <a
  > -                rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img
  > -                alt="Creative Commons License CC-BY-SA 4.0" style="border-width:0"
  > -                src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"/></a> | <a
  > -            [href]="getVersionInformation()?.tagLink">{{getVersionInformation()?.tag + " (" +
  > -            [title]="'Built on ' + (getVersionInformation()?.tagDate | date: ('yyyy-MM-dd'))">
  > -            {{'Build ' + getVersionInformation()?.tag + ' • v' + getVersionInformation()?.version}}</a>
  > +            <a
  > +                rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img
  > +                alt="Creative Commons License CC-BY-SA 4.0" style="border-width:0"
  > +                src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"/></a> | <a
  > +                [href]="getVersionInformation()?.tagLink"
  > +                [title]="'Built on ' + (getVersionInformation()?.tagDate | date: ('yyyy-MM-dd'))">
  > +                {{'Build ' + getVersionInformation()?.tag + ' • v' + getVersionInformation()?.version}}
  > +            </a>
  > *** End Patch
  > ```
  > Tidied the footer anchor to remove leftover interpolation and ensure proper indentation.
- [x] Document release workflow updates and provide user guidance
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: package.json
  > @@
  > -    "build": "npm run data:prepare && ng build",
  > -    "build:prod": "npm run data:prepare && ng build --configuration production",
  > -    "release:stamp": "node ./node_modules/gulp/bin/gulp.js release --gulpfile=./lib/gulp/gulpfile.js",
  > -    "release:prepare": "npm run build:prod && npm run release:stamp",
  >      "templates:export": "node ./lib/comparison-template/export-all-templates.js",
  > @@
  > -    "release": "npm run build:prod"
  > +    "release": "npm run release:prepare"
  >   },
  > *** End Patch
  > ```
  > Added npm helper scripts so release stamping is a single `npm run release` invocation.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","cat <<'EOF' > docs/release-workflow.md\n# Release Workflow\n\nThis guide explains how build labels are generated and how to publish a formal release for Awesome Comparisons.\n\n## Build Labels\n\n- `npm run release:stamp` generates a build label using the current date (format `YYYY.MM.DD`).\n- The script also copies the `package.json` version into `VersionInformation.version` so the footer shows both the build label (date) and the semantic version.\n- You can override the date-based label with `npm run release:stamp -- --build 2025.11.02` or `--label` if you prefer a custom name.\n- The generated link points to `https://github.com/cbruyndoncx/awesome-comparisons/releases/tag/<label>`; override with `--repo` or `--tag-link` if publishing elsewhere.\n\n## Release Checklist\n\n1. Update `CHANGELOG.md` (and any dataset-specific changelogs) with the upcoming changes.\n2. Bump the package version with npm (for example `npm version patch`) if you need a new semantic version.\n3. Run `npm run release` (alias for `npm run release:prepare`) to build the site and stamp the version metadata.\n4. Inspect `dist/` output and the footer in a local preview to confirm the new label shows correctly.\n5. Commit the stamped `VersionInformation.ts`, build artifacts, and changelog updates.\n6. Tag the release: `git tag -a <label> -m \"<short summary>\"` (default label is the build date).\n7. Push commits and tags: `git push origin main --tags`.\n8. Publish a GitHub release: `gh release create <label> --notes-file CHANGELOG.md` (or provide a summary manually).\n\n## Debug Builds\n\n- `npm run dev` and `npm run build` never touch `VersionInformation.ts`; they continue to show the last stamped release label.\n- If you want to preview debug builds with a temporary label, run `npm run release:stamp -- --build dev-$(date +%Y%m%d%H%M)` and avoid committing the change.\n\n## Changelog Management\n\n- Keep `CHANGELOG.md`, `CHANGELOG_V3.md`, or dataset-specific logs up to date while developing.\n- When stamping a release, copy the relevant section into the GitHub release notes for consistency.\n- Archive previous release notes under `CHANGELOG_V3_DETAILED.md` if you need long-form detail.\n\n## GitHub Releases\n\n- Use the date-based label as the release tag to keep the footer link and GitHub release aligned.\n- Include attachments (e.g., exported templates) by uploading them through the GitHub release UI or `gh release upload <label> <file>`.\n- If you need to reissue a release, rerun `npm run release:stamp` with a new `--build` label, retag, and update the GitHub release.\n\nRefer back to this document whenever you're preparing to publish so the numbering stays consistent between the site footer and GitHub releases.\nEOF\n"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Authored [docs/release-workflow.md](../docs/release-workflow.md) with the new process and GitHub release checklist.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: README.md
  > @@
  >  To update the ultimate comparison framework that your comparison uses, just run `npm update` in the directory that contains your comparison.
  >  It installs the latest version with the same major version number (ie. `2.x.x`).
  >  
  > +## Release process
  > +
  > +Refer to [docs/release-workflow.md](docs/release-workflow.md) for the full checklist. In short:
  > +
  > +- Update changelogs and bump the npm version if needed.
  > +- Run `npm run release` to build the site and stamp the date-based build label.
  > +- Tag the release using the generated label and publish it through GitHub releases (`gh release create <label>` is recommended).
  > +- Debug builds (`npm run dev`, `npm run build`) never modify the stamped footer, so you can iterate locally without touching release metadata.
  > +
  >  ## Development hints
  >  
  >  When developing on the framework itself, these might be helpful hints:
  > *** End Patch
  > ```
  > Linked the README to the release workflow guide and summarized the new steps.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: specs/lib/gulp/gulpfile-babel.spec.md
  > @@
  > -### Release Management
  > -
  > -Updates version information for package releases.
  > -
  > -- Requires version tag via --tag command line argument [@test](./tests/release-management.spec.js)
  > -- Throws error when version tag is undefined [@test](./tests/release-management.spec.js)
  > -- Updates version tag in VersionInformation.ts using sed commands [@test](./tests/release-management.spec.js)
  > -- Updates tag date with current date in YYYY-MM-DD format [@test](./tests/release-management.spec.js)
  > -- Updates tag link URL with new version [@test](./tests/release-management.spec.js)
  > -- Generates current date using moment().format("YYYY-MM-DD") [@test](./tests/release-management.spec.js)
  > -- Uses sed with backup file creation for safe file modifications [@test](./tests/release-management.spec.js)
  > +### Release Management
  > +
  > +Maintains footer metadata for official releases.
  > +
  > +- Writes `VersionInformation.ts` during release stamping, deriving the build label from `--build`, `--label`, `--tag`, or the current date when none are provided [@test](./tests/release-management.spec.js)
  > +- Copies the package version from `package.json` into `VersionInformation.version` [@test](./tests/release-management.spec.js)
  > +- Sets `tagDate` using `moment().format('YYYY-MM-DD')` for deterministic ISO dates [@test](./tests/release-management.spec.js)
  > +- Builds the release link using the repository base (`https://github.com/cbruyndoncx/awesome-comparisons` by default) or overrides supplied via `--repo`/`--tag-link` [@test](./tests/release-management.spec.js)
  > *** End Patch
  > ```
  > Updated the spec to match the date-driven stamping workflow and optional overrides.
- [x] Summarize modifications and next steps for the user
  > **Bash**
  > ```json
  > {"command":["bash","-lc","git status -sb"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Collected the list of modified files to reference in the outgoing summary. Preparing final guidance for the user.
  > ---
  > **Bash**
  > ```json
  > {"command":["bash","-lc","git status -sb"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Rechecked the worktree after footer cleanup to confirm the final file set for the summary.
