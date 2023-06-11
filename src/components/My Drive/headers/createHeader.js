import React from 'react'

const CreateHeader = (props) => (
  <div className='mydrive-create-header'>
    <h3>{props.head}</h3>
    <div>
      <button
        type='button'
        className='btn btnSubmit'
        onClick={props.onClickAction}
      >
        {props.btnText}
      </button>
    </div>
  </div>
)

export default CreateHeader
