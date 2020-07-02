import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const packData = document.getElementById('pack-data');
  const { shopId, isPreview } = packData.dataset;

  ReactDOM.render(
    <App shopId={shopId} isPreview={isPreview == 'true'} />,
    document.body.appendChild(document.createElement('div')),
  )
});
