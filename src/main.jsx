import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import AudioContext from './context/AudioContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioContext>
    <App />
    </AudioContext>
  </React.StrictMode>,
)
