import React from 'react'
import ReactDOM from 'react-dom'
import App from './wheel/App'

document.addEventListener('DOMContentLoaded', () => {
  const packData = document.getElementById('pack-data');
  const { shopId } = packData.dataset;

  ReactDOM.render(
    <App shopId={shopId} />,
    document.body.appendChild(document.createElement('div')),
  )
});
