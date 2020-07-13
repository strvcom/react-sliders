interface IGetPercentage {
  current: number
  min: number
  max: number
}

const calculatePercentage = ({ current, min, max }: IGetPercentage): number =>
  ((current - min) / (max - min)) * 100

interface IGetValue {
  percentage: number
  min: number
  max: number
}

const percentageToValue = ({ percentage, min, max }: IGetValue) =>
  ((max - min) / 100) * percentage + min

const getDecimalPrecision = (num: number): number => {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-')
    const matissaDecimalPart = parts[0].split('.')[1]

    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10)
  }

  const decimalPart = num.toString().split('.')[1]

  return decimalPart ? decimalPart.length : 0
}

interface IRoundValueToStep {
  value: number
  step: number
  min: number
}

const roundValueToStep = ({ value, step, min }: IRoundValueToStep): number => {
  const nearest = Math.round((value - min) / step) * step + min

  return Number(nearest.toFixed(getDecimalPrecision(step)))
}

interface IClamp {
  value: number
  min: number
  max: number
}

const clamp = ({ value, min, max }: IClamp) => {
  return Math.max(min, Math.min(value, max))
}

interface IIsInRange {
  value: number
  min: number
  max: number
}

const isInRange = ({ value, min, max }: IIsInRange) => {
  return value >= min && value <= max
}

const trackMovement = (event: TouchEvent | MouseEvent, touchId: number | null): number | null => {
  // Check if event is Touch Event
  if (touchId !== undefined && 'changedTouches' in event) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i]

      if (touch.identifier === touchId) {
        return touch.clientX
      }
    }

    return null
  }

  // Mouse Event
  return (event as MouseEvent).clientX
}

export { calculatePercentage, percentageToValue, roundValueToStep, clamp, isInRange, trackMovement }
