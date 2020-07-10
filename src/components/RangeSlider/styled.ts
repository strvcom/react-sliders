import styled from 'styled-components'

const SliderContainer = styled.div`
  position: relative;
  box-sizing: content-box;
  width: 100%;
  height: 0.3rem;
  padding: 1.1rem 0 2.6rem;

  /* space for marker labels */
  margin-top: 3rem;
`

const SliderRail = styled.span`
  position: absolute;
  display: block;
  width: 100%;
  height: 0.3rem;
  background-color: #cfd7e6;
  border-radius: 0.1rem;
`

const SliderTrack = styled.span`
  position: absolute;
  display: block;
  height: 0.3rem;
  background-color: #0095ff;
  border-radius: 0.1rem;
`

const SliderThumb = styled.span`
  position: absolute;
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  transform: translate3d(-50%, -50%, 0);
  background: #fff;
  box-shadow: 0 0.3rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.13),
    0 0 0 0.1rem rgba(0, 0, 0, 0);
  border-radius: 50%;
  transition: box-shadow 200ms ease-in-out;
  outline: none;

  &:hover,
  &:focus {
    z-index: 2;
    box-shadow: 0 0.3rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.3),
      0 0 0 0.1rem rgba(0, 0, 0, 0.02);
  }

  &:active {
    z-index: 2;
    box-shadow: 0 0.3rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.4),
      0 0 0 0.1rem rgba(0, 0, 0, 0.04);
  }
`

interface ISliderMarkerProps {
  isWithinRange: boolean
}

const SliderMarker = styled.span<ISliderMarkerProps>`
  position: absolute;
  width: 0.2rem;
  height: 0.9rem;
  transform: translate3d(-0.1rem, -0.3rem, 0);
  background-color: ${({ isWithinRange }) => (isWithinRange ? '#0095ff' : '#cfd7e6')};
`

const SliderLabelContainer = styled.div``

const SliderMarkerLabel = styled.span`
  position: absolute;
  min-width: 8rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: #b7becc;
  user-select: none;

  text-align: center;
  transform: translate3d(-50%, -3.2rem, 0);

  &:first-child {
    text-align: left;
    transform: translate3d(0, -3.2rem, 0);
  }

  &:last-child {
    text-align: right;
    transform: translate3d(-100%, -3.2rem, 0);
  }
`

export {
  SliderContainer,
  SliderRail,
  SliderTrack,
  SliderThumb,
  SliderMarker,
  SliderLabelContainer,
  SliderMarkerLabel,
}
