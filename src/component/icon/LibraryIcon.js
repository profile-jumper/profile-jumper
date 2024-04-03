import React from 'react'

import { findIconInLibraries, obtainExactIconInLibraries } from '../../utility/icon/icon-lib-utility'
import { iconLibraries } from '../../config/iconLibraries'

export const LibraryIcon = ({ name, color, className }) => {
    const DEFAULT_ICON_NAME = 'FaLink'

    const SoughtIcon = findIconInLibraries(name, iconLibraries)

    if(!SoughtIcon) {
        const DefaultIcon = obtainExactIconInLibraries(DEFAULT_ICON_NAME)
        return <DefaultIcon style={ { 'color': color } } className={className} />
    }

    return <SoughtIcon style={ { 'color': color } } className={className} />
}
