import React from 'react'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderThumb,
  SliderMarker,
  SliderLabelContainer,
  SliderMarkerLabel,
} from './styled'

import { useRangeSlider } from 'hooks/useRangeSlider'

import { IRangeMarker, TRangeTuple } from 'types'
import { calculatePercentage, isInRange } from 'utils'

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
  const { getRailProps, getTrackProps, getMinHandleProps, getMaxHandleProps } = useRangeSlider({
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

      <SliderLabelContainer>
        {markers?.map((marker) => {
          const markerPosition = calculatePercentage({ current: marker.value, min, max })

          return (
            <SliderMarkerLabel
              key={`marker-label-${marker.label}`}
              style={{ left: `${markerPosition}%` }}
            >
              {marker.label}
            </SliderMarkerLabel>
          )
        })}
      </SliderLabelContainer>

      {markers?.map((marker) => {
        const markerPosition = calculatePercentage({ current: marker.value, min, max })
        const inRange = isInRange({ value: marker.value, min: value[0], max: value[1] })

        return (
          <SliderMarker
            key={`marker-${marker.label}`}
            isWithinRange={inRange}
            style={{ left: `${markerPosition}%` }}
          />
        )
      })}

      <SliderThumb data-testid="range-min-thumb" {...getMinHandleProps()} />
      <SliderThumb data-testid="range-max-thumb" {...getMaxHandleProps()} />
    </SliderContainer>
  )
}

export { RangeSlider }
