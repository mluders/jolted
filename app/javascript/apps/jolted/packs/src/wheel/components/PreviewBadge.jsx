import React from 'react';

const style = {
  position: 'fixed',
  textAlign: 'center',
  top: '0',
  left: '0',
  padding: '5px',
  background: '#EE4540',
  color: 'white',
  zIndex: '999999'
}

export default function PreviewBadge() {
  return <p style={style}>Preview Mode</p>
}
