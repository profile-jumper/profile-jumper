import { useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { useDataContext } from '../../context/DataContext'

// todo: HUGE HERE -> double check this...
// Create custom storage to ensure proper handling of nested objects including the block property
const customLocalStorage = {
  getItem: (key) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.error('Error parsing data from localStorage:', e);
        return null;
      }
    }
    return null;
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


