import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './Store';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    document.getElementById('wheel-form-container'),
  )
});
