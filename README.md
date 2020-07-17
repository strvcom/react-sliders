# `@strv/react-sliders`

![Continuous Integration](https://github.com/strvcom/react-sliders/workflows/Continuous%20Integration/badge.svg)
![Dependabot](https://flat.badgen.net/dependabot/strvcom/react-sliders?icon=dependabot)
[![Mergify Status][mergify-status]][mergify]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm latest](https://badgen.net/npm/v/@strv/react-sliders)](https://www.npmjs.com/package/@strv/react-sliders)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/@strv/react-sliders)](https://bundlephobia.com/result?p=@strv/react-sliders)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/strvcom/react-sliders&style=flat

- [`@strv/react-sliders`](#strvreact-sliders)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
    - [Basic Examples](#basic-examples)
      - [`useSlider`](#useslider)
      - [`useRangeSlider`](#userangeslider)
    - [Hooks API](#hooks-api)
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
- [x] [Documented API](#hooks-api) with [interactive examples on CodeSandbox](examples/README.md)
- [x] Fully typed with TypeScript
- [x] Based on [our already existing open source tools](https://www.strv.io/tools/frontend)
  - [`code-quality-tools`](https://github.com/strvcom/code-quality-tools)
- [ ] **WIP** Properly tested

## Install

```bash
# npm
npm install @strv/react-sliders --save

# yarn
yarn add @strv/react-sliders
```

## Usage

### Basic Examples

#### `useSlider`

```tsx
import React from 'react'
import { useSlider } from '@strv/react-sliders'

const SliderExample = () => {
  const [value, setValue] = React.useState(0)
  const { getRailProps, getTrackProps, getHandleProps } = useSlider({
    value,
    min: 0,
    max: 100,
    onChange: setValue,
  })

  return (
    <div className="slider-container">
      <span className="slider-rail" {...getRailProps()} />
      <span className="slider-track" {...getTrackProps()} />

      <span className="slider-handle" {...getHandleProps()} />
    </div>
  )
}
```

#### `useRangeSlider`

```tsx
import React from 'react'
import { useRangeSlider, TRangeTuple } from '@strv/react-sliders'

const RangeSliderExample = () => {
  const [value, setValue] = React.useState<TRangeTuple>([0, 100])
  const { getRailProps, getTrackProps, getMinHandleProps, getMaxHandleProps } = useRangeSlider({
    value,
    min: 0,
    max: 100,
    onChange: setValue,
  })

  return (
    <div className="range-slider-container">
      <span className="range-slider-rail" {...getRailProps()} />
      <span className="range-slider-track" {...getTrackProps()} />

      <span className="range-slider-handle" {...getMinHandleProps()} />
      <span className="range-slider-handle" {...getMaxHandleProps()} />
    </div>
  )
}
```

If you want so see more, head to the [list of existing CodeSandbox examples](examples/README.md).

### Hooks API

- [`useSlider`](src/hooks/docs/useSlider.md)
- [`useRangeSlider`](src/hooks/docs/useRangeSlider.md)

---

## Related

This project was bootstrapped with [`TSDX`](https://github.com/formik/tsdx).

### Contribution

See [Contributing guide](CONTRIBUTING.md)

### Authors

- Lukas Hudec ([@xhudec](https://github.com/xhudec))

### License

[MIT License](LICENSE)
