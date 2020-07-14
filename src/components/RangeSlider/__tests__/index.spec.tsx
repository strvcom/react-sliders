import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { RangeSlider, IRangeSliderProps } from '..'

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

describe('<RangeSlider />', () => {
  it('should be defined', () => {
    expect(RangeSlider).toBeDefined()
  })

  it('should render a Range Slider with properly positioned thumbs and track', async () => {
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

  describe('user interaction', () => {
    // TODO: find out how to set container size in testing environment
    it.skip('should trigger onChange with appropriate data when moving with min thumb', () => {
      const onChangeSpy = jest.fn()

      const { getMinHandleElement } = renderRangeSlider({
        min: 0,
        max: 100,
        value: [0, 100],
        onChange: onChangeSpy,
      })

      const minHandleElement = getMinHandleElement()

      act(() => {
        fireEvent.mouseDown(minHandleElement, { clientX: 0 })
        fireEvent.mouseMove(minHandleElement, { clientX: 50 })
        fireEvent.mouseUp(minHandleElement)
      })

      expect(onChangeSpy).toHaveBeenCalledWith([10, 100])
    })
  })
})
