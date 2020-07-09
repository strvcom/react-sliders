import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { RangeSlider } from '../.'

const App = () => {
  const [range, setRange] = React.useState([0, 100])

  return (
    <div>
      <RangeSlider value={range} min={0} max={100} onChange={setRange} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
