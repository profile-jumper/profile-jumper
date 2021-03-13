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

const findIconKeyPossibleMatches = (value, IconLib, ignore) => {
    let matches = []
    for (let key of Object.keys(IconLib)) {
        if (key.toLowerCase() === (ignore || 'prefix')) continue //lower level internals we don't want
        const keyWithoutPrefix = key.replace('fa', '')
        if(value.toLowerCase().includes(keyWithoutPrefix.toLowerCase())) matches.push(keyWithoutPrefix)
    }
    return matches
}

const sortValuesByLongestLength = (a, b) => b.length - a.length

const findIconKey = (value, IconLib, ignore) => {
    const matches = findIconKeyPossibleMatches(value, IconLib, ignore)
    if(matches.length === 1) return matches[0]
    if(matches.length > 1) {
        const sortedMatches = [...matches].sort(sortValuesByLongestLength)
        for (let matchResult of sortedMatches) {
            if(value.toLowerCase() === matchResult.toLowerCase()) return matchResult
            if(value.toLowerCase().includes(matchResult.toLowerCase())) return matchResult
        }
    }
    return ''
}

export const findProfileIcon = (name) => {
    const DEFAULT_ICON = SolidIcon.faLink
    if(name === null || name === '' || name.trim() === '') return DEFAULT_ICON

    const brandKey = findIconKey(name, BrandIcon, 'fab')
    if(brandKey) return getIconFromLib(brandKey, BrandIcon)

    const solidKey = findIconKey(name, SolidIcon, 'fas')
    if(solidKey) return getIconFromLib(solidKey, SolidIcon)

    return DEFAULT_ICON
}

export const findProfileIconKey = (value) => {
    return findIconKey(value, BrandIcon, 'fab') || findIconKey(value, SolidIcon, 'fas') || ''
}

export const smallIconSize = '2x'

export const largeIconSize = '3x'
