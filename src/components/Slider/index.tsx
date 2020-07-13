import React from 'react'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderThumb,
  SliderMarkerLabel,
  SliderMarker,
} from 'components/styled'
import { useSlider } from 'hooks/useSlider'

import { IRangeMarker } from 'types'

interface ISliderProps {
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
          <>
            <SliderMarkerLabel key={`marker-label-${marker.label}`} style={style}>
              {marker.label}
            </SliderMarkerLabel>
            <SliderMarker key={`marker-${marker.label}`} isInRange={isInRange} style={style} />
          </>
        )
      })}

      <SliderThumb data-testid="slider-thumb" {...getHandleProps()} />
    </SliderContainer>
  )
}

export { Slider }
