import React from 'react'
import { mount, unmount } from 'cypress-react-unit-test'

import { TestSlider, ITestSliderProps } from '../fixtures/components/Slider'
import '../fixtures/components/styles.css'

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

const mountSlider = (propsOverrides: Partial<ITestSliderProps> = {}) => {
  mount(
    <div className="example-container">
      <TestSlider
        min={0}
        max={100}
        markers={demoMarkers}
        formatValue={demoFormatter}
        {...propsOverrides}
      />
    </div>
  )
}

const WINDOW_SIZE = 1000
const MARGIN = 32
const HANDLE_OFFSET = 12
const MIDDLE_X = WINDOW_SIZE / 2 - MARGIN - HANDLE_OFFSET

describe('useSlider', () => {
  afterEach(() => {
    unmount()
  })

  it('should render a self-controlled Slider', () => {
    mountSlider()

    cy.get('.slider-handle').as('handle')

    cy.get('@handle').should('have.attr', 'role', 'slider')
    cy.get('@handle').should('have.attr', 'aria-valuemin', '0')
    cy.get('@handle').should('have.attr', 'aria-valuemax', '100')
    cy.get('@handle').should('have.attr', 'aria-valuenow', '0')
    cy.get('@handle').should('have.attr', 'aria-valuetext', '$0')

    cy.findByText('$0').should('exist')
    cy.findByText('$20').should('exist')
    cy.findByText('$40').should('exist')
    cy.findByText('$60').should('exist')
    cy.findByText('$80').should('exist')
    cy.findByText('$100').should('exist')
  })

  describe('mouse & touch', () => {
    it('should properly set slider value based on mouse movement', () => {
      mountSlider()

      cy.get('.slider-handle').as('handle')

      cy.get('@handle').trigger('mousedown', { clientX: 0 }).wait(200)

      cy.document().trigger('mousemove', { clientX: MIDDLE_X }).wait(200)
      cy.document().trigger('mouseup')

      cy.get('@handle').should('have.attr', 'aria-valuenow', '50')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$50')
    })

    it('should properly set slider value based on touch movement', () => {
      mountSlider()

      cy.get('.slider-handle').as('handle')

      const touchStart = [{ clientX: 0, identifier: 1 }]
      const touchMove = [{ clientX: MIDDLE_X, identifier: 1 }]

      cy.get('@handle')
        .trigger('touchstart', {
          touches: touchStart,
          changedTouches: touchStart,
        })
        .wait(200)

      cy.get('@handle')
        .trigger('touchmove', {
          touches: touchMove,
          changedTouches: touchMove,
        })
        .wait(200)
      cy.get('@handle').trigger('touchend')

      cy.get('@handle').should('have.attr', 'aria-valuenow', '50')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$50')
    })
  })

  describe('keyboard', () => {
    it('should increase slider value by pressing right or up arrow on keyboard', () => {
      mountSlider()

      cy.get('.slider-handle').as('handle')

      cy.get('@handle').should('have.attr', 'aria-valuenow', '0')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$0')

      cy.get('@handle').trigger('focus').trigger('keydown', { keyCode: KeyCodes.right }).wait(200)

      cy.get('@handle').should('have.attr', 'aria-valuenow', '1')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$1')

      cy.get('@handle').trigger('focus').trigger('keydown', { keyCode: KeyCodes.up }).wait(200)

      cy.get('@handle').should('have.attr', 'aria-valuenow', '2')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$2')
    })

    it('should decrease slider value by pressing left or down arrow on keyboard', () => {
      mountSlider({ initialValue: 10 })

      cy.get('.slider-handle').as('handle')

      cy.get('@handle').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$10')

      cy.get('@handle').trigger('focus').trigger('keydown', { keyCode: KeyCodes.left }).wait(200)

      cy.get('@handle').should('have.attr', 'aria-valuenow', '9')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$9')

      cy.get('@handle').trigger('focus').trigger('keydown', { keyCode: KeyCodes.down }).wait(200)

      cy.get('@handle').should('have.attr', 'aria-valuenow', '8')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$8')
    })

    it('should increase slider value by pressing page down on keyboard', () => {
      mountSlider()

      cy.get('.slider-handle').as('handle')

      cy.get('@handle').should('have.attr', 'aria-valuenow', '0')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$0')

      cy.get('@handle').trigger('focus').trigger('keydown', { keyCode: KeyCodes.pageUp }).wait(200)

      cy.get('@handle').should('have.attr', 'aria-valuenow', '10')
      cy.get('@handle').should('have.attr', 'aria-valuetext', '$10')
    })

    it.skip('should decrease slider value by pressing page up on keyboard', () => {})
    it.skip('should set slider value to max by pressing end on keyboard', () => {})
    it.skip('should set slider value to min by pressing home on keyboard', () => {})
  })
})
