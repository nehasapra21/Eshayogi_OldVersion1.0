import React from 'react'
import warningLogo from '../../../utils/images/warningLogo.png'

const Warning = (props) => {
  return (
    <div className='warningMsg'>
      <div className='warningHead'>
        <img className='warningLogo' src={ warningLogo } alt=''></img>
        <p>Warning</p>
      </div>
      <p className='warningTxt'>{ props.warningMsg }</p>
    </div>
  )
}

export default Warning
