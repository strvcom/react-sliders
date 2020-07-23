import React from 'react'

import { useRangeSlider, IUseRangeSlider } from '../../../src/hooks/useRangeSlider'
import { IRangeMarker, TRangeTuple } from '../../../src/types'

import './styles.css'

export interface ITestRangeSliderProps extends Omit<IUseRangeSlider, 'value' | 'onChange'> {
  markers?: IRangeMarker[]
  /**
   * @default 0
   */
  initialValue?: TRangeTuple
}

/**
 * This component exists purely and only as a mountable and configurable wrapper around `useSlider`
 * hook
 */
const TestRangeSlider: React.FC<ITestRangeSliderProps> = ({
  initialValue = [0, 100],
  min,
  max,
  step,
  markers,
  formatValue,
}) => {
  const [value, setValue] = React.useState<TRangeTuple>(initialValue)
  const {
    getRailProps,
    getTrackProps,
    getMinHandleProps,
    getMaxHandleProps,
    getMarkerProps,
  } = useRangeSlider({
    value,
    min,
    max,
    step,
    formatValue,
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

      <span className="slider-handle" data-testid="slider-handle-min" {...getMinHandleProps()} />
      <span className="slider-handle" data-testid="slider-handle-max" {...getMaxHandleProps()} />
    </div>
  )
}

export { TestRangeSlider }
