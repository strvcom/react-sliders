import * as React from 'react'
import { useSlider, IRangeMarker } from '@strv/react-sliders'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderHandle,
  SliderMarkerLabel,
  SliderMarker,
} from '../styles'
import { SliderFieldContainer, SliderInputWrapper, SliderInput } from './Slider.styles'

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

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.validity.valid) {
        onChange(Number(event.target.value))
      }
    },
    [onChange]
  )

  return (
    <SliderFieldContainer>
      <SliderContainer>
        <SliderRail {...getRailProps()} />
        <SliderTrack {...getTrackProps()} />

        {markers?.map((marker) => {
          const { style, isInRange } = getMarkerProps(marker)

          return (
            <React.Fragment key={`marker-${marker.value}`}>
              <SliderMarkerLabel style={style}>
                {marker.label ?? (formatValue ? formatValue(marker.value) : marker.value)}
              </SliderMarkerLabel>
              <SliderMarker isInRange={isInRange} style={style} />
            </React.Fragment>
          )
        })}

        <SliderHandle {...getHandleProps()} />
      </SliderContainer>
      <SliderInputWrapper>
        <SliderInput
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
        />
      </SliderInputWrapper>
    </SliderFieldContainer>
  )
}

export { Slider }
