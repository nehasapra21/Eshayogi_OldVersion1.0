import React, { Component } from 'react'

import Header from '../../header/Header'

import Esahiyogi from '../../../utils/images/esahyogiblue.svg'

import ReactToPrint from "react-to-print";

class ComponenToPrintCondolence extends Component {
  constructor(props) {
    super(props)
    this.state = {
      condolenceData : this.props.condolenceData
    }
  }

  render() {
    return(
      <div className='Confirmationframe'>
          <div className='FormOuterFrame'>
            <div className="Subheader">
              <div className="SubheaderTxtDiv">
                <p className="TxtOfficeof">Office of Sh.</p>
                <p className="TxtSubheader">{ this.state.condolenceData.byUser.firstName } { this.state.condolenceData.byUser.lastName }</p>
              </div>
              <div className="SubheaderTxtDiv">
                <p className="TxtPoweredBy">Powered by</p>
                <img src={Esahiyogi} alt="" className="SubheaderImg" />
              </div>
            </div>
            <div style={{ background: "#F7F8FA", padding : '0 30px', marginTop : '75px' }}>
              <p className="TxtConfirmationLettersRight">Date { this.state.condolenceData.createdAt.substring( 0, 10 ).split('').reverse().join('') }</p>
            </div>
            <div style={{backgroundColor : '#F7F8FA', padding: '60px 30px' }}>
                    <p className='TxtConfirmationLetter'>Dear { this.state.condolenceData.meta.nameOfRelative } Sir,</p>
                    <p className="TxtConfirmationLetter" style={{ marginTop : '30px' }}>I am extremely pained to hear the news of <span style={{ fontFamily : 'SegoeBold' }}>{ this.state.condolenceData.meta.nameOfDead }</span> demise. I mourn his death and express my heartfelt condolences on this sorrowful loss.</p>
                    <p className="TxtConfirmationLetter">I pray to the Almighty God that he grants peace and harmony to the departed soul and empowers the grieving family to bear this immense grief.</p>
            </div>
            <div style={{ background: "#F7F8FA", padding : '0 30px', marginTop : '20px' }}>
              <p className="TxtConfirmationLettersRight">Your Sincerely,</p>
              <p className="TxtConfirmationLettersRightB">Sh. { this.state.condolenceData.byUser.firstName } { this.state.condolenceData.byUser.lastName }</p>
            </div>
            <div style={{backgroundColor : '#F7F8FA', padding: '20px 10px 30px 30px' }}>
              <div style={{ background: "#F7F8FA", padding : '10px 10px' }}>
                <p className="TxtConfirmationLetter">Name : { this.state.condolenceData.meta.nameOfRelative }</p>
                <p className="TxtConfirmationLetter">Address : { this.state.condolenceData.meta.address }</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default class PrintBirthday extends Component {

  render() {

    console.log('Condolence data', this.state)

    return (
      <div className='NewClientForm'>
        <Header />
        <ComponenToPrintCondolence ref={el => (this.componentRef = el)} condolenceData = { this.props.location.state.condolenceData } />
        <ReactToPrint
          trigger={() => <button className="PrintBtn EditButton">Print</button>}
          content={() => this.componentRef}
        />
      </div>
    )
  }
}
