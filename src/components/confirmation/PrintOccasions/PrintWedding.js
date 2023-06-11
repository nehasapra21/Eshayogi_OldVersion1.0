import React, { Component } from 'react'

import Header from '../../header/Header'

import Esahiyogi from '../../../utils/images/esahyogiblue.svg'

import ReactToPrint from "react-to-print";

class ComponenttoPrintWedding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weddingData : this.props.weddingData
    }
  }

  render () {
    return (
      <div className='Confirmationframe'>
          <div className='FormOuterFrame'>
            <div className="Subheader">
              <div className="SubheaderTxtDiv">
                <p className="TxtOfficeof">Office of Sh.</p>
                <p className="TxtSubheader">{ this.state.weddingData.byUser.firstName } { this.state.weddingData.byUser.lastName }</p>
              </div>
              <div className="SubheaderTxtDiv">
                <p className="TxtPoweredBy">Powered by</p>
                <img src={Esahiyogi} alt="" className="SubheaderImg" />
              </div>
            </div>
            <div style={{ background: "#F7F8FA", padding : '0 30px', marginTop : '75px' }}>
              <p className="TxtConfirmationLettersRight">Date { this.state.weddingData.createdAt.substring( 0, 10 ).split('').reverse().join('') }</p>
            </div>
            <div style={{backgroundColor : '#F7F8FA', padding: '60px 30px' }}>
                    <p className='TxtConfirmationLetter'>Dear { this.state.weddingData.meta.invitorName},</p>
                    <p className="TxtConfirmationLetter" style={{ marginTop : '30px' }}>Thank you for inviting me to the wedding of <span style={{ fontFamily : 'SegoeBold' }}>{ this.state.weddingData.meta.nameOfGroom }</span> and <span style={{ fontFamily : 'SegoeBold' }}>{ this.state.weddingData.meta.nameOfBride }</span>.  I had a hearty desire to be present on this auspicious occasion but could not attend due to being busy in elections. Please do not think of it otherwise and continue to maintain this warmth.</p>
                    <p className='TxtConfirmationLetter'> I pray to the Almighty God that the newly married couple is blessed with the ever-increasing hope, enthusiasm and euphoria of progress.<br />With Best Wishes</p>
            </div>
            <div style={{ background: "#F7F8FA", padding : '0 30px', marginTop : '20px' }}>
              <p className="TxtConfirmationLettersRight">Your Sincerely,</p>
              <p className="TxtConfirmationLettersRightB">Sh. { this.state.weddingData.byUser.firstName } { this.state.weddingData.byUser.lastName }</p>
            </div>
            <div style={{backgroundColor : '#F7F8FA', padding: '20px 10px 30px 30px' }}>
              <div style={{ background: "#F7F8FA", padding : '10px 10px' }}>
                <p className="TxtConfirmationLetter">Name : { this.state.weddingData.meta.invitorName }</p>
                <p className="TxtConfirmationLetter">Address : { this.state.weddingData.meta.invitorAddress }</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default class PrintBirthday extends Component {

  render() {
    console.log('Wedding data', this.props.location.state)
    return (
      <div className='NewClientForm'>
        <Header />
        <ComponenttoPrintWedding ref={el => (this.componentRef = el)} weddingData = { this.props.location.state.weddingData } />
        <ReactToPrint 
          trigger={() => <button className="PrintBtn EditButton">Print</button>}
          content={() => this.componentRef}
        />
      </div>
    )
  }
}
