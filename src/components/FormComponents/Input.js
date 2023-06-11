import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import TextError from '../../hoc/TextError'

const Input = (props) => {
  const { label, name, ...rest } = props
  const [passwordIcon, changePasswordIcon] = useState(faEye)
  const [confirmPasswordIcon, changeConfirmPasswordIcon] = useState(faEye)

  const changeIcons = (id) => {
    let type = document.getElementById(id).getAttribute('type')
    if (type === 'password') {
      type = 'text'
      if (id === 'password') {
        changePasswordIcon(faEyeSlash)
      } else {
        changeConfirmPasswordIcon(faEyeSlash)
      }
    } else {
      type = 'password'
      if (id === 'password') {
        changePasswordIcon(faEye)
      } else {
        changeConfirmPasswordIcon(faEye)
      }
    }
    document.getElementById(id).setAttribute('type', type)
  }

  if (name === 'password' || name === 'confirmPassword') {
    return (
      <div className='formField'>
        <label htmlFor={name}>{label}</label>
        <div className='passwordDiv'>
          <Field id={name} name={name} {...rest} />
          <FontAwesomeIcon
            className='loginEyeIcon'
            id='showPasswordIcon'
            onClick={() => changeIcons(name)}
            icon={name === 'password' ? passwordIcon : confirmPasswordIcon}
          />
        </div>
        <ErrorMessage name={name} component={TextError} />
      </div>
    )
  }
  return (
    <div className='formField'>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Input
