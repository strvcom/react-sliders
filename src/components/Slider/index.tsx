import React from 'react'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderHandle,
  SliderMarkerLabel,
  SliderMarker,
} from '../styled'

import { useSlider } from 'hooks/useSlider'

import { IRangeMarker } from 'types'

export interface ISliderProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void

  step?: number
  markers?: IRangeMarker[]
}

const Slider: React.FC<ISliderProps> = ({ value, min, max, onChange, step, markers }) => {
  const { getRailProps, getTrackProps, getHandleProps, getMarkerProps } = useSlider({
    value,
    min,
    max,
    onChange,
    step,
  })

  return (
    <SliderContainer>
      <SliderRail {...getRailProps()} />
      <SliderTrack data-testid="slider-track" {...getTrackProps()} />

      {markers?.map((marker) => {
        const { style, isInRange } = getMarkerProps(marker)

        return (
          <React.Fragment key={`marker-${marker.label}`}>
            <SliderMarkerLabel style={style}>{marker.label}</SliderMarkerLabel>
            <SliderMarker isInRange={isInRange} style={style} />
          </React.Fragment>
        )
      })}

      <SliderHandle data-testid="slider-handle" {...getHandleProps()} />
    </SliderContainer>
  )
}

export { Slider }
