import React from 'react'

const PrintWarning = (props) => {
  return (
    <div className="warningMainDiv loginPageLoading">
      <div className="myAlert">
        <div className="warningContent">
          <p>
            Please use <b>Print Button</b> or activate cursor in editor and then
            press Ctrl+P
          </p>
        </div>
        <div className="closeBtn">
          <button onClick={props.closeWarning}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default PrintWarning
