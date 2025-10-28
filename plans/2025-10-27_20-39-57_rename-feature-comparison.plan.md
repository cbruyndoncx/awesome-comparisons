# Plan: Rename Angular Bundle Directory Reference

Rename occurrences of `ultimate-comparison` to `awesome-comparison` within the `src/` tree so the app points to the new bundle directory name.

## Tasks

- [x] Audit existing references to `ultimate-comparison` under `src/`
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg -n \"ultimate-comparison\" src"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Found matches in `src/assets/VersionInformation.ts`, `src/app/components/comparison/comparison.template.html`, and generated dataset assets under `src/assets/generated/`.
- [x] Update code/templates to use `awesome-comparison`
  > **Edit** `src/assets/VersionInformation.ts`
  > ```
  > *** Begin Patch
  > *** Update File: src/assets/VersionInformation.ts
  > @@
  > -    public tagLink = 'https://github.com/ultimate-comparisons/ultimate-comparison-BASE/tree/v2.0.0-alpha.32';
  > +    public tagLink = 'https://github.com/ultimate-comparisons/awesome-comparison-BASE/tree/v2.0.0-alpha.32';
  >  }
  > *** End Patch
  > ```
  > Updated version metadata link to point at `awesome-comparison-BASE`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","python - <<'PY'\nfrom pathlib import Path\npath = Path('src/assets/generated/example/data.json')\ntext = path.read_text()\nupdated = text.replace('ultimate-comparison-BASE', 'awesome-comparison-BASE')\nif updated != text:\n    path.write_text(updated)\nPY\n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Replaced sample dataset references so generated assets no longer include `ultimate-comparison-BASE`.
- [x] Spot-check key files/build config alignment after rename
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg -n \"ultimate-comparison/\" src"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified no remaining `ultimate-comparison/` path segments exist under `src/`.
