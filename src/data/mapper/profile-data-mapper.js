import { generateUniqueId } from '../../utility/identifier/id-utility'

export const mapProfileToData = (profile) => {
    return {
        id: profile?.id,
        profileUrl: profile?.url,
        profileTitle: profile?.title,
        profileIcon: profile?.icon,
        profileIconColor: profile?.iconColor,
        block: profile?.block || null
    }
}

export const mapValuesToProfile = (data) => {
    const id = data.id || generateUniqueId()

    // Create base profile with all properties
    const profile = { 
        id: id, 
        url: data.profileUrl, 
        title: data.profileTitle, 
        icon: data.profileIcon, 
        iconColor: data.profileIconColor
        // Don't explicitly set block here
    }

    // Only add block property if it exists
    // We need to explicitly check for undefined to handle the case where block is null
    if (data.hasOwnProperty('block')) {
        profile.block = data.block;
    }

    return profile;
}

export const resetProfileData = () => {
    return {
        id: '',
        profileUrl: '',
        profileTitle: '',
        profileIcon: '',
        profileColor: '',
        block: null
    }
}

