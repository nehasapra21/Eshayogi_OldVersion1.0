import React from 'react'

const FormHeader = (props) => (
  <div className='formHeader'>
    <div className='leftSection'>
      <h3 className='head'>{props.head}</h3>
    </div>
    <div className='rightSection'>
      <p className='header-text'>{props.name}</p>
      <p className='header-text'>
        {props.mobileNumber && props.mobileNumber !== ''
          ? `+91-${props.mobileNumber}`
          : null}
      </p>
      <p className='header-text'>{props.pincode}</p>
    </div>
  </div>
)

export default FormHeader
