import React from 'react'

import { useSlider, IUseSlider } from '../../../src/hooks/useSlider'
import { IRangeMarker } from '../../../src/types'

import './styles.css'

export interface ITestSliderProps extends Omit<IUseSlider, 'value' | 'onChange'> {
  markers?: IRangeMarker[]
  /**
   * @default 0
   */
  initialValue?: number
}

/**
 * This component exists purely and only as a mountable and configurable wrapper around `useSlider`
 * hook
 */
const TestSlider: React.FC<ITestSliderProps> = ({
  initialValue = 0,
  min,
  max,
  step,
  markers,
  formatValue,
}) => {
  const [value, setValue] = React.useState(initialValue)
  const { getRailProps, getTrackProps, getHandleProps, getMarkerProps } = useSlider({
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

      <span className="slider-handle" {...getHandleProps()} />
    </div>
  )
}

export { TestSlider }
