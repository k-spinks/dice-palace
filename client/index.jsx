import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/style.css'

document.addEventListener('DOMContentLoaded', startApp)
function startApp () {
  const appRoot = createRoot(document.querySelector('#root'))

  appRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
