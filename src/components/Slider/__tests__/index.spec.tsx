import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { Slider, ISliderProps } from '..'

const renderSlider = (propOverrides: Partial<ISliderProps> = {}) => {
  const wrapper = render(
    <Slider min={0} max={100} value={50} onChange={() => {}} {...propOverrides} />
  )

  const getTrackElement = () => {
    return wrapper.getByTestId('slider-track')
  }

  const getThumbElement = () => {
    return wrapper.getByTestId('slider-thumb')
  }

  return {
    ...wrapper,
    getTrackElement,
    getThumbElement,
  }
}

describe('<Slider />', () => {
  it('should be defined', () => {
    expect(Slider).toBeDefined()
  })

  it('should render a Range Slider with properly positioned thumbs and track', async () => {
    const { getTrackElement, getThumbElement } = renderSlider()

    const trackElement = getTrackElement()
    const thumbElement = getThumbElement()

    expect(trackElement).toHaveStyle('width: 50%')
    expect(thumbElement).toHaveStyle('left: 50%')
  })

  it('should render Range Slider markers', () => {
    const { getByText } = renderSlider({
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

      const { getThumbElement } = renderSlider({
        min: 0,
        max: 100,
        value: 0,
        onChange: onChangeSpy,
      })

      const thumbElement = getThumbElement()

      act(() => {
        fireEvent.mouseDown(thumbElement, { clientX: 0 })
        fireEvent.mouseMove(thumbElement, { clientX: 50 })
        fireEvent.mouseUp(thumbElement)
      })

      expect(onChangeSpy).toHaveBeenCalledWith([10, 100])
    })
  })
})
