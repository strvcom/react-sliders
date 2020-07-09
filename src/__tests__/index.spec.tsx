import React from 'react'
import { render } from '@testing-library/react'

import { Thing, IThingProps } from '..'

const renderThing = (propsOverrides: Partial<IThingProps> = {}) => {
  const wrapper = render(<Thing {...propsOverrides}>Hello world!</Thing>)

  return wrapper
}

describe('Thing', () => {
  it('renders without crashing', () => {
    const { getByText } = renderThing()

    getByText('Hello world!')
  })
})
