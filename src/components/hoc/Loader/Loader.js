import React from 'react'

import loadingGIF2 from '../../../utils/GIFs/loadingGIF2.gif'
import './Loader.css'

const Loader = () => {
  return (
    <div className='loginPageLoading'>
      <div className='myAlert' style={{ padding: '10px', width: 'auto' }}>
        <img src={loadingGIF2} alt='' className='loginPageLoader' style={{ height: '35px', width: 'auto' }}></img>
      </div>
    </div>
  )
}

export default Loader
