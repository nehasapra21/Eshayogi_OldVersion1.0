import React, { Component } from 'react'
import Print from '../../utils/images/print.svg'
import Header from '../header/Header.js'
import Search from '../../utils/images/search.svg'
import Ham from '../../utils/images/ham.svg'
import api from '../../utils/api'
import Pagination from '@material-ui/lab/Pagination'
import './ManageDatabase.css'
import ManageCitizen from './ManageCitizen'
import ManageAddresse from './ManageAddresse'
import ManageDelegate from './ManageDelegate'
import ManageLocation from './ManageLocation'
import ManageUser from './ManageUser'
import CopyrightFooter from '../footer/CopyrightFooter'
import BottomNavigation from '../header/BottomNavigation'
import Footer from '../footer/Footer'
import IconFooter from '../footer/IconFooter'
import Plus from '../../utils/images/plus.svg'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

class ManageDatabase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      manage: 'user',
      status: '',
      isLoading: true,
      search: '',
      users: [],
      allUser: [],
      allLocations: [],
      locations: [],
      limit: '25',
      offset: '0',
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.state.manage === 'user' ? this.fetchUser() : this.fetchLocations()
  }

  fetchLocations() {
    api
      .getLocations({
        limit: `${this.state.limit}`,
        offset: `${this.state.offset}`,
      })
      .then(
        (response) => {
          if (response.ok) {
            if (response.data.error) {
              this.setState({
                locations: '',
                isLoading: false,
              })
            } else {
              this.setState({
                locations: response.data.data.rows,
                isLoading: false,
              })
            }

            console.log(response.data, 'hey there')
          } else {
            console.log('response not ok', response)
          }
        },
        (err) => {
          console.log('err', err)
        }
      )
  }

  fetchUser() {
    this.setState({ manage: 'user' })
    api
      .getUsers({
        limit: `${this.state.limit}`,
        offset: `${this.state.offset}`,
      })
      .then(
        (response) => {
          if (response.ok) {
            if (response.data.error) {
              this.setState({
                users: '',
                isLoading: false,
              })
            } else {
              this.setState({
                users: response.data.data.rows,
                isLoading: false,
              })
            }
          } else {
            console.log('response not ok', response)
          }
        },
        (err) => {
          console.log('err', err)
        }
      )
  }

  render() {
    var { isLoading, status, manage, search } = this.state
    const values = {
      limit: '100',
      offset: '0',
    }

    if (!isLoading) {
      return (
        <div className="NewClientForm">
          <Header isLoading={this.state.isLoading} />
          <div className="frame2">
            <div className="FormOuterFrame">
              <div className="Manageupper">
                <div className="ManageTabLayout">
                  <div className="UpperTabLayout">
                    <div
                      className="UpperTabItem"
                      onClick={() => {
                        this.setState({ manage: 'user' }, () =>
                          this.fetchUser()
                        )
                      }}
                    >
                      <p
                        className={
                          manage === 'user'
                            ? 'UpperTabTxt active'
                            : 'UpperTabTxt'
                        }
                      >
                        User
                      </p>
                    </div>
                    <div
                      className="UpperTabItem"
                      onClick={() => {
                        this.setState({ manage: 'location' }, () => {
                          this.fetchLocations()
                        })
                      }}
                    >
                      <p
                        className={
                          manage === 'location'
                            ? 'UpperTabTxt active'
                            : 'UpperTabTxt'
                        }
                      >
                        Locations
                      </p>
                    </div>
                  </div>
                  <Link
                    to={
                      this.state.manage == 'user'
                        ? '/users/add-new'
                        : '/officelocation/add-new'
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: '900px',
                      }}
                    >
                      <p
                        className="UpperTabTxt"
                        style={{ marginRight: '10px' }}
                      >
                        Add
                      </p>
                      <img src={Plus} alt="" />
                    </div>
                  </Link>
                </div>
                <div className="underline" />
                {/*<div className="UpperTabLayout">
                                {this.state.manage === "user" ?
                                    <div
                                        className={status === "" ? "StatusFilter statusAll" : "StatusFilter"}
                                        onClick={() => { this.setState({ status: "", citizens: this.state.allCitizen }) }}>
                                        <p className={status === "" ? "StatusTxt whiteTxt" : "StatusTxt"}>All</p>
                                    </div> : <div />}
                                    
                                    {this.state.manage === "user" ?
                                        <div
                                            className={status === true ? "StatusFilter statusActive" : "StatusFilter"}
                                            onClick={() => { this.setState({ status: true }, this.handleFilter(true)) }}>
                                            <p className={status === "ACTIVE" ? "StatusTxt whiteTxt" : "StatusTxt"}>Active</p>
                                        </div> : <div />}
                                    {this.state.manage=== "user"  ?
                                        <div
                                            className={status === false ? "StatusFilter statusInactive" : "StatusFilter"}
                                            onClick={() => { this.setState({ status: false }, this.handleFilter(false)) }}>
                                            <p className={status === false ? "StatusTxt whiteTxt" : "StatusTxt"}>Inactive</p>
                                        </div> : <div />}

                                </div>
                                <div className="SearchDivLayout" style={{margin:"15px auto"}}>
                                    <input
                                        type="text"
                                        placeholder="Search Requests (Name,Mobile Number)"
                                        className="SearchInput"
                                        onChange={(e) => {  }} />
                                    <img src={Search} alt="" className="SearchIcon" />

                                            </div>*/}
              </div>
              <div>
                {this.state.manage === 'user' ? (
                  <ManageUser
                    users={this.state.users}
                    history={this.props.history}
                  />
                ) : (
                  <div />
                )}
                {this.state.manage === 'location' ? (
                  <ManageLocation
                    locations={this.state.locations}
                    history={this.props.history}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            {window.innerWidth < 480 ? (
              <BottomNavigation />
            ) : (
              <div className="DashboardFooter">
                <IconFooter />
                <Footer />
                <CopyrightFooter />
              </div>
            )}
          </div>
        </div>
      )
    }
    return (
      <div className="NewClientForm">
        <Header isLoading={this.state.isLoading} />
      </div>
    )
  }
}
export default ManageDatabase
