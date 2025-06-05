import React from 'react'
import { LibraryIcon } from '../../../../icon/LibraryIcon'

import './BlockIcon.css'

export const BlockIcon = ({onBlock}) => {
    return (
        <div className="BlockIconContainer" onClick={onBlock} title="Block website">
            <LibraryIcon 
                iconName="SiAdblock"
                color="lightgray"
                className="BlockIcon"
                onClick={onBlock}
            />
        </div>
    )
}
