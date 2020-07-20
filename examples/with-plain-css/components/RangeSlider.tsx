import * as React from 'react'
import { useRangeSlider, IRangeMarker, TRangeTuple } from '@strv/react-sliders'

export interface IRangeSliderProps {
  value: TRangeTuple
  min: number
  max: number
  onChange: (range: TRangeTuple) => void

  step?: number
  markers?: IRangeMarker[]
  formatValue?: (value: number) => string
}

const RangeSlider: React.FC<IRangeSliderProps> = ({
  value,
  max,
  min,
  onChange = () => {},
  step,
  markers,
  formatValue,
}) => {
  const {
    getRailProps,
    getTrackProps,
    getMinHandleProps,
    getMaxHandleProps,
    getMarkerProps,
  } = useRangeSlider({
    value,
    max,
    min,
    onChange,
    step,
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

      <span className="slider-handle" {...getMinHandleProps()} />
      <span className="slider-handle" {...getMaxHandleProps()} />
    </div>
  )
}

export { RangeSlider }
