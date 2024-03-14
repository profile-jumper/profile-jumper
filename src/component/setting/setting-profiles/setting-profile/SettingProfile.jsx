import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PROFILE_URL, ProfileUrl } from './profile-url/ProfileUrl'
import { PROFILE_TITLE, ProfileTitle } from './profile-title/ProfileTitle'
import { ProfileIcon } from './profile-icon/ProfileIcon'
import * as profileIconUtility from '../../../../utility/profile/profile-icon-utility'
import { ProfileAdd } from './profile-add/ProfileAdd'
import { ProfileRemove } from './profile-remove/ProfileRemove'
import { isEntityEmpty } from '../../../../utility/entity/entity-utility'
import { generateUniqueId } from '../../../../utility/identifier/id-utility'

import './SettingProfile.css'

export const SettingProfile = ({ profile, onProfileCreate, onProfileRemove, primaryInput }) => {
    const [profileIconName, setProfileIconName] = useState(profile?.icon || '')

    console.log('profile', profile)

    const { register, watch, reset, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            id: profile?.id,
            profileUrl: profile?.url,
            profileTitle: profile?.title
        }
    })

    useEffect(() => {
        const subscription = watch((formValue, { name }) => {
            const inputValue = (formValue && formValue[name]) ? formValue[name] : ''
            if (name === PROFILE_URL) {
                const profileIconUrlHint = profileIconUtility.profileIconFromUrl(inputValue)
                setProfileIconName(profileIconUrlHint)
                // todo: should override title (perhaps have waterfall, delegated logic)
            }
            if (name === PROFILE_TITLE) {
                // todo: look into profileIconUtility.findProfileIconKeyForTitle()
                setProfileIconName(inputValue)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    // will be valid 1st time round (onProfileAddHandler -> handleSubmit will re-validate)
    const isValid = isEntityEmpty(errors)

    const onProfileAddHandler = (event) => {
        handleSubmit(onSubmit)(event)
    }

    const onSubmit = async (data) => {
        let profile = mapValuesToProfile(data)
        onProfileCreate?.(profile)
        // todo: might need to reuse submission mechanics -> delegate to "handler" e.g. onProfileUpdate
        resetForm()
    }

    const resetForm = () => {
        // todo: need mapper
        reset({
            id: '',
            profileUrl: '',
            profileTitle: ''
        })
        setProfileIconName('')
        console.log('HUGE reset!')
    }

    const mapValuesToProfile = (data) => {
        const id = data.id || generateUniqueId()
        return { id: id, url: data.profileUrl, title: data.profileTitle, icon: profileIconName }
    }

    let className = 'SettingProfile'
    if (primaryInput) className += ' PrimaryInput'

    // const draggableOptions = (this.props.noDragHandle) ? {} : {draggable: true, onDragStart: this.props.dragStart, onDragEnd: this.props.dragEnd}

    return (
        /*
        <div {...idProperties} className={className} {...draggableOptions}>
        */

        <div className={className}>
            {/*
            <ProfileHandle showHandle={!this.props.noDragHandle}/>
            */ }

            <ProfileUrl register={ register } errors={ errors }/>
            <ProfileTitle register={ register } errors={ errors }/>
            <ProfileIcon icon={ profileIconName }/>

            { onProfileCreate && <ProfileAdd onCreate={ onProfileAddHandler } enabled={ isValid }/> }
            { onProfileRemove && <ProfileRemove onRemove={ onProfileRemove }/> }
        </div>
    )
}
