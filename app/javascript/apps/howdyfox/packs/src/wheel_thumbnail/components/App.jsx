import React from 'react';
import SimpleWheel from '../../shared/components/SimpleWheel';

export default function App(props) {
  const { wheel } = props;
  console.log(wheel);

  return (
    <SimpleWheel
      segments={wheel.wheel_segments}
      backgroundColor={wheel.popup_background_color}
      wheelBaseColor={wheel.wheel_base_color}
      colorizeWheel={wheel.colorize_wheel}
    />
  );
}
