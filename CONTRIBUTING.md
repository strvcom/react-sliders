# Contribution guides

- [Contribution guides](#contribution-guides)
  - [Project Setup](#project-setup)
    - [Prerequisites](#prerequisites)
    - [Step by step guide](#step-by-step-guide)
  - [Development](#development)
    - [NPM Scripts](#npm-scripts)
      - [`dev`](#dev)
      - [`build`](#build)
      - [`prettier:format`](#prettierformat)
      - [`prettier:validate`](#prettiervalidate)
      - [`lint:js`](#lintjs)
      - [`lint`](#lint)
      - [`test:watch`](#testwatch)
      - [`test:coverage`](#testcoverage)
      - [`test`](#test)
      - [`test:e2e:cli`](#teste2ecli)
      - [`test:e2e:gui`](#teste2egui)
      - [`analyze:bundle`](#analyzebundle)
    - [File Structure](#file-structure)

## Project Setup

### Prerequisites

- Node v12
- npm

### Step by step guide

**1. Clone the repository**

```bash
git clone git@github.com:strvcom/react-sliders.git
```

**2. Install dependencies**

```bash
npm install
```

## Development

### NPM Scripts

#### `dev`

Launches the app in development mode.

#### `build`

Builds up the library. The build is then generated in `dist` folder.

#### `prettier:format`

Runs prettier formatter through codebase.

#### `prettier:validate`

Validates code formatting of whole codebase.

**This step is included in CI.**

#### `lint:js`

Triggers `ESLint` to lint JavaScript and TypeScript files.

#### `lint`

Triggers both [`lint:css`](#lintcss) and [`lint:js`](#lintjs).

**This step is included in CI.**

#### `test:watch`

Launches `jest` in watch mode.

#### `test:coverage`

Launches `jest` and generates a coverage report.

#### `test`

Automatically will check whether is in CI env.

- if yes then it will run [`test:coverage`](#testcoverage)
- otherwise it will run [`test:watch`](#testwatch)

**This step is included in CI.**

#### `test:e2e:cli`

Triggers a Cypress run of all specs.

#### `test:e2e:gui`

Launches Cypress GUI where specific specs can be triggered.

#### `analyze:bundle`

Runs [`source-map-explorer`](https://github.com/danvk/source-map-explorer) over built library.

The script is run in **production** mode.

### File Structure

```
cypress/       # E2E tests setup & specs
config/        # Config files
examples/      # Source files for interactive CodeSandbox demos
scripts/       # Custom scripts for releasing, etc.
src/           # Library core
```
