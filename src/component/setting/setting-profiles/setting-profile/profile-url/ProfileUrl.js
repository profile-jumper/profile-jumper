import React, { Component } from 'react'

import { checkValidity } from '../../../utility/inputValidation'

import './ProfileUrl.css'

export const ProfileUrl = () => {

  // constructor(props) {
  //   super(props)
  //
  //   this.state = {
  //     profileUrlInput: {
  //       value: props.value || '',
  //       validation: {
  //           required: true,
  //           minLength: 5,
  //           isUrl: true
  //       },
  //       valid: false,
  //       error: false
  //     },
  //     isValid: false
  //   }
  //
  //   this.onChangedHandler = this.onChangedHandler.bind(this)
  // }

  // checkInputValidity = (updatedValue) => {
  //   const profileUrlInput = this.state.profileUrlInput
  //
  //   if(updatedValue) profileUrlInput.value = updatedValue
  //
  //   profileUrlInput.valid = checkValidity(profileUrlInput.value, profileUrlInput.validation)
  //   profileUrlInput.error = (!profileUrlInput.valid && profileUrlInput.touched)
  //
  //   const formIsValid = profileUrlInput.valid
  //
  //   if(formIsValid) {
  //     this.props.updateValue(profileUrlInput.value, formIsValid)
  //   }
  // }

    return (
      <div className="ProfileUrl">
        <input type="text"
               name="profileUrl"
               placeholder="URL e.g. https://instagram.com/mrupgradable"
               autoComplete="off"
        />
      </div>
    )
}
