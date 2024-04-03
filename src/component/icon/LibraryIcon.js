import React from 'react'

import * as faIcons from 'react-icons/fa'
import * as siIcons from 'react-icons/si'

import { findIconInLibraries, obtainExactIconInLibraries } from '../../utility/icon/icon-lib-utility'

const iconLibraries = new Map()
iconLibraries.set('si', siIcons)
iconLibraries.set('fa', faIcons)

export const LibraryIcon = ({ name, color, className }) => {
    const SoughtIcon = findIconInLibraries(name, iconLibraries)

    if(!SoughtIcon) {
        const DefaultIcon = obtainExactIconInLibraries('FaLink')
        return <DefaultIcon style={ { 'color': color } } className={className} />
    }

    return <SoughtIcon style={ { 'color': color } } className={className} />
}
