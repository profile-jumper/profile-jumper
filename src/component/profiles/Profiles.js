import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SolidIcon from '@fortawesome/free-solid-svg-icons'

import * as profileActions from '../../store/profile/action'
import { sortProfilesById } from '../../utility/profile/profile-icon-utility'

import Profile from './profile/Profile'

import './Profiles.css'

const Profiles = () => {

    // todo: init profiles from data store (legacy)
    // componentDidMount() {
    //   //this.props.onInitProfiles()
    // }

    // todo: issue is getting state (need another state manager)
    //const profiles = this.props.profiles
    const profiles = []

    let profilesListed = (
        <div className="NoProfiles">
            <h1>Setup Profiles</h1>
            <p>Click on the gears icon to add some profiles...</p>

            <div className="ConfigureInfo">
                <a className="ConfigureClick" href="#settings" target="_blank" rel="noopener noreferrer" title="Click here to configure - Profile Jumper!">
                    <FontAwesomeIcon icon={SolidIcon.faCogs} size="4x"/>
                </a>
            </div>
        </div>
    )

    if (profiles && profiles.length > 0) {
        profilesListed = (
            <div className="Profiles">
                {profiles.sort(sortProfilesById).map(profile => (
                    <Profile key={profile.id} id={profile.id} icon={profile.icon} url={profile.url}/>
                ))}
            </div>
        )
    }

    return (
        profilesListed
    )
}

const mapStateToProps = centralStoreState => {
    return {profiles: centralStoreState.profileStore.profiles}
}

const mapDispatcherToProps = (dispatch) => {
    return {
        onInitProfiles: () => dispatch(profileActions.retrieveFromPersistentProfilesAction())
    }
}

export default Profiles
