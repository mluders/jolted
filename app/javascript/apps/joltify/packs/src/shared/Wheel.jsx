import React from 'react';
import { useSpring, animated } from 'react-spring'
import { easeCubicOut } from 'd3-ease';

import wheelImage from './wheel_image.png';

export default function Wheel() {
  const imageStyle = useSpring({
    transform: 'rotate(0deg)',
    from: {
      transform: 'rotate(-1800deg)',
      height: '100vh',
      left: '-40vh',
      position: 'fixed'
    },
    config: {
      duration: 5000,
      easing: easeCubicOut
    }
  });

  return (
    <animated.img style={imageStyle} src={wheelImage}></animated.img>
  )
}
