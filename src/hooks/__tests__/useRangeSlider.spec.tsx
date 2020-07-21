import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { useRangeSlider, IUseRangeSlider } from '../useRangeSlider'
import { IRangeMarker } from '../../types'

interface IRangeSliderProps extends IUseRangeSlider {
  markers?: IRangeMarker[]
}

const RangeSlider = ({
  value,
  min,
  max,
  onChange,
  step,
  markers,
  formatValue,
}: IRangeSliderProps) => {
  const {
    getRailProps,
    getTrackProps,
    getMarkerProps,
    getMinHandleProps,
    getMaxHandleProps,
  } = useRangeSlider({ value, min, max, onChange, step, formatValue })

  return (
    <div className="range-slider-container">
      <span className="range-slider-rail" {...getRailProps()} />
      <span className="range-slider-track" data-testid="range-slider-track" {...getTrackProps()} />

      {markers?.map((marker) => {
        const { style } = getMarkerProps(marker)

        return (
          <span key={`marker-${marker.value}`} className="range-slider-marker" style={style}>
            {marker.label ?? (formatValue ? formatValue(marker.value) : marker.value)}
          </span>
        )
      })}

      <span
        className="range-slider-handle"
        data-testid="range-slider-min-handle"
        {...getMinHandleProps()}
      />
      <span
        className="range-slider-handle"
        data-testid="range-slider-max-handle"
        {...getMaxHandleProps()}
      />
    </div>
  )
}

const renderRangeSlider = (propOverrides: Partial<IRangeSliderProps> = {}) => {
  const wrapper = render(
    <RangeSlider min={0} max={100} value={[30, 70]} onChange={() => {}} {...propOverrides} />
  )

  const getTrackElement = () => {
    return wrapper.getByTestId('range-slider-track')
  }

  const getMinHandleElement = () => {
    return wrapper.getByTestId('range-slider-min-handle')
  }

  const getMaxHandleElement = () => {
    return wrapper.getByTestId('range-slider-max-handle')
  }

  return {
    ...wrapper,
    getTrackElement,
    getMinHandleElement,
    getMaxHandleElement,
  }
}

describe('useRangeSlider', () => {
  it('should be defined', () => {
    expect(useRangeSlider).toBeDefined()
  })

  it('should render a Range Slider with properly positioned thumbs and track', () => {
    const { getTrackElement, getMinHandleElement, getMaxHandleElement } = renderRangeSlider()

    const trackElement = getTrackElement()
    const minHandleElement = getMinHandleElement()
    const maxHandleElement = getMaxHandleElement()

    expect(trackElement).toHaveStyle({
      left: '30%',
      width: 'calc(70% - 30%)',
    })
    expect(minHandleElement).toHaveStyle('left: 30%')
    expect(maxHandleElement).toHaveStyle('left: 70%')
  })

  it('should render Range Slider markers', () => {
    const { getByText } = renderRangeSlider({
      markers: [
        { value: 0, label: '$0' },
        { value: 100, label: '$100' },
      ],
    })

    getByText('$0')
    getByText('$100')
  })

  /**
   * ⚠️Warning!
   * We are not able to properly test user interaction in JSDOM environment as we are not able to
   * set the page or client sizes.
   *
   * The recommended way is to use for example Cypress to test such behavior in full browser
   * experience.
   * @see https://github.com/testing-library/react-testing-library/issues/353
   */
  describe('user interaction', () => {
    /**
     * This test is just a naive implementation how the moving logic should be tested, unfortunately
     * given the reasons mentioned above, this case is not reliable
     */
    it('should trigger onChange with appropriate data when moving with min thumb', () => {
      const onChangeSpy = jest.fn()

      const { container, getMinHandleElement } = renderRangeSlider({
        min: 0,
        max: 100,
        value: [0, 100],
        onChange: onChangeSpy,
      })

      const handleElement = getMinHandleElement()

      act(() => {
        fireEvent.mouseDown(handleElement, { clientX: 0 })
        fireEvent.mouseMove(container, { clientX: 100 })
        fireEvent.mouseUp(container)
      })

      expect(onChangeSpy).toHaveBeenCalledWith([100, 100])
    })
  })
})
