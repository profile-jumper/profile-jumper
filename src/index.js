import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import './index.css'

import App from './App';

const app= (
    <HashRouter>
        <App />
    </HashRouter>
)

createRoot(document.getElementById('root')).render(app)
