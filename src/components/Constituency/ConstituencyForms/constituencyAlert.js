import React, { useState } from 'react'

import '../Constituency.css'

const ConstituencyAlert = (props) => {

  console.log('Props recieving', props)

  const handleClick = (e) => {
    setBool(false)
  }

  const [ showConfirmBox, setBool ] = useState(props.showConfirmBox)

  return (
    showConfirmBox ?
    <div className='confirmToast'>
      <p className='confirmMsg'>{ props.msg }</p>
      <a href={props.location}>
      <button type='submit' className='confirmToastBtn' onClick={ (e) => handleClick(e) }>OK</button>
      </a>
    </div> :
    null
  )
}

export default ConstituencyAlert

