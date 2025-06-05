import React, { useState } from 'react'

import './BlockSetting.css'

export const BlockSetting = () => {
    const [isEnabled, setIsEnabled] = useState(false)
    const [startTime, setStartTime] = useState('06:00')
    const [endTime, setEndTime] = useState('22:00')

    const handleToggle = () => {
        setIsEnabled(prevState => !prevState)
    }

    return (
        <div className="BlockSetting">
            <div className="timeRangeContainer">
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="timeInput"
                />
                <span className="toText">to</span>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="timeInput"
                />
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={isEnabled}
                        onChange={handleToggle}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}
