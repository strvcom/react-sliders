import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { RangeSlider, IRangeSlider } from '..'

const renderRangeSlider = (propOverrides: Partial<IRangeSlider> = {}) => {
  const wrapper = render(
    <RangeSlider min={0} max={100} value={[30, 70]} onChange={() => {}} {...propOverrides} />
  )

  const getTrackElement = () => {
    return wrapper.getByTestId('range-track')
  }

  const getMinThumbElement = () => {
    return wrapper.getByTestId('range-min-thumb')
  }

  const getMaxThumbElement = () => {
    return wrapper.getByTestId('range-max-thumb')
  }

  return {
    ...wrapper,
    getTrackElement,
    getMinThumbElement,
    getMaxThumbElement,
  }
}

describe('<RangeSlider />', () => {
  it('should be defined', () => {
    expect(RangeSlider).toBeDefined()
  })

  it('should render a Range Slider with properly positioned thumbs and track', async () => {
    const { getTrackElement, getMinThumbElement, getMaxThumbElement } = renderRangeSlider()

    const trackElement = getTrackElement()
    const minThumbElement = getMinThumbElement()
    const maxThumbElement = getMaxThumbElement()

    expect(trackElement).toHaveStyle({
      left: '30%',
      width: 'calc(70% - 30%)',
    })
    expect(minThumbElement).toHaveStyle('left: 30%')
    expect(maxThumbElement).toHaveStyle('left: 70%')
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

      const { getMinThumbElement } = renderRangeSlider({
        min: 0,
        max: 100,
        value: [0, 100],
        onChange: onChangeSpy,
      })

      const minThumbElement = getMinThumbElement()

      act(() => {
        fireEvent.mouseDown(minThumbElement, { clientX: 0 })
        fireEvent.mouseMove(minThumbElement, { clientX: 50 })
        fireEvent.mouseUp(minThumbElement)
      })

      expect(onChangeSpy).toHaveBeenCalledWith([10, 100])
    })
  })
})
