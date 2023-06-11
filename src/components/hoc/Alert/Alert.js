import React, { useState } from 'react'
import './Alert.css'

import alertTick from '../../../utils/images/tick@2x.png'

const Alert = (props) => {

  const [show, setShow] = useState(true)

  const handleAlert = (e) => {
    e.preventDefault()
    setShow(false)
  }

  const alertStyle = {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  }

  if(show) {
    return (
      <div style={alertStyle}>
        <div className='myAlert'>
          <div style={{ textAlign: 'center' }}>
            <img className='alertTick' src={alertTick} alt= ''></img>
            <h2 class='alertHeader'>Request Created</h2>
          </div>
          <div className='alertMsg'>
            <p>{props.alertMsg}</p>
            <p style={{ fontWeight: '700' }}>{props.referenceNumber}</p>
          </div>
          <button class='alertBtw' onClick={(e) => handleAlert(e)}>{props.buttonName}</button>
        </div>
      </div>
    )
  } else {
    return (
      props.children
    )
  }

}

export default Alert