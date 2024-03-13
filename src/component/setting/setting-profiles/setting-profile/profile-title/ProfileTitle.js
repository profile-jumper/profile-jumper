import React from 'react'

import './ProfileTitle.css'

export const ProfileTitle = ({ register, errors }) => {
    const inputStyle = (errors.profileTitle) ? 'error' : null
    const errorShow = (errors.profileTitle) ? <p className='error'>{errors.profileTitle?.message}</p> : null

    return (
        <div className='ProfileTitle'>
            {errorShow}
            <input type='text'
                   autoComplete='off'
                   className={inputStyle}
                   {...register('profileTitle', {required: 'Enter a profile name'} )}
            />
        </div>
    )
}
