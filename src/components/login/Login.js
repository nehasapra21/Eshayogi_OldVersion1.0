import React, { Component } from 'react'
import '../login/Login.css'
import Footer from '../footer/Footer'
import { toast } from 'react-toastify'
import Esahyogi from '../../utils/images/esahyogiwhite.svg'
import IconFooter from '../footer/IconFooter'
import CopyrightFooter from '../footer/CopyrightFooter'
import api from '../../utils/api'
import { Helmet } from 'react-helmet'
import invisible from '../../utils/images/invisible.svg'
import { Redirect } from 'react-router-dom'

import Loader from '../hoc/Loader/Loader'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert'
import { validNumberRegex } from '../../utils/validations'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneno: '',
      password: '',
      otp: '',
      passwordType: 'password',
      alternateMethod: true,
      otpRequesting: false,
      isLoading: true,
      showPasswordIcon: faEye,
    }

    var isSafari =
      navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1

    var isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(
        navigator.userAgent
      )
        ? true
        : false
    // alert(isMobile);

    var isIE = false
    var ua = window.navigator.userAgent
    var old_ie = ua.indexOf('MSIE ')
    var new_ie = ua.indexOf('Trident/')

    var isSafari =
      navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1

    var isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(
        navigator.userAgent
      )
        ? true
        : false
    // alert(isMobile);

    var isIE = false
    var ua = window.navigator.userAgent
    var old_ie = ua.indexOf('MSIE ')
    var new_ie = ua.indexOf('Trident/')

    if (old_ie > -1 || new_ie > -1) {
      isIE = true
    }

    if (isIE || isMobile || isSafari) {
      swal({
        title: 'You Cannot Access',
        text: 'Due to security reason,You cannot access this Webapp in older Browser.\n Kindly use Modern Updated Browser',
        icon: 'error',
        buttons: false,
        dangerMode: true,
        closeOnClickOutside: false,
      })
    }
  }

  componentDidMount() {
    this.setState({ isLoading: false })
  }

  loginRequestPassword(credentials) {
    const { phoneno, password } = credentials
    if (this.state.phoneno.length > 10) {
      toast.error('Phone no.should be of 10 digits.', {
        autoClose: 1250,
        closeButton: false,
      })
    } else {
      this.setState({ isLoading: true })
      api
        .postLogin({ mobileNumber: phoneno, password: password })
        .then((response) => {
          if (response.ok && response.data.code === 'SUCCESS') {
            toast.success('Logged In Successfully!', {
              autoClose: 1250,
              closeButton: false,
            })
            console.log('Login data', response.data)
            const { role, emailId, token } = response.data.data

            if (role.indexOf('SA') > -1) {
              localStorage.setItem(
                'eSahyogiUser',
                JSON.stringify(response.data)
              )
              localStorage.setItem(
                'HomePage',
                JSON.stringify(response.data.data.org)
              )
              this.props.history.push('/superadmin-section')
            } else if (
              role === 'ADMIN' ||
              role === 'USER' ||
              role === 'ASPTAL_USER'
            ) {
              localStorage.setItem(
                'eSahyogiUser',
                JSON.stringify(response.data)
              )
              localStorage.setItem(
                'HomePage',
                JSON.stringify(response.data.data.org)
              )

              if (response.data.data.status === 'PENDING') {
                this.props.history.push({
                  pathname: 'user-agreement',
                })
              } else {
                this.props.history.push({
                  pathname: '/home',
                  state: { data: response.data.data.org },
                })
              }
              return ''
            }
          } else {
            this.setState({ isLoading: false })
            toast.error('Incorrect credentials', {
              autoClose: 1250,
              closeButton: false,
            })
          }
        })
        .catch((err) => {
          console.log('Login error', err)
        })
    }
  }
  loginRequestOTP(credentials) {
    const { phoneno, otp } = credentials
    if (this.state.phoneno.length > 10) {
      toast.error('Phone no.should be of 10 digits.', {
        autoClose: 1250,
        closeButton: false,
      })
    } else {
      this.setState({ isLoading: true })
      api.postLogin({ mobileNumber: phoneno, otp: otp }).then((response) => {
        if (response.ok && response.data.code === 'SUCCESS') {
          toast.success('Logged In Successfully!', {
            autoClose: 1250,
            closeButton: false,
          })
          const { role, emailId, token } = response.data.data

          if (role.indexOf('SA') > -1) {
            localStorage.setItem('eSahyogiUser', JSON.stringify(response.data))
            localStorage.setItem(
              'HomePage',
              JSON.stringify(response.data.data.org)
            )
            this.props.history.push('/superadmin-section')
          } else if (role === 'ADMIN' || role === 'USER') {
            localStorage.setItem('eSahyogiUser', JSON.stringify(response.data))
            localStorage.setItem(
              'HomePage',
              JSON.stringify(response.data.data.org)
            )

            if (response.data.data.status === 'PENDING') {
              this.props.history.push({
                pathname: 'user-agreement',
              })
            } else {
              this.props.history.push({
                pathname: '/home',
                state: { data: response.data.data.org },
              })
            }
            return ''
          }
        } else {
          this.setState({ isLoading: false })
          toast.error('Incorrect credentials', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      })
    }
  }

  handleEyeClick = () => {
    let type = document.querySelector('#password').getAttribute('type')

    if (type === 'password') {
      type = 'text'
      this.setState({ showPasswordIcon: faEyeSlash })
    } else {
      type = 'password'
      this.setState({ showPasswordIcon: faEye })
    }
    document.querySelector('#password').setAttribute('type', type)
  }

  handleLoginDisabled = () => {
    if (this.state.phoneno.length < 10 || this.state.password.length == 0) {
      return true
    }
    return false
  }

  render() {
    document.title = 'Login E-Sahyogi'

    const token = localStorage.getItem('eSahyogiUser')
    let loggedIn = true
    if (token == null) {
      loggedIn = false
      // document.location = "/";
    }

    if (loggedIn) {
      return <Redirect to="/home" />
    }

    const login = (event) => {
      event.preventDefault()
      console.log('hit login')
      this.state.alternateMethod == true
        ? this.loginRequestPassword(this.state)
        : this.loginRequestOTP(this.state)
    }
    const handleMobileNumberfield = (phoneno) => {
      this.setState({ phoneno: phoneno })

      if (phoneno.length === 10) {
        this.setState({ isLoading: true })
        api.generateLoginOtp({ mobileNumber: phoneno }).then(
          (response) => {
            if (response.ok) {
              const { code } = response.data

              if (code === 'SUCCESS') {
                this.setState({ showTimer: true, isLoading: false })
                toast.success('OTP has been sent on your mobile number.', {
                  autoClose: 1250,
                  closeButton: false,
                })

                setInterval(() => {
                  let currentTimer = this.state.timer
                  if (currentTimer !== 0) {
                    this.setState({ timer: currentTimer - 1 })
                  } else return
                }, 1000)
                this.setState({
                  otpRequesting: false,
                })

                return
              } else {
                this.setState({
                  otpRequesting: true,
                  isLoading: false,
                })
                toast.error('No User Found', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            }
            console.log('response not ok', response.data)
          },
          (err) => {
            console.log('err ', err)
          }
        )
      }
    }

    return window.innerWidth > 480 ? (
      <>
        <div className="Backgroundframe">
          <div className="frame">
            <div className="LoginframeBackground">
              <div className="Loginframe">
                <div className="Leftframe">
                  <div className="LeftFrameData">
                    <p className="TxtWelcomeLogin">Welcome to</p>
                    <img src={Esahyogi} alt="" className="ImgEsahyogi" />
                  </div>
                </div>

                <div className="Rightframe">
                  <form onSubmit={login} className="RightFrameForm">
                    <div>
                      <p className="TxtPhoneno">Mobile Number</p>
                    </div>

                    {
                      //this.state.alternateMethod == true ? (}
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          className="InputPhoneno"
                          value={this.state.phoneno}
                          maxLength="10"
                          size="10"
                          onChange={(e) => {
                            if (
                              (validNumberRegex.test(e.target.value) ||
                                e.target.value === '') &&
                              e.target.value.length <= 10
                            ) {
                              this.setState({ phoneno: e.target.value })
                            }
                          }}
                          required
                        />
                        <p className="TxtPhoneno">Password</p>
                        <input
                          type="password"
                          id="password"
                          className="InputPhoneno"
                          value={this.state.password}
                          onChange={(e) => {
                            this.setState({ password: e.target.value })
                          }}
                          required
                        />
                        <FontAwesomeIcon
                          className="loginEyeIcon"
                          id="showPasswordIcon"
                          onClick={() => this.handleEyeClick()}
                          icon={this.state.showPasswordIcon}
                        />
                      </div>
                      /*) : (
                      <div>
                        <input
                          type="number"
                          className="InputPhoneno"
                          value={this.state.phoneno}
                          maxLength="10"
                          minLength="10"
                          onChange={(e) =>
                            handleMobileNumberfield(e.target.value)
                          }
                          required
                        />
                        <p className="TxtPhoneno">OTP</p>
                        <input
                          type="number"
                          className="InputPhoneno"
                          value={this.state.otp}
                          onChange={(e) => {
                            this.setState({ otp: e.target.value })
                          }}
                          required
                        />
                      </div>
                        )*/
                    }

                    <button
                      type="submit"
                      className="BtnLogin"
                      //disabled={this.handleLoginDisabled()}
                    >
                      Login
                    </button>
                    {/*this.state.alternateMethod == true ? (
                      <p
                        className="switchLogin"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          this.setState({ alternateMethod: false })
                        }}
                      >
                        Login Through OTP
                      </p>
                    ) : (
                      <p
                        className="switchLogin"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          this.setState({ alternateMethod: true })
                        }}
                      >
                        Login Through Password
                      </p>
                      )*/}
                  </form>
                </div>
              </div>
            </div>
            <div className="DashboardFooter">
              <IconFooter />
              <Footer />
              <CopyrightFooter />
            </div>
          </div>
          <div className="emptyDiv" />
          {this.state.isLoading ? <Loader /> : null}
        </div>
      </>
    ) : (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="Backgroundframe">
          <div className="Loginframe">
            <div className="Leftframe">
              <img src={Esahyogi} alt="" className="ImgEsahyogi" />
            </div>

            <div className="Rightframe">
              <p className="TxtWelcomeMobile">Welcome to Sahyogi</p>
              <p className="TxtPhoneno">Phone No.</p>
              <input
                type="number"
                className="InputPhoneno"
                value={this.state.phoneno}
                maxLength="10"
                minLength="10"
                onChange={(e) => {
                  this.setState({ phoneno: e.target.value })
                }}
                required
              />
              <p className="TxtPhoneno">Password</p>
              <input
                type="password"
                className="InputPhoneno"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value })
                }}
              />
              <button type="button" onClick={login} className="BtnLogin">
                Login
              </button>
            </div>
            <p className="TxtHelp">
              <a
                className="anchor"
                href="www.esahyogi.theideazfactory.com/help"
              >
                Facing trouble? visit: sahyogi.com
              </a>
              Local Servers
            </p>
          </div>
        </div>
      </>
    )
  }
}
export default Login
