# `useRangeSlider`

- [`useRangeSlider`](#userangeslider)
  - [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Markers](#markers)
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
    - [`getMinHandleProps` & `getMaxHandleProps`](#getminhandleprops--getmaxhandleprops)
    - [`getMarkerProps`](#getmarkerprops)
      - [Required Properties](#required-properties)

## Usage

### Basic Example

```tsx
import React from 'react'
import { useRangeSlider, TRangeTuple } from '@strv/react-sliders'

const SliderExample = () => {
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

### Markers

```tsx
import React from 'react'
import { useRangeSlider, TRangeTuple, IRangeMarker } from '@strv/react-sliders'

const markers: IRangeMarker = [{ value: 0 }, { value: 50 }, { value: 100 }]

const SliderExample = () => {
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

      {markers.map((marker) => {
        const { style, isInRange } = getMarkerProps(marker)

        return (
          <React.Fragment key={`marker-${marker.value}`}>
            <span className="marker-label" style={style}>
              {marker.label}
            </span>
            <span
              className="marker"
              style={{
                ...style,
                backgroundColor: isInRange ? 'red' : 'grey',
              }}
            />
          </React.Fragment>
        )
      })}

      <span className="range-slider-handle" {...getMinHandleProps()} />
      <span className="range-slider-handle" {...getMaxHandleProps()} />
    </div>
  )
}
```

## API

### `value`

> `[number, number]` | **required**

The controlled value of the range slider.

### `min`

> `number` | **required**

The minimum allowed value.

### `max`

> `number` | **required**

The maximum allowed value.

### `onChange`

> `(value: [number, number]) => void` | **required**

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

### `step`

> `number` | **optional**, defaults to `1`

Granularity of values on which the slider can step through.

### `formatValue`

> `(value: number) => string` | **optional**, no useful default

Formatting function which is used to format the value into more human readable format. The formatted value is then supplied to `getHandleProps` where it sets `"aria-valuetext"` property.

## Returned props

### `getRailProps`

This method should be applied to a _rail_ element. It will attach a `ref`, which is used in mouse & touch movement calculations.

> NOTE: Rail bar represents the whole line upon which the slider can move.

> NOTE: Must be attached to the actual rail element to properly calculate mouse or touch dragging.

### `getTrackProps`

This method should be applied to a _track_ element. It will attach a `ref`, which is used in a mouse & touch movement calculations.

> NOTE: Track bar represents the actual sliders value.

> NOTE: Must be attached to the actual track element to properly calculate mouse or touch dragging.

### `getMinHandleProps` & `getMaxHandleProps`

This method should be applied to a _handle_ element. It will attach a `ref`, which is used in a mouse & touch movement calculations. It will pass A11y properties to the handle such as `"aria-valuenow"`, `"aria-valuetext"`, `"aria-valuemin"` and `"aria-valuemax"` and binds event handlers to control the value.

> NOTE: Must be attached to the proper handle elements to enable range slider functionality.

### `getMarkerProps`

This method should be applied to a _marker_ element. It will return a `style` property containing positioning info and `isInRange` property which can be used for highlighting the markers if they are in current value range.

> NOTE: Using this prop getter is optional.

#### Required Properties

- `marker: { value: number, label?: string }`
