import React from 'react'

import { useSlider } from '../../../src/hooks/useSlider'
import { IRangeMarker } from '../../../src/types'

import './styles.css'

const markers: IRangeMarker[] = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
]

const formatValue = (number) => `$${number}`

const TestSlider: React.FC = () => {
  const [value, setValue] = React.useState(0)
  const { getRailProps, getTrackProps, getHandleProps, getMarkerProps } = useSlider({
    value,
    formatValue,
    min: 0,
    max: 100,
    onChange: setValue,
  })

  return (
    <div className="slider-container">
      <span className="slider-rail" {...getRailProps()} />
      <span className="slider-track" {...getTrackProps()} />

      {markers?.map((marker) => {
        const { style, isInRange } = getMarkerProps(marker)

        return (
          <React.Fragment key={`marker-${marker.value}`}>
            <span className="slider-marker-label" style={style}>
              {marker.label ?? (formatValue ? formatValue(marker.value) : marker.value)}
            </span>
            <span
              className={`slider-marker ${isInRange && 'slider-marker__in-range'}`.trim()}
              style={style}
            />
          </React.Fragment>
        )
      })}

      <span className="slider-handle" {...getHandleProps()} />
    </div>
  )
}

export { TestSlider }
