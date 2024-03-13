import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import ProfileHandle from './profile-handle/ProfileHandle'
import ProfileUrl from './profile-url/ProfileUrl'
import { ProfileTitle } from './profile-title/ProfileTitle'
import { ProfileIcon } from './profile-icon/ProfileIcon'
import ProfileAdd from './profile-add/ProfileAdd'
import ProfileRemove from './profile-remove/ProfileRemove'
import * as profileIconUtility from '../../../../utility/profile/profile-icon-utility'

import './SettingProfile.css'

export const SettingProfile = () => {
    const [profileIconName, setProfileIconName] = useState('')

    const { register, watch, formState: { errors } } = useForm({
        mode: 'onChange'
    })

    useEffect(() => {
        const subscription = watch((formValue, { name, type }) => {
            if(name === 'profileTitle') {
                const value = formValue[name]
                setProfileIconName(value)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    //todo: refactor this!
    // updateInput = (inputRef, value, valid) => {
    //     let inputs = {...this.state.inputs}
    //
    //     const effectedInput = inputs[inputRef]
    //     effectedInput.value = value
    //     effectedInput.isValid = valid
    //
    //     inputs[inputRef] = effectedInput
    //
    //     if (inputRef === 'profileUrl') {
    //         const profileUrl = this.state.inputs['profileUrl']
    //
    //         if (profileUrl.isValid) {
    //             const profileIconKey = profileIconUtility.profileIconFromUrl(profileUrl.value)
    //
    //             if (profileIconKey) {
    //                 const profileIcon = inputs['profileIcon']
    //                 profileIcon.value = profileIconKey
    //                 inputs['profileIcon'] = profileIcon
    //
    //                 const profileTitle = inputs['profileTitle']
    //                 profileTitle.value = profileIconKey
    //                 inputs['profileTitle'] = profileTitle
    //             }
    //         } else {
    //             const profileIcon = inputs['profileIcon']
    //             profileIcon.value = ''
    //             inputs['profileIcon'] = profileIcon
    //
    //             const profileTitle = inputs['profileTitle']
    //             profileTitle.value = ''
    //             inputs['profileTitle'] = profileTitle
    //         }
    //     }
    //
    //     if (inputRef === 'profileTitle') {
    //         const profileTitle = this.state.inputs['profileTitle']
    //
    //         if (profileTitle.isValid) {
    //             const iconKey = profileIconUtility.findProfileIconKeyForTitle(profileTitle.value)
    //
    //             const profileIcon = inputs['profileIcon']
    //             profileIcon.value = iconKey
    //             inputs['profileIcon'] = profileIcon
    //         }
    //     }

        // const areAllValid = this.isAllInputValid()
        //
        // this.setState({...this.state, inputs: inputs, valid: areAllValid})
    //}

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
                <ProfileUrl updateValue={(value, validity) => this.updateInput('profileUrl', value, validity)}
                            value={profileUrl.value} {...(this.props.updateHandler && {updateExisting: this.profileUpdateHandler})} />
                */}

                <ProfileTitle register={register} error={errors.profileTitle} />
                <ProfileIcon icon={profileIconName}/>

            {/*
                {profileAddButton}
                {profileRemoveButton}

            */}
        </div>
    )
}
