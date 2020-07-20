import * as React from 'react'
import { useSlider, IRangeMarker } from '@strv/react-sliders'

export interface ISliderProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void

  step?: number
  markers?: IRangeMarker[]
  formatValue?: (value: number) => string
}

const Slider: React.FC<ISliderProps> = ({
  value,
  min,
  max,
  onChange,
  step,
  markers,
  formatValue,
}) => {
  const { getRailProps, getTrackProps, getHandleProps, getMarkerProps } = useSlider({
    value,
    min,
    max,
    onChange,
    step,
    formatValue,
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

export { Slider }
