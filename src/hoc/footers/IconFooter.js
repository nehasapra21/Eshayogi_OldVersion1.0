import React from 'react'
import * as svg from '../../utils/svg/index'

const IconFooter = () => {
  return (
    <div className="footerSection upperFooter">
      <div className="iconTextDiv">
        <div className="icon">{svg.server}</div>
        <p className="text">Local Servers</p>
      </div>
      <div className="iconTextDiv">
        <div className="icon">{svg.makeInIndia}</div>
        <p className="text">Made In India</p>
      </div>
      <div className="iconTextDiv">
        <div className="icon">{svg.encryption}</div>
        <p className="text">256 bit encryption</p>
      </div>
    </div>
  )
}

export default IconFooter
