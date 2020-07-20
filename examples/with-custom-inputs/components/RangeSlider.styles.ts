import styled from 'styled-components'

const RangeSliderFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const RangeSliderInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const SliderInput = styled.input`
  padding: 16px 8px;
  min-width: 80px;
  font-size: 16px;
`

export { RangeSliderFieldContainer, RangeSliderInputsContainer, SliderInput }
