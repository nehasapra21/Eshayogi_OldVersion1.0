import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import '../ManageConstituency/ManageConstituency.css'
import Footer from '../footer/Footer'
import CopyRightFooter from '../footer/CopyrightFooter'
import api from '../../utils/api'
import Search from '../../utils/images/search.svg'
import Plus from '../../utils/images/plus.svg'
import { Link } from 'react-router-dom'
import TablePagination from '@material-ui/core/TablePagination'
import { toast } from 'react-toastify'
import Back from '../../utils/images/back.svg'
import Loader from '../hoc/Loader/Loader'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import DateIcon from '../../utils/images/dateIcon.png'
import Warning from '../hoc/Warning/Warning'
import importLogo from '../../utils/images/ImportLogo.png'
import greyImportLogo from '../../utils/images/exportLogo.svg'
import Trash from '../../utils/images/trash.svg'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import { filterIcon } from '../../utils/svg/index'

import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import * as svg from '../../utils/svg/index'
import './Visitor.css'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

export default class ManageVisitor extends Component {
  constructor(props) {
    super(props)

    document.title = 'Manage Visitor'
    const { role, byUser, orgId } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data

    this.state = {
      data: '',
      mountComponent: false,
      isLoading: true,
      page: 0,
      rowsPerPage: 25,
      showModal: false,
      fromDate: 'From',
      toDate: 'To',
      rangeDate: {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
      showCalender: false,
      showWarning: false,
      export: '',
      role: role,
      byUser: { ...byUser },
      orgId: orgId,
      offset: '0',
      limit: '25',
      caller: 'ALL',
      district: '',
      vidhanSabha: '',
      panchayat: '',
      search: '',
      districtOption: [],
      vidhanSabhaOption: [],
      panchayatOption: [],
      isDateFilterOn: false,
      totalCount: 0,
    }
  }

  componentDidMount() {
    this.fetchVisitor()
    this.fetchConstituency()
    setTimeout(() => this.fetchFilterData(), 1500)
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage })
    this.changeOffset(newPage)
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 })
    this.changeLimit(+event.target.value)
  }

  fetchVisitor = () => {
    this.setState({ isLoading: true })

    api
      .filterVisitor({
        caller: this.state.caller,
        search: this.state.search,
        district: this.state.district,
        vidhanSabha: this.state.vidhanSabha,
        panchayat: this.state.panchayat,
        limit: this.state.limit,
        offset: this.state.offset,
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('No Data Found', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({ showWarning: true, isLoading: false })
          } else {
            toast.success('Visitors Fetched Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState(
              {
                data: response.data.data,
                isLoading: false,
                showWarning: false,
                totalCount: response?.data?.data?.count || 0,
              },
              () => console.log('state', this.state)
            )
          }
        } else {
          toast.error('Something went wrong', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      })
  }

  changeLimit = (value) => {
    this.setState(
      {
        offset: '0',
        limit: `${value}`,
      },
      () => {
        this.fetchVisitor()
      }
    )
  }

  changeOffset = (value) => {
    const newOffset = +value * +this.state.limit
    this.setState({ offset: `${newOffset}` }, () => {
      this.fetchVisitor()
    })
  }

  updateVisitor = (data) => {
    let visitorData = { ...data }
    delete visitorData.meta
    this.props.history.push({
      pathname: '/add-visitor',
      state: {
        ...visitorData,
        state: data.meta.state,
        block: data.meta.block,
      },
    })
  }

  deleteVisitor = (id) => {
    console.log('id', id)
    api
      .deleteVisitor({ id: id })
      .then((response) => {
        if (response.ok) {
          toast.success('Entry Deleted SuccessFully', {
            autoClose: 1250,
            closeButton: false,
          })
          setTimeout(() => window.location.reload(true), 500)
        } else {
          toast.error('Something Went Wrong.', {
            autoClose: 1500,
            closeButton: false,
          })
        }
      })
      .catch((err) => {
        toast.error('Something Went Wrong. Please Refresh', {
          autoClose: false,
          closeButton: false,
        })
      })
  }

  showFilter = () => {
    let filter = document.getElementById('filter-options')
    filter.style.display = 'block'
  }

  hideFilter = () => {
    let filter = document.getElementById('filter-options')
    filter.style.display = 'none'
  }

  fetchFilterData = () => {
    let tempDist = [...this.state.districtOption]
    let tempVid = [...this.state.vidhanSabhaOption]
    let tempPanch = [...this.state.panchayatOption]

    api
      .uniqueVisitorAPI({
        key: 'district',
        order: 'ASC',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No districts found', {
            autoClose: 1250,
            closeButton: false,
          })
        } else {
          let temp = []
          response.data.data.map((district) => {
            temp.push(...Object.values(district))
          })

          temp = [...temp, ...tempDist]

          this.setState({ districtOption: [...temp] })
        }
      })

    api
      .uniqueVisitorAPI({
        key: 'vidhanSabha',
        order: 'ASC',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No vidhan sabha found', {
            autoClose: 1250,
            closeButton: false,
          })
        } else {
          let temp = []
          response.data.data.map((vidhanSabha) => {
            temp.push(...Object.values(vidhanSabha))
          })
          temp = [...temp, ...tempVid]
          this.setState({ vidhanSabhaOption: [...temp] })
        }
      })

    api
      .uniqueVisitorAPI({
        key: 'panchayat',
        order: 'ASC',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No panchayat found', {
            autoClose: 1250,
            closeButton: false,
          })
        } else {
          let temp = []
          response.data.data.map((panchayat) => {
            temp.push(...Object.values(panchayat))
          })
          temp = [...temp, ...tempPanch]
          this.setState({ panchayatOption: [...temp] })
        }
      })
  }

  fetchConstituency = () => {
    api
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
    api
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
          this.makeVidhanSabha()
        }
      })
    api
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
          this.makePanchayat()
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
      if (
        data.meta.district === this.state.district ||
        this.state.district === ''
      ) {
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
      if (
        data.meta.vidhanSabha === this.state.vidhanSabha ||
        this.state.vidhanSabha === ''
      ) {
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

  fetchVisitorWithDate = () => {
    this.setState({ isLoading: true })
    let fromDate = this.state.rangeDate.startDate
    let toDate = this.state.rangeDate.endDate

    api
      .filterVisitor({
        caller: this.state.caller,
        search: this.state.search,
        district: this.state.district,
        vidhanSabha: this.state.vidhanSabha,
        panchayat: this.state.panchayat,
        limit: this.state.limit,
        offset: this.state.offset,
        from: `${fromDate.getFullYear()}-${
          fromDate.getMonth().toString().length === 1 && fromDate.getMonth() < 9
            ? `0${fromDate.getMonth() + 1}`
            : fromDate.getMonth() + 1
        }-${fromDate.getDate()}`,
        to: `${toDate.getFullYear()}-${
          toDate.getMonth().toString().length === 1 && toDate.getMonth() < 9
            ? `0${toDate.getMonth() + 1}`
            : toDate.getMonth() + 1
        }-${toDate.getDate()}`,
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('No Data Found', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({ showWarning: true, isLoading: false })
          } else {
            toast.success('Directory Fetched Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState(
              {
                data: response.data.data,
                isLoading: false,
                showWarning: false,
              },
              () => console.log('state', this.state)
            )
          }
        } else {
          toast.error('Something went wrong', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      })
  }

  resetHandler = () => {
    this.setState(
      {
        search: '',
        isDateFilterOn: false,
        caller: 'ALL',
      },
      () => this.fetchVisitor()
    )
  }

  exportData = () => {
    let csvData = this.state.data.rows.map((data) => {
      return {
        Name: data.name,
        'Mobile Number': data?.mobileNumber || 'NA',
        'Whatsapp Number': data?.whatsappNumber || 'NA',
        Email: data?.email || 'NA',
        Address: data?.address || 'NA',
        State: data?.meta?.state || 'NA',
        District: data?.district || 'NA',
        'Visitor From': data?.caller || 'NA',
        'Gram Panchayat': data?.panchayat || 'NA',
        'Vidhan Sabha': data?.vidhanSabha || 'NA',
        Block: data?.meta?.block || 'NA',
        Purpose: data?.purposeOfVisit || 'NA',
      }
    })

    let date = new Date()

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(
      data,
      'Visitor_Data' +
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
        fileExtension
    )
  }

  render() {
    return (
      <div className="BackgroundHomeframe">
        <Header isLoading={this.state.isLoading} />
        <div className="frame2" style={{ marginTop: '100px' }}>
          <div className="FormOuterFrame">
            <div
              className="DivHeading"
              style={{ justifyContent: 'center', marginTop: '-17px' }}
            >
              <p className="ConstituencyHead" style={{ marginLeft: '41%' }}>
                Manage Visitor
              </p>
              <Link style={{ marginLeft: '33%' }} to={'/add-visitor'}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p className="UpperTabTxt" style={{ marginRight: '10px' }}>
                    Add
                  </p>
                  <img src={Plus} alt="" />
                </div>
              </Link>
            </div>
            <div className="constituencyTabs visitor">
              <div className="filter-div">
                <div className="filter" onClick={() => this.showFilter()}>
                  <p>{this.state.caller}</p>
                  <span>{filterIcon}</span>
                </div>
                <ul id="filter-options" className="filter-options">
                  <li
                    onClick={() => {
                      this.setState(
                        {
                          caller: 'ALL',
                          district: '',
                          vidhanSabha: '',
                          panchayat: '',
                          districtOption: [],
                          vidhanSabhaOption: [],
                          panchayatOption: [],
                        },
                        () => {
                          this.hideFilter()
                          this.fetchConstituency()
                          setTimeout(() => {
                            this.fetchFilterData()
                          }, 1500)

                          this.fetchVisitor()
                        }
                      )
                    }}
                  >
                    ALL
                  </li>
                  <li
                    onClick={() => {
                      this.setState(
                        {
                          caller: 'CONSTITUENCY',
                          district: '',
                          vidhanSabha: '',
                          panchayat: '',
                          districtOption: [],
                          vidhanSabhaOption: [],
                          panchayatOption: [],
                        },
                        () => {
                          this.hideFilter()
                          this.fetchConstituency()
                          this.fetchVisitor()
                        }
                      )
                    }}
                  >
                    CONSTITUENCY
                  </li>
                  <li
                    onClick={() => {
                      this.setState(
                        {
                          caller: 'OTHER',
                          district: '',
                          vidhanSabha: '',
                          panchayat: '',
                          districtOption: [],
                          vidhanSabhaOption: [],
                          panchayatOption: [],
                        },
                        () => {
                          this.hideFilter()
                          this.fetchFilterData()
                          this.fetchVisitor()
                        }
                      )
                    }}
                  >
                    OTHER
                  </li>
                </ul>
              </div>
              <div className="SearchDiv visitor">
                <div className="DateSearch">
                  <div
                    onClick={() => this.setState({ showCalender: true })}
                    style={{ borderRight: '1px solid #E3E3E8' }}
                  >
                    <img className="calender" src={DateIcon} alt=""></img>
                  </div>
                </div>
                <div className="SearchDivLayoutCallingDirectory">
                  <input
                    type="text"
                    placeholder="Search Requests (Name, Mobile Number)"
                    className="SearchInput"
                    value={this.state.search}
                    onChange={(e) => {
                      if (this.state.isDateFilterOn) {
                        this.setState({ search: e.target.value }, () =>
                          this.fetchVisitorWithDate()
                        )
                      } else {
                        this.setState({ search: e.target.value }, () =>
                          this.fetchVisitor()
                        )
                      }
                    }}
                  />
                  <img src={Search} alt="" className="SearchIcon" />
                </div>
                <button
                  type="button"
                  className="resetBtn"
                  onClick={() => this.resetHandler()}
                >
                  Reset
                </button>
                <div id="imprtExport" className="importExportSec">
                  {/* <div class="importExportBtn">
                    <label className="importLabel">Import</label>
                    <input
                      className="importBtn"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={this.onImportExcel}
                    />
                    {svg.importGrey}
                  </div> */}
                  <div
                    class="importExportBtn export"
                    onClick={() => this.exportData()}
                  >
                    <p>Export</p>
                    {svg.importGrey}
                  </div>
                </div>
              </div>
              <div className="filter-section">
                <Autocomplete
                  id="combo-box-demo"
                  className="filter-box"
                  options={this.state.districtOption}
                  getOptionLabel={(option) => {
                    console.log('option', option)
                    return option
                  }}
                  value={this.state.district}
                  sx={{ width: 500 }}
                  onChange={(event, value) => {
                    if (value !== null && value !== undefined) {
                      this.setState({ district: value }, () => {
                        if (this.state.caller === 'CONSTITUENCY') {
                          this.makeVidhanSabha()
                        }
                        this.fetchVisitor()
                      })
                    } else {
                      this.setState(
                        {
                          district: '',
                        },
                        () => {
                          this.fetchVisitor()
                        }
                      )
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="District" />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  className="filter-box"
                  options={this.state.vidhanSabhaOption}
                  getOptionLabel={(option) => option}
                  value={this.state.vidhanSabha}
                  sx={{ width: 500 }}
                  onChange={(event, value) => {
                    if (value !== null && value !== undefined) {
                      this.setState({ vidhanSabha: value }, () => {
                        if (this.state.caller === 'CONSTITUENCY') {
                          this.makePanchayat()
                        }
                        this.fetchVisitor()
                      })
                    } else {
                      this.setState(
                        {
                          vidhanSabha: '',
                        },
                        () => {
                          this.fetchVisitor()
                        }
                      )
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Vidhan Sabha" />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  className="filter-box"
                  options={this.state.panchayatOption}
                  getOptionLabel={(option) => option}
                  value={this.state.panchayat}
                  sx={{ width: 500 }}
                  onChange={(event, value) => {
                    if (value !== null && value !== undefined) {
                      this.setState({ panchayat: value }, () =>
                        this.fetchVisitor()
                      )
                    } else {
                      this.setState({ panchayat: '' }, () =>
                        this.fetchVisitor()
                      )
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Panchayat" />
                  )}
                />
              </div>
            </div>
            <div className="FormFrame">
              {this.state.isLoading ? null : this.state.showWarning ? (
                <Warning warningMsg="No Data Found" />
              ) : (
                <Fragment>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          style={{
                            borderTop: 'none',
                            width: '9%',
                          }}
                        >
                          <p className="HeadingTxt">Date</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{
                            borderTop: 'none',
                            width: '12%',
                          }}
                        >
                          <p className="HeadingTxt">Visitor Name</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '11%' }}
                        >
                          <p className="HeadingTxt">Mobile Number</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '17%' }}
                        >
                          <p className="HeadingTxt1">Location</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '10%' }}
                        >
                          <p className="HeadingTxt">Address</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '14%' }}
                        >
                          <p className="HeadingTxt">Email ID</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '13%' }}
                        >
                          <p className="HeadingTxt">Remarks</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '15%' }}
                        >
                          <p className="HeadingTxt">Purpose</p>
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ borderTop: 'none' }}
                        ></Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none' }}
                        ></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.data.rows.map((data) => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              <p className="DataTxt">
                                {moment(data.createdAt)
                                  .utc()
                                  .startOf('day')
                                  .format('DD/MM/YYYY')}
                              </p>
                            </Table.Cell>
                            <Table.Cell>
                              <div
                                style={{
                                  alignSelf: 'center',
                                }}
                              >
                                <p className="DataTxt">{data.name}</p>
                              </div>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">{data.mobileNumber} </p>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">
                                <span style={{ fontFamily: 'SegoeBold' }}>
                                  Distict:{' '}
                                </span>
                                {data.district}
                              </p>
                              <p className="DataTxt">
                                <span style={{ fontFamily: 'SegoeBold' }}>
                                  Panchayat:{' '}
                                </span>
                                {data.panchayat}
                              </p>
                              <p className="DataTxt">
                                <span style={{ fontFamily: 'SegoeBold' }}>
                                  Vidhan Sabha:{' '}
                                </span>
                                {data.vidhanSabha}
                              </p>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">{data.address}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">{data.email}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">{data.remarks}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">{data.purposeOfVisit}</p>
                            </Table.Cell>
                            <Table.Cell>
                              {this.state.role === 'USER' ? null : (
                                <img
                                  src={Trash}
                                  alt=""
                                  className="deleteIcon"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => this.deleteVisitor(data.id)}
                                ></img>
                              )}
                            </Table.Cell>
                            <Table.Cell
                              onClick={() => this.updateVisitor(data)}
                            >
                              <img src={Back} alt="" className="Back" />
                            </Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component="div"
                    count={this.state.totalCount}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.setPage}
                    onChangeRowsPerPage={this.setRowsPerPage}
                  />
                </Fragment>
              )}
            </div>
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyRightFooter />
          </div>
        </div>
        {this.state.isLoading ? <Loader /> : null}
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
                  onClick={(e) =>
                    this.setState(
                      { showCalender: false, isDateFilterOn: true },
                      () => this.fetchVisitorWithDate()
                    )
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="emptyDiv"></div>
      </div>
    )
  }
}

// resetHandler = () => {
//   this.setState({
//     searchInput: '',
//     fromDate: 'From',
//     toDate: 'To',
//     showWarning: false,
//   });
//   this.fetchCallingDirectory();
// };

// saveToFromSearch = (e, rangeDate) => {
//   this.setState({
//     showCalender: false,
//     searchInput: e.target.value,
//     showWarning: false,
//   });

//   let fromDate = new Date(rangeDate.startDate);
//   let toDate = new Date(rangeDate.endDate);

//   this.setState({
//     fromDate: `${fromDate.getDate()}/${
//       fromDate.getMonth() + 1
//     }/${fromDate.getFullYear()}`,
//     toDate: `${toDate.getDate()}/${
//       toDate.getMonth() + 1
//     }/${toDate.getFullYear()}`,
//     search: '',
//   });

//   this.fetchCallingDirectoryWithDate(fromDate, toDate);
// };

// afterImport = (data) => {
//   const callingDirectories = [];

//   data.map((obj, index) => {
//     let newData = new Object();
//     let meta = {};

//     meta.callerMeet = obj.callerMeet;
//     meta.gramPanchayat = obj.gramPanchayat;
//     meta.vidhanSabha = obj.vidhanSabha;
//     meta.block = obj.block;
//     meta.address = obj.address;
//     meta.constituency = obj.constituency;
//     meta.state = obj.state;
//     meta.pinCode = obj.pinCode;

//     delete obj.callerMeet;
//     delete obj.gramPanchayat;
//     delete obj.vidhanSabha;
//     delete obj.block;
//     delete obj.address;
//     delete obj.constituency;
//     delete obj.state;
//     delete obj.pinCode;

//     Object.assign(newData, obj);
//     newData.meta = { ...meta };
//     newData.byUser = { ...this.state.byUser };
//     newData.orgId = this.state.orgId;
//     callingDirectories.push(newData);
//   });
//   if (callingDirectories || callingDirectories.length !== 0) {
//     const reqData = { callingDirectories };
//     console.log('reqData', reqData);

//     api
//       .bulkImportCalling(reqData)
//       .then((response) => {
//         if (response.data.error) {
//           toast.error('Unable to upload.', {
//             autoClose: 1250,
//             closeButton: false,
//           });
//         } else {
//           toast.success('Upload successful', {
//             autoClose: 1250,
//             closeButton: false,
//           });
//           setTimeout(() => window.location.reload(true), 500);
//         }
//       })
//       .catch((err) => {
//         toast.error('Something Went Wrong. Try Again', {
//           autoClose: 1250,
//           closeButton: false,
//         });
//       });
//   }
// };

// onImportExcel = (file) => {
//   const { files } = file.target;
//   let data = [];

//   // Read the file through the FileReader object
//   const fileReader = new FileReader();

//   // Open the file in binary mode
//   fileReader.readAsBinaryString(files[0]);

//   fileReader.onload = (event) => {
//     try {
//       const { result } = event.target;

//       // Read the entire excel table object in binary stream

//       const workbook = XLSX.read(result, { type: 'binary' });

//       for (const sheet in workbook.Sheets) {
//         if (workbook.Sheets.hasOwnProperty(sheet)) {
//           data = data.concat(
//             XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
//           );
//         }
//       }

//       if (data.length !== 0) {
//         this.afterImport(data);
//       }

//       // Finally obtained and formatted json data
//       toast.success('Successfully Uploaded', {
//         autoClose: 1250,
//         closeButton: false,
//       });
//     } catch (e) {
//       console.log('went worng', e);
//     }
//   };
// };
