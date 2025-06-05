import React from 'react'
import { LibraryIcon } from '../../../../icon/LibraryIcon'

import './BlockIcon.css'

export const BlockIcon = ({onBlock, isEnabled}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        onBlock();
    };

    return (
        <div className="BlockIconContainer" onClick={handleClick} title="Block website">
            <LibraryIcon 
                iconName="SiAdblock"
                color={isEnabled ? "red" : "lightgray"}
                className="BlockIcon"
                onClick={handleClick}
            />
        </div>
    )
}
