import * as faIcons from 'react-icons/fa'
import * as siIcons from 'react-icons/si'

export const Icon = ({ name, color, className }) => {

    const obtainIcon = (iconName) => {
        const iconsLibrary = new Map()
        iconsLibrary.set('Fa', faIcons)
        iconsLibrary.set('Si', siIcons)
        return iconsLibrary.get(iconName.substring(0, 2))
    }

    const icons = obtainIcon(name)
    const SpecificIcon = icons[name]

    return <SpecificIcon style={ { 'color': color } } className={className} />
}
