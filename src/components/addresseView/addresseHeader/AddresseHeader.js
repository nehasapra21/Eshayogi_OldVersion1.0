import React, { Component } from 'react'
import '../../header/Header.css'
import Esahyogi from '../../../utils/images/esahyogiblue.svg'
import DownArrow from '../../../utils/images/downarrow.svg'
import Dasboard from '../../../utils/images/dashboard.svg'
import manageRequest from '../../../utils/images/manageRequest.png'
import Support from '../../../utils/images/support.svg'
import Language from '../../../utils/images/language.svg'
import Account from '../../../utils/images/account.svg'
import Logout from '../../../utils/images/logout.svg'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Popover, Dropdown } from 'react-bootstrap'
import api from '../../../utils/api'

class Header extends Component {
  constructor(props) {
    super(props)
    const { firstName, emailId, role, lastName, img } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data

    if (img === undefined && role != 'SA') {
      img = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org.img
    }

    console.log(img, 'hii')
    this.state = {
      popoverOpen: false,
      firstName,
      lastName,
      emailId,
      img,
      section: '',
      databasepopoverOpen: false,
      shouldHideDatabase: role === 'User',
    }
  }

  render() {
    const { shouldHideDatabase } = this.state

    const logout = () => {
      localStorage.removeItem('eSahyogiUser')
    }
    /*this is header section */
    const popover = (
      <Popover className="accountDropdown" id="popover-basic">
        <Popover.Content>
          <menu className="Dropdown">
            <div>
              <p className="DropdownTextName">
                {this.state.firstName} {this.state.lastName}
              </p>
            </div>
            <Dropdown.Divider />
            <div>
              <div className="DropdownItemAccount">
                <img src={Account} alt="" className="DropdownIcon" />
                <p className="DropdownTextAccount">
                  <a href="" className="a">
                    Account
                  </a>
                </p>
              </div>
            </div>
            <Dropdown.Divider />
            <div>
              <div className="DropdownItemAccount">
                <img src={Support} alt="" className="DropdownIcon" />
                <p className="DropdownTextAccount">
                  <a href="" className="a">
                    Support
                  </a>
                </p>
              </div>
            </div>
            <Dropdown.Divider />
            <div>
              <div className="DropdownItemAccount">
                <img src={Language} alt="" className="DropdownIcon" />
                <p className="DropdownTextAccount">
                  <a href="/" className="a">
                    Language
                  </a>
                </p>
              </div>
            </div>
            <Dropdown.Divider />
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
          </menu>
        </Popover.Content>
      </Popover>
    )

    return (
      <div className="HeaderFrame">
        <div className="DivTabframe">
          <Link to={'/home'} className="img-link">
            <div className="DivEsahyogi">
              <img
                src={Esahyogi}
                alt=""
                className="ImgeSahyogi"
                onClick={() => {
                  this.setState({ section: 'home' })
                }}
              />
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
              <img src={Dasboard} alt="" className="ImgTabIcon" />
              <p
                className={
                  this.state.section === 'dashboard' ||
                  window.location.pathname === '/dashboard'
                    ? 'TxtGreenTabIcon'
                    : 'TxtWhiteTabIcon'
                }
              >
                Dashboard
              </p>
            </div>
          </Link>

          <Link to={'/manage-request'} className="home-link">
            <div
              className="DivTabitem"
              onMouseOver={() => {
                this.setState({ section: 'manageRequest' })
              }}
              onMouseOut={() => {
                this.setState({ section: '' })
              }}
            >
              <img src={manageRequest} alt="" className="ImgTabIcon" />
              <p
                className={
                  this.state.section === 'manageRequest' ||
                  window.location.pathname === '/manage-request'
                    ? 'TxtGreenTabIcon'
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
          <img
            src={`${api.BASE_URL_1}/${this.state.img}`}
            alt="SA"
            className="ImgDrBR"
          />
          <div style={{ marginTop: '20px', float: 'inline-end' }}>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <img src={DownArrow} at="" className="ImgDownArrow" />
            </OverlayTrigger>
          </div>
        </div>
      </div>
    )
  }
}
export default Header
