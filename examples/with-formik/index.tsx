import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useFormik } from 'formik'
import { TRangeTuple } from '@strv/react-sliders'

import { Slider } from './components/Slider'
import { RangeSlider } from './components/RangeSlider'
import { ExampleContainer } from './styles'

const markers = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
]

const exampleFormatter = (value: number) => `$${value}`

interface IFormValues {
  slider: number
  range: TRangeTuple
}

const App = () => {
  const { values, setFieldValue, handleSubmit } = useFormik<IFormValues>({
    initialValues: {
      slider: 0,
      range: [0, 100],
    },
    onSubmit: (formValues) => {
      alert(JSON.stringify(formValues, null, 2))
    },
  })

  return (
    <ExampleContainer>
      <h1>Formik Example</h1>

      <form onSubmit={handleSubmit}>
        <h2>Slider</h2>
        <Slider
          value={values.slider}
          min={0}
          max={100}
          onChange={(value) => setFieldValue('slider', value)}
          markers={markers}
          formatValue={exampleFormatter}
        />

        <h2>Range Slider</h2>
        <RangeSlider
          value={values.range}
          min={0}
          max={100}
          onChange={(value) => setFieldValue('range', value)}
          markers={markers}
          formatValue={exampleFormatter}
        />

        <button type="submit">Submit</button>
      </form>
    </ExampleContainer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
