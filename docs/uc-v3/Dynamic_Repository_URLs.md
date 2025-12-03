# Dynamic Repository URLs

The site footer displays dynamic repository URLs that are automatically generated from your `package.json` during build. No hardcoded URLs in source files!

## How It Works

During production builds, `scripts/generate-environment.js` reads the repository URL from `package.json` and generates `src/environments/environment.prod.ts` automatically.

**Source:** `package.json` `repository.url` field
```json
{
  "repository": {
    "type": "git",
    "url": "git@github.com:cbruyndoncx/awesome-comparisons.git"
  }
}
```

**Generated:** `src/environments/environment.prod.ts`
```typescript
export const environment = {
    production: true,
    repositoryUrl: 'https://github.com/cbruyndoncx/awesome-comparisons',
    githubPagesUrl: 'https://cbruyndoncx.github.io/awesome-comparisons'
};
```

## Configuration

### Method 1: Update package.json (Recommended)

Simply update your `package.json` repository field:

```json
{
  "repository": {
    "type": "git",
    "url": "git@github.com:your-org/your-repo.git"
  }
}
```

Then build normally:
```bash
npm run build:prod
```

The script automatically:
- Converts `git@github.com:` to `https://github.com/`
- Removes `.git` suffix
- Generates GitHub Pages URL from repository URL

### Method 2: Environment Variables (CI/CD)

Override URLs using environment variables:

```bash
export REPOSITORY_URL="https://github.com/your-org/your-repo"
export GITHUB_PAGES_URL="https://your-org.github.io/your-repo"
npm run build:prod
```

Environment variables take precedence over `package.json`.

## Manual Generation

Regenerate the environment file anytime:

```bash
npm run env:generate
```

This creates/updates `src/environments/environment.prod.ts` based on current `package.json` and environment variables.

## CI/CD Examples

### GitHub Actions - Automatic

The script works automatically in GitHub Actions using the repository from `package.json`:

```yaml
name: Build and Deploy
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build (auto-generates URLs from package.json)
        run: npm run build:prod
      - name: Deploy
        # ... deployment steps
```

### GitHub Actions - With Override

Override URLs for a specific deployment:

```yaml
- name: Build with custom URLs
  env:
    REPOSITORY_URL: ${{ github.server_url }}/${{ github.repository }}
    GITHUB_PAGES_URL: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}
  run: npm run build:prod
```

This dynamically uses the current GitHub repository information.

### Travis CI / CircleCI

```bash
# .travis.yml or circle.yml
script:
  - npm run build:prod  # Uses package.json automatically
```

Or with environment variables:
```yaml
env:
  - REPOSITORY_URL=https://github.com/org/repo
  - GITHUB_PAGES_URL=https://org.github.io/repo
script:
  - npm run build:prod
```

## Footer Links

The generated URLs appear in the site footer:

1. **"Awesome Comparisons"** → Links to GitHub Pages site (`githubPagesUrl`)
2. **"Source Repository"** → Links to source code repo (`repositoryUrl`)

Example footer:
```
This site is built with Awesome Comparisons | Source Repository | content licensed under [CC BY-SA 4.0]
                         ↓                             ↓
                  gh-pages docs site           GitHub source repo
```

## Development

For local development, `src/environments/environment.ts` is used (not auto-generated):

```typescript
export const environment = {
    production: false,
    repositoryUrl: 'https://github.com/cbruyndoncx/awesome-comparisons',
    githubPagesUrl: 'https://cbruyndoncx.github.io/awesome-comparisons'
};
```

Update this file manually if you need different URLs during development.

## Files

- **`scripts/generate-environment.js`** - Build-time script that generates environment.prod.ts
- **`src/environments/environment.ts`** - Development environment (edit manually)
- **`src/environments/environment.prod.ts`** - Production environment (auto-generated, in .gitignore)
- **`src/app/components/comparison/comparison.component.ts`** - Exposes URLs to template
- **`src/app/components/comparison/comparison.template.html`** - Footer template

## Troubleshooting

### URLs not updating after changing package.json

Run the generation script manually:
```bash
npm run env:generate
```

Then rebuild:
```bash
npm run build:prod
```

### Wrong URLs in production build

Check your `package.json` repository field:
```bash
node -p "require('./package.json').repository.url"
```

### Custom deployment needs different URLs

Use environment variables:
```bash
REPOSITORY_URL="https://your-url" GITHUB_PAGES_URL="https://your-pages" npm run build:prod
```

## See Also

- [CI & Deploy](CI_and_Deploy.md) - Publishing guide
- [Overview](Overview.md) - Architecture overview
