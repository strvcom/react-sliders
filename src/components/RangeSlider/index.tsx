import React from 'react'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderHandle,
  SliderMarker,
  SliderMarkerLabel,
} from '../styled'

import { useRangeSlider } from 'hooks/useRangeSlider'

import { IRangeMarker, TRangeTuple } from 'types'

export interface IRangeSliderProps {
  value: TRangeTuple
  min: number
  max: number
  onChange: (range: TRangeTuple) => void

  step?: number
  markers?: IRangeMarker[]
}

const RangeSlider: React.FC<IRangeSliderProps> = ({
  value,
  max,
  min,
  onChange = () => {},
  step,
  markers,
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
    <SliderContainer>
      <SliderRail {...getRailProps()} />
      <SliderTrack data-testid="range-slider-track" {...getTrackProps()} />

      {markers?.map((marker) => {
        const { style, isInRange } = getMarkerProps(marker)

        return (
          <React.Fragment key={`marker-${marker.label}`}>
            <SliderMarkerLabel style={style}>{marker.label}</SliderMarkerLabel>
            <SliderMarker isInRange={isInRange} style={style} />
          </React.Fragment>
        )
      })}

      <SliderHandle data-testid="range-slider-min-handle" {...getMinHandleProps()} />
      <SliderHandle data-testid="range-slider-max-handle" {...getMaxHandleProps()} />
    </SliderContainer>
  )
}

export { RangeSlider }
