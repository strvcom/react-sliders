import * as React from 'react'
import { useRangeSlider, IRangeMarker, TRangeTuple } from '@strv/react-sliders'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderHandle,
  SliderMarker,
  SliderMarkerLabel,
} from '../styles'
import {
  RangeSliderFieldContainer,
  RangeSliderInputsContainer,
  SliderInput,
} from './RangeSlider.styles'

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

  const handleMinInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.validity.valid) {
        onChange([Number(event.target.value), value[1]])
      }
    },
    [onChange, value]
  )

  const handleMaxInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.validity.valid) {
        onChange([value[0], Number(event.target.value)])
      }
    },
    [onChange, value]
  )

  return (
    <RangeSliderFieldContainer>
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

        <SliderHandle {...getMinHandleProps()} />
        <SliderHandle {...getMaxHandleProps()} />
      </SliderContainer>
      <RangeSliderInputsContainer>
        <SliderInput
          type="number"
          value={value[0]}
          onChange={handleMinInputChange}
          min={min}
          max={value[1]}
          step={step}
        />
        <SliderInput
          type="number"
          value={value[1]}
          onChange={handleMaxInputChange}
          min={value[0]}
          max={max}
          step={step}
        />
      </RangeSliderInputsContainer>
    </RangeSliderFieldContainer>
  )
}

export { RangeSlider }
