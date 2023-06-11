import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import '../ManageConstituency/ManageConstituency.css'
import Footer from '../footer/Footer'
import CopyRightFooter from '../footer/CopyrightFooter'
import Search from '../../utils/images/search.svg'

// import stateData from '../map/himachal.json'

import { Row, Col } from 'react-bootstrap'
import TablePagination from '@material-ui/core/TablePagination'
import Back from '../../utils/images/back.svg'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import { Link } from 'react-router-dom'
import Plus from '../../utils/images/plus.svg'
import api from '../../utils/api'
import moment from 'moment'
import { Calendar } from 'react-date-range'
import DateIcon from '../../utils/images/dateIcon.png'
import Loader from '../hoc/Loader/Loader'

import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import importLogo from '../../utils/images/ImportLogo.png'
import greyImportLogo from '../../utils/images/exportLogo.svg'

export default class BoothDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boothDetails: {},
      mountComponent: false,
      isLoading: true,
      searchInput: '',
      page: 0,
      rowsPerPage: 25,
      limit: '25',
      offset: '0',
      date: '',
      mandals: [],
      export: '',
    }
    console.log('Booth display data', this.props)
  }

  componentDidMount() {
 
   
    this.fetchBoothDetails()
    this.fetchMandal()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.location?.pathname?.split('/')[3] !==
      this?.props?.location?.pathname?.split('/')[3]
    ) {
      this.setState({
        boothDetails: {},
      })
      this.fetchBoothDetails()
    }
    if (prevState?.mandals?.length < 0) {
      this.fetchMandal()
    }
  }

  // setBoothData = () => {
  //   const {
  //     params: { mandalName },
  //   } = this.props.match

  //   const mandalData = stateData.mandals.filter(
  //     (mandal) => mandal.name === mandalName
  //   )
  //   this.setState({
  //     mandalData: mandalData[0],
  //   })
  // }

  fetchBoothDetails = () => {
    const mandalName = this.props.location.pathname.split('/')[3]
    api
      .getBoothDetails({
        mandalName: mandalName,
        limit: this.state.limit,
        offset: this.state.offset,
      })
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetch constituency', response)
          if (response.data.data === undefined) {
          } else {
            this.setState({
              boothDetails: response.data.data,
              isLoading: false,
            })
          }
        }
      })
  }

  fetchMandal = () => {
    //Fetch Mandal
    api
      .getConstituencyData({
        type: 'Mandal Level',
        limit: '100',
        offset: '0',
        status: true,
      })
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetch BoothDetails', response)
          if (response.data.data === undefined) {
            this.showWarning = true
          } else {
            const mandal = response.data.data.rows.map((wonderer) => wonderer.meta.name)
            this.setState({ mandals: mandal, isLoading: false })
          }
        }
      })
  }

  setBoothDetailsSearchInput = (event) => {
    let searchValue = event.target.value
    this.setState({ search: searchValue }, () => this.fetchBoothDetailsWithSearch())
  }

  fetchBoothDetailsWithSearch = () => {
    const mandalName = this.props.location.pathname.split('/')[3]

    api
      .getBoothDetails({
        mandalName: mandalName,
        search: `${this.state.search}`,
        limit: this.state.limit,
        offset: this.state.offset,
      })
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetch BoothDetails', response)
          this.setState({ boothDetails: response.data.data, isLoading: false })
        } else {
          console.log('Response is not ok', response)
        }
      })
  }

  fetchBoothDetailsWithDate = () => {
    const mandalName = this.props.location.pathname.split('/')[3]

    this.setState({ isLoading: true })
    let date = new Date(this.state.date)

    api
      .getBoothDetails({
        mandalName: mandalName,
        limit: this.state.limit,
        offset: this.state.offset,
        dt: {
          dd: moment(date).format('DD'),
          mm: moment(date).format('MM'),
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetch BoothDetails', response)
          this.setState({ boothDetails: response.data.data, isLoading: false })
        } else {
          console.log('Response is not ok', response)
        }
      })
  }

  setPage = (event, newPage) => {
    const newOffset = +newPage * +this.state.limit
    this.setState({ page: newPage, offset: `${newOffset}` }, () => {
      if (this.state.date) {
        this.fetchBoothDetailsWithDate()
      } else if (this.state.search) {
        this.fetchBoothDetailsWithSearch()
      } else {
        this.fetchBoothDetails()
      }
    })
  }

  setRowsPerPage = (event) => {
    this.setState(
      {
        rowsPerPage: +event.target.value,
        page: 0,
        offset: '0',
        limit: `${+event.target.value}`,
      },
      () => {
        if (this.state.date) {
          this.fetchBoothDetailsWithDate()
        } else if (this.state.search) {
          this.fetchBoothDetailsWithSearch()
        } else {
          this.fetchBoothDetails()
        }
      }
    )
  }

  updateBoothDetails = (data) => {
    this.props.history.push({
      pathname: '/update-booth-details',
      state: {
        isUpdateRequest: true,
        ...data,
      },
    })
  }

  resetHandler = () => {
    this.setState({
      search: '',
      date: '',
      isLoading: true,
    })
    this.fetchBoothDetails()
  }

  exportData = () => {
    console.log('booth details Data', this.state.boothDetails)
    let csvData = this.state.boothDetails.rows.map((data) => {
      delete data.meta
      delete data.updatedAt
      delete data.createdAt
      delete data.byUser
      delete data.orgId
      delete data.id
      delete data.status

      return {
        ...data,
        dob: data.dob.dt ? moment(data.dob.dt).format('DD.MM.YYYY') : '',
        doa: data.doa.dt ? moment(data.doa.dt).format('DD.MM.YYYY') : '',
      }
    })

    console.log('Export data ready', csvData)

    let date = new Date()

    console.log('CSVdata', csvData)
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(
      data,
      'Booth_Details_data' +
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
        fileExtension
    )
  }

  render() {
    
    const { mandals, boothDetails, rowsPerPage, page, isLoading } = this.state
    return (
      <div className="BackgroundHomeframe">
        <Header isLoading={isLoading} />
        <div className="frame2" style={{ marginTop: '100px' }}>
          <div className="FormOuterFrame">
            <div
              className="DivHeading"
              style={{
                justifyContent: 'center',
                marginTop: '-17px',
                position: 'relative',
              }}
            >
              <img
                src={backIcon}
                alt=""
                className="backIcon"
                onClick={() => this.props.history.goBack()}
                style={{
                  display: 'block',
                  position: 'absolute',
                  left: '4%',
                }}
              ></img>
              <p className="ConstituencyHead">Booth Details</p>
              <Link
                style={{ display: 'block', position: 'absolute', right: '4%' }}
                to={'/add-booth-details'}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p className="UpperTabTxt" style={{ marginRight: '10px' }}>
                    Add
                  </p>
                  <img src={Plus} alt="" />
                </div>
              </Link>
            </div>
            {isLoading ? null : (
              <Fragment>
                <div className="constituencyTabs">
                  <ul>
                    {mandals?.map((mandal) => {
                      return (
                        <li
                          key={mandal}
                          className={
                            mandal === this.props.location.pathname.split('/')[3] ? 'active' : null
                          }
                          onClick={() => {
                            this.setState({ searchInput: '' })
                            this.setState({ page: 0 })
                            this.props.history.push(`/constituency/manage-booth-details/${mandal}`)
                          }}
                        >
                          {mandal}
                        </li>
                      )
                    })}
                  </ul>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <div
                      onClick={() =>
                        this.setState({
                          showCalender: !this.state.showCalender,
                        })
                      }
                      style={{ borderRight: '1px solid #E3E3E8' }}
                    >
                      <img className="calender" src={DateIcon} alt=""></img>
                    </div>
                    <div className="SearchDivLayout">
                      <input
                        type="text"
                        placeholder="Search Requests (Booth Name, President Name)"
                        className="SearchInput"
                        value={this.state.search}
                        onChange={(e) => {
                          this.setBoothDetailsSearchInput(e)
                        }}
                      />
                      <img src={Search} alt="" className="SearchIcon" />
                    </div>
                    <button type="button" className="resetBtn" onClick={() => this.resetHandler()}>
                      Reset
                    </button>
                  
                    <div  id="exportid"
                      className="importExportBtn"
                      onClick={() => this.exportData()}
                      onMouseOver={() => {
                        this.setState({ export: 'show' })
                      }}
                      onMouseOut={() => {
                        this.setState({ export: '' })
                      }}
                       >
                           {
                 JSON.parse(localStorage.getItem('eSahyogiUser')).data.role === 'ADMIN'
                    ? <p><span className={this.state.export === 'show' ? '' : 'exportHover'}>Export</span> <img
                    className="export"
                    src={this.state.export === 'show' ? importLogo : greyImportLogo}
                    alt=""
                  ></img></p>
                    : ''
                }
                      
                     
                    </div>
                  </div>
                  {this.state.showCalender ? (
                    <div
                      style={{
                        position: 'absolute',
                        left: '200px',
                        zIndex: '1',
                      }}
                    >
                      <Calendar
                        onChange={(date) =>
                          this.setState({ date: date, showCalender: false }, () =>
                            this.fetchBoothDetailsWithDate()
                          )
                        }
                        date={this.state.date}
                        color="#2f2d64"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="FormFrame">
                  <Fragment>
                    <div className="FormOuterFrame">
                      <div className="requestRow" style={{ borderTop: 'none' }}>
                        <Row>
                          <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                            <p className="HeadingTxt">Booth Name</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '5%' }}>
                            <p className="HeadingTxt">Booth No.</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '15%' }}>
                            <p className="HeadingTxt">Booth President</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                            <p className="HeadingTxt">Calling</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                            <p className="HeadingTxt">Whatsapp</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '' }}>
                            <p className="HeadingTxt">Address</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                            <p className="HeadingTxt">Birthday</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                            <p className="HeadingTxt">Anniversary</p>
                          </Col>
                          <Col style={{ alignSelf: 'center', maxWidth: '4%' }}></Col>
                        </Row>
                      </div>
                      {boothDetails?.rows?.map((data) => {
                        return (
                          <div className="requestRow">
                            <Row>
                              <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                                <p className="DataTxt">{data?.boothName}</p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '5%' }}>
                                <p className="DataTxt">{data?.boothNumber}</p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '15%' }}>
                                <p className="DataTxt">{data?.boothPresident}</p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                                <p className="DataTxt">{data?.callingNumber}</p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                                <p className="DataTxt">{data?.whatsappNumber}</p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '' }}>
                                <p className="DataTxt">{data?.address}</p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                                <p className="DataTxt">
                                  {data.dob.dt ? moment(data?.dob?.dt).format('DD/MM/YYYY') : ''}
                                </p>
                              </Col>
                              <Col style={{ alignSelf: 'center', maxWidth: '10%' }}>
                                <p className="DataTxt">
                                  {data.doa.dt ? moment(data?.doa?.dt).format('DD/MM/YYYY') : ''}
                                </p>
                              </Col>
                              <Col
                                style={{
                                  alignSelf: 'center',
                                  maxWidth: '4%',
                                  padding: '0px',
                                  textAlign: 'left',
                                }}
                                onClick={() => this.updateBoothDetails(data)}
                              >
                                <img src={Back} alt="" className="Back" />
                              </Col>
                            </Row>
                          </div>
                        )
                      })}
                      <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        count={boothDetails?.count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.setPage}
                        onChangeRowsPerPage={this.setRowsPerPage}
                      />
                    </div>
                  </Fragment>
                </div>
              </Fragment>
            )}
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyRightFooter />
          </div>
        </div>
        {this.state.isLoading ? <Loader /> : null}
        <div className="emptyDiv"></div>
      </div>
    )
    
  }
}
