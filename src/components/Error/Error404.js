import React, { Component } from 'react'

import Header from '../header/Header'

import ErrorSmily from '../../utils/images/errorImg.png'

import './Error404.css'

class Error404 extends Component {
  render() {
    return (
      <div className='BackgroundHomeframe'>
        <Header />
        <div className='frame'>
          <div className='errorContainer'>
            <div className='errorHeads'>
              <img src={ErrorSmily} alt='' className='errorImg' />
              <h1 className='mainHead'>
                404
              </h1>
              <h2 className='secondaryHead'>
                 sorry, page not found
              </h2>
              <a href='/home'><button className='BtnSubmit' style={{ marginTop : '100px' }} >Go Back Home</button></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Error404
