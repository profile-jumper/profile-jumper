import React, { useState } from 'react'

import { ColorPicker } from '../../../../color-picker/ColorPicker'

import { DEFAULT_ICON_COLOUR } from '../../../../../config/constants'
import { LibraryIcon } from '../../../../icon/LibraryIcon'
import { useOutsideClick } from '../../../../../hooks/useOutsideClick'

import './SettingProfileIcon.css'

export const SettingProfileIcon = ({ iconName, onColorChange, color = DEFAULT_ICON_COLOUR, block }) => {
    const [showColorPicker, setShowColorPicker] = useState(false)
    const ref = useOutsideClick(() => setShowColorPicker(false))

    const onColorChoose = (color) => {
        onColorChange(color)
        toggleColorPicker()
    }

    const toggleColorPicker = () => setShowColorPicker(!showColorPicker)

    // If profile has block property, override the color with grey at 50% transparency
    const displayColor = block ? 'rgba(128, 128, 128, 0.5)' : color;

    return (
        <div className="SettingProfileIconWrapper">
            <ColorPicker visible={ showColorPicker } onColorChoose={ onColorChoose } defaultColor={ color } ref={ ref }/>
            <LibraryIcon iconName={ iconName } color={ displayColor } className="SettingProfileIcon" onClick={ toggleColorPicker }/>
        </div>
    )
}
