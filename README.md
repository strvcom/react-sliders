# `@strv/react-sliders`

![CI](https://github.com/strvcom/react-sliders/workflows/CI/badge.svg)
![Dependabot](https://flat.badgen.net/dependabot/strvcom/react-sliders?icon=dependabot)
[![Mergify Status][mergify-status]][mergify]
[![management: perfekt👌](https://img.shields.io/badge/management-perfekt👌-red.svg?style=flat-square)](https://github.com/lekterable/perfekt)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/strvcom/react-sliders&style=flat

- [`@strv/react-sliders`](#strvreact-sliders)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
    - [`useSlider`](#useslider)
      - [Basic Example](#basic-example)
      - [API](#api)
        - [`value`](#value)
        - [`min`](#min)
        - [`max`](#max)
        - [`onChange`](#onchange)
        - [`step`](#step)
        - [`formatValue`](#formatvalue)
      - [Returned props](#returned-props)
        - [`getRailProps`](#getrailprops)
        - [`getTrackProps`](#gettrackprops)
        - [`getHandleProps`](#gethandleprops)
        - [`getMarkerProps`](#getmarkerprops)
      - [Markers](#markers)
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

## Install

```bash
# npm
npm install @strv/react-sliders --save

# yarn
yarn add @strv/react-sliders
```

## Usage

### `useSlider`

#### Basic Example

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

#### API

##### `value`

> `number` | **required**

The controlled value of the slider.

##### `min`

> `number` | **required**

The minimum allowed value.

##### `max`

> `number` | **required**

The maximum allowed value.

##### `onChange`

> `(value: number) => void` | **required**

Called each time the `value` has changed. Value can be changed by dragging the handle (either by mouse or by touching) or by using keyboard.

Supported keys:

| Key           | Action              |
| ------------- | ------------------- |
| _Arrow Up_    | `value + step`      |
| _Arrow Right_ | `value + step`      |
| _Arrow Down_  | `value - step`      |
| _Arrow Left_  | `value - step`      |
| _Page Up_     | `value + 10 * step` |
| _Page Down_   | `value - 10 * step` |
| _End_         | `max`               |
| _Home_        | `min`               |

##### `step`

> `number` | **optional**, defaults to `1`

Granularity of values on which the Slider can step through.

##### `formatValue`

> `(value: number) => string` | **optional**, no useful default

Formatting function which is used to format the value into more human readable format. The formatted value is then supplied to `getHandleProps` where it sets `"aria-valuetext"` property.

#### Returned props

##### `getRailProps`

This method should be applied to a _rail_ element. It will attach a `ref`, which is used in mouse & touch movement calculations.

> NOTE: Rail bar represents the whole line upon which the slider can move.

> NOTE: Must be attached to the actual rail element to properly calculate mouse or touch dragging.

##### `getTrackProps`

This method should be applied to a _track_ element. It will attach a `ref`, which is used in a mouse & touch movement calculations.

> NOTE: Track bar represents the actual sliders value.

> NOTE: Must be attached to the actual track element to properly calculate mouse or touch dragging.

##### `getHandleProps`

This method should be applied to a _handle_ element. It will attach a `ref`, which is used in a mouse & touch movement calculations. It will pass A11y properties to the handle such as `"aria-valuenow"`, `"aria-valuetext"`, `"aria-valuemin"` and `"aria-valuemax"` and binds event handlers to control the value.

> NOTE: Must be attached to the handle element to enable slider functionality.

##### `getMarkerProps`

This method should be applied to a _marker_ element. It will return a `style` property containing positioning info and `isInRange` property which can be used for highlighting the markers if they are in current value range.

> NOTE: Using this prop getter is optional.

**Required Properties**

- `marker: { value: number, label?: string }`

#### Markers

```tsx
import React from 'react'
import { useSlider, IRangeMarker } from '@strv/react-sliders'

const markers: IRangeMarker[] = [{ value: 0 }, { value: 50 }, { value: 100 }]

const SliderExample = () => {
  const [value, setValue] = React.useState(0)
  const { getRailProps, getTrackProps, getHandleProps, getMarkerProps } = useSlider({
    value,
    min: 0,
    max: 100,
    onChange: setValue,
  })

  return (
    <div className="slider-container">
      <span className="slider-rail" {...getRailProps()} />
      <span className="slider-track" {...getTrackProps()} />

      {markers.map((marker) => {
        const { style, isInRange } = getMarkerProps(marker)

        return (
          <React.Fragment key={`marker-${marker.value}`}>
            <span className="marker-label" style={style}>
              {marker.label}
            </span>
            <span
              className="marker-track"
              style={{
                ...style,
                backgroundColor: isInRange ? 'red' : 'grey',
              }}
            />
          </React.Fragment>
        )
      })}

      <span className="slider-handle" {...getHandleProps()} />
    </div>
  )
}
```

### `useRangeSlider`

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
