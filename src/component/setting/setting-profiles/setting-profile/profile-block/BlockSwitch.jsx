import React from 'react'

import './BlockSwitch.css'

export const BlockSwitch = ({ isEnabled, handleToggle }) => {
    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={isEnabled}
                onChange={handleToggle}
            />
            <span className="slider round"></span>
        </label>
    )
}
