import React, { Component } from 'react'
import Header from '../header/Header'
import { toast } from 'react-toastify'
import api from '../../utils/api'
import { validNumberRegex } from '../../utils/validations'
import DatePicker from 'react-datepicker'
import { getYear, validEmailRegex } from '../../utils/validations'
import { Typeahead } from 'react-bootstrap-typeahead'

class CallerForm extends Component {
  constructor(props) {
    super(props)
    if (this.props.location.state) {
      this.state = {
        ...this.props.location.state,
        isUpdateRequest: true,
        districtOption: [],
        vidhanSabhaOption: [],
        panchayatOption: [],
        errors: {
          name: '',
          email: '',
          mobileNumber: '',
          whatsappNumber: '',
          district: '',
          panchayat: '',
          vidhanSabha: '',
          remarks: '',
          caller: '',
          address: '',
          purposeOfVisit: '',
          date: '',
          state: '',
        },
      }
    } else {
      this.state = {
        name: '',
        email: '',
        mobileNumber: '',
        whatsappNumber: '',
        district: '',
        panchayat: '',
        vidhanSabha: '',
        remarks: '',
        caller: 'CONSTITUENCY',
        address: '',
        purposeOfVisit: '',
        date: '',
        isUpdateRequest: false,
        districtOption: [],
        vidhanSabhaOption: [],
        panchayatOption: [],
        state: '',
        block: '',
        errors: {
          name: '',
          email: '',
          mobileNumber: '',
          whatsappNumber: '',
          district: '',
          panchayat: '',
          vidhanSabha: '',
          remarks: '',
          caller: '',
          address: '',
          purposeOfVisit: '',
          date: '',
          state: '',
        },
      }
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'caller':
        errors.caller = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'date':
        errors.date = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'name':
        errors.name = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'district':
        errors.district = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'panchayat':
        errors.panchayat = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'vidhanSabha':
        errors.vidhanSabha =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'state':
        errors.state = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'mobileNumber':
        errors.mobileNumber =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'whatsappNumber':
        errors.whatsappNumber =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'purposeOfVisit':
        errors.purposeOfVisit = value.length === 249 ? 'Max 250 characters' : ''
        break
      case 'remarks':
        errors.remarks = value.length === 499 ? 'Max 500 characters' : ''
        break
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!'
        break
      case 'designation':
        errors.purposeOfVisit = value.length === 249 ? 'Max 250 characters' : ''
        break
      default:
        break
    }

    this.setState({ errors })
  }

  componentDidMount = () => {
    this.fetchConstituency()
    if (this.state.isUpdateRequest) {
      if (this.state.caller === 'CONSTITUENCY') {
        this.makeVidhanSabha()
        this.makePanchayat()
      }
    }
  }

  componentWillUnmount = () => {
    localStorage.clear('Vidha Sabha')
    localStorage.clear('District')
    localStorage.clear('Panchayat')
  }

  handleAddCaller = () => {
    const { district, vidhanSabha, panchayat } = { ...this.state }
    if (district === '' || vidhanSabha === '' || panchayat === '') {
      toast.error(
        'District, Vidhan Sabha and Panchayat can not be left empty.',
        {
          autoClose: 2000,
          closeButton: false,
        }
      )
      return false
    }

    const callerInfo = { ...this.state }

    delete callerInfo.errors
    delete callerInfo.isUpdateRequest
    delete callerInfo.isUpdateRequest
    delete callerInfo.districtOption
    delete callerInfo.vidhanSabhaOption
    delete callerInfo.panchayatOption
    delete callerInfo.state
    delete callerInfo.block
    delete callerInfo.designation

    api
      .addCaller({
        ...callerInfo,
        meta: {
          state: this.state.state,
          block: this.state.block,
          designation: this.state.designation,
        },
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('Failed To Add Caller', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.success('Registration Successful', {
              autoClose: 1250,
              closeButton: false,
            })
            this.props.history.push({
              pathname: '/manage-calling-directory',
            })
          }
        } else {
          toast.error('Failed To Add Caller', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      })
      .catch((err) => {
        toast.error('Something Went Wrong. Please Refesh.', {
          autoClose: false,
          closeButton: false,
        })
      })
  }

  handleCallerUpdate = (event) => {
    const { district, vidhanSabha, panchayat } = { ...this.state }
    if (district === '' || vidhanSabha === '' || panchayat === '') {
      toast.error(
        'District, Vidhan Sabha and Panchayat can not be left empty.',
        {
          autoClose: 2000,
          closeButton: false,
        }
      )
      return false
    }

    const callerInfo = { ...this.state }

    delete callerInfo.errors
    delete callerInfo.isUpdateRequest
    delete callerInfo.districtOption
    delete callerInfo.vidhanSabhaOption
    delete callerInfo.panchayatOption
    delete callerInfo.state
    delete callerInfo.block
    delete callerInfo.designation

    api
      .updateCaller({
        ...callerInfo,
        meta: {
          state: this.state.state,
          block: this.state.block,
          designation: this.state.designation,
        },
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('Failed To Update Caller', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.success('Update Successful', {
              autoClose: 1250,
              closeButton: false,
            })
            this.props.history.push({
              pathname: '/manage-calling-directory',
            })
          }
        } else {
          toast.error('Failed To Update Caller', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      })
  }

  fetchConstituency = async () => {
    await api
      .getConstituency({
        type: 'Zila Level',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No Disrict found. Please make Disrict first.', {
            autoClose: 1250,
            closeButton: false,
          })
        } else {
          toast.success('District Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'District',
            JSON.stringify(response.data.data.rows)
          )
          this.makeDistrict()
        }
      })
    await api
      .getConstituency({
        type: 'Vidhan Sabha',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(
            'No Vidhan Sabha found. Please make Vidhan Sabha first.',
            {
              autoClose: 1250,
              closeButton: false,
            }
          )
        } else {
          toast.success('Vidhan Sabha Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'Vidhan Sabha',
            JSON.stringify(response.data.data.rows)
          )
        }
      })
    await api
      .getConstituency({
        type: 'Gram Panchayat',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No Panchayat found. Please make Panchayat first.', {
            autoClose: 1250,
            closeButton: false,
          })
        } else {
          toast.success('Panchayat Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'Panchayat',
            JSON.stringify(response.data.data.rows)
          )
        }
      })
  }

  makeDistrict = () => {
    const district = JSON.parse(localStorage.getItem('District'))
    let temp = []
    district.map((data) => {
      temp.push(data.meta.name)
    })
    this.setState({
      districtOption: [...temp],
    })
  }

  makeVidhanSabha = () => {
    const vidhanSabha = JSON.parse(localStorage.getItem('Vidhan Sabha'))
    let temp = []
    vidhanSabha.map((data) => {
      if (data.meta.district === this.state.district) {
        temp.push(data.meta.name)
      }
    })
    if (temp.length === 0) {
      toast.error(
        'No Vidhan Sabha for this district. Please make Vidhan sabha.',
        {
          autoClose: 1500,
          closeButton: false,
        }
      )
    } else {
      this.setState({
        vidhanSabhaOption: [...temp],
      })
    }
  }

  makePanchayat = () => {
    const Panchayat = JSON.parse(localStorage.getItem('Panchayat'))
    let temp = []
    Panchayat.map((data) => {
      if (data.meta.vidhanSabha === this.state.vidhanSabha) {
        temp.push(data.meta.name)
      }
    })
    if (temp.length === 0) {
      toast.error(
        'No Panchayat for this vidhan sabha. Please make Panchayat.',
        {
          autoClose: 1500,
          closeButton: false,
        }
      )
    } else {
      this.setState({
        panchayatOption: [...temp],
      })
    }
  }

  makeLetterCapital = (event) => {
    event.preventDefault()
    let { district, vidhanSabha, panchayat } = { ...this.state }
    if (district.charAt(0) !== district.charAt(0).toUpperCase()) {
      district = district.charAt(0).toUpperCase() + district.slice(1)
    }

    if (vidhanSabha.charAt(0) !== vidhanSabha.charAt(0).toUpperCase()) {
      vidhanSabha = vidhanSabha.charAt(0).toUpperCase() + vidhanSabha.slice(1)
    }
    if (panchayat.charAt(0) !== panchayat.charAt(0).toUpperCase()) {
      panchayat = panchayat.charAt(0).toUpperCase() + panchayat.slice(1)
    }

    this.setState(
      { district: district, vidhanSabha: vidhanSabha, panchayat: panchayat },
      (event) => {
        if (this.state.isUpdateRequest) {
          this.handleCallerUpdate()
        } else {
          this.handleAddCaller()
        }
      }
    )
  }

  render() {
    const { isUpdateRequest } = this.state

    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="TxtHeading">Calling Directory</p>
            </div>
            <div className="FormFrame">
              <form onSubmit={this.makeLetterCapital}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Caller from</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ caller: 'CONSTITUENCY' })}
                    >
                      <span
                        className={
                          this.state.caller === 'CONSTITUENCY'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Constituency</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ caller: 'OTHER' })}
                    >
                      <span
                        className={
                          this.state.caller === 'OTHER'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Other</p>
                  </div>
                </div>
                <span className="validation-error-message">
                  {this.state.errors.caller}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date</p>
                  <p className="TxtStar">*</p>
                </div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  placeholder="Pick from calendar view"
                  className="InputFrame"
                  selected={
                    this.state.date !== '' ? new Date(this.state.date) : ''
                  }
                  onChange={(date) => {
                    let errors = this.state.errors
                    if (getYear(date).toString().length === 4) {
                      errors.date = ''
                      this.setState({ date: date, errors })
                    } else {
                      errors.date = 'Invalid Year'
                      this.setState({ errors })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.date}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Caller Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="InputFrame"
                  placeholder="Please enter caller name"
                  required
                  value={this.state.name}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ name: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.name}
                </span>

                {this.state.caller === 'OTHER' ? (
                  <>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">State</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="InputFrame"
                      placeholder="Please enter State"
                      required
                      value={this.state.state}
                      onChange={(e) => {
                        this.handleChange(e)
                        this.setState({ state: e.target.value })
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.state}
                    </span>
                  </>
                ) : null}

                <div className="TxtInputFrame">
                  <p className="TxtInput">District</p>
                  <p className="TxtStar">*</p>
                </div>
                {this.state.caller === 'CONSTITUENCY' ? (
                  <Typeahead
                    id="district"
                    labelKey="district"
                    placeholder="Please select a District"
                    required
                    onChange={(district) => {
                      this.setState({ district: district[0] }, () =>
                        this.makeVidhanSabha()
                      )
                    }}
                    options={this.state.districtOption}
                    defaultInputValue={this.state.district}
                    style={{ marginBottom: '20px' }}
                  />
                ) : (
                  <input
                    type="text"
                    id="district"
                    name="district"
                    className="InputFrame"
                    placeholder="Please enter District"
                    required
                    value={this.state.district}
                    onChange={(e) => {
                      this.handleChange(e)
                      this.setState({ district: e.target.value })
                    }}
                  />
                )}

                <span className="validation-error-message">
                  {this.state.errors.district}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Vidhan Sabha</p>
                  <p className="TxtStar">*</p>
                </div>
                {this.state.caller === 'CONSTITUENCY' ? (
                  <Typeahead
                    id="vidhanSabha"
                    labelKey="vidhanSabha"
                    placeholder="Please select a Vidhan Sabha"
                    required
                    onChange={(vidhanSabha) => {
                      this.setState({ vidhanSabha: vidhanSabha[0] }, () =>
                        this.makePanchayat()
                      )
                    }}
                    options={this.state.vidhanSabhaOption}
                    defaultInputValue={this.state.vidhanSabha}
                    style={{ marginBottom: '20px' }}
                  />
                ) : (
                  <input
                    type="text"
                    id="vidhanSabha"
                    name="vidhanSabha"
                    className="InputFrame"
                    placeholder="Please enter Vidhan Sabha"
                    required
                    value={this.state.vidhanSabha}
                    onChange={(e) => {
                      this.handleChange(e)
                      this.setState({ vidhanSabha: e.target.value })
                    }}
                  />
                )}

                <span className="validation-error-message">
                  {this.state.errors.vidhanSabha}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Panchayat</p>
                  <p className="TxtStar">*</p>
                </div>
                {this.state.caller === 'CONSTITUENCY' ? (
                  <Typeahead
                    id="panchayat"
                    labelKey="panchayat"
                    placeholder="Please select a Panchayat"
                    required
                    onChange={(panchayat) => {
                      this.setState({ panchayat: panchayat[0] })
                    }}
                    options={this.state.panchayatOption}
                    defaultInputValue={this.state.panchayat}
                    style={{ marginBottom: '20px' }}
                  />
                ) : (
                  <input
                    type="text"
                    id="panchayat"
                    name="panchayat"
                    className="InputFrame"
                    placeholder="Please enter Panchayat"
                    required
                    value={this.state.panchayat}
                    onChange={(e) => {
                      this.handleChange(e)
                      this.setState({ panchayat: e.target.value })
                    }}
                  />
                )}

                <span className="validation-error-message">
                  {this.state.errors.panchayat}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Block</p>
                </div>
                <input
                  type="text"
                  id="block"
                  name="block"
                  className="InputFrame"
                  placeholder="Please enter Block"
                  required
                  value={this.state.block}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ block: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Address</p>
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="InputFrame"
                  placeholder="Please enter address"
                  value={this.state.address}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ address: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Mobile Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="InputFrame"
                  placeholder="Please enter mobile number"
                  required
                  value={this.state.mobileNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.handleChange(e)
                      this.setState({ mobileNumber: e.target.value })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.mobileNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Whatsapp Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  className="InputFrame"
                  placeholder="Please enter whatsapp number"
                  required
                  value={this.state.whatsappNumber}
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
                  <p className="TxtInput">Email ID</p>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  className="InputFrame"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ email: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.email}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Purpose of Call</p>
                </div>
                <textarea
                  type="text"
                  id="purposeOfVisit"
                  name="purposeOfVisit"
                  className="InputFrame"
                  placeholder="Enter your purpose"
                  rows="5"
                  maxLength="251"
                  value={this.state.purposeOfVisit}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ purposeOfVisit: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Remarks</p>
                </div>
                <textarea
                  type="text"
                  id="remarks"
                  name="remarks"
                  className="InputFrame"
                  placeholder="Enter Reamarks. Max 500 characters."
                  rows="10"
                  maxLength="500"
                  value={this.state.remarks}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ remarks: e.target.value })
                  }}
                />

                {isUpdateRequest === false ? (
                  <input type="submit" value="Submit" className="BtnSubmit" />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '40px',
                    }}
                  >
                    <button
                      type="button"
                      className="PrintBtn UpdateButton"
                      onClick={(event) => {
                        this.makeLetterCapital(event)
                      }}
                    >
                      Update
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CallerForm
