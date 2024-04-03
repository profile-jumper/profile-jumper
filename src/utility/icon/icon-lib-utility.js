import { hasValue, isSame } from '../string/string-utility'

export const obtainExactIconInLibraries = (name, iconLibraries) => {
    const ICON_NOT_FOUND = undefined
    if (!hasValue(name)) return ICON_NOT_FOUND
    const libKey = name.substring(0, 2).toLowerCase()
    const iconLib = iconLibraries.get(libKey)
    if (!iconLib) return ICON_NOT_FOUND
    return iconLib[name]
}

export const findIconInLibraries = (name, iconLibraries) => {
    const foundIcons = []
    for (const [key, lib] of iconLibraries.entries()) {
        const iconFound = findIconInLibrary(name, lib, key)
        if (iconFound) foundIcons.push(iconFound)
    }
    return (foundIcons.length === 0) ? undefined : foundIcons[0]
}

const findIconInLibrary = (name, iconLib, libKey) => {
    const libKeyLen = libKey.length
    for (let libIconName of Object.keys(iconLib)) {
        const libIconNameNormed = libIconName.substring(libKeyLen)
        if (isSame(libIconNameNormed, name)) return iconLib[libIconName]
    }
}

export const findIconForUrl = (url, iconLibraries) => {
    // todo: need to have default!
    const urlScrubbed = scrubUrlParts(url)
    return findIconInLibraries(urlScrubbed, iconLibraries)
}

const scrubUrlParts = (url) => {
    const urlWithoutPreAndTldPartsRegex = /^(http|s|:|\/)*|(\.\w+)$/gi
    return url.replace(urlWithoutPreAndTldPartsRegex, '').trim()
}
