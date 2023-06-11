/* eslint-disable default-case */

import React, { Component, Fragment } from 'react'
import Complaintb from '../../utils/images/bmanagecomplaint.svg'
import Eventb from '../../utils/images/manageeventB.svg'
import Jobb from '../../utils/images/managejobB.svg'
import Header from '../header/Header.js'
import Search from '../../utils/images/search.svg'
import ManageComplaint from './ManageComplaint'
import ManageJob from './ManageJob'
import ManageEvents from './ManageEvents'
import ManageMPLAD from './ManageMPLAD'
import ManagePNR from './ManagePNR'
import ManageLetters from './ManageLetters'
import ManagePoliticalEvent from './ManagePoliticalEvent'
import './ManageRequest.css'
import api from '../../utils/api'
import MPLAD from '../../utils/images/MPLAD.svg'
import Letters from '../../utils/images/letters.svg'
import PNR from '../../utils/images/PNR.svg'
import politicalEvents from '../../utils/images/politicalEvent.svg'
import CopyrightFooter from '../footer/CopyrightFooter'
import BottomNavigation from '../header/BottomNavigation'
import Footer from '../footer/Footer'
import EventModal from '../EventModal/EventModalMain'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import DateIcon from '../../utils/images/dateIcon.png'
import Warning from '../hoc/Warning/Warning'
import Loader from '../hoc/Loader/Loader'
import { toast } from 'react-toastify'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import exportExcel from './ExportExcel'
import importLogo from '../../utils/images/ImportLogo.png'
import greyImportLogo from '../../utils/images/exportLogo.svg'

class ManageRequest extends Component {
  constructor(props) {
    super(props)
    document.title = 'Manage Request'

    this.state = {
      manage: this.props.history.location.state
        ? this.props.history.location.state.manage
        : 'LETTERS',
      requestStatus: '',
      isLoading: true,
      search: '',
      showModal: false,
      rangeDate: {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
      showCalender: false,
      showWarning: false,
      export: '',
      requestData: [
        { name: 'COMPLAINT', data: [] },
        { name: 'JOB', data: [] },
        { name: 'EVENT', data: [] },
        { name: 'POLITICALEVENT', data: [] },
        { name: 'MPLAD', data: [] },
        { name: 'PNR', data: [] },
        { name: 'LETTERS', data: [] },
      ],
      queryOn: 'recommendedName, assignedTo, citizenName, citizenMobileNumber',
      limit: '25',
      offset: '0',
      searchWithDate: false,
      foldersData: [],
      folderNumber: '',
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)

    this.fetchRequest()
    if (this.state.manage === 'LETTERS') {
      this.fetchFolders()
      this.fetchRequestOfLetters()
    } else {
      this.fetchRequest()
    }
    this.props.history.push({
      search: this.state.manage,
    })
  }

  resetHandler = () => {
    this.setState(
      {
        search: '',
      },
      () => {
        if (this.state.manage === 'LETTERS') {
          this.fetchRequestOfLetters()
        } else {
          this.fetchRequest()
        }
      }
    )
  }

  showEventModal = (event = null) => {
    let bool = this.state.showModal
    this.setState({ showModal: !bool, selectedGalleryEvent: event })
  }

  fetchRequest = () => {
    let search = this.state.manage.toLowerCase()

    this.props.history.push({
      search: search,
    })

    let requestIndex
    api
      .getRequests({
        search: `${this.state.search}`,
        limit: `${this.state.limit}`,
        offset: `${this.state.offset}`,
        queryOn: `${this.state.queryOn}`,
        typeOfRequest: `${this.state.manage}`,
        status: `${this.state.requestStatus}`,
      })
      .then(
        (response) => {
          if (response.ok) {
            if (response.data.error) {
              this.setState({ showWarning: true, isLoading: false })
            } else {
              for (let i = 0; i < this.state.requestData.length; i++) {
                if (this.state.requestData[i].name === this.state.manage) {
                  requestIndex = i
                  break
                }
              }

              let tempData = [...this.state.requestData]

              tempData[requestIndex].data = response.data

              this.setState({
                showWarning: false,
                requestData: tempData,
                isLoading: false,
              })
            }
          } else {
            console.log('something error occured ', response)
            this.setState({ isLoading: false, showWarning: true })
            toast.error(`${response.problem}`, {
              autoClose: 1250,
              closeButton: false,
            })
          }
        },
        (err) => {
          this.setState({ isLoading: false, showWarning: true })
          console.log('err is', err)
        }
      )
  }

  fetchRequestOfLetters = () => {
    let search = this.state.manage.toLowerCase()

    this.props.history.push({
      search: search,
    })

    let requestIndex
    api
      .getRequests({
        search: `${this.state.search}`,
        limit: `${this.state.limit}`,
        offset: `${this.state.offset}`,
        queryOn: `${this.state.queryOn}`,
        typeOfRequest: `${this.state.manage}`,
        status: `${this.state.requestStatus}`,
        folderNumber: `${this.state.folderNumber}`,
      })
      .then(
        (response) => {
          if (response.ok) {
            if (response.data.error) {
              this.setState({ showWarning: true, isLoading: false })
            } else {
              for (let i = 0; i < this.state.requestData.length; i++) {
                if (this.state.requestData[i].name === this.state.manage) {
                  requestIndex = i
                  break
                }
              }

              let tempData = [...this.state.requestData]

              tempData[requestIndex].data = response.data

              this.setState({
                showWarning: false,
                requestData: tempData,
                isLoading: false,
              })
            }
          } else {
            console.log('something error occured ', response)
            this.setState({ isLoading: false, showWarning: true })
            toast.error(`${response.problem}`, {
              autoClose: 1250,
              closeButton: false,
            })
          }
        },
        (err) => {
          this.setState({ isLoading: false, showWarning: true })
          console.log('err is', err)
        }
      )
  }

  fetchRequestWithDate = () => {
    this.setState({ isLoading: true })
    let requestIndex
    let fromDate = new Date(this.state.rangeDate.startDate)
    let toDate = new Date(this.state.rangeDate.endDate)

    let fromDD = `${fromDate.getDate()}`
    let fromMM = `${fromDate.getMonth() + 1}`

    let toDD = `${toDate.getDate()}`
    let toMM = `${toDate.getMonth() + 1}`

    api
      .searchByDate({
        limit: `${this.state.limit}`,
        offset: `${this.state.offset}`,
        typeOfRequest: this.state.manage,
        from: {
          dd: fromDD.length === 1 ? `0${fromDD}` : fromDD,
          mm: fromMM.length === 1 ? `0${fromMM}` : fromMM,
          yy: `${fromDate.getFullYear()}`,
        },
        to: {
          dd: toDD.length === 1 ? `0${toDD}` : toDD,
          mm: toMM.length === 1 ? `0${toMM}` : toMM,
          yy: `${toDate.getFullYear()}`,
        },
        status: this.state.requestStatus,
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            this.setState({ showWarning: true, isLoading: false })
          } else {
            for (let i = 0; i < this.state.requestData.length; i++) {
              if (this.state.requestData[i].name === this.state.manage) {
                requestIndex = i
                break
              }
            }
            let tempData = [...this.state.requestData]

            tempData[requestIndex].data = response.data

            this.setState({
              showWarning: false,
              requestData: tempData,
              isLoading: false,
            })
          }
        } else {
          console.log('something error occured ', response)
          this.setState({ isLoading: false, showWarning: true })
          toast.error(`${response.problem}`, {
            autoClose: 1250,
            closeButton: false,
          })
        }
      })
  }

  fetchFolders = () => {
    api
      .getFolders({
        limit: '100',
        offset: '0',
      })
      .then((response) => {
        if (response.ok) {
          console.log('Folders response', response)
          if (response.data.error) {
            toast.error('No data found', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({ showWarning: true, isLoading: false })
            return
          } else {
            this.setState({ foldersData: [...response.data.data.rows] })
            toast.success('Folders Fetched Subccessfully.', {
              autoClose: 1250,
              closeButton: false,
            })
          }
        }
      })
      .catch((err) => {
        toast.error('Something Wrong Happens. Please Refresh.', {
          autoClose: 1250,
          closeButton: false,
        })
      })
  }

  switchRequestSection = () => {
    switch (this.state.manage) {
      case 'COMPLAINT':
        return (
          <ManageComplaint
            complaints={this.state.requestData[0].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
      case 'JOB':
        return (
          <ManageJob
            jobs={this.state.requestData[1].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
      case 'EVENT':
        return (
          <ManageEvents
            events={this.state.requestData[2].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
      case 'POLITICALEVENT':
        return (
          <ManagePoliticalEvent
            events={this.state.requestData[3].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
      case 'MPLAD':
        return (
          <ManageMPLAD
            MPLAD={this.state.requestData[4].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
      case 'PNR':
        return (
          <ManagePNR
            PNR={this.state.requestData[5].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
      case 'LETTERS':
        return (
          <ManageLetters
            Letters={this.state.requestData[6].data}
            history={this.props.history}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
          />
        )
    }
  }

  changeLimit = (value) => {
    this.setState(
      {
        offset: '0',
        limit: `${value}`,
      },
      () => {
        if (this.state.searchWithDate) {
          this.fetchRequestWithDate()
        } else if (this.state.manage === 'LETTERS') {
          this.fetchRequestOfLetters()
        } else {
          this.fetchRequest()
        }
      }
    )
  }

  changeOffset = (value) => {
    console.log('offset value', value, this.state.offset, this.state.limit)
    const newOffset = +value * +this.state.limit
    this.setState({ offset: `${newOffset}` }, () => {
      if (this.state.searchWithDate) {
        this.fetchRequestWithDate()
      } else if (this.state.manage === 'LETTERS') {
        this.fetchRequestOfLetters()
      } else {
        this.fetchRequest()
      }
    })
  }

  render() {
    let folders =
      this.state.foldersData.length !== 0 ? (
        this.state.foldersData.map((folder) => {
          return (
            <div
              className="folder"
              title={`${folder.name}`}
              onClick={() =>
                this.setState({ folderNumber: folder.number }, () => {
                  if (this.state.searchWithDate) {
                    this.fetchRequestWithDate()
                  } else {
                    this.fetchRequestOfLetters()
                  }
                })
              }
              style={
                this.state.folderNumber === folder.number
                  ? { backgroundColor: '#dee0e2' }
                  : null
              }
            >
              <p className="folderCount">{folder.number}</p>
            </div>
          )
        })
      ) : (
        <p>No folders Found</p>
      )

    const exportData = (manage) => {
      let index
      for (let i = 0; i < this.state.requestData.length; i++) {
        if (manage === this.state.requestData[i].name) {
          index = i
        }
      }
      exportExcel.makeExcelFile(
        this.state.requestData[index].data.data.rows,
        this.state.requestData[index].name
      )
    }

    var { isLoading, requestStatus, manage, search } = this.state
    return (
      <div className="NewClientForm">
        <Header isLoading={isLoading} />
        <div className="frame2" style={{ paddingBottom: '150px' }}>
          <div className="FormOuterFrame">
            <div className="Manageupper">
              <div className="ManageTabLayout">
                <div className="UpperTabLayout">
                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'LETTERS',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn:
                            'recommendedName, assignedTo, citizenName, citizenMobileNumber',
                        },
                        () => {
                          this.fetchFolders()
                          this.fetchRequestOfLetters()
                        }
                      )
                    }}
                  >
                    <img src={Letters} alt="" className="UpperTabIcon" />
                    <p
                      className={
                        manage === 'LETTERS'
                          ? 'UpperTabTxt active'
                          : 'UpperTabTxt'
                      }
                    >
                      Letters
                    </p>
                  </div>
                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'COMPLAINT',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn:
                            'recommendedName, assignedTo, citizenName, citizenMobileNumber',
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <img src={Complaintb} alt="" className="UpperTabIcon" />
                    <p
                      className={
                        manage === 'COMPLAINT'
                          ? 'UpperTabTxt active'
                          : 'UpperTabTxt'
                      }
                    >
                      Complaint
                    </p>
                  </div>
                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'JOB',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn:
                            'recommendedName, assignedTo, citizenName, citizenMobileNumber',
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <img src={Jobb} alt="" className="UpperTabIcon" />
                    <p
                      className={
                        manage === 'JOB' ? 'UpperTabTxt active' : 'UpperTabTxt'
                      }
                    >
                      Job
                    </p>
                  </div>
                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'EVENT',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn:
                            'recommendedName, assignedTo, citizenName, citizenMobileNumber',
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <img src={Eventb} alt="" className="UpperTabIcon" />
                    <p
                      className={
                        manage === 'EVENT'
                          ? 'UpperTabTxt active'
                          : 'UpperTabTxt'
                      }
                    >
                      Events
                    </p>
                  </div>

                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'POLITICALEVENT',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn:
                            'recommendedName, assignedTo, citizenName, citizenMobileNumber',
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <img
                      src={politicalEvents}
                      alt=""
                      className="UpperTabIconPolitical"
                    />
                    <p
                      className={
                        manage === 'POLITICALEVENT'
                          ? 'UpperTabTxt active'
                          : 'UpperTabTxt'
                      }
                    >
                      Political Event
                    </p>
                  </div>
                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'MPLAD',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn: 'constituency, block, financialYear',
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <img src={MPLAD} alt="" className="UpperTabIcon" />
                    <p
                      className={
                        manage === 'MPLAD'
                          ? 'UpperTabTxt active'
                          : 'UpperTabTxt'
                      }
                    >
                      MPLAD
                    </p>
                  </div>
                  <div
                    className="UpperTabItem"
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: '',
                          manage: 'PNR',
                          search: '',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                          queryOn:
                            'recommendedName, assignedTo, citizenName, citizenMobileNumber',
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <img src={PNR} alt="" className="UpperTabIcon" />
                    <p
                      className={
                        manage === 'PNR' ? 'UpperTabTxt active' : 'UpperTabTxt'
                      }
                    >
                      PNR
                    </p>
                  </div>
                </div>
              </div>
              <div className="underline" />
              <div className="UpperTabLayout">
                <div
                  className={
                    requestStatus === ''
                      ? 'StatusFilter statusAll'
                      : 'StatusFilter'
                  }
                  onClick={() => {
                    this.setState(
                      {
                        requestStatus: '',
                        folderNumber: '',
                        limit: '25',
                        offset: '0',
                        isLoading: true,
                      },
                      () => {
                        if (this.state.manage === 'LETTERS') {
                          this.fetchRequestOfLetters()
                        } else {
                          this.fetchRequest()
                        }
                      }
                    )
                  }}
                >
                  <p
                    className={
                      requestStatus === '' ? 'StatusTxt whiteTxt' : 'StatusTxt'
                    }
                  >
                    All
                  </p>
                </div>
                {this.state.manage === 'COMPLAINT' ? (
                  <div
                    className={
                      requestStatus === 'ASSIGNED'
                        ? 'StatusFilter statusAssigned'
                        : 'StatusFilter'
                    }
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: 'ASSIGNED',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <p
                      className={
                        requestStatus === 'ASSIGNED'
                          ? 'StatusTxt whiteTxt'
                          : 'StatusTxt'
                      }
                    >
                      Assigned
                    </p>
                  </div>
                ) : (
                  <div />
                )}
                {this.state.manage === 'COMPLAINT' ? (
                  <div
                    className={
                      requestStatus === 'SOLVED'
                        ? 'StatusFilter statusSolved'
                        : 'StatusFilter'
                    }
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: 'SOLVED',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <p
                      className={
                        requestStatus === 'SOLVED'
                          ? 'StatusTxt whiteTxt'
                          : 'StatusTxt'
                      }
                    >
                      Solved
                    </p>
                  </div>
                ) : (
                  <div />
                )}
                {this.state.manage === 'JOB' ? (
                  <div
                    className={
                      requestStatus === 'SHARED'
                        ? 'StatusFilter statusShared'
                        : 'StatusFilter'
                    }
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: 'SHARED',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <p
                      className={
                        requestStatus === 'SHARED'
                          ? 'StatusTxt whiteTxt'
                          : 'StatusTxt'
                      }
                    >
                      Shared
                    </p>
                  </div>
                ) : (
                  <div />
                )}
                {this.state.manage === 'JOB' ? (
                  <div
                    className={
                      requestStatus === 'PLACED'
                        ? 'StatusFilter statusPlaced'
                        : 'StatusFilter'
                    }
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: 'PLACED',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <p
                      className={
                        requestStatus === 'PLACED'
                          ? 'StatusTxt whiteTxt'
                          : 'StatusTxt'
                      }
                    >
                      Placed
                    </p>
                  </div>
                ) : (
                  <div />
                )}
                {this.state.manage === 'JOB' ? (
                  <div
                    className={
                      requestStatus === 'REJECTED'
                        ? 'StatusFilter statusRejected'
                        : 'StatusFilter'
                    }
                    onClick={() => {
                      this.setState(
                        {
                          requestStatus: 'REJECTED',
                          limit: '25',
                          offset: '0',
                          isLoading: true,
                        },
                        () => this.fetchRequest()
                      )
                    }}
                  >
                    <p
                      className={
                        requestStatus === 'REJECTED'
                          ? 'StatusTxt whiteTxt'
                          : 'StatusTxt'
                      }
                    >
                      Rejected
                    </p>
                  </div>
                ) : (
                  <div />
                )}

                {this.state.manage === 'EVENT' ||
                this.state.manage === 'APPOINTMENT' ||
                this.state.manage === 'POLITICALEVENT' ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                      className={
                        requestStatus === 'SCHEDULED'
                          ? 'StatusFilter statusScheduled'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'SCHEDULED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'SCHEDULED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Scheduled
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'DELEGATED'
                          ? 'StatusFilter statusDelegated'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'DELEGATED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'DELEGATED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Delegated
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'ATTENDED'
                          ? 'StatusFilter statusAttended'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'ATTENDED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'ATTENDED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Attended
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'DISCUSS'
                          ? 'StatusFilter statusDiscuss'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'DISCUSS',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'DISCUSS'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Discuss
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'REJECTED'
                          ? 'StatusFilter statusRejected'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'REJECTED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'REJECTED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Rejected
                      </p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {this.state.manage === 'MPLAD' ? (
                  <div
                    className="MPLADStatus"
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <div
                      className={
                        requestStatus === 'UNDERREVIEW'
                          ? 'StatusFilter statusSanctioned'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'UNDERREVIEW',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'UNDERREVIEW'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Under Review
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'SANCTIONED'
                          ? 'StatusFilter statusWorkInProgress'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'SANCTIONED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'SANCTIONED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Sanctioned
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'WORK DONE'
                          ? 'StatusFilter statusWorkDone'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'WORK DONE',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'WORK DONE'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Work Done
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'INAUGURATED'
                          ? 'StatusFilter statusInaugurated'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'INAUGURATED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'INAUGURATED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Inaugurated
                      </p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {this.state.manage === 'PNR' ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                      className={
                        requestStatus === 'CONFIRMED'
                          ? 'StatusFilter statusRespondedTo'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'CONFIRMED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'CONFIRMED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Confirmed
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'NOTCONFIRMED'
                          ? 'StatusFilter statusRejected'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'NOTCONFIRMED',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequest()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'NOTCONFIRMED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Not Confirmed
                      </p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {this.state.manage === 'LETTERS' ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                      className={
                        requestStatus === 'VERYIMPORTANT'
                          ? 'StatusFilter statusPending'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'VERYIMPORTANT',
                            folderNumber: '',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequestOfLetters()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'VERYIMPORTANT'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Very Important
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'IMPORTANT'
                          ? 'StatusFilter statusRespondedTo'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'IMPORTANT',
                            folderNumber: '',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequestOfLetters()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'IMPORTANT'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Important
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'GENERAL'
                          ? 'StatusFilter statusResponseNeeded'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'GENERAL',
                            folderNumber: '',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequestOfLetters()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'GENERAL'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        General
                      </p>
                    </div>
                    <div
                      className={
                        requestStatus === 'ACKNOWLEDGED'
                          ? 'StatusFilter statusDelegated'
                          : 'StatusFilter'
                      }
                      onClick={() => {
                        this.setState(
                          {
                            requestStatus: 'ACKNOWLEDGED',
                            folderNumber: '',
                            limit: '25',
                            offset: '0',
                            isLoading: true,
                          },
                          () => this.fetchRequestOfLetters()
                        )
                      }}
                    >
                      <p
                        className={
                          requestStatus === 'ACKNOWLEDGED'
                            ? 'StatusTxt whiteTxt'
                            : 'StatusTxt'
                        }
                      >
                        Acknowleged
                      </p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              {this.state.manage === 'LETTERS' ? (
                <Fragment>
                  <div className="underline" />
                  <div className="foldersDiv">
                    <div className="folders">
                      <div
                        className="folder"
                        title="All Folders"
                        onClick={() =>
                          this.setState({ folderNumber: '' }, () =>
                            this.fetchRequestOfLetters()
                          )
                        }
                        style={
                          this.state.folderNumber === ''
                            ? { backgroundColor: '#dee0e2' }
                            : null
                        }
                      >
                        <p className="folderCount">All</p>
                      </div>
                      {folders}
                    </div>
                  </div>
                </Fragment>
              ) : null}
              <div className="SearchDiv">
                <div className="DateSearch">
                  <div
                    onClick={() => this.setState({ showCalender: true })}
                    style={{ borderRight: '1px solid #E3E3E8' }}
                  >
                    <img className="calender" src={DateIcon} alt=""></img>
                  </div>
                </div>
                <div className="SearchDivLayout">
                  <input
                    type="text"
                    placeholder={
                      this.state.manage === 'MPLAD'
                        ? 'Search Requests (Constituency, Block, FY Year)'
                        : 'Search Requests (Name, Mobile Number)'
                    }
                    className="SearchInput"
                    value={this.state.search}
                    onChange={(e) => {
                      this.setState({ search: e.target.value }, () => {
                        if (this.state.manage === 'LETTERS') {
                          this.fetchRequestOfLetters()
                        } else {
                          this.fetchRequest()
                        }
                      })
                    }}
                  />
                  <img src={Search} alt="" className="SearchIcon" />
                </div>
                <button
                  type="button"
                  className="resetBtn"
                  onClick={() =>
                    this.setState({ isLoading: false }, () =>
                      this.resetHandler()
                    )
                  }
                >
                  Reset
                </button>
                <div className="helperBtns" id="helperBtns">
                  <div
                    id="exportid"
                    className="importExportBtn"
                    onMouseOver={() => {
                      this.setState({ export: 'show' })
                    }}
                    onMouseOut={() => {
                      this.setState({ export: '' })
                    }}
                    onClick={() => exportData(this.state.manage)}
                  >
                    <p
                      className={
                        this.state.export == 'show' ? '' : 'exportHover'
                      }
                    >
                      Export
                    </p>
                    <img
                      className="export"
                      src={
                        this.state.export == 'show'
                          ? importLogo
                          : greyImportLogo
                      }
                      alt=""
                    ></img>
                  </div>
                  {/*this.state.manage === 'LETTERS' ? (
                    <button
                      type="button"
                      className="resetBtn addFolderBtn"
                      onClick={() => this.props.history.push('/add-folder')}
                    >
                      Add Folder
                    </button>
                  ) : null*/}
                </div>

                {/* <div
                  id='exportid'
                  className='importExportBtn'
                  onClick={() => exportData(this.state.manage)}
                  onMouseOver={() => {
                    this.setState({ export: 'show' });
                  }}
                  onMouseOut={() => {
                    this.setState({ export: '' });
                  }}
                >
                  <p
                    className={this.state.export == 'show' ? '' : 'exportHover'}
                  >
                    Export
                  </p>
                  <img
                    className='export'
                    src={
                      this.state.export == 'show' ? importLogo : greyImportLogo
                    }
                    alt=''
                  ></img>
                </div> */}
              </div>
            </div>
            {console.log(this.state.COMPLAINT, 'HEXXX')}
            {this.state.isLoading ? null : this.state.showWarning ? (
              <Warning warningMsg="No Data Found." />
            ) : this.state.isLoading ? null : (
              this.switchRequestSection()
            )}
          </div>
          {window.innerWidth < 480 ? (
            <BottomNavigation />
          ) : (
            <div className="DashboardFooter">
              <Footer />
              <CopyrightFooter />
            </div>
          )}
        </div>
        {this.state.isLoading ? <Loader /> : null}
        {this.state.showModal ? (
          <EventModal
            showEventModal={this.showEventModal}
            event={this.state.selectedGalleryEvent}
          />
        ) : null}
        {this.state.showCalender ? (
          <div className="Modal">
            <div className="modalContainer">
              {console.log('Range date', this.state.rangeDate)}
              <DateRangePicker
                onChange={(item) =>
                  this.setState({ rangeDate: item.selection })
                }
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={[this.state.rangeDate]}
                direction="horizontal"
              />
              <div className="datePickerBtns">
                <button
                  type="button"
                  className="resetBtn"
                  onClick={() => this.setState({ showCalender: false })}
                  style={{ margin: '0 10px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="resetBtn"
                  style={{ margin: '0 10px' }}
                  onClick={() =>
                    this.setState({ showCalender: false }, () =>
                      this.fetchRequestWithDate()
                    )
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
export default ManageRequest
