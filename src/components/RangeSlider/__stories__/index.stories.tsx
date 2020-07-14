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

const demoMarkers = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]

const Basic = () => {
  const [range, setRange] = useRangeSliderDemo()

  return (
    <DemoContainer>
      <RangeSlider value={range} min={0} max={100} onChange={setRange} />
      <pre>{JSON.stringify({ values: range }, null, 2)}</pre>
    </DemoContainer>
  )
}

const WithStep = () => {
  const [range, setRange] = useRangeSliderDemo([200, 800])

  return (
    <DemoContainer>
      <RangeSlider value={range} min={0} max={1000} step={100} onChange={setRange} />
      <pre>{JSON.stringify({ values: range }, null, 2)}</pre>
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

const WithCustomValueFormat = () => {
  const [range, setRange] = useRangeSliderDemo([30, 70])

  return (
    <DemoContainer>
      <RangeSlider
        value={range}
        min={0}
        max={100}
        markers={demoMarkers}
        onChange={setRange}
        formatValue={(value) => `$${value}`}
      />
      <pre>{JSON.stringify({ values: range }, null, 2)}</pre>
    </DemoContainer>
  )
}

const WithLargeRange = () => {
  const [range, setRange] = useRangeSliderDemo([300000, 700000])

  return (
    <DemoContainer>
      <RangeSlider value={range} min={0} max={1000000} step={1000} onChange={setRange} />
      <pre>{JSON.stringify({ values: range }, null, 2)}</pre>
    </DemoContainer>
  )
}

export default { title: 'RangeSlider' }
export { Basic, WithStep, WithMarkers, WithCustomValueFormat, WithLargeRange }
