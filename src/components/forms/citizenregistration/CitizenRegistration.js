import React, { Component } from 'react';
import '../citizenregistration/CitizenRegistration.css';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import CopyrightFooter from '../../footer/CopyrightFooter';
import EventsB from '../../../utils/images/manageeventB.svg';
import politicalEvents from '../../../utils/images/politicalEvent.svg';
import JobsB from '../../../utils/images/managejobB.svg';
import MPLAD from '../../../utils/images/MPLAD.svg';
import ComplaintB from '../../../utils/images/managecomplaintB.svg';
import Letter from '../../../utils/images/letters.svg';
import PNR from '../../../utils/images/PNR.svg';
import { validEmailRegex, validNumberRegex } from '../../../utils/validations';
class Citizen extends Component {
  constructor(props) {
    super(props);
    document.title = 'User Registration';
    console.log('Props history', this.props);

    this.state = {
      OTP: '',
      otpRequesting: false,
      otpSendingSuceess: null,
      otpSendingError: null,
      otpValidationRequest: false,
      otpValidationSuccess: null,
      otpValidationFailure: null,
      otpValid: false,
      otpSent: false,
      firstName: '',
      lastName: '',
      emailId: '',
      whatsappNumber: '',
      address: '',
      requesttype: 'complaint',
      pincode: '',
      citizentype: 'new',
      timer: 30,
      showTimer: false,

      //NEW STATES ADDED
      recommendedName: '',
      recommendedNumber: '',
      callingNumber: '',
      errors: {
        firstName: '',
        lastName: '',
        address: '',
        pincode: '',
      },
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstName':
        errors.firstName =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'lastName':
        errors.lastName = value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'address':
        errors.address = value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'emailId':
        errors.emailId = validEmailRegex.test(value)
          ? ''
          : 'Email is not valid!';
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  render() {
    const handleNewCitizenSubmit = (event) => {
      console.log('hey there!!');
      const {
        recommendedName,
        recommendedNumber,
        callingNumber,
        whatsappNumber,
        firstName,
        lastName,
        requesttype,
        emailId,
        address,
        pincode,
      } = this.state;
      const citizenData = {
        recommendedName,
        recommendedNumber,
        callingNumber,
        whatsappNumber,
        firstName,
        lastName,
        requesttype,
        emailId,
        address,
        pincode,
      };

      this.props.history.push({
        pathname: `/${requesttype}`,
        state: { citizen: citizenData },
      });
    };

    return (
      <div className='NewClientForm'>
        <Header />
        <div className='frame'>
          <div className='FormOuterFrame'>
            <div className='DivHeading'>
              <p className='TxtHeading'>User Registration</p>
            </div>
            <div className='FormFrame'>
              <form onSubmit={handleNewCitizenSubmit}>
                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Reference Name</p>
                </div>
                <input
                  type='text'
                  id='recommendedName'
                  className='InputFrame'
                  placeholder='Please enter name'
                  value={this.state.recommendedName}
                  onChange={(e) =>
                    this.setState({ recommendedName: e.target.value })
                  }
                />
                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Reference Calling Number</p>
                </div>
                <input
                  type='tel'
                  id='mobilenumber'
                  className='InputFrame'
                  placeholder='Please enter mobile number'
                  value={this.state.recommendedNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ recommendedNumber: e.target.value });
                    }
                  }}
                />

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Applicant Name</p>
                  <p className='TxtStar'>*</p>
                </div>
                <input
                  type='text'
                  id='firstname'
                  name='firstName'
                  className='InputFrame'
                  placeholder='Please enter name'
                  value={this.state.firstName}
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ firstName: e.target.value });
                  }}
                />
                <span className='validation-error-message'>
                  {this.state.errors.firstName}
                </span>

                {/* <div className="TxtInputFrame">
                  <p className="TxtInput">Applicant Last Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  className="InputFrame"
                  placeholder="Please enter last name"
                  value={this.state.lastName}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ lastName: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.lastName}
                </span> */}

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Applicant Calling Number</p>
                </div>
                <input
                  type='tel'
                  id='callingNumber'
                  name='callingNumber'
                  className='InputFrame'
                  placeholder='Please enter calling number'
                  value={this.state.callingNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ callingNumber: e.target.value });
                    }
                  }}
                />

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Applicant Whatsapp Number</p>
                </div>
                <input
                  type='tel'
                  id='whatsappnumber'
                  className='InputFrame'
                  placeholder='Please enter whatsapp number'
                  value={this.state.whatsappNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ whatsappNumber: e.target.value });
                    }
                  }}
                />

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Email ID</p>
                </div>
                <input
                  type='email'
                  id='email'
                  name='emailId'
                  className='InputFrame'
                  value={this.state.emailId}
                  placeholder='Please enter email'
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ emailId: e.target.value });
                  }}
                />

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Address</p>
                  <p className='TxtStar'>*</p>
                </div>
                <input
                  type='text'
                  id='address'
                  name='address'
                  placeholder='Please enter address'
                  className='InputFrame'
                  value={this.state.address}
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ address: e.target.value });
                  }}
                />
                <span className='validation-error-message'>
                  {this.state.errors.address}
                </span>

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Pincode</p>
                </div>
                <input
                  type='number'
                  id='pincode'
                  name='pincode'
                  placeholder='Please enter pincode'
                  className='InputFrame'
                  value={this.state.pincode}
                  maxLength= '6'
                  onChange={(e) => {
                    if (
                          (validNumberRegex.test(e.target.value) ||
                            e.target.value === "") &&
                          e.target.value.length <= 6
                        ) {
                          this.handleChange(e);
                          this.setState({ pincode: e.target.value });
                        }
                  }}
                />

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Select the type of request</p>
                  <p className='TxtStar'>*</p>
                </div>

                <div className='Requestdiv'>
                  <div className='RequestLayout margRight'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() =>
                        this.setState({ requesttype: 'complaint' })
                      }
                    >
                      <span
                        className={
                          this.state.requesttype === 'complaint'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'complaint'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      Complaint
                    </p>
                    <img src={ComplaintB} alt='' className='RequestImg' />
                  </div>
                  <div className='RequestLayout margLeft margRight'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() => this.setState({ requesttype: 'job' })}
                    >
                      <span
                        className={
                          this.state.requesttype === 'job'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'job'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      Jobs
                    </p>
                    <img src={JobsB} alt='' className='RequestImg' />
                  </div>
                  <div className='RequestLayout margLeft'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() => this.setState({ requesttype: 'event' })}
                    >
                      <span
                        className={
                          this.state.requesttype === 'event'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'event'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      Events
                    </p>
                    <img src={EventsB} alt='' className='RequestImg' />
                  </div>

                  <div className='RequestLayout margRight'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() =>
                        this.setState({ requesttype: 'politicalevent' })
                      }
                    >
                      <span
                        className={
                          this.state.requesttype === 'politicalevent'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'politicalevent'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      Political Events
                    </p>
                    <img src={politicalEvents} alt='' className='RequestImg' />
                  </div>

                  <div className='RequestLayout margLeft margRight'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() => this.setState({ requesttype: 'mplad' })}
                    >
                      <span
                        className={
                          this.state.requesttype === 'mplad'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'mplad'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      MPLAD
                    </p>
                    <img src={MPLAD} alt='' className='RequestImg' />
                  </div>

                  <div className='RequestLayout margLeft'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() => this.setState({ requesttype: 'pnr' })}
                    >
                      <span
                        className={
                          this.state.requesttype === 'pnr'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'pnr'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      PNR
                    </p>
                    <img src={PNR} alt='' className='RequestImg' />
                  </div>

                  <div className='RequestLayout margRight'>
                    <label
                      className='radiobuttonrequest'
                      onClick={() => this.setState({ requesttype: 'letter' })}
                    >
                      <span
                        className={
                          this.state.requesttype === 'letter'
                            ? 'checkedrequest'
                            : 'uncheckedrequest'
                        }
                      />
                    </label>
                    <p
                      className={
                        this.state.requesttype === 'letter'
                          ? 'SelectedRequestTxt'
                          : 'RequestRadioTxt'
                      }
                    >
                      Letters
                    </p>
                    <img src={Letter} alt='' className='RequestImg' />
                  </div>
                </div>

                <input
                  type='submit'
                  value='Next'
                  className='BtnSubmit'
                />
              </form>
            </div>
          </div>
          <div className='DashboardFooter'>
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className='emptyDiv' />
      </div>
    );
  }
}
export default Citizen;
