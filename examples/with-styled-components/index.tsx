import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TRangeTuple } from '@strv/react-sliders'

import { Slider } from './components/Slider'
import { RangeSlider } from './components/RangeSlider'

const markers = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
]

const exampleFormatter = (value: number) => `$${value}`

const App = () => {
  const [value, setValue] = React.useState(0)
  const [range, setRange] = React.useState<TRangeTuple>([0, 100])

  return (
    <>
      <h1>Styled Components Examples</h1>

      <h2>Slider</h2>
      <Slider
        value={value}
        min={0}
        max={100}
        onChange={setValue}
        markers={markers}
        formatValue={exampleFormatter}
      />

      <h2>Range Slider</h2>
      <RangeSlider
        value={range}
        min={0}
        max={100}
        onChange={setRange}
        markers={markers}
        formatValue={exampleFormatter}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
