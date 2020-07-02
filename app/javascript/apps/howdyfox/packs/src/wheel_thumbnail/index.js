import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const packData = document.getElementById('pack-data');
  const wheel = JSON.parse(packData.dataset.wheel);

  ReactDOM.render(
    <App wheel={wheel} />,
    document.getElementById('wheel-thumbnail-container')
  )
});
