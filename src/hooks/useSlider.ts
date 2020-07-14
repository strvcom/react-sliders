import React from 'react'

import { KeyCodes, IRangeMarker } from '../types'

import {
  calculatePercentage,
  percentageToValue,
  trackMovement,
  clamp,
  roundValueToStep,
  isInRange,
} from 'utils'

const DEFAULT_STEP = 1

export interface IUseSlider {
  value: number
  min: number
  max: number
  onChange: (value: number) => void

  /**
   * @default 1
   */
  step?: number
  formatValue?: (value: number) => string
}

const useSlider = ({ value, min, max, onChange, step = DEFAULT_STEP, formatValue }: IUseSlider) => {
  const railRef = React.useRef<HTMLSpanElement>(null)
  const trackRef = React.useRef<HTMLSpanElement>(null)
  const thumbRef = React.useRef<HTMLSpanElement>(null)

  const diff = React.useRef<number>(0)
  const touchId = React.useRef<number | null>(null)

  React.useLayoutEffect(() => {
    const valueThumbPercentage = calculatePercentage({ current: value, min, max })

    if (thumbRef.current && trackRef.current) {
      thumbRef.current.style.left = `${valueThumbPercentage}%`
      trackRef.current.style.width = `${valueThumbPercentage}%`
    }
  }, [value, min, max])

  const calculateNewValue = React.useCallback(
    (xPosition: number): number => {
      const newXPosition =
        xPosition - diff.current - (railRef.current?.getBoundingClientRect().left ?? 0)
      const end = (railRef.current?.offsetWidth ?? 0) - (thumbRef.current?.offsetWidth ?? 0)

      const newPercentage = calculatePercentage({ current: newXPosition, min: 0, max: end })

      return percentageToValue({ percentage: newPercentage, min, max })
    },
    [max, min]
  )

  const handleChange = React.useCallback(
    (newValue: number) => {
      let clampedValue = clamp({
        min,
        max,
        value: newValue,
      })

      if (step) {
        clampedValue = roundValueToStep({ value: clampedValue, step, min })
      }

      onChange(clampedValue)
    },
    [max, min, onChange, step]
  )

  const handleMove = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      const newXPosition = trackMovement(event, touchId.current)

      if (newXPosition === null) {
        return
      }

      const newValue = calculateNewValue(newXPosition)
      handleChange(newValue)
    },
    [calculateNewValue, handleChange]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      let newValue = value

      switch (event.keyCode) {
        case KeyCodes.up:
        case KeyCodes.right:
          newValue += step
          break
        case KeyCodes.down:
        case KeyCodes.left:
          newValue -= step
          break

        case KeyCodes.pageUp:
          newValue += step * 10
          break
        case KeyCodes.pageDown:
          newValue -= step * 10
          break

        case KeyCodes.end:
          newValue = min
          break
        case KeyCodes.home:
          newValue = max
          break

        default:
      }

      handleChange(newValue)
    },
    [handleChange, max, min, step, value]
  )

  const handleMouseUp = React.useCallback(() => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      diff.current = event.clientX - (thumbRef.current?.getBoundingClientRect().left ?? 0)

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [handleMouseUp, handleMove]
  )

  const handleTouchEnd = React.useCallback(() => {
    document.removeEventListener('touchmove', handleMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }, [handleMove])

  const handleTouchStart = React.useCallback(
    (event: React.TouchEvent) => {
      const touch = event.touches[0]

      if (touch) {
        // Unique number that identifies the current finger in the touch session
        touchId.current = touch.identifier
      }

      const newXPosition = trackMovement(event.nativeEvent, touchId.current)

      if (newXPosition === null) {
        return
      }

      diff.current = newXPosition - (thumbRef.current?.getBoundingClientRect().left ?? 0)

      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleTouchEnd)
    },
    [handleMove, handleTouchEnd]
  )

  const getTrackProps = React.useCallback(() => {
    return {
      ref: trackRef,
    }
  }, [])

  const getRailProps = React.useCallback(() => {
    return {
      ref: railRef,
    }
  }, [])

  const getHandleProps = React.useCallback(() => {
    return {
      ref: thumbRef,
      role: 'slider',
      tabIndex: 0,
      'aria-valuenow': value,
      'aria-valuetext': formatValue ? formatValue(value) : String(value),
      'aria-valuemin': min,
      'aria-valuemax': max,
      onKeyDown: handleKeyDown,
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    }
  }, [formatValue, handleKeyDown, handleMouseDown, handleTouchStart, max, min, value])

  const getMarkerProps = React.useCallback(
    (marker: IRangeMarker) => {
      const markerPosition = calculatePercentage({ current: marker.value, min, max })

      return {
        style: { left: `${markerPosition}%` },
        isInRange: isInRange({ value: marker.value, min, max: value }),
      }
    },
    [max, min, value]
  )

  return {
    getTrackProps,
    getRailProps,
    getHandleProps,
    getMarkerProps,
  }
}

export { useSlider }
