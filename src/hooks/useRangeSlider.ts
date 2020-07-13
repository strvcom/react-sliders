import React from 'react'

import { TRangeTuple, KeyCodes, IRangeMarker } from '../types'

import {
  calculatePercentage,
  percentageToValue,
  trackMovement,
  clamp,
  roundValueToStep,
  isInRange,
} from 'utils'

const DEFAULT_STEP = 1

export interface IUseRangeSlider {
  value: TRangeTuple
  min: number
  max: number
  onChange: (range: TRangeTuple) => void

  /**
   * @default 1
   */
  step?: number
}

const useRangeSlider = ({
  value: [minValue, maxValue],
  min,
  max,
  onChange,
  step = DEFAULT_STEP,
}: IUseRangeSlider) => {
  const railRef = React.useRef<HTMLSpanElement>(null)
  const trackRef = React.useRef<HTMLSpanElement>(null)
  const minThumbRef = React.useRef<HTMLSpanElement>(null)
  const maxThumbRef = React.useRef<HTMLSpanElement>(null)

  const activeHandle = React.useRef<'min' | 'max' | null>(null)
  const diff = React.useRef<number>(0)
  const touchId = React.useRef<number | null>(null)

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

  const calculateNewValue = React.useCallback(
    (xPosition: number): number => {
      const activeHandleRef = activeHandle.current === 'min' ? minThumbRef : maxThumbRef

      const newXPosition =
        xPosition - diff.current - (railRef.current?.getBoundingClientRect().left ?? 0)
      const end = (railRef.current?.offsetWidth ?? 0) - (activeHandleRef.current?.offsetWidth ?? 0)

      const newPercentage = calculatePercentage({ current: newXPosition, min: 0, max: end })

      return percentageToValue({ percentage: newPercentage, min, max })
    },
    [max, min]
  )

  const handleChange = React.useCallback(
    (newValue: number) => {
      let clampedValue = clamp({
        value: newValue,
        min: activeHandle.current === 'min' ? min : minValue,
        max: activeHandle.current === 'max' ? max : maxValue,
      })

      if (step) {
        clampedValue = roundValueToStep({ value: clampedValue, step, min })
      }

      onChange(activeHandle.current === 'min' ? [clampedValue, maxValue] : [minValue, clampedValue])
    },
    [max, maxValue, min, minValue, onChange, step]
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
      if (!activeHandle.current) {
        return
      }

      let newValue = activeHandle.current === 'min' ? minValue : maxValue

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
          newValue = activeHandle.current === 'min' ? min : minValue
          break
        case KeyCodes.home:
          newValue = activeHandle.current === 'min' ? maxValue : max
          break

        default:
      }

      handleChange(newValue)
    },
    [handleChange, max, maxValue, min, minValue, step]
  )

  const handleMouseUp = React.useCallback(() => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      const activeHandleRef = activeHandle.current === 'min' ? minThumbRef : maxThumbRef
      diff.current = event.clientX - (activeHandleRef.current?.getBoundingClientRect().left ?? 0)

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

      const activeHandleRef = activeHandle.current === 'min' ? minThumbRef : maxThumbRef
      diff.current = newXPosition - (activeHandleRef.current?.getBoundingClientRect().left ?? 0)

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

  const getMinHandleProps = React.useCallback(() => {
    return {
      ref: minThumbRef,
      role: 'slider',
      tabIndex: 0,
      'aria-valuemin': min,
      'aria-valuenow': minValue,
      'aria-valuemax': maxValue,
      onFocus: () => {
        activeHandle.current = 'min'
      },
      onBlur: () => {
        activeHandle.current = null
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        handleKeyDown(event)
      },
      onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
        activeHandle.current = 'min'
        handleMouseDown(event)
      },
      onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
        activeHandle.current = 'min'
        handleTouchStart(event)
      },
    }
  }, [handleKeyDown, handleMouseDown, handleTouchStart, maxValue, min, minValue])

  const getMaxHandleProps = React.useCallback(() => {
    return {
      ref: maxThumbRef,
      role: 'slider',
      tabIndex: 0,
      'aria-valuemin': minValue,
      'aria-valuenow': maxValue,
      'aria-valuemax': max,
      onFocus: () => {
        activeHandle.current = 'max'
      },
      onBlur: () => {
        activeHandle.current = null
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        handleKeyDown(event)
      },
      onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
        activeHandle.current = 'max'
        handleMouseDown(event)
      },
      onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
        activeHandle.current = 'max'
        handleTouchStart(event)
      },
    }
  }, [handleKeyDown, handleMouseDown, handleTouchStart, max, maxValue, minValue])

  const getMarkerProps = React.useCallback(
    (marker: IRangeMarker) => {
      const markerPosition = calculatePercentage({ current: marker.value, min, max })

      return {
        style: { left: `${markerPosition}%` },
        isInRange: isInRange({ value: marker.value, min: minValue, max: maxValue }),
      }
    },
    [max, maxValue, min, minValue]
  )

  return {
    getTrackProps,
    getRailProps,
    getMinHandleProps,
    getMaxHandleProps,
    getMarkerProps,
  }
}

export { useRangeSlider }
