import React from 'react'

import './ProfileTitle.css'

export const ProfileTitle = ({ register, error }) => {

    const inputStyle = (error) ? 'error' : null

    const errorShow = (error) ? <p className='error'>Enter a profile name</p> : null

    return (
        <div className='ProfileTitle'>
            <input type='text'
                   name='profileTitle'
                   autoComplete='off'
                   className={inputStyle}
                   {...register('profileTitle', {required: true, minLength: 2})}
            />
            {errorShow}
        </div>
    )
}
