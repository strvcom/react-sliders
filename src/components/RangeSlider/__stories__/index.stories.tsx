import React from 'react'
import styled from 'styled-components'

import { RangeSlider } from '..'
import { TRangeTuple } from '../../../types'

const useRangeSliderDemo = (initialValues: TRangeTuple = [0, 100]) => {
  const [range, setRange] = React.useState<TRangeTuple>(initialValues)

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
  const [range, setRange] = useRangeSliderDemo()

  return (
    <DemoContainer>
      <RangeSlider value={range} min={0} max={100} onChange={setRange} />
    </DemoContainer>
  )
}

const WithStep = () => {
  const [range, setRange] = useRangeSliderDemo([200, 800])

  return (
    <DemoContainer>
      <RangeSlider value={range} min={0} max={1000} step={100} onChange={setRange} />
    </DemoContainer>
  )
}

const WithMarkers = () => {
  const [range, setRange] = useRangeSliderDemo([30, 70])

  return (
    <DemoContainer>
      <RangeSlider value={range} min={0} max={100} markers={demoMarkers} onChange={setRange} />
      <pre>{JSON.stringify({ values: range }, null, 2)}</pre>
    </DemoContainer>
  )
}

export default { title: 'RangeSlider' }
export { Basic, WithStep, WithMarkers }
