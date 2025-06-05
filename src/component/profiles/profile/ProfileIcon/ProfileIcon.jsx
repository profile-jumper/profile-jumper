import React from 'react'

import { DEFAULT_ICON_COLOUR } from '../../../../config/constants'
import { LibraryIcon } from '../../../icon/LibraryIcon'

import './ProfileIcon.css'

export const ProfileIcon = ({ iconName, color = DEFAULT_ICON_COLOUR, block }) => {
    // If profile has block property, override the color with grey at 50% transparency
    const displayColor = block ? 'rgba(128, 128, 128, 0.5)' : color;

    return (
        <LibraryIcon iconName={ iconName } color={displayColor} className="ProfileIcon" />
    );
}
