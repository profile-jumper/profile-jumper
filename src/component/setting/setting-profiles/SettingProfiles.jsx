import React from 'react'

import { useProfiles, useSetProfiles } from '../../../data/provider/jotai-provider'
import { SettingProfile } from './setting-profile/SettingProfile'

import './SettingProfiles.css'
import { OrderedSettingProfiles } from './ordered-setting-profiles/OrderedSettingProfiles'

export const SettingProfiles = () => {
    const profiles = useProfiles()
    const setProfiles = useSetProfiles()

    const onProfileCreate = (profile) => {
        setProfiles([...profiles, profile])
    }

    const onProfileDelete = (id) => {
        const profilesWithoutDeleted = profiles.filter(profile => profile.id !== id)
        setProfiles(profilesWithoutDeleted)
    }

    const onProfileUpdate = (profile) => {
        const index = profiles.findIndex((p) => p.id === profile.id)
        const copyProfiles = [...profiles]
        copyProfiles[index] = { profile }
        setProfiles(copyProfiles)
    }

    return (
        <div className="SettingsProfilesContainer">
            <OrderedSettingProfiles profiles={profiles}/>
            <SettingProfile key="0" onProfileCreate={ onProfileCreate } primaryInput/>
        </div>
    )
}
