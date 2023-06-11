import React, { Component } from 'react'

import Header from '../header/Header'

class UpdateDetails extends Component {
  render() {
    return (
      <div className='BackgroudHomeframe'>
        <Header />
        <div className='frame curveBorders'>
          <div className='FormOuterFrame' style={{ textAlign : 'left' }}>
            <div className='DivHeading'>
              <p className='TxtHeading'>Update Details</p>
            </div>
            <div className='FormFrame'>
              <div className='UpdatePage'>
                <div className='details'>
                  <p className='info'></p>
                  <p className='info'></p>
                </div>
                <div className='UpdateLinks'>
                  <a href='' className='updateLink'>Change account email</a>
                  <a href='' className='updateLink'>Change phone number</a>
                  <a href='' className='updateLink'>Change profile picture</a>
                </div>
              </div>
              <hr className='partition' />
              <div className='updateBtn'>
                <a href=''>
                  <button className='BtnSubmit'>Done</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateDetails
