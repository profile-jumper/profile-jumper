import React, { useState, useEffect } from 'react'
import { BlockTime } from './BlockTime'
import { BlockSwitch } from './BlockSwitch'

import './BlockSetting.css'

export const BlockSetting = ({ onBlockSettingChange, initialBlockData, isEditing = false }) => {
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
            // When initialBlockData is null, we just set isEnabled to false
            // but still show the component with default times
            setIsEnabled(false);
            // Keep the default times in place
        }
    }, [initialBlockData]);

    // Track whether this is the first render
    const isFirstRender = React.useRef(true);

    // Only update when times change (toggle is handled separately)
    useEffect(() => {
        // Skip the first render to prevent state updates during mounting
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Only update if the switch is enabled and times change
        if (isEnabled) {
            // Use a small timeout to batch state updates
            const timeoutId = setTimeout(() => {
                onBlockSettingChange({
                    startTime,
                    endTime
                });
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [startTime, endTime, onBlockSettingChange, isEnabled]);

    const handleToggle = (newState) => {
        // If newState is provided, use it, otherwise toggle the current state
        const newEnabled = typeof newState === 'boolean' ? newState : !isEnabled;

        // First update the local state
        setIsEnabled(newEnabled);

        // Send the appropriate data changes without affecting visibility
        if (newEnabled) {
            // When enabling, add the block data with current times
            onBlockSettingChange({
                startTime,
                endTime
            });
        } else {
            // When disabling, explicitly set to null to remove block data
            // This directly removes the block data from the profile
            onBlockSettingChange(null);
        }
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
