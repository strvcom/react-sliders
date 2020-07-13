import React from 'react'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderThumb,
  SliderMarker,
  SliderMarkerLabel,
} from './styled'

import { useRangeSlider } from 'hooks/useRangeSlider'

import { IRangeMarker, TRangeTuple } from 'types'

export interface IRangeSlider {
  value: TRangeTuple
  min: number
  max: number
  onChange: (range: TRangeTuple) => void

  step?: number
  markers?: IRangeMarker[]
}

const RangeSlider: React.FC<IRangeSlider> = ({
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
      <SliderTrack data-testid="range-track" {...getTrackProps()} />

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

      <SliderThumb data-testid="range-min-thumb" {...getMinHandleProps()} />
      <SliderThumb data-testid="range-max-thumb" {...getMaxHandleProps()} />
    </SliderContainer>
  )
}

export { RangeSlider }
