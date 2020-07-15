// import React from 'react'
// import { render, fireEvent, act } from '@testing-library/react'

// import { Slider, ISliderProps } from '../../components/Slider'

// const renderSlider = (propOverrides: Partial<ISliderProps> = {}) => {
//   const wrapper = render(
//     <Slider min={0} max={100} value={50} onChange={() => {}} {...propOverrides} />
//   )

//   const getTrackElement = () => {
//     return wrapper.getByTestId('slider-track')
//   }

//   const getHandleElement = () => {
//     return wrapper.getByTestId('slider-handle')
//   }

//   return {
//     ...wrapper,
//     getTrackElement,
//     getHandleElement,
//   }
// }

// describe('<Slider />', () => {
//   it('should be defined', () => {
//     expect(Slider).toBeDefined()
//   })

//   it('should render a Range Slider with properly positioned thumbs and track', async () => {
//     const { getTrackElement, getHandleElement } = renderSlider()

//     const trackElement = getTrackElement()
//     const handleElement = getHandleElement()

//     expect(trackElement).toHaveStyle('width: 50%')
//     expect(handleElement).toHaveStyle('left: 50%')
//   })

//   it('should render Range Slider markers', () => {
//     const { getByText } = renderSlider({
//       markers: [
//         { value: 0, label: '$0' },
//         { value: 100, label: '$100' },
//       ],
//     })

//     getByText('$0')
//     getByText('$100')
//   })

//   describe('user interaction', () => {
//     // TODO: find out how to set container size in testing environment
//     it.skip('should trigger onChange with appropriate data when moving with min thumb', () => {
//       const onChangeSpy = jest.fn()

//       const { getHandleElement } = renderSlider({
//         min: 0,
//         max: 100,
//         value: 0,
//         onChange: onChangeSpy,
//       })

//       const handleElement = getHandleElement()

//       act(() => {
//         fireEvent.mouseDown(handleElement, { clientX: 0 })
//         fireEvent.mouseMove(handleElement, { clientX: 50 })
//         fireEvent.mouseUp(handleElement)
//       })

//       expect(onChangeSpy).toHaveBeenCalledWith([10, 100])
//     })
//   })
// })
