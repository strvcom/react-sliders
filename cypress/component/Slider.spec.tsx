import React from 'react'
import { mount } from 'cypress-react-unit-test'

import { TestSlider } from '../fixtures/components/Slider'
import '../fixtures/components/styles.css'

describe('useSlider', () => {
  it('renders a controlled Slider', () => {
    mount(
      <div className="example-container">
        <TestSlider />
      </div>
    )

    cy.get('.slider-handle').trigger('mousedown', { clientX: 0 }).wait(500)

    cy.document().trigger('mousemove', { clientX: 500 }).wait(150)

    cy.document().trigger('mouseup')
  })
})
