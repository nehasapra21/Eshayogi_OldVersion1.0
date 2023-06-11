import React from 'react'

const MiddleFooter = (props) => {
  return (
    <div
      className="footerSection middleFooter"
      style={props.style ? { ...props.style } : null}
    >
      <div className="section">
        <p className="text">'Trust and Safety</p>
        <a href="/" className="text regular">
          Privacy and Data Policy
        </a>
      </div>
      <div className="section sec2Pad">
        <p className="text">Support</p>
        <a href="/" className="text regular">
          Help Center
        </a>
      </div>
      <div className="section sec3Pad">
        <p className="text">Others</p>
        <a href="/" className="text regular">
          'User Agreement
        </a>
      </div>
    </div>
  )
}

export default MiddleFooter
