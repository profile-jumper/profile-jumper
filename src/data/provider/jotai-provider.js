import { useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { useDataContext } from '../../context/DataContext'

const customLocalStorage = {
    getItem: (key) => {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                console.error('Error parsing data from localStorage:', e);
                return [];
            }
        }
        return [];
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving data to localStorage:', e);
        }
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
};

const profilesAtom = atomWithStorage('profiles', [], customLocalStorage)

export const useProfiles = () => {
    return useAtomValue(profilesAtom, {
        store: useDataContext()
    })
}

export const useSetProfiles = () => {
    return useSetAtom(profilesAtom, {
        store: useDataContext()
    })
}