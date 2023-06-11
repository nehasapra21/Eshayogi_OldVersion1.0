import React, { Component, Fragment } from 'react';
import Header from '../header/Header';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { validNumberRegex } from '../../utils/validations';
//import { CloseButton } from 'react-toastify/dist/components'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg';

class DirectoryForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state) {
      console.log('111111111111111111', this.props.location.state);
      this.state = {
        ...this.props.location.state,
        errors: {
          callerName: '',
          callerNumber: '',
          callerState: '',
          callerAddress: '',
          callerPincode: '',
          callerConstituency: '',
          callerBlock: '',
          callerGramPanchayat: '',
          callerAddress: '',
          callerPurpose: '',
        },
      };
    } else {
      this.state = {
        callerFrom: 'constituency',
        isUpdateRequest: false,
        callerName: '',
        callerNumber: '',
        callerPurpose: '',
        callerState: '',
        callerPincode: '',
        callerAddress: '',
        callerConstituency: '',
        callerVidhanSabha: '',
        callerBlock: '',
        callerGramPanchayat: '',
        callerMeet: 'Talk',
        errors: {
          callerName: '',
          callerNumber: '',
          callerState: '',
          callerAddress: '',
          callerPincode: '',
          callerConstituency: '',
          callerBlock: '',
          callerGramPanchayat: '',
          callerAddress: '',
          callerPurpose: '',
        },
      };
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'callerName':
        errors.callerName =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerNumber':
        errors.callerNumber =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerState':
        errors.callerState =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerAddress':
        errors.callerAddress =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerConstituency':
        errors.callerConstituency =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerBlock':
        errors.callerBlock =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerGramPanchayat':
        errors.callerGramPanchayat =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerAddress':
        errors.callerAddress =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'callerPurpose':
        errors.callerPurpose =
          value.length !== 0
            ? value.length === 249
              ? 'Max 250 characters'
              : value.length === 0
              ? 'This is a required field.'
              : ''
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  render() {
    const {
      callerName,
      callerNumber,
      callerPurpose,
      callerState,
      callerPincode,
      callerAddress,
      callerFrom,
      callerGramPanchayat,
      callerVidhanSabha,
      callerBlock,
      callerConstituency,
      isUpdateRequest,
      id,
      callerMeet,
    } = this.state;

    const handleAddCallingDirectorySubmit = (event) => {
      event.preventDefault();
      const meta = {
        state: callerState,
        pinCode: callerPincode,
        address: callerAddress,
        gramPanchayat: callerGramPanchayat,
        vidhanSabha: callerVidhanSabha,
        block: callerBlock,
        constituency: callerConstituency,
        callerMeet: callerMeet,
      };
      api
        .addCallingDirectory({
          name: callerName,
          mobileNumber: callerNumber,
          callerFrom: callerFrom,
          purpose: callerPurpose,
          meta: { ...meta },
        })
        .then((response) => {
          if (response.ok) {
            console.log('CallingDirectory created successfully', response);
            toast.success('Registration Successful', {
              autoClose: 1250,
              closeButton: false,
            });

            this.setState({
              callerFrom: 'constituency',
              isUpdateRequest: false,
              callerName: '',
              callerNumber: '',
              callerPurpose: '',
              callerState: '',
              callerPincode: '',
              callerAddress: '',
            });
            this.props.history.push({
              pathname: '/manage-calling-directory',
            });
          } else {
            toast.error('Error occured', {
              autoClose: 1250,
              closeButton: false,
            });
            console.log('Something wrong', response);
          }
        });
    };

    const handleAddCallingDirectoryUpdate = (event) => {
      const meta = {
        state: callerState,
        pinCode: callerPincode,
        address: callerAddress,
        gramPanchayat: callerGramPanchayat,
        vidhanSabha: callerVidhanSabha,
        block: callerBlock,
        constituency: callerConstituency,
        callerMeet: callerMeet,
      };
      api
        .updateCallingDirectory({
          id: id,
          name: callerName,
          mobileNumber: callerNumber,
          callerFrom: callerFrom,
          purpose: callerPurpose,
          meta: { ...meta },
        })
        .then((response) => {
          if (response.ok) {
            console.log('CallingDirectory updated successfully', response);
            toast.success('Updated Successful', {
              autoClose: 1250,
              closeButton: false,
            });
            this.props.history.push({
              pathname: '/manage-calling-directory',
            });
          } else {
            toast.error('Error occured', {
              autoClose: 1250,
              closeButton: false,
            });
            console.log('Something wrong', response);
          }
        });
    };

    return (
      <div className='NewClientForm'>
        <Header />
        <div className='frame'>
          <div className='FormOuterFrame'>
            <div className='DivHeading'>
              <img
                src={backIcon}
                alt=''
                className='backIcon'
                onClick={() => this.props.history.goBack()}
              ></img>
              <p className='TxtHeading'>Calling Directory</p>
            </div>
            <div className='FormFrame'>
              <form onSubmit={handleAddCallingDirectorySubmit}>
                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Caller Name</p>
                  <p className='TxtStar'>*</p>
                </div>
                <input
                  type='text'
                  id='callerName'
                  name='callerName'
                  className='InputFrame'
                  placeholder='Please enter caller name'
                  required
                  value={callerName}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ callerName: e.target.value });
                  }}
                />
                <span className='validation-error-message'>
                  {this.state.errors.callerName}
                </span>

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Mobile Number</p>
                  <p className='TxtStar'>*</p>
                </div>
                <input
                  type='text'
                  id='callerNumber'
                  name='callerNumber'
                  className='InputFrame'
                  placeholder='Please enter mobile number'
                  required
                  value={callerNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === '') &&
                      e.target.value.length <= 10
                    ) {
                      this.handleChange(e);
                      this.setState({ callerNumber: e.target.value });
                    }
                  }}
                />
                <span className='validation-error-message'>
                  {this.state.errors.callerNumber}
                </span>

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Caller From</p>
                  <p className='TxtStar'>*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className='SelectRadio'>
                    <label
                      className='radiobutton'
                      onClick={() =>
                        this.setState({
                          callerFrom: 'constituency',
                          callerState: '',
                          callerPincode: '',
                          callerPurpose: '',
                          callerAddress: '',
                        })
                      }
                    >
                      <span
                        className={
                          callerFrom === 'constituency'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className='TxtRadioInput'>Constituency</p>
                  </div>
                  <div className='SelectRadio'>
                    <label
                      className='radiobutton'
                      onClick={() =>
                        this.setState({
                          callerFrom: 'other',
                          callerPurpose: '',
                          callerAddress: '',
                          callerConstituency: '',
                          callerVidhanSabha: '',
                          callerBlock: '',
                          callerGramPanchayat: '',
                        })
                      }
                    >
                      <span
                        className={
                          callerFrom === 'other' ? 'checked' : 'unchecked'
                        }
                      />
                    </label>
                    <p className='TxtRadioInput'>Other</p>
                  </div>
                </div>

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Wants To ?</p>
                  <p className='TxtStar'>*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className='SelectRadio'>
                    <label
                      className='radiobutton'
                      onClick={() =>
                        this.setState({
                          callerMeet: 'Talk',
                        })
                      }
                    >
                      <span
                        className={
                          callerMeet === 'Talk' ? 'checked' : 'unchecked'
                        }
                      />
                    </label>
                    <p className='TxtRadioInput'>Talk</p>
                  </div>
                  <div className='SelectRadio'>
                    <label
                      className='radiobutton'
                      onClick={() =>
                        this.setState({
                          callerMeet: 'Meet',
                        })
                      }
                    >
                      <span
                        className={
                          callerMeet === 'Meet' ? 'checked' : 'unchecked'
                        }
                      />
                    </label>
                    <p className='TxtRadioInput'>Meet</p>
                  </div>
                </div>

                {callerFrom === 'other' ? (
                  <Fragment>
                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>State</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='callerState'
                      name='callerState'
                      className='InputFrame'
                      placeholder='Please enter state'
                      required
                      value={callerState}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerState: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerState}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Address</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='callerAddress'
                      name='callerAddress'
                      className='InputFrame'
                      placeholder='Please enter address'
                      required
                      value={callerAddress}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerAddress: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerAddress}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Pincode</p>
                    </div>
                    <input
                      type='number'
                      id='callerPincode'
                      name='callerPincode'
                      className='InputFrame'
                      placeholder='Please enter pincode'
                      value={callerPincode}
                      onChange={(e) => {
                        if (
                          (validNumberRegex.test(e.target.value) ||
                            e.target.value === '') &&
                          e.target.value.length <= 6
                        ) {
                          this.handleChange(e);
                          this.setState({ callerPincode: e.target.value });
                        }
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerPincode}
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Constituency</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='callerAddress'
                      name='callerConstituency'
                      className='InputFrame'
                      placeholder='Please enter'
                      required
                      value={callerConstituency}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerConstituency: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerConstituency}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Vidhan Sabha</p>
                    </div>
                    <input
                      type='text'
                      id='callerAddress'
                      name='callerVidhanSabha'
                      className='InputFrame'
                      placeholder='Please enter '
                      value={callerVidhanSabha}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerVidhanSabha: e.target.value });
                      }}
                    />

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Block</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='callerAddress'
                      name='callerBlock'
                      className='InputFrame'
                      placeholder='Please enter'
                      required
                      value={callerBlock}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerBlock: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerBlock}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Gram Panchayat</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='callerAddress'
                      name='callerGramPanchayat'
                      className='InputFrame'
                      placeholder='Please enter'
                      required
                      value={callerGramPanchayat}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerGramPanchayat: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerGramPanchayat}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Address</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='callerAddress'
                      name='callerAddress'
                      className='InputFrame'
                      placeholder='Please enter address'
                      required
                      value={callerAddress}
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ callerAddress: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.callerAddress}
                    </span>
                  </Fragment>
                )}

                <div className='TxtInputFrame'>
                  <p className='TxtInput'>Purpose</p>
                  <p className='TxtStar'>*</p>
                </div>
                <textarea
                  type='text'
                  id='callerPurpose'
                  name='callerPurpose'
                  className='InputFrame'
                  placeholder='Enter your purpose'
                  rows='8'
                  maxLength='251'
                  required
                  value={callerPurpose}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ callerPurpose: e.target.value });
                  }}
                />

                {isUpdateRequest === false ? (
                  <input type='submit' value='Submit' className='BtnSubmit' />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '40px',
                    }}
                  >
                    <button
                      type='button'
                      className='PrintBtn UpdateButton'
                      onClick={() => {
                        handleAddCallingDirectoryUpdate();
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
    );
  }
}

export default DirectoryForm;
