import React, { useState, useEffect } from 'react'
import { BlockTime } from './BlockTime'
import { BlockSwitch } from './BlockSwitch'

import './BlockSetting.css'

export const BlockSetting = ({ onBlockSettingChange, initialBlockData }) => {
    // Initialize state based on initialBlockData
    const [isEnabled, setIsEnabled] = useState(initialBlockData !== null && initialBlockData !== undefined)
    const [startTime, setStartTime] = useState(initialBlockData?.startTime || '06:00')
    const [endTime, setEndTime] = useState(initialBlockData?.endTime || '22:00')

    // Update local state if initialBlockData changes
    useEffect(() => {
        if (initialBlockData) {
            setIsEnabled(true);
            setStartTime(initialBlockData.startTime || '06:00');
            setEndTime(initialBlockData.endTime || '22:00');
        } else {
            setIsEnabled(false);
        }
    }, [initialBlockData]);

    // Track whether this is the first render
    const isFirstRender = React.useRef(true);

    // Only call onBlockSettingChange when values actually change, not on initial render
    useEffect(() => {
        // Skip the first render to prevent state updates during mounting
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Use a small timeout to batch state updates
        const timeoutId = setTimeout(() => {
            if (isEnabled) {
                onBlockSettingChange({
                    startTime,
                    endTime
                });
            } else {
                onBlockSettingChange(null);
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [isEnabled, startTime, endTime, onBlockSettingChange]);

    const handleToggle = () => {
        setIsEnabled(prevState => !prevState)
    }

    // Save changes manually instead of auto-updating
    const handleSave = () => {
        if (isEnabled) {
            onBlockSettingChange({
                startTime,
                endTime
            });
        } else {
            onBlockSettingChange(null);
        }
    };

    return (
        <div className="BlockSettingWrapper">
            <div className="BlockSetting">
                <div className="timeRangeContainer">
                    <BlockTime
                        time={startTime}
                        setTime={(newTime) => {
                            setStartTime(newTime);
                        }}
                    />
                    <span className="toText">to</span>
                    <BlockTime
                        time={endTime}
                        setTime={(newTime) => {
                            setEndTime(newTime);
                        }}
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
