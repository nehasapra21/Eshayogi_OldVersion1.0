import React, { Component } from 'react'

import Header from '../../header/Header'

import DatePicker from 'react-datepicker'

import api from '../../../utils/api'

import '../Karykarta.css'

import Zila from './Zila'
import VidhanSabha from './VidhanSabha'
import Mandal from './Mandal'
import PSLevel from './PSLevel'
import GramPanchayat from './GramPanchayat'
import BoothLevel from './BoothLevel'
import ShaktiKendra from './ShaktiKendra'

import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import { getYear } from "../../../utils/validations";

export default class AddKarykarta extends Component {

  constructor(props) {
    super(props)

    if (this.props.history.location.state) {

      let karyakartaData = this.props.history.location.state.karyakartaData
      let date = new Date(karyakartaData.dob)

      console.log('Karyakarta date', date)
      this.state = {
        constituencyType: karyakartaData.meta.constituencyType,
        name: karyakartaData.name,
        whatsappNumber: karyakartaData.whatsappNumber,
        dob: date,
        area: karyakartaData.area,
        callingNumber: karyakartaData.meta.callingNumber,
        isUpdate: true,
        errors: {
          date: "",
        }
      }
    } else {
      this.state = {
        constituencyType: 'Zila Level',
        name: '',
        whatsappNumber: '',
        dob: '',
        area: 'Zila',
        callingNumber: '',
        isUpdate: false,
        errors: {
          date: ""
        }
      }
    }
    console.log('Props in karyakarta', this.props)
  }

  switchStatement = (constituency) => {
    console.log('Constituency ', constituency)
    switch (constituency) {
      case 'Zila Level': return <Zila getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      case 'Vidhan Sabha': return <VidhanSabha getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      case 'PS Level': return <PSLevel getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      case 'Mandal Level': return <Mandal getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      case 'Shakti Kendra': return <ShaktiKendra getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      case 'Gram Panchayat': return <GramPanchayat getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      case 'Booth Level': return <BoothLevel getConstituency={this.addKaryakarta} updateKaryakarta={this.updateKaryakartaData} constituencyType={this.state.constituencyType} history={this.props.history} />

      default: return 'hello this is default'
    }
  }

  addKaryakarta = (e, karyakartaData) => {
    e.preventDefault()
    delete karyakartaData.isUpdate
    console.log('Getting karyakarta data', karyakartaData)
    api.addKaryakarta({
      name: this.state.name,
      whatsappNumber: this.state.whatsappNumber,
      dob: this.state.dob,
      area: this.state.area,
      ...karyakartaData,
      meta: {
        callingNumber: this.state.callingNumber,
        constituencyType: this.state.constituencyType
      }
    }).then(
      response => {
        if (response.ok) {
          console.log('Karyakarta added successfully', response)
          this.props.history.push('/manage-karyakarta')
        }
      }
    )
  }

  updateKaryakartaData = (e, karyakartaData) => {
    e.preventDefault()
    delete karyakartaData.isUpdate
    api.updateKaryakarta({
      byUser: this.props.history.location.state.karyakartaData.byUser,
      name: this.state.name,
      whatsappNumber: this.state.whatsappNumber,
      dob: this.state.dob,
      area: this.state.area,
      ...karyakartaData,
      meta: {
        callingNumber: this.state.callingNumber,
        constituencyType: this.state.constituencyType
      },
      orgId: this.props.history.location.state.karyakartaData.orgId,
      id: this.props.history.location.state.karyakartaData.id,
      createdAt: this.props.history.location.state.karyakartaData.createdAt,
      updatedAt: new Date()
    }).then(
      response => {
        if (response.ok) {
          console.log('Sucessfully updated karyakarta', response)
          this.props.history.push('/manage-karyakarta')
        }
      }
    )
  }

  render() {
    return (
      <div className='NewClientForm'>
        <Header />
        <div className='frame'>
          <div className='FormOuterFrame'>
            <div className='DivHeading' style={{ justifyContent: 'center' }}>
              <p className='TxtHeading'>Add Karyakarta</p>
            </div>
            <div className='FormFrame'>
              <form>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="karyakartaName"
                  className="InputFrame"
                  placeholder="Please enter Karyakarta Name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Whatsapp Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  id="whatsappNumber"
                  className="InputFrame"
                  placeholder="Please enter WhatsApp Number"
                  value={this.state.whatsappNumber}
                  onChange={(e) => this.setState({ whatsappNumber: e.target.value })}
                  required />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Calling Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  id="whatsappNumber"
                  className="InputFrame"
                  placeholder="Please enter Calling Number"
                  value={this.state.callingNumber}
                  onChange={(e) => this.setState({ callingNumber: e.target.value })}
                  required />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date of Birth</p>
                  <p className="TxtStar">*</p>
                </div>
                <div >
                  <DatePicker
                    maxDate={new Date()}
                    placeholder="Please enter Date of Birth" className="InputFrame" selected={this.state.dob}
                    onChange={(date) => {
                      let errors = this.state.errors;
                      if (getYear(date).toString().length == 4) {
                        this.setState({ dob: date });
                      } else {
                        errors.date = "Invalid Year";
                        this.setState({ errors });
                      }
                    }} />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.date}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Constituency</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'Zila Level', area: 'Zila' })} >
                      <span className={this.state.constituencyType === 'Zila Level' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Zila</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'Vidhan Sabha', area: 'Vidhan Sabha' })} >
                      <span className={this.state.constituencyType === 'Vidhan Sabha' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Vidhan Sabha</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'PS Level', area: 'Panchayat Samiti' })} >
                      <span className={this.state.constituencyType === 'PS Level' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Panchayat Samiti</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'Mandal Level', area: 'Mandal' })} >
                      <span className={this.state.constituencyType === 'Mandal Level' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Mandal</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'Shakti Kendra', area: 'Shakti Kendra' })} >
                      <span className={this.state.constituencyType === 'Shakti Kendra' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Shakti Kendra</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'Gram Panchayat', area: 'Gram Panchayat' })} >
                      <span className={this.state.constituencyType === 'Gram Panchayat' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Gram Panchayat</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className='radiobutton'
                      onClick={() => this.setState({ constituencyType: 'Booth Level', area: 'Booth' })} >
                      <span className={this.state.constituencyType === 'Booth Level' ? 'checked' : 'unchecked'} />
                    </label>
                    <p className="TxtRadioInput">Booth</p>
                  </div>
                </div>
                {
                  this.switchStatement(this.state.constituencyType)
                }
              </form>
            </div>
          </div>
          <div className='DashboardFooter'>
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className='emptyDiv'></div>
      </div>
    )
  }
}
