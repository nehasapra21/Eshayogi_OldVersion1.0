import React, { Component } from 'react';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import CopyrightFooter from '../../footer/CopyrightFooter';
import '../newclient/NewClient.css';
import { Helmet } from 'react-helmet';
import api from '.././../../utils/api';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Trash from '../../../utils/images/trash.svg';
import Attach from '../../../utils/images/attach.svg';
import { toast } from 'react-toastify';
import {
  validEmailRegex,
  validationFailed,
  getYear,
} from '../../../utils/validations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class NewUser extends Component {
  constructor(props) {
    super(props);

    const { orgId, byUser } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data;

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      emailId: '',
      mobileNumber: '',
      officelocations: [],
      selectedofficelocation: '',
      startdate: '',
      enddate: '',
      status: 'active',
      officeincharge: 'yes',
      role: 'USER',
      orgId: orgId,
      byUser: byUser,
      locationsLoaded: false,
      ImageFormData: new FormData(),
      image: null,
      passwordType: 'password',
      errors: {
        firstName: '',
        lastName: '',
        password: '',
        emailId: '',
        mobileNumber: '',
        selectedofficelocation: '',
        startDate: '',
        endDate: '',
      },
      passwordIcon: faEye,
      confirmPasswordIcon: faEye,
    };
    this.ref = React.createRef();
  }

  onFileChange = (event) => {
    let file = event.target.files[0];
    if (file.size < 1048576) {
      this.setState({ image: file }, () => {
        console.log('========62', this.state.image);
      });
    } else {
      toast.error('File Size Exceeds');
    }
  };

  fileData = () => {
    if (this.state.image) {
      return (
        <div className='SelectedItemFrame'>
          <img
            src={Trash}
            alt=''
            className='AttachFile'
            onClick={(e) => {
              this.setState({ image: null });
            }}
          />
          <p className='TxtBrowse'>{this.state.image.name}</p>
        </div>
      );
    }
  };

  handleEyeClick = (inputId) => {
    let type = document.querySelector(`#${inputId}`).getAttribute('type');
    if (type === 'password') {
      type = 'text';
      if (inputId === 'password') {
        this.setState({ passwordIcon: faEyeSlash });
      } else {
        this.setState({ confirmPasswordIcon: faEyeSlash });
      }
    } else {
      type = 'password';
      if (inputId === 'password') {
        this.setState({ passwordIcon: faEye });
      } else {
        this.setState({ confirmPasswordIcon: faEye });
      }
    }
    document.querySelector(`#${inputId}`).setAttribute('type', type);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var x = event.target[3].value;
    var y = event.target[4].value;

    if (validationFailed(this.state.errors)) {
      toast.error('One or more fields are incorrect');
    } else {
      if (x != y) {
        toast.error('Password Mismatch');
      } else {
        this.createNewUser(this.state);
      }
    }
  };

  componentDidMount() {
    const values = {
      limit: '100',
      offset: '0',
    };
    api.getLocations(values).then(
      (response) => {
        if (response.ok) {
          if (response.data.error) {
            this.props.history.push({
              pathname: '/officelocation/add-new',
            });
            toast.error('No Location found. Need atleast one location', {
              autoClose: 1500,
              closeButton: false,
            });
          } else {
            this.setState({
              officelocations: response.data.data.rows,
              locationsLoaded: true,
            });
          }
        } else {
          // console.log("response not ok", response);
        }
      },
      (err) => {
        // console.log("err", err);
      }
    );
  }

  createNewUser(userDetails) {
    let imageData = '';
    async function Main(props) {
      // console.log("trying to create user with values ", userDetails);
      const {
        firstName,
        lastName,
        emailId,
        mobileNumber,
        password,
        officeincharge,
        orgId,
        status,
        byUser,
        role,
        selectedofficelocation,
        startdate,
        enddate,
        image,
        ImageFormData,
      } = userDetails;

      /*let pickedRole = 'user'
    
            if (role === 'admin'){
                if (officeincharge === 'yes') {
                    pickedRole = 'office-incharge';
                }
                else {
                    pickedRole = 'office-level-admin'
                }
            }
            else {
                pickedRole = 'user'
            }*/
      if (image) {
        ImageFormData.append('file', image);

        await api.uploadFile(ImageFormData).then(
          (response) => {
            if (response.ok) {
              imageData = response.data.data;
            } else {
              // console.log(response);
            }
          },
          (err) => {
            // console.log("err", err);
          }
        );
      }

      api
        .createUser(
          /*pickedRole ,*/ {
            firstName,
            lastName,
            mobileNumber,
            emailId,
            password,
            location: selectedofficelocation[0],
            isActive: true,
            orgId,
            byUser,
            role,
            img: imageData,
          }
        )
        .then(
          (response) => {
            console.log('User console', response);
            if (response.ok) {
              if (response.data.error) {
                toast.error('User already exist', {
                  autoClose: 1250,
                  closeButton: false,
                });
              } else {
                toast.success('New User is created successfully');
                props.history.push('/search-database');
              }
            }
          },
          (err) => {
            // console.log(err);
            toast.error('Unkonwn Error');
          }
        );
    }
    Main(this.props);
  }

  handleChange = (event) => {
    var x = document.getElementById('passwordconfirm');
    x.addEventListener('blur', function () {
      var firstpassword = document.getElementById('passwordconfirm').value;
      var confirmpassword = document.getElementById('password').value;

      if (firstpassword != confirmpassword) {
        document.getElementById('passwordconfirm').style.borderColor = 'red';
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('passwordmis').innerHTML = 'Password Mismatch!';
      } else {
        document.getElementById('passwordconfirm').style.borderColor =
          '#e3e3e8';
        document.getElementById('password').style.borderColor = '#e3e3e8';
        document.getElementById('passwordmis').innerHTML = '';
      }
      // Do whatever you want with the input
    });
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
      case 'mobileNumber':
        errors.mobileNumber =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      case 'emailId':
        errors.emailId = validEmailRegex.test(value)
          ? ''
          : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';

        break;
      case 'selectedofficelocation':
        errors.selectedofficelocation =
          value.length === 0 ? 'This is a required field.' : '';
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  render() {
    const { orgId } = this.state;

    if (orgId) {
      return (
        <>
          <Helmet>
            <title>New User</title>
          </Helmet>

          <div className='NewClientForm'>
            <Header />
            <div className='frame'>
              <div className='FormOuterFrame'>
                <div className='DivHeading'>
                  <p className='TxtHeading'>New User</p>
                </div>
                <div className='FormFrame'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>First Name</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='firstname'
                      name='firstName'
                      className='InputFrame'
                      placeholder='Please enter first name'
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

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Last Name</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='text'
                      id='lastname'
                      name='lastName'
                      className='InputFrame'
                      value={this.state.lastName}
                      placeholder='Please enter last name'
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ lastName: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.lastName}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Mobile Number</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='number'
                      id='mobilenumber'
                      name='mobileNumber'
                      className='InputFrame'
                      maxLength='10'
                      minLength='10'
                      placeholder='Please enter mobile number'
                      value={this.state.mobileNumber}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        e.target.value.length <= 10
                          ? this.setState({ mobileNumber: e.target.value })
                          : this.handleChange(e);
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.mobileNumber}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'> Password</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      style={{ marginBottom: '10px' }}
                      type='password'
                      id='password'
                      name='password'
                      className='InputFrame'
                      value={this.state.password}
                      required
                      placeholder='Please enter password'
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ password: e.target.value });
                      }}
                    />

                    <FontAwesomeIcon
                      className='eye-button2'
                      id='passwordIcon'
                      onClick={() => this.handleEyeClick('password')}
                      icon={this.state.passwordIcon}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.password}
                    </span>

                    {/* confirm password */}

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'> Confirm Password</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      style={{ marginBottom: '10px' }}
                      type='password'
                      id='passwordconfirm'
                      name='passwordconfirm'
                      className='InputFrame'
                      value={this.state.passwordconfirm}
                      required
                      placeholder='Please  confirm your password'
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ passwordconfirm: e.target.value });
                      }}
                    />
                    <FontAwesomeIcon
                      className='eye-button2'
                      id='confirmPasswordIcon'
                      onClick={() => this.handleEyeClick('passwordconfirm')}
                      icon={this.state.confirmPasswordIcon}
                    />
                    <span
                      className='validation-error-message'
                      id='passwordmis'
                    ></span>
                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Email ID</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <input
                      type='email'
                      id='email'
                      name='emailId'
                      placeholder='Please enter email'
                      className='InputFrame'
                      value={this.state.emailId}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ emailId: e.target.value });
                      }}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.emailId}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Location</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <Typeahead
                      id='basic-typeahead-single'
                      name='selectedofficelocation'
                      inputProps={{ required: true }}
                      labelKey='name'
                      style={{ marginBottom: '30px' }}
                      placeholder='Please enter location'
                      onChange={(event) => {
                        this.setState({ selectedofficelocation: event });
                      }}
                      options={this.state.officelocations}
                      selected={this.state.selectedofficelocation}
                    />
                    <span className='validation-error-message'>
                      {this.state.errors.selectedofficelocation}
                    </span>
                    <p className='TxtInput'>
                      User Image <span>(max size : 10mb)</span>
                    </p>
                    {this.fileData()}
                    <input
                      type='file'
                      onChange={this.onFileChange}
                      ref={this.ref}
                      className='FileInput'
                    />
                    <div
                      className='SelectFile'
                      onClick={() => {
                        this.ref.current.click();
                      }}
                    >
                      <img src={Attach} alt='' className='AttachFile' />
                      <p className='TxtBrowse'>Browse Files</p>
                    </div>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Start Date</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <div>
                      <DatePicker
                        dateFormat='dd/MM/yyyy'
                        required
                        placeholder='Pick from calendar view'
                        className='InputFrame'
                        selected={this.state.startdate}
                        onChange={(date) => {
                          let errors = this.state.errors;
                          if (getYear(date).toString().length == 4) {
                            errors.startDate = '';
                            this.setState({ startdate: date, errors });
                          } else {
                            errors.startDate = 'Invalid Year';
                            this.setState({ errors });
                          }
                        }}
                      />
                    </div>
                    <span className='validation-error-message'>
                      {this.state.errors.startDate}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>End Date</p>
                      {/* <p className="TxtStar">*</p> */}
                    </div>
                    <div>
                      <DatePicker
                        dateFormat='dd/MM/yyyy'
                        placeholder='Pick from calendar view'
                        minDate={this.state.startdate}
                        className='InputFrame'
                        selected={this.state.enddate}
                        onChange={(date) => {
                          let errors = this.state.errors;
                          if (getYear(date).toString().length == 4) {
                            errors.endDate = '';
                            this.setState({ enddate: date, errors });
                          } else {
                            errors.endDate = 'Invalid Year';
                            this.setState({ errors });
                          }
                        }}
                      />
                    </div>
                    <span className='validation-error-message'>
                      {this.state.errors.endDate}
                    </span>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Status</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                      <div className='SelectRadio'>
                        <label
                          className='radiobutton'
                          onClick={() => this.setState({ status: 'active' })}
                        >
                          <span
                            className={
                              this.state.status === 'active'
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                        </label>
                        <p className='TxtRadioInput'>Active</p>
                      </div>
                      <div className='SelectRadio'>
                        <label
                          className='radiobutton'
                          onClick={() => this.setState({ status: 'inactive' })}
                        >
                          <span
                            className={
                              this.state.status === 'inactive'
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                        </label>
                        <p className='TxtRadioInput'>Inactive</p>
                      </div>
                    </div>

                    <div className='TxtInputFrame'>
                      <p className='TxtInput'>Role</p>
                      <p className='TxtStar'>*</p>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                      {
                        <div className='SelectRadio'>
                          <label
                            className='radiobutton'
                            onClick={() => this.setState({ role: 'ADMIN' })}
                          >
                            <span
                              className={
                                this.state.role === 'ADMIN'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          </label>
                          <p className='TxtRadioInput'>Admin</p>
                        </div>
                      }
                      <div className='SelectRadio'>
                        <label
                          className='radiobutton'
                          onClick={() => this.setState({ role: 'USER' })}
                        >
                          <span
                            className={
                              this.state.role === 'USER'
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                        </label>
                        <p className='TxtRadioInput'>User</p>
                      </div>
                      <div className='SelectRadio'>
                        <label
                          className='radiobutton'
                          onClick={() => this.setState({ role: 'ASPTAL_USER' })}
                        >
                          <span
                            className={
                              this.state.role === 'ASPTAL_USER'
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                        </label>
                        <p className='TxtRadioInput'>Asptal</p>
                      </div>
                    </div>

                    {this.state.role === 'ADMIN' ? (
                      <div>
                        <div className='TxtInputFrame'>
                          <p className='TxtInput'>
                            Is the admin also office incharge?
                          </p>
                          <p className='TxtStar'>*</p>
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                          {
                            <div className='SelectRadio'>
                              <label
                                className='radiobutton'
                                onClick={() =>
                                  this.setState({ officeincharge: 'yes' })
                                }
                              >
                                <span
                                  className={
                                    this.state.officeincharge === 'yes'
                                      ? 'checked'
                                      : 'unchecked'
                                  }
                                />
                              </label>
                              <p className='TxtRadioInput'>Yes</p>
                            </div>
                          }
                          <div className='SelectRadio'>
                            <label
                              className='radiobutton'
                              onClick={() =>
                                this.setState({ officeincharge: 'no' })
                              }
                            >
                              <span
                                className={
                                  this.state.officeincharge === 'no'
                                    ? 'checked'
                                    : 'unchecked'
                                }
                              />
                            </label>
                            <p className='TxtRadioInput'>No</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}

                    <input
                      type='submit'
                      value='Submit'
                      className='BtnSubmit'
                      disabled={validationFailed(this.state.errors)}
                    />
                  </form>
                </div>
              </div>
              <br></br>
              <Footer />
              <CopyrightFooter />
            </div>
            <div className='emptyDiv' />
          </div>
        </>
      );
    }
    // TODO: add a loading spinner for better UX
    return <div>Loading</div>;
  }
}
export default NewUser;
