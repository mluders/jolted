import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';

export default function ColorPicker(props) {
  const { onChange, currentColor } = props;
  const [open, setOpen] = useState(false);

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: currentColor,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (color) => {
    onChange(color.hex);
  };

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      {
        open &&
        <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose }/>
          <SketchPicker
            color={currentColor}
            onChange={ handleChange }
            presetColors={[
            ]}
            disableAlpha />
        </div>
      }
    </div>
  );
}
