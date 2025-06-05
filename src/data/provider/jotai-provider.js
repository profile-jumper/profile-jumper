import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useDataContext } from '../../context/DataContext'

const profilesAtom = atom([])

export const useProfiles = () => {
    const profiles = useAtomValue(profilesAtom, {
        store: useDataContext()
    })
    const setProfiles = useSetAtom(profilesAtom, {
        store: useDataContext()
    })

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                const result = await chrome.storage.local.get(['profiles'])
                const storedProfiles = result.profiles || []
                setProfiles(storedProfiles)
            } catch (error) {
                console.error('Error loading profiles from chrome.storage.local:', error)
                setProfiles([])
            }
        }

        loadProfiles()
    }, [setProfiles])

    return profiles
}

export const useSetProfiles = () => {
    const setProfiles = useSetAtom(profilesAtom, {
        store: useDataContext()
    })

    return async (newProfiles) => {
        try {
            setProfiles(newProfiles)

            await chrome.storage.local.set({profiles: newProfiles})
        } catch (error) {
            console.error('❌ Error saving profiles to chrome.storage.local:', error)
        }
    }
}