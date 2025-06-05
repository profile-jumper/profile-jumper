import React, { useState } from 'react'
import { BlockTime } from './BlockTime'
import { BlockSwitch } from './BlockSwitch'

import './BlockSetting.css'

export const BlockSetting = () => {
    const [isEnabled, setIsEnabled] = useState(false)
    const [startTime, setStartTime] = useState('06:00')
    const [endTime, setEndTime] = useState('22:00')

    const handleToggle = () => {
        setIsEnabled(prevState => !prevState)
    }

    return (
        <div className="BlockSettingWrapper">
            <div className="BlockSetting">
                <div className="timeRangeContainer">
                    <BlockTime
                        time={startTime}
                        setTime={setStartTime}
                    />
                    <span className="toText">to</span>
                    <BlockTime
                        time={endTime}
                        setTime={setEndTime}
                    />
                    <BlockSwitch
                        isEnabled={isEnabled}
                        handleToggle={handleToggle}
                    />
                </div>
            </div>
            <div className="spacer-element"></div>
        </div>
    )
}
