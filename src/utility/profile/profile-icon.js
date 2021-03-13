import * as SolidIcon from '@fortawesome/free-solid-svg-icons'
import * as BrandIcon from '@fortawesome/free-brands-svg-icons'

import { capitalize } from '../string/string-utility'

const getIconFromLib = (name, IconLib) => {
    for (let key of Object.keys(IconLib)) {
        const keyCapitalize = 'fa' + capitalize(key.replace('fa', ''))
        const soughtName = 'fa' + capitalize(name)
        if(keyCapitalize.includes(soughtName)) return IconLib[key]
    }
    return null
}

const findIncludeBrandMatches = (value) => {
    let matches = []
    for (let key of Object.keys(BrandIcon)) {
        //todo: refactor (notice faB)
        if (key.toLowerCase() === ('fab' || 'prefix')) continue //lower level internals we don't want
        const keyWithoutPrefix = key.replace('fa', '')
        if(value.toLowerCase().includes(keyWithoutPrefix.toLowerCase())) matches.push(keyWithoutPrefix)
    }
    return matches
}

const findIncludeSolidMatches = (value) => {
    let matches = []
    for (let key of Object.keys(SolidIcon)) {
        //todo: refactor (notice faB)
        if (key.toLowerCase() === ('fas' || 'prefix')) continue //lower level internals we don't want
        const keyWithoutPrefix = key.replace('fa', '')
        if(value.toLowerCase().includes(keyWithoutPrefix.toLowerCase())) matches.push(keyWithoutPrefix)
    }
    return matches
}

const sortValuesByLength = function(a, b) {
    return b.length - a.length
}

const brandIconKey = (value) => {
    const matches = findIncludeBrandMatches(value)
    if(matches.length === 1) return matches[0]
    if(matches.length > 1) {
        matches.sort(sortValuesByLength)
        for (let matchResult of matches) {
            if(value.toLowerCase() === matchResult.toLowerCase()) return matchResult
            if(value.toLowerCase().includes(matchResult.toLowerCase())) return matchResult
        }
    }
    return ''
}

const solidIconKey = (value) => {
    const matches = findIncludeSolidMatches(value)
    if(matches.length === 1) return matches[0]
    if(matches.length > 1) {
        matches.sort(sortValuesByLength)
        for (let matchResult of matches) {
            if(value.toLowerCase() === matchResult.toLowerCase()) return matchResult
            if(value.toLowerCase().includes(matchResult.toLowerCase())) return matchResult
        }
    }
    return ''
}

export const findProfileIcon = (name) => {
    const DEFAULT_ICON = SolidIcon.faLink
    if(name === null || name === '' || name.trim() === '') return DEFAULT_ICON

    const brandKey = brandIconKey(name)
    if(brandKey) return getIconFromLib(brandKey, BrandIcon)

    const solidKey = solidIconKey(name)
    if(solidKey) return getIconFromLib(solidKey, SolidIcon)

    return DEFAULT_ICON
}

export const findProfileIconKey = (value) => {
    return brandIconKey(value) || solidIconKey(value) || ''
}

export const smallIconSize = '2x'

export const largeIconSize = '3x'
