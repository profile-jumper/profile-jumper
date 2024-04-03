import React from 'react'

import { SettingLogo } from './logo/SettingLogo'

import './SettingHeader.css'

export const SettingHeader = () => (
    <div className="SettingHeader">

        <SettingLogo/>

        <div className="SettingInfo">
            <h1>
                <a href="https://profile-jumper.github.io"
                   className="BrandingLink"
                   target="_blank"
                   rel="noopener noreferrer"
                   title="Profile Jumper! - See website for info">Profile Jumper!</a>
                <span>Settings</span></h1>
            <p>Enter your profile link URL & Title (icon will automatically change). Then click on the "+" button.</p>
        </div>
    </div>
)
