import React from 'react'

import { TRangeTuple, IRangeMarker } from '../../types'

import {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderThumb,
  SliderMarker,
  SliderLabelContainer,
  SliderMarkerLabel,
} from './styled'
import {
  calculatePercentage,
  percentageToValue,
  roundValueToStep,
  clamp,
  trackMovement,
  isInRange,
} from './utils'

export interface IRangeSlider {
  value: TRangeTuple
  min: number
  max: number
  onChange: (range: TRangeTuple) => void

  step?: number
  markers?: IRangeMarker[]
}

const RangeSlider: React.FC<IRangeSlider> = ({
  value: [minValue, maxValue],
  max,
  min,
  onChange = () => {},
  step,
  markers,
}) => {
  const railRef = React.useRef<HTMLSpanElement>(null)
  const trackRef = React.useRef<HTMLSpanElement>(null)
  const minThumbRef = React.useRef<HTMLSpanElement>(null)
  const maxThumbRef = React.useRef<HTMLSpanElement>(null)

  const activeHandle = React.useRef<'min' | 'max' | null>(null)
  const diff = React.useRef<number>(0)
  const touchId = React.useRef<number>()

  React.useLayoutEffect(() => {
    const minThumbPercentage = calculatePercentage({ current: minValue, min, max })
    const maxThumbPercentage = calculatePercentage({ current: maxValue, min, max })

    if (minThumbRef.current && maxThumbRef.current && trackRef.current) {
      minThumbRef.current.style.left = `${minThumbPercentage}%`
      maxThumbRef.current.style.left = `${maxThumbPercentage}%`
      trackRef.current.style.left = `${minThumbPercentage}%`
      trackRef.current.style.width = `calc(${maxThumbPercentage}% - ${minThumbPercentage}%)`
    }
  }, [minValue, maxValue, min, max])

  const calculateNewValue = (xPosition: number): number => {
    const activeHandleRef = activeHandle.current === 'min' ? minThumbRef : maxThumbRef

    const newXPosition =
      xPosition - diff.current - (railRef.current?.getBoundingClientRect().left ?? 0)
    const end = (railRef.current?.offsetWidth ?? 0) - (activeHandleRef.current?.offsetWidth ?? 0)

    const newPercentage = calculatePercentage({ current: newXPosition, min: 0, max: end })

    return percentageToValue({ percentage: newPercentage, min, max })
  }

  const handleMove = (event: MouseEvent | TouchEvent) => {
    const newXPosition = trackMovement(event, touchId.current)

    if (newXPosition === null) {
      return
    }

    const newValue = calculateNewValue(newXPosition)

    let clampedValue = clamp({
      value: newValue,
      min: activeHandle.current === 'min' ? min : minValue,
      max: activeHandle.current === 'max' ? max : maxValue,
    })
    if (step) {
      clampedValue = roundValueToStep({ value: clampedValue, step, min })
    }

    onChange(activeHandle.current === 'min' ? [clampedValue, maxValue] : [minValue, clampedValue])
  }

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMove)

    activeHandle.current = null
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    const activeHandleRef = activeHandle.current === 'min' ? minThumbRef : maxThumbRef
    diff.current = event.clientX - (activeHandleRef.current?.getBoundingClientRect().left ?? 0)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchEnd = () => {
    document.removeEventListener('touchmove', handleMove)
    document.removeEventListener('touchend', handleTouchEnd)

    activeHandle.current = null
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]

    if (touch) {
      // Unique number that identifies the current finger in the touch session
      touchId.current = touch.identifier
    }

    const newXPosition = trackMovement(event.nativeEvent, touchId.current)

    if (newXPosition === null) {
      return
    }

    const activeHandleRef = activeHandle.current === 'min' ? minThumbRef : maxThumbRef
    diff.current = newXPosition - (activeHandleRef.current?.getBoundingClientRect().left ?? 0)

    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <SliderContainer>
      <SliderRail ref={railRef} />
      <SliderTrack ref={trackRef} data-testid="range-track" />

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
        const inRange = isInRange({ value: marker.value, min: minValue, max: maxValue })

        return (
          <SliderMarker
            key={`marker-${marker.label}`}
            isWithinRange={inRange}
            style={{ left: `${markerPosition}%` }}
          />
        )
      })}

      <SliderThumb
        ref={minThumbRef}
        role="slider"
        data-testid="range-min-thumb"
        onMouseDown={(event) => {
          activeHandle.current = 'min'
          handleMouseDown(event)
        }}
        onTouchStart={(event) => {
          activeHandle.current = 'min'
          handleTouchStart(event)
        }}
      />
      <SliderThumb
        ref={maxThumbRef}
        role="slider"
        data-testid="range-max-thumb"
        onMouseDown={(event) => {
          activeHandle.current = 'max'
          handleMouseDown(event)
        }}
        onTouchStart={(event) => {
          activeHandle.current = 'max'
          handleTouchStart(event)
        }}
      />
    </SliderContainer>
  )
}

export { RangeSlider }
