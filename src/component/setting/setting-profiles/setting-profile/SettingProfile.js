import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PROFILE_URL, ProfileUrl } from './profile-url/ProfileUrl'
import { PROFILE_TITLE, ProfileTitle } from './profile-title/ProfileTitle'
import { ProfileIcon } from './profile-icon/ProfileIcon'
import * as profileIconUtility from '../../../../utility/profile/profile-icon-utility'

import './SettingProfile.css'

export const SettingProfile = () => {
    const [profileIconName, setProfileIconName] = useState('')

    const {register, watch, formState: {errors}} = useForm({
        mode: 'onChange'
    })

    useEffect(() => {
        const subscription = watch((formValue, {name, type}) => {
            const inputValue = (formValue && formValue[name]) ? formValue[name] : ''
            if (name === PROFILE_URL) {
                const profileIconUrlHint = profileIconUtility.profileIconFromUrl(inputValue)
                setProfileIconName(profileIconUrlHint)
            }
            if (name === PROFILE_TITLE) {
                // todo: look into profileIconUtility.findProfileIconKeyForTitle()
                setProfileIconName(inputValue)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])


    // const areAllValid = this.isAllInputValid()

    // todo: need state add mechanics
    // profileAddHandler = () => {
    //     const profile = this.mapValuesProfile()
    //     this.props.addHandler(profile)
    //     this.resetState()
    // }

    // todo: need state update mechanics
    // profileUpdateHandler = () => {
    //     const valid = this.state.valid
    //     if (valid) {
    //         const profile = this.mapValuesProfile()
    //         this.props.updateHandler(profile)
    //     }
    // }

    // mapValuesProfile = () => {
    //     const id = this.state.id
    //     const {profileUrl, profileTitle, profileIcon} = this.state.inputs
    //     return {id: id, url: profileUrl.value, title: profileTitle.value, icon: profileIcon.value}
    // }

    // const valid = this.state.valid
    // const {profileUrl, profileTitle, profileIcon} = this.state.inputs
    //
    // const idProperties = (this.props.primaryInput) ? {} : {id: this.props.id}
    //
    // let className = 'SettingProfile'
    // if (this.props.primaryInput) className += ' PrimaryInput'
    //
    // const draggableOptions = (this.props.noDragHandle) ? {} : {draggable: true, onDragStart: this.props.dragStart, onDragEnd: this.props.dragEnd}
    // const profileAddButton = (this.props.addHandler) ? <ProfileAdd handleAdd={this.profileAddHandler} enabled={valid}/> : null
    // const profileRemoveButton = (this.props.removeHandler) ? <ProfileRemove handleRemove={this.props.removeHandler}/> : null

    return (
        /*
        <div {...idProperties} className={className} {...draggableOptions}>
        */

        <div>
            {/*
                <ProfileHandle showHandle={!this.props.noDragHandle}/>
                */}

            <ProfileUrl register={register} errors={errors}/>
            <ProfileTitle register={register} errors={errors}/>
            <ProfileIcon icon={profileIconName}/>

            {/*
                {profileAddButton}
                {profileRemoveButton}
            */}
        </div>
    )
}
