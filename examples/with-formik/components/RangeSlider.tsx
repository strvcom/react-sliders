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
  )
}

export { RangeSlider }
