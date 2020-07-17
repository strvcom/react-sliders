# `@strv/react-sliders`

![CI](https://github.com/strvcom/react-sliders/workflows/CI/badge.svg)
![Dependabot](https://flat.badgen.net/dependabot/strvcom/react-sliders?icon=dependabot)
[![Mergify Status][mergify-status]][mergify]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/strvcom/react-sliders&style=flat

- [`@strv/react-sliders`](#strvreact-sliders)
  - [Features](#features)
  - [Usage](#usage)
    - [Install](#install)
    - [API](#api)
      - [`useSlider`](#useslider)
      - [`useRangeSlider`](#userangeslider)
  - [Related](#related)
    - [Contribution](#contribution)
    - [Authors](#authors)
    - [License](#license)

## Features

- [x] Customizable & CSS agnostic
  - **Modules**
    - `useRangeSlider`, `useSlider` (Hooks, which encapsulates the core logic and let consumers style their own sliders as they wish)
  - **Headless** (Inspiration [`react-table`](https://github.com/tannerlinsley/react-table), [`downshift-js`](https://github.com/downshift-js/downshift))
- [x] A11y
  - Full mouse & touch support
  - [Keyboard support](https://www.w3.org/TR/wai-aria-practices/examples/slider/slider-1.html)
- [x] API that is easy to use & integrate
  - with forms, ...
- [x] Tree-shakeable & Optimized bundle
  - out of the box thanks to [`TSDX`](https://github.com/formik/tsdx).
- [ ] Properly tested
- [ ] Well documented API with interactive examples on [CodeSandbox](https://codesandbox.io/)
- [x] Fully typed with TypeScript
- [x] Based on [our already existing open source tools](https://www.strv.io/tools/frontend)
  - [`code-quality-tools`](https://github.com/strvcom/code-quality-tools)
  - [`perfekt`](https://github.com/lekterable/perfekt)

## Usage

### Install

```bash
# npm
npm install @strv/react-sliders --save

# yarn
yarn add @strv/react-sliders
```

### Hooks

#### `useSlider`

_TODO_

#### `useRangeSlider`

_TODO_

---

## Related

This project was bootstrapped with [`TSDX`](https://github.com/formik/tsdx).

### Contribution

See [Contributing guide](CONTRIBUTING.md)

### Authors

- Lukas Hudec ([@xhudec](https://github.com/xhudec))

### License

[MIT License](LICENSE)
