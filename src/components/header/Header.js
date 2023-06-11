import React, { Component, Fragment } from 'react'
import '../header/Header.css'
import Esahyogi from '../../utils/images/esahyogiblue.svg'
import GreyEsahyogi from '../../utils/images/greyEsahyogi.svg'
import GreyDownArrow from '../../utils/images/greyDownArrow.svg'
import DownArrow from '../../utils/images/downarrow.svg'
import Dashboard from '../../utils/HeaderIcons/Dashboard.svg'
import Request from '../../utils/HeaderIcons/AddRequest.svg'
import manageRequest from '../../utils/HeaderIcons/ManageRequest.svg'
import Database from '../../utils/images/userDatabase.svg'
import Language from '../../utils/images/language.svg'
import Logout from '../../utils/images/logout.svg'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import Constituency from '../../utils/HeaderIcons/Constituency.svg'
import Occasion from '../../utils/HeaderIcons/Occassions.svg'
import anuragThakur from '../../utils/images/anuragThakur.png'
import CallingDirectory from '../../utils/HeaderIcons/CallingDirectory.svg'
import DashboardGrey from '../../utils/HeaderIcons/DashboardGrey.svg'
import ConstituencyGrey from '../../utils/HeaderIcons/ConstituencyGrey.svg'
import OccassionGrey from '../../utils/HeaderIcons/OccassionsGrey.svg'
import Manage_RequestGrey from '../../utils/HeaderIcons/ManageRequestGrey.svg'
import Add_RequestGrey from '../../utils/HeaderIcons/AddRequestGrey.svg'
import Calling_DirectoryGrey from '../../utils/HeaderIcons/CallingDirectoryGrey.svg'
import VersionIcon from '../../utils/images/Version.svg'
import loadingGIF from '../../utils/GIFs/loadingGIF.gif'

import api from '../../utils/api'
import * as svg from '../../utils/svg'

class Header extends Component {
  constructor(props) {
    super(props)

    let { firstName, emailId, role, lastName, img } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data

    console.log(
      'JSON data ',
      JSON.parse(localStorage.getItem('eSahyogiUser')).data
    )
    console.log('Header Props', this.props)

    console.log(img, 'hii')
    this.state = {
      popoverOpen: false,
      firstName,
      lastName,
      emailId,
      img,
      section: '',

      databasepopoverOpen: false,
      shouldHideDatabase: role === 'USER',
    }

    if ((img === null && role != 'SA') || (img === undefined && role != 'SA')) {
      img = JSON.parse(localStorage.getItem('eSahyogiUser')).data.img

      if (img === undefined) {
        img = ''
      }
      this.setState({ img: `${api.BASE_URL_1}/${img}` })
    }
  }

  render() {
    const { shouldHideDatabase } = this.state
    console.log(this.state.img, 'image')

    const logout = () => {
      console.log('User Logout')
      localStorage.removeItem('eSahyogiUser')
    }
    /*this is header section */

    const directoryDropdown = (
      <Dropdown.Menu className="showDropdown">
        <div className="dropdown-content">
          <Dropdown.Item>
            <div className="DropdownItemDatabase">
              <p className="DropdownText">
                <Link
                  to={'/manage-calling-directory'}
                  className={
                    window.location.pathname === '/manage-calling-directory'
                      ? 'CurrentTab'
                      : 'a'
                  }
                >
                  Calling Directory
                </Link>
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <div className="DropdownItemDatabase">
              <p className="DropdownText">
                <Link
                  to={'/manage-visitor'}
                  className={
                    window.location.pathname === '/manage-visitor'
                      ? 'CurrentTab'
                      : 'a'
                  }
                >
                  Visitor
                </Link>
              </p>
            </div>
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    )

    const occasionDropdown = (
      <Dropdown.Menu className="showDropdown">
        <div className="dropdown-content">
          <Dropdown.Item>
            <div className="DropdownItemDatabase">
              <p className="DropdownText">
                <Link
                  to={'/occasion/birthday'}
                  className={
                    window.location.pathname === '/occasion/birthday'
                      ? 'CurrentTab'
                      : 'a'
                  }
                >
                  Occasion
                </Link>
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item>
            <div className="DropdownItemDatabase">
              <p className="DropdownText">
                <Link
                  to={'/manage-occasion'}
                  className={
                    window.location.pathname === '/manage-occasion'
                      ? 'CurrentTab'
                      : 'a'
                  }
                >
                  Occasion Database
                </Link>
              </p>
            </div>
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    )

    const popover = (
      <Dropdown.Menu className="userDropdownBody showDropdown">
        <menu className="Dropdown">
          <Dropdown.Item>
            <div>
              <p className="DropdownTextName">
                {this.state.firstName} {this.state.lastName}
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          {/*<Dropdown.Item>
                        <div className="DropdownItemAccount">
                        <img src={addLocation} alt="" className="DropdownIconlarge" />
                            <p className="DropdownTextAccount"><Link to={'/officelocation/add-new'}><p className={window.location.pathname === '/officelocation/add-new' ? "CurrentTab" : "a"}>Add Office Location</p></Link></p>
                        </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                        <div className="DropdownItemAccount">
                        <img src={addUser} alt="" className="DropdownIconlarge" />
                            <p className="DropdownTextAccount"><Link to={'/users/add-new'}><p className={window.location.pathname === '/users/add-new' ? "CurrentTab" : "a"}>Add User</p></Link></p>
                        </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />*/}
          {this.state.shouldHideDatabase ? null : (
            <Fragment>
              <Dropdown.Item>
                <div className="DropdownItemAccount">
                  <img src={Database} alt="" className="DropdownIconlarge" />
                  <p className="DropdownText">
                    <Link to={'/search-database'}>
                      <p
                        className={
                          window.location.pathname === 'search-database'
                            ? 'CurrentTab'
                            : 'a'
                        }
                      >
                        Manage Office
                      </p>
                    </Link>
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />

              {/* <Dropdown.Item>
                <div className="DropdownItemAccount">
                  <img src={Database} alt="" className="DropdownIconlarge" />
                  <p className="DropdownText">
                    <Link to={"/manage-folders"}>
                      <p
                        className={
                          window.location.pathname === "search-database"
                            ? "CurrentTab"
                            : "a"
                        }
                      >
                        Manage Folders
                      </p>
                    </Link>
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider /> */}
            </Fragment>
          )}
          {/* <Dropdown.Item>
            <div className="DropdownItemAccount">
              <img src={svg.driveIcon} alt="" className="DropdownIconlarge" />
              <p className="DropdownText">
                <Link to={'/my-drive/folders'}>
                  <p
                    className={
                      window.location.pathname === 'my-drive'
                        ? 'CurrentTab'
                        : 'a'
                    }
                  >
                    My Drive
                  </p>
                </Link>
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider /> */}
          <Dropdown.Item>
            <div className="DropdownItemAccount">
              <img src={Language} alt="" className="DropdownIcon" />
              <p className="DropdownTextAccount">
                <a href="/" className="a" style={{ pointerEvents: 'none' }}>
                  हिंदी
                </a>
              </p>
              <p
                style={{
                  fontSize: '10px',
                  margin: '0',
                  alignSelf: 'center',
                  marginLeft: '5px',
                  color: 'red',
                }}
              >
                (Soon)
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/">
            <div>
              <div onClick={logout} className="DropdownItemAccount">
                <img src={Logout} alt="" className="DropdownIcon" />
                <p className="DropdownTextAccount">
                  <a href="/" className="a">
                    Logout
                  </a>
                </p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/" style={{ pointerEvents: 'none' }}>
            <div>
              <div className="DropdownItemAccount">
                <img src={VersionIcon} alt="" className="DropdownIcon" />
                <p className="DropdownTextAccount">Version 1.0</p>
              </div>
            </div>
          </Dropdown.Item>
        </menu>
      </Dropdown.Menu>
    )

    console.log('state data', this.state)

    return (
      <div className="HeaderFrame">
        <div className="DivTabframe">
          <Link to={'/home'} className="img-link">
            <div
              className="DivEsahyogi"
              onMouseOver={() => {
                this.setState({ section: 'home' })
              }}
              onMouseOut={() => {
                this.setState({ section: '' })
              }}
            >
              {this.props.isLoading ? (
                <img src={loadingGIF} alt="" className="ImgeSahyogi" />
              ) : (
                <img
                  src={this.state.section == 'home' ? GreyEsahyogi : Esahyogi}
                  alt=""
                  className="ImgeSahyogi"
                  onClick={() => {
                    this.setState({ section: 'home' })
                  }}
                />
              )}
            </div>
          </Link>
        </div>

        <div className="DivTabframe2">
          <Link to={'/dashboard'} className="home-link">
            <div
              className="DivTabitem"
              onMouseOver={() => {
                this.setState({ section: 'dashboard' })
              }}
              onMouseOut={() => {
                this.setState({ section: '' })
              }}
            >
              <img
                src={
                  this.state.section === 'dashboard' ? DashboardGrey : Dashboard
                }
                alt=""
                className="ImgTabIcon"
              />
              <p
                className={
                  this.state.section === 'dashboard' ||
                  window.location.pathname === '/dashboard'
                    ? 'TxtWhiteTabIcon'
                    : 'TxtWhiteTabIcon'
                }
              >
                Dashboard
              </p>
            </div>
          </Link>

          <Link to={'/citizen-registration'} className="home-link">
            <div
              className="DivTabitem"
              onMouseOver={() => {
                this.setState({ section: 'addRequest' })
              }}
              onMouseOut={() => {
                this.setState({ section: '' })
              }}
            >
              <img
                src={
                  this.state.section === 'addRequest'
                    ? Add_RequestGrey
                    : Request
                }
                alt=""
                className="ImgTabIcon"
              />
              <p
                className={
                  this.state.section === 'addRequest' ||
                  window.location.pathname === '/citizen-registration'
                    ? 'TxtWhiteTabIcon'
                    : 'TxtWhiteTabIcon'
                }
              >
                Add Request
              </p>
            </div>
          </Link>

          <Link to={'/manage-request?complaint'} className="home-link">
            <div
              className="DivTabitem"
              onMouseOver={() => {
                this.setState({ section: 'manageRequest' })
              }}
              onMouseOut={() => {
                this.setState({ section: '' })
              }}
            >
              <img
                src={
                  this.state.section === 'manageRequest'
                    ? Manage_RequestGrey
                    : manageRequest
                }
                alt=""
                className="ImgTabIcon"
              />
              <p
                className={
                  this.state.section === 'manageRequest' ||
                  window.location.pathname === '/manage-request'
                    ? 'TxtWhiteTabIcon'
                    : 'TxtWhiteTabIcon'
                }
              >
                Manage Request
              </p>
            </div>
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            float: 'right',
            position: 'absolute',
            right: '60px',
            zIndex: '1',
          }}
        >
          <div className="DivTabitemDropdown">
            <div
              className="DivTabitem"
              onMouseOver={() => {
                this.setState({ section: 'calling' })
              }}
              onMouseOut={() => {
                this.setState({ section: '' })
              }}
            >
              <Dropdown className="userDropdown directoryDropdown">
                <Dropdown.Toggle>
                  <img
                    src={
                      this.state.section === 'calling'
                        ? Calling_DirectoryGrey
                        : CallingDirectory
                    }
                    alt=""
                    className="ImgTabIcon"
                  />
                  <p
                    className={
                      this.state.section === 'calling' ||
                      window.location.pathname ===
                        '/manage-calling-directory' ||
                      window.location.pathname === '/manage-visitor'
                        ? 'TxtWhiteTabIcon'
                        : 'TxtWhiteTabIcon'
                    }
                  >
                    Directory
                  </p>
                </Dropdown.Toggle>
                {directoryDropdown}
              </Dropdown>
            </div>
          </div>

          <div className="DivTabitemDropdown">
            <Link to={'/manage-occasion'} className="home-link">
              <div
                className="DivTabitem"
                onMouseOver={() => {
                  this.setState({ section: 'occasion' })
                }}
                onMouseOut={() => {
                  this.setState({ section: '' })
                }}
              >
                <img
                  src={
                    this.state.section === 'occasion' ? OccassionGrey : Occasion
                  }
                  alt=""
                  className="ImgTabIcon"
                />
                <p
                  className={
                    this.state.section === 'occasion' ||
                    window.location.pathname === '/manage-occasion'
                      ? 'TxtWhiteTabIcon'
                      : 'TxtWhiteTabIcon'
                  }
                >
                  Occasion
                </p>
              </div>
            </Link>
          </div>
          <div className="DivTabitemDropdown">
            <Link to={'/constituency-map'} className="home-link">
              <div
                className="DivTabitem"
                onMouseOver={() => {
                  this.setState({ section: 'constituency' })
                }}
                onMouseOut={() => {
                  this.setState({ section: '' })
                }}
              >
                <img
                  src={
                    this.state.section === 'constituency'
                      ? ConstituencyGrey
                      : Constituency
                  }
                  alt=""
                  className="ImgTabIcon"
                  style={{ width: '15px' }}
                />
                <p
                  className={
                    this.state.section === 'constituency'
                      ? 'TxtWhiteTabIcon'
                      : 'TxtWhiteTabIcon'
                  }
                >
                  Constituency
                </p>
              </div>
            </Link>
          </div>
          {console.log(this.state.img, 'image check')}

          <img
            onMouseOver={() => {
              this.setState({ section: 'account' })
            }}
            onMouseOut={() => {
              this.setState({ section: '' })
            }}
            src={anuragThakur}
            alt="SA"
            className="ImgDrBR"
          />
          <div
            style={{ marginTop: '20px', float: 'inline-end' }}
            onMouseOver={() => {
              this.setState({ section: 'account' })
            }}
            onMouseOut={() => {
              this.setState({ section: '' })
            }}
          >
            <Dropdown className="userDropdown">
              <Dropdown.Toggle>
                <img
                  src={
                    this.state.section === 'account' ? GreyDownArrow : DownArrow
                  }
                  alt=""
                  className="ImgDownArrow"
                />
              </Dropdown.Toggle>
              {popover}
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }
}
export default Header
