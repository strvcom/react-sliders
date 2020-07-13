import React from 'react'
import styled from 'styled-components'

import { Slider } from '..'

const useSliderDemo = (initialValue = 0) => {
  const [range, setRange] = React.useState<number>(initialValue)

  return [range, setRange] as const
}

const DemoContainer = styled.div`
  margin-top: 10rem;
  padding: 0 5rem;
`

const demoMarkers = [
  { label: '$0', value: 0 },
  { label: '$25', value: 25 },
  { label: '$50', value: 50 },
  { label: '$75', value: 75 },
  { label: '$100', value: 100 },
]

const Basic = () => {
  const [value, setValue] = useSliderDemo()

  return (
    <DemoContainer>
      <Slider value={value} min={0} max={100} onChange={setValue} />
      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </DemoContainer>
  )
}

const WithStep = () => {
  const [value, setValue] = useSliderDemo(50)

  return (
    <DemoContainer>
      <Slider value={value} min={0} max={1000} step={100} onChange={setValue} />
      <pre>{JSON.stringify({ values: value }, null, 2)}</pre>
    </DemoContainer>
  )
}

const WithMarkers = () => {
  const [value, setValue] = useSliderDemo(50)

  return (
    <DemoContainer>
      <Slider value={value} min={0} max={100} markers={demoMarkers} onChange={setValue} />
      <pre>{JSON.stringify({ values: value }, null, 2)}</pre>
    </DemoContainer>
  )
}

export default { title: 'Slider' }
export { Basic, WithStep, WithMarkers }
