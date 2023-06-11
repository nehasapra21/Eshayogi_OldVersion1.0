import React, { Component } from 'react'
import Header from '../header/Header'
import DatePicker from 'react-datepicker'
import Footer from '../footer/Footer'
import CopyrightFooter from '../footer/CopyrightFooter'
import api from '../../utils/api'
import {
  validationFailed,
  validNumberRegex,
  getYear,
} from '../../utils/validations'
import { toast } from 'react-toastify'

class Anniversary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateOfAnniversary: '',
      name: '',
      whatsappNumber: '',
      callingNumber: '',
      isVIP: 'no',
      errors: {
        name: '',
        whatsappNumber: '',
        callingNumber: '',
        dateOfAnniversary: '',
      },
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'name':
        errors.name = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'whatsappNumber':
        errors.whatsappNumber =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'callingNumber':
        errors.callingNumber =
          value.length === 0 ? 'This is a required field.' : ''
        break
      default:
        break
    }

    this.setState({ errors }, () => {
      console.log(errors)
    })
  }

  render() {
    const handleSubmit = (event) => {
      event.preventDefault()

      if (!validationFailed(this.state.errors)) {
        this.showLoader = true
        let date = new Date(this.state.dateOfAnniversary)
        console.log('New Date', date.getFullYear())
        api
          .addOccassion({
            type: 'Anniversary',
            meta: {
              ...this.state,
              dd: date.getDate(),
              mm: date.getMonth() + 1,
              year: date.getFullYear(),
              yetToCalled: true,
            },
          })
          .then((response) => {
            if (response.ok) {
              toast.success('Occasion Added Successfully', {
                autoClose: 1250,
                closeButton: 'false',
              })
              console.log('Occassion created successfully', response)
              this.props.history.push({
                pathname: '/manage-occasion',
              })
            } else {
              console.log('Something wrong', response)
              toast.error('Something went wrong. Please refresh.', {
                autoClose: 1250,
                closeButton: 'false',
              })
            }
          })
      }
    }

    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="TxtHeading">Anniversary</p>
            </div>
            <div className="FormFrame">
              <form onSubmit={handleSubmit}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Date Of Anniversary</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <DatePicker
                    required
                    placeholder="Pick from calendar view"
                    className="InputFrame"
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.dateOfAnniversary}
                    onChange={(date) => {
                      let errors = this.state.errors
                      if (
                        getYear(date).toString().length == 4 &&
                        date <= new Date()
                      ) {
                        errors.dateOfAnniversary = ''
                        this.setState({ dateOfAnniversary: date, errors })
                      } else {
                        errors.dateOfAnniversary = 'Invalid Date of Anniversary'
                        this.setState({ errors })
                      }
                    }}
                  />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.dateOfAnniversary}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Name Of Person</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="InputFrame"
                  value={this.state.nameOfDead}
                  placeholder="Please enter Name of Dead"
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ name: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.name}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">WhatsApp Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  placeholder="Please enter WhatsApp Number"
                  value={this.state.whatsappNumber}
                  required
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.handleChange(e)
                      this.setState({ whatsappNumber: e.target.value })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.whatsappNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Calling Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="callingNumber"
                  name="callingNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  placeholder="Please enter Calling Number"
                  value={this.state.callingNumber}
                  required
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.handleChange(e)
                      this.setState({ callingNumber: e.target.value })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.callingNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Status</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ isVIP: 'yes' })}
                    >
                      <span
                        className={
                          this.state.isVIP === 'yes' ? 'checked' : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Yes</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ isVIP: 'no' })}
                    >
                      <span
                        className={
                          this.state.isVIP === 'no' ? 'checked' : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">No</p>
                  </div>
                </div>

                <input type="submit" value="Submit" className="BtnSubmit" />
              </form>
            </div>
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className="emptyDiv" />
      </div>
    )
  }
}

export default Anniversary
