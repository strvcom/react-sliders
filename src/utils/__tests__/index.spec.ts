import {
  calculatePercentage,
  percentageToValue,
  roundValueToStep,
  clamp,
  isInRange,
  trackMovement,
} from '..'

describe('Range Slider utils', () => {
  describe('calculatePercentage', () => {
    it('should be defined', () => {
      expect(calculatePercentage).toBeDefined()
    })

    it('should calculate percentage based on absolute values', () => {
      const scenarios = [
        {
          input: {
            current: 50,
            min: 0,
            max: 100,
          },
          expected: 50,
        },
        {
          input: {
            current: 75,
            min: 50,
            max: 100,
          },
          expected: 50,
        },
        {
          input: {
            current: 100,
            min: 90,
            max: 100,
          },
          expected: 100,
        },
      ]

      scenarios.forEach((scenario) => {
        expect(calculatePercentage(scenario.input)).toBe(scenario.expected)
      })
    })
  })

  describe('percentageToValue', () => {
    it('should be defined', () => {
      expect(percentageToValue).toBeDefined()
    })

    it('should calculate absolute value from percentage', () => {
      const scenarios = [
        {
          input: {
            percentage: 50,
            min: 0,
            max: 1000,
          },
          expected: 500,
        },
        {
          input: {
            percentage: 50,
            min: 500,
            max: 1000,
          },
          expected: 750,
        },
        {
          input: {
            percentage: 100,
            min: 900,
            max: 1000,
          },
          expected: 1000,
        },
      ]

      scenarios.forEach((scenario) => {
        expect(percentageToValue(scenario.input)).toBe(scenario.expected)
      })
    })
  })

  describe('roundValueToStep', () => {
    it('should be defined', () => {
      expect(roundValueToStep).toBeDefined()
    })

    it('should round value to a step', () => {
      const scenarios = [
        {
          input: {
            value: 0,
            step: 5,
            min: 0,
          },
          expected: 0,
        },
        {
          input: {
            value: 3,
            step: 5,
            min: 0,
          },
          expected: 5,
        },
        {
          input: {
            value: 7,
            step: 5,
            min: 0,
          },
          expected: 5,
        },
        {
          input: {
            value: 14,
            step: 10,
            min: 10,
          },
          expected: 10,
        },
      ]

      scenarios.forEach((scenario) => {
        expect(roundValueToStep(scenario.input)).toBe(scenario.expected)
      })
    })
  })

  describe('clamp', () => {
    it('should be defined', () => {
      expect(clamp).toBeDefined()
    })

    it('should clamp a value into specified boundaries', () => {
      const scenarios = [
        {
          input: {
            value: 15,
            min: 10,
            max: 20,
          },
          expected: 15,
        },
        {
          input: {
            value: 0,
            min: 10,
            max: 20,
          },
          expected: 10,
        },
        {
          input: {
            value: 25,
            min: 10,
            max: 20,
          },
          expected: 20,
        },
      ]

      scenarios.forEach((scenario) => {
        expect(clamp(scenario.input)).toBe(scenario.expected)
      })
    })
  })

  describe('isInRange', () => {
    it('should be defined', () => {
      expect(isInRange).toBeDefined()
    })

    it('should return true when value is in range', () => {
      const scenarios = [
        {
          input: {
            value: 15,
            min: 10,
            max: 20,
          },
          expected: true,
        },
        {
          input: {
            value: 10,
            min: 10,
            max: 20,
          },
          expected: true,
        },
        {
          input: {
            value: 20,
            min: 10,
            max: 20,
          },
          expected: true,
        },
      ]

      scenarios.forEach((scenario) => {
        expect(isInRange(scenario.input)).toBe(scenario.expected)
      })
    })

    it('should return false when value is not in range', () => {
      const scenarios = [
        {
          input: {
            value: 9,
            min: 10,
            max: 20,
          },
          expected: false,
        },
        {
          input: {
            value: 21,
            min: 10,
            max: 20,
          },
          expected: false,
        },
        {
          input: {
            value: 1000000,
            min: 10,
            max: 20,
          },
          expected: false,
        },
      ]

      scenarios.forEach((scenario) => {
        expect(isInRange(scenario.input)).toBe(scenario.expected)
      })
    })
  })

  describe('trackMovement', () => {
    it('should be defined', () => {
      expect(trackMovement).toBeDefined()
    })

    it('should return clientX when Mouse Event is obtained', () => {
      const input = {
        event: new MouseEvent('mousemove', { clientX: 100 }),
      }
      const expected = 100

      expect(trackMovement(input.event, null)).toBe(expected)
    })

    it('should return touch clientX when Touch Event is obtained', () => {
      const input = {
        event: new TouchEvent('touchmove', {
          // @ts-ignore
          changedTouches: [{ clientX: 250, identifier: 1 }],
        }),
        touchId: 1,
      }
      const expected = 250

      expect(trackMovement(input.event, input.touchId)).toBe(expected)
    })
  })
})
