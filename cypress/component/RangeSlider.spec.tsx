import React from 'react'
import { mount, unmount } from 'cypress-react-unit-test'

import { TestRangeSlider, ITestRangeSliderProps } from '../helpers/components/RangeSlider'
import '../helpers/components/styles.css'

import { IRangeMarker, KeyCodes } from '../../src/types'

const demoMarkers: IRangeMarker[] = [
  { value: 0 },
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 80 },
  { value: 100 },
]

const demoFormatter = (value: number) => `$${value}`

const mountSlider = (propsOverrides: Partial<ITestRangeSliderProps> = {}) => {
  mount(
    <div className="example-container">
      <TestRangeSlider
        min={0}
        max={100}
        markers={demoMarkers}
        formatValue={demoFormatter}
        {...propsOverrides}
      />
    </div>
  )
}

describe('useRangeSlider', () => {
  afterEach(() => {
    unmount()
  })

  it('should render a self-controlled RangeSlider', () => {
    mountSlider()

    cy.findByTestId('slider-handle-min').as('handle-min')
    cy.findByTestId('slider-handle-max').as('handle-max')

    cy.get('@handle-min').should('have.attr', 'role', 'slider')
    cy.get('@handle-min').should('have.attr', 'aria-valuemin', '0')
    cy.get('@handle-min').should('have.attr', 'aria-valuemax', '100')
    cy.get('@handle-min').should('have.attr', 'aria-valuenow', '0')
    cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$0')

    cy.get('@handle-max').should('have.attr', 'role', 'slider')
    cy.get('@handle-max').should('have.attr', 'aria-valuemin', '0')
    cy.get('@handle-max').should('have.attr', 'aria-valuemax', '100')
    cy.get('@handle-max').should('have.attr', 'aria-valuenow', '100')
    cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$100')

    cy.findByText('$0').should('exist')
    cy.findByText('$20').should('exist')
    cy.findByText('$40').should('exist')
    cy.findByText('$60').should('exist')
    cy.findByText('$80').should('exist')
    cy.findByText('$100').should('exist')
  })

  describe('mouse & touch', () => {
    it('should properly set sliders value based on mouse movement', () => {
      mountSlider()

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-min').trigger('mousedown', { clientX: 0 }).wait(200)

      cy.document().trigger('mousemove', { clientX: 242 }).wait(200)
      cy.document().trigger('mouseup')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '25')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$25')

      cy.get('@handle-max').trigger('mousedown', { clientX: 1000 }).wait(200)

      cy.document().trigger('mousemove', { clientX: 760 }).wait(200)
      cy.document().trigger('mouseup')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '75')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$75')
    })

    it('should properly set sliders value based on touch movement', () => {
      mountSlider()

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      const minTouchStart = [{ clientX: 0, identifier: 1 }]
      const minTouchMove = [{ clientX: 242, identifier: 1 }]

      const maxTouchStart = [{ clientX: 1000, identifier: 1 }]
      const maxTouchMove = [{ clientX: 760, identifier: 1 }]

      cy.get('@handle-min')
        .trigger('touchstart', {
          touches: minTouchStart,
          changedTouches: minTouchStart,
        })
        .wait(200)

      cy.get('@handle-min')
        .trigger('touchmove', {
          touches: minTouchMove,
          changedTouches: minTouchMove,
        })
        .wait(200)
      cy.get('@handle-min').trigger('touchend')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '25')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$25')

      cy.get('@handle-max')
        .trigger('touchstart', {
          touches: maxTouchStart,
          changedTouches: maxTouchStart,
        })
        .wait(200)

      cy.get('@handle-max')
        .trigger('touchmove', {
          touches: maxTouchMove,
          changedTouches: maxTouchMove,
        })
        .wait(200)
      cy.get('@handle-max').trigger('touchend')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '75')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$75')
    })
  })

  describe('keyboard', () => {
    it('should increase slider value by pressing right or up arrow on keyboard', () => {
      mountSlider({ initialValue: [10, 90] })

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.right })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '11')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$11')

      cy.get('@handle-min').trigger('focus').trigger('keydown', { keyCode: KeyCodes.up }).wait(200)

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '12')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$12')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.right })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '91')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$91')

      cy.get('@handle-max').trigger('focus').trigger('keydown', { keyCode: KeyCodes.up }).wait(200)

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '92')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$92')
    })

    it('should decrease slider value by pressing left or down arrow on keyboard', () => {
      mountSlider({ initialValue: [10, 90] })

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.left })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '9')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$9')

      cy.get('@handle-min')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.down })
        .wait(200)

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '8')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$8')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.left })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '89')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$89')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.down })
        .wait(200)

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '88')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$88')
    })

    it('should increase slider value by pressing page down on keyboard', () => {
      mountSlider({ initialValue: [10, 90] })

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.pageUp })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '20')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$20')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.pageUp })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '100')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$100')
    })

    it('should decrease slider value by pressing page up on keyboard', () => {
      mountSlider({ initialValue: [10, 90] })

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.pageDown })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '0')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$0')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.pageDown })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '80')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$80')
    })

    it('should set slider value to max by pressing home on keyboard', () => {
      mountSlider({ initialValue: [10, 90] })

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.home })
        .wait(200)
        // the handle is covered by max handle
        .trigger('blur', { force: true })

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.home })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '100')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$100')
    })

    it('should set slider value to min by pressing end on keyboard', () => {
      mountSlider({ initialValue: [10, 90] })

      cy.findByTestId('slider-handle-min').as('handle-min')
      cy.findByTestId('slider-handle-max').as('handle-max')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '90')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$90')

      cy.get('@handle-max')
        .trigger('focus')
        .trigger('keydown', { keyCode: KeyCodes.end })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-max').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-max').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle-min')
        // the handle is covered by max handle
        .trigger('focus', { force: true })
        .trigger('keydown', { keyCode: KeyCodes.end, force: true })
        .wait(200)
        .trigger('blur')

      cy.get('@handle-min').should('have.attr', 'aria-valuenow', '0')
      cy.get('@handle-min').should('have.attr', 'aria-valuetext', '$0')
    })
  })
})
