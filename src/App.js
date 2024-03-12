import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Popup from './layout/popup/Popup'
import Settings from './layout/settings/Settings'

function App() {
  return (
    <React.Fragment>
        <Routes>
            <Route path="/" element={<Navigate to="/popup" replace />}/>
            <Route path="/popup" element={<Popup/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
    </React.Fragment>
  )
}

export default App
