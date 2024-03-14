import { createContext, useContext } from 'react'

import { atom, useAtomValue } from 'jotai'

// todo: this could be farmed out at App creation?
export const AppContext = createContext(null)

const profilesAtom = atom([])

export const getProfiles = () => {
    useAtomValue(profilesAtom, {
        store: useContext(AppContext)
    })
}