import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PROFILE_URL, ProfileUrl } from './profile-url/ProfileUrl'
import { PROFILE_TITLE, ProfileTitle } from './profile-title/ProfileTitle'
import { SettingProfileIcon } from './profile-icon/SettingProfileIcon'
import { ProfileAdd } from './profile-add/ProfileAdd'
import { ProfileRemove } from './profile-remove/ProfileRemove'
import { isEntityEmpty } from '../../../../utility/entity/entity-utility'
import { mapProfileToData, mapValuesToProfile, resetProfileData } from '../../../../data/mapper/profile-data-mapper'
import { ProfileHandle } from './profile-handle/ProfileHandle'
import { findIconNameForUrl, findIconNameTitle } from '../../../../utility/icon/icon-lib-utility'
import { BlockIcon } from './profile-block/BlockIcon'
import { BlockSetting } from './profile-block/BlockSetting'

import './SettingProfile.css'
import './SettingProfileWrapper.css'
import './SettingProfileRow.css'

export const SettingProfile = ({ profile, onProfileCreate, onProfileRemove, onProfileUpdate, primaryInput, isDragging }) => {
    const [editProfileData, setEditProfileData] = useState(mapProfileToData(profile))
    const [updated, setUpdated] = useState(false)
    // Default to hidden - only show when user clicks BlockIcon
    const [showBlockSetting, setShowBlockSetting] = useState(false)
    const [isEditingBlock, setIsEditingBlock] = useState(false)

    const { register, watch, reset, formState: { errors }, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: mapProfileToData(profile)
    })

    useEffect(() => {
        const subscription = watch((formValue, { name }) => {
            const inputValue = (formValue && formValue[name]) ? formValue[name] : ''
            if (name === PROFILE_URL) {
                const profileIconForUrl = findIconNameForUrl(inputValue)
                setEditProfileData({ ...editProfileData, profileUrl: inputValue, profileIcon: profileIconForUrl })
                setUpdated(true)
            }
            if (name === PROFILE_TITLE) {
                const profileIconForTitle = findIconNameTitle(inputValue)
                setEditProfileData({ ...editProfileData, profileTitle: inputValue, profileIcon: profileIconForTitle })
                setUpdated(true)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    useEffect(() => {
        // Always update the profile when editProfileData changes and updated is true
        if (onProfileUpdate && updated) {
            const updateTimer = setTimeout(() => {
                // Convert editProfileData to profile format and update
                const profileToUpdate = mapValuesToProfile(editProfileData);
                onProfileUpdate(profileToUpdate);
                setUpdated(false);
            }, isEditingBlock ? 0 : 2000); // Apply immediately when in editing mode, otherwise debounce

            return () => {
                clearTimeout(updateTimer);
            };
        }
    }, [updated, editProfileData, onProfileUpdate, isEditingBlock]);


    // will be valid 1st time round (onProfileAddHandler -> handleSubmit will re-validate)
    const isValid = isEntityEmpty(errors)

    const onProfileAddHandler = (event) => {
        handleSubmit(onSubmit)(event)
    }

    const onSubmit = async (data) => {
        let profile = mapValuesToProfile({ ...data, profileIcon: editProfileData.profileIcon, profileIconColor: editProfileData.profileIconColor })
        onProfileCreate?.(profile)
        resetForm()
    }

    const resetForm = () => {
        setEditProfileData(resetProfileData())
        reset(resetProfileData())
    }

    const onIconColorChange = (color) => {
        setEditProfileData(epd => {
            const updatedProfileData = { ...epd, profileIconColor: color }
            onProfileUpdate?.(mapValuesToProfile(updatedProfileData))
            return updatedProfileData
        })
    }

    const handleBlockToggle = () => {
        // Capture current state to make decisions
        const willShow = !showBlockSetting;

        // Update visibility state
        setShowBlockSetting(willShow);

        // Set editing state based on whether we're showing or hiding
        if (willShow) {
            setIsEditingBlock(true); // Enter edit mode when showing
        } else {
            setIsEditingBlock(false); // Exit edit mode when hiding
            setUpdated(true); // Trigger profile update
        }
    }

    const handleBlockSettingChange = (blockData) => {
        // Use a ref to compare the current block data with the new block data
        const isSignificantChange = 
            // Remove block entirely
            (blockData === null && editProfileData.block) || 
            // Add block for the first time
            (blockData !== null && !editProfileData.block) ||
            // Change block data
            (blockData !== null && editProfileData.block && 
             (blockData.startTime !== editProfileData.block.startTime || 
              blockData.endTime !== editProfileData.block.endTime));

        // Store the block data without triggering immediate updates
        setEditProfileData(epd => {
            // If blockData is null, we remove the block property entirely
            if (blockData === null) {
                const { block, ...restData } = epd;
                return restData;
            }

            // Otherwise add the block data to the profile
            return { ...epd, block: blockData };
        });

        // Only mark as updated if there's a significant change
        if (isSignificantChange) {
            setUpdated(true);
        }
    }

    let className = 'SettingProfile'
    if (primaryInput) className += ' PrimaryInput'
    if (onProfileUpdate && updated) className += ' Updating'
    if (isDragging) className += ' Dragging'

    return (
        <div className='SettingProfileWrapper'>
            <div className='SettingProfileRow'>
                <div className={ className }>
                    { !primaryInput && <ProfileHandle/> }

                    <ProfileUrl register={ register } errors={ errors }/>
                    <ProfileTitle register={ register } errors={ errors }/>
                    <SettingProfileIcon iconName={ editProfileData.profileIcon } onColorChange={ onIconColorChange } color={ editProfileData?.profileIconColor }/>

                    { onProfileCreate && <ProfileAdd onCreate={ onProfileAddHandler } enabled={ isValid }/> }
                    { onProfileRemove && <ProfileRemove onRemove={ onProfileRemove }/> }
                </div>

                { !primaryInput ? (
                    <BlockIcon 
                        onBlock={handleBlockToggle} 
                        blockData={editProfileData.block}
                        isEnabled={isEditingBlock}
                    />
                ) : (
                    <div className="spacer-element"></div>
                )}
            </div>

            {/* Only show BlockSetting when showBlockSetting is true */}
            { showBlockSetting && !primaryInput && 
                <BlockSetting 
                    onBlockSettingChange={handleBlockSettingChange} 
                    initialBlockData={editProfileData.block || null}
                    isEditing={isEditingBlock}
                /> 
            }
        </div>
    )
}
