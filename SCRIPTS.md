# 📦 Available Scripts

This document explains all available npm scripts in the project.

## Development Scripts

### `npm run dev`
**Start the development server with hot reload**

```bash
npm run dev
```

- Starts Next.js dev server on `http://localhost:3000`
- Auto-reloads on file changes
- Shows TypeScript errors
- Compiles Tailwind CSS in real-time

**Use when**: Working on features and testing locally

---

### `npm run build`
**Create an optimized production build**

```bash
npm run build
```

- Compiles TypeScript
- Optimizes JavaScript and CSS
- Generates static assets
- Creates `.next` folder with production code
- Takes ~30-60 seconds

**Use when**: Preparing for production deployment

**Output**: 
```
✓ Build successful
✓ 3 pages pre-rendered (3.2s)
```

---

### `npm start`
**Start production server**

```bash
npm start
```

- Runs the built application
- Only works after `npm run build`
- Optimized for performance
- Production-ready

**Use when**: Testing production build locally or on server

---

## Linting & Type Checking

### `npm run lint`
**Run ESLint to check code quality**

```bash
npm run lint
```

- Checks code style
- Finds potential bugs
- Reports unused variables
- Enforces best practices

**Output examples**:
```
✓ no errors
✗ unused variable 'foo'
✗ missing 'key' prop in list
```

---

## Build Optimization

### `npm run build -- --debug`
**Build with debug output**

```bash
npm run build -- --debug
```

- Shows detailed build information
- Useful for troubleshooting
- Slower than normal build

---

## Helpful Commands (Beyond package.json)

### Type Checking
```bash
npx tsc --noEmit
```
- Check TypeScript types without building
- Catches type errors
- Fast (~5s)

### Format Code
```bash
npx prettier --write .
```
- Formats all files
- Ensures consistent style
- (Optional - requires Prettier install)

### Analyze Bundle Size
```bash
npm run build
npx next-bundle-analyzer
```
- Shows what's in your bundle
- Identifies large dependencies
- Helps optimize

---

## CI/CD Pipeline Scripts

For automated deployments:

```json
{
  "scripts": {
    "prebuild": "npm run lint",
    "build": "next build",
    "test": "jest",
    "deploy": "npm run build && npm start"
  }
}
```

---

## Performance Monitoring

### Check Performance Metrics
```bash
npm run build
# Look at:
# - ✓ Compiled successfully in X.Xs
# - ✓ Route (app) prerendered in XXms
```

Faster builds = Better development experience

---

## Troubleshooting Scripts

### Clean Install
```bash
rm -r node_modules package-lock.json
npm install
```
- Reinstalls all dependencies
- Use if dependencies are corrupted

### Clear Build Cache
```bash
rm -r .next
npm run build
```
- Removes cached build
- Forces fresh compilation

### Full Clean
```bash
rm -r node_modules .next package-lock.json
npm install
npm run build
```
- Nuclear option - starts fresh

---

## Environment-Specific Commands

### Development (with env)
```bash
NODE_ENV=development npm run dev
```

### Production (with env)
```bash
NODE_ENV=production npm run build
npm start
```

### Custom Port
```bash
PORT=3001 npm run dev
```

### With Different Config
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## Docker Commands (If Using Docker)

### Build Docker Image
```bash
docker build -t harold-portfolio .
```

### Run Container
```bash
docker run -p 3000:3000 harold-portfolio
```

### Using docker-compose
```bash
docker-compose up       # Start
docker-compose down     # Stop
docker-compose logs     # View logs
```

---

## Quick Reference Card

| Goal | Command |
|------|---------|
| Start coding | `npm run dev` |
| Check code quality | `npm run lint` |
| Prepare for production | `npm run build` |
| Run production build | `npm start` |
| Check types | `npx tsc --noEmit` |
| Clean reinstall | `rm -r node_modules && npm install` |
| Clear cache | `rm -r .next && npm run build` |

---

## Script Details in package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- `dev`: Runs Next.js in development mode
- `build`: Compiles application for production
- `start`: Runs production server (requires build first)
- `lint`: Runs ESLint on source files

---

## Tips & Tricks

### Speed Up Development
```bash
# Use fast refresh
npm run dev

# Make changes and save
# Changes appear instantly without full reload
```

### Optimize Before Deploy
```bash
npm run lint          # Fix linting issues
npm run build         # Check for build errors
npx tsc --noEmit      # Check TypeScript
npm start             # Test production build locally
```

### Monitor Build Process
```bash
# Use verbose output
npm run build 2>&1 | tee build.log
```

### Export Static Site (if needed)
```json
// In next.config.ts:
const nextConfig = {
  output: 'export',
};
```
Then: `npm run build` creates static HTML/CSS/JS in `out/` folder

---

## Need Help?

- **Next.js Scripts**: `npx next --help`
- **npm Scripts**: `npm help scripts`
- **TypeScript**: `npx tsc --help`

---

**Last Updated**: February 2026

