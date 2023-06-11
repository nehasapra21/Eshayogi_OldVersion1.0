import React, { Component, Fragment } from 'react';
import Header from '../header/Header';
import '../ManageConstituency/ManageConstituency.css';
import Footer from '../footer/Footer';
import CopyRightFooter from '../footer/CopyrightFooter';
import api from '../../utils/api';
import Search from '../../utils/images/search.svg';
import Plus from '../../utils/images/plus.svg';
import { Link } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import { toast } from 'react-toastify';
import Back from '../../utils/images/back.svg';
import Loader from '../hoc/Loader/Loader';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import DateIcon from '../../utils/images/dateIcon.png';
import Warning from '../hoc/Warning/Warning';
import Trash from '../../utils/images/trash.svg';
import moment from 'moment';
import { Table } from 'semantic-ui-react';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import * as svg from '../../utils/svg/index';

export default class ManageDirectory extends Component {
  constructor(props) {
    super(props);

    document.title = 'Calling Directory';
    const { role, byUser, orgId } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data;

    this.state = {
      callingDirectoryData: '',
      mountComponent: false,
      isLoading: true,
      searchInput: '',
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
    };
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  filteredData = {
    data: {
      rows: [],
    },
  };

  componentDidMount() {
    const role = JSON.parse(localStorage.getItem('eSahyogiUser')).data.role;
    this.fetchCallingDirectory();
  }

  resetHandler = () => {
    this.setState({
      searchInput: '',
      fromDate: 'From',
      toDate: 'To',
      showWarning: false,
    });
    this.fetchCallingDirectory();
  };

  saveToFromSearch = (e, rangeDate) => {
    this.setState({
      showCalender: false,
      searchInput: e.target.value,
      showWarning: false,
    });

    let fromDate = new Date(rangeDate.startDate);
    let toDate = new Date(rangeDate.endDate);

    this.setState({
      fromDate: `${fromDate.getDate()}/${
        fromDate.getMonth() + 1
      }/${fromDate.getFullYear()}`,
      toDate: `${toDate.getDate()}/${
        toDate.getMonth() + 1
      }/${toDate.getFullYear()}`,
      search: '',
    });

    this.fetchCallingDirectoryWithDate(fromDate, toDate);
  };

  fetchCallingDirectory = () => {
    this.setState({ isLoading: true });
    api
      .manageCallingDirectory({
        q: this.state.searchInput === '' ? '' : this.state.searchInput,
        limit: '100',
        offset: '0',
      })
      .then((response) => {
        if (response.ok) {
          console.log('response of callin direactory', response);
          if (response.data.error) {
            this.setState({ showWarning: true, isLoading: false });
          } else {
            this.setState({
              callingDirectoryData: response.data.data,
              isLoading: false,
            });
          }
        } else {
          toast.error('Something went wrong', {
            autoClose: 1250,
            closeButton: false,
          });
        }
      });
  };

  fetchCallingDirectoryWithDate = (fromDate, toDate) => {
    api
      .manageCallingDirectory({
        q: '',
        limit: '100',
        offset: '0',
        from: {
          yyyy: parseInt(`${fromDate.getFullYear()}`),
          dd: parseInt(`${fromDate.getDate()}`),
          mm: parseInt(`${fromDate.getMonth() + 1}`),
        },
        to: {
          yyyy: parseInt(`${toDate.getFullYear()}`),
          dd: parseInt(`${toDate.getDate()}`),
          mm: parseInt(`${toDate.getMonth() + 1}`),
        },
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            this.setState({ showWarning: true, isLoading: false });
          } else {
            this.setState({
              callingDirectoryData: response.data.data,
              isLoading: false,
            });
          }
        } else {
          toast.error('Something went wrong', {
            autoClose: 1250,
            closeButton: false,
          });
        }
      });
  };

  captureSearchInput = (event) => {
    this.setState({ searchInput: event.target.value }, () =>
      this.fetchCallingDirectory()
    );
  };

  updateCallingDirectory = (data) => {
    this.props.history.push({
      pathname: '/confirm/calling-directory',
      state: {
        callerFrom: data.callerFrom,
        isUpdateRequest: true,
        callerName: data.name,
        callerNumber: data.mobileNumber,
        callerPurpose: data.purpose,
        callerState: data.meta.state || '',
        callerPincode: data.meta.pinCode || '',
        callerAddress: data.meta.address || '',
        id: data.id,
        callerConstituency: data.meta.constituency || '',
        callerVidhanSabha: data.meta.vidhanSabha || '',
        callerBlock: data.meta.block || '',
        callerGramPanchayat: data.meta.gramPanchayat || '',
        callerMeet: data.meta.callerMeet,
      },
    });
  };

  deleteCallingDirectory = (id) => {
    console.log('id', id);
    api
      .deleteDirectory({ id: id })
      .then((response) => {
        if (response.ok) {
          toast.success('Entry Deleted SuccessFully', {
            autoClose: 1250,
            closeButton: false,
          });
          setTimeout(() => window.location.reload(true), 500);
        } else {
          toast.error('Something Went Wrong.', {
            autoClose: 1500,
            closeButton: false,
          });
        }
      })
      .catch((err) => {
        toast.error('Something Went Wrong. Please Refresh', {
          autoClose: false,
          closeButton: false,
        });
      });
  };

  afterImport = (data) => {
    const callingDirectories = [];

    data.map((obj, index) => {
      let newData = new Object();
      let meta = {};

      meta.callerMeet = obj.callerMeet;
      meta.gramPanchayat = obj.gramPanchayat;
      meta.vidhanSabha = obj.vidhanSabha;
      meta.block = obj.block;
      meta.address = obj.address;
      meta.constituency = obj.constituency;
      meta.state = obj.state;
      meta.pinCode = obj.pinCode;

      delete obj.callerMeet;
      delete obj.gramPanchayat;
      delete obj.vidhanSabha;
      delete obj.block;
      delete obj.address;
      delete obj.constituency;
      delete obj.state;
      delete obj.pinCode;

      Object.assign(newData, obj);
      newData.meta = { ...meta };
      newData.byUser = { ...this.state.byUser };
      newData.orgId = this.state.orgId;
      callingDirectories.push(newData);
    });
    if (callingDirectories || callingDirectories.length !== 0) {
      const reqData = { callingDirectories };
      console.log('reqData', reqData);

      api
        .bulkImportCalling(reqData)
        .then((response) => {
          if (response.data.error) {
            toast.error('Unable to upload.', {
              autoClose: 1250,
              closeButton: false,
            });
          } else {
            toast.success('Upload successful', {
              autoClose: 1250,
              closeButton: false,
            });
            setTimeout(() => window.location.reload(true), 500);
          }
        })
        .catch((err) => {
          toast.error('Something Went Wrong. Try Again', {
            autoClose: 1250,
            closeButton: false,
          });
        });
    }
  };

  onImportExcel = (file) => {
    const { files } = file.target;
    let data = [];

    // Read the file through the FileReader object
    const fileReader = new FileReader();

    // Open the file in binary mode
    fileReader.readAsBinaryString(files[0]);

    fileReader.onload = (event) => {
      try {
        const { result } = event.target;

        // Read the entire excel table object in binary stream

        const workbook = XLSX.read(result, { type: 'binary' });

        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
          }
        }

        if (data.length !== 0) {
          this.afterImport(data);
        }

        // Finally obtained and formatted json data
        toast.success('Successfully Uploaded', {
          autoClose: 1250,
          closeButton: false,
        });
      } catch (e) {
        console.log('went worng', e);
      }
    };
  };

  exportData = () => {
    console.log('Calling directory data', this.state.callingDirectoryData);
    let csvData = this.state.callingDirectoryData.rows.map((data) => {
      return {
        Name: data.name,
        'Mobile Number': data.mobileNumber,
        Address: data.meta.address,
        State: data.meta.state,
        'Caller From': data.callerFrom,
        Constituency: data.meta.constituency,
        'Gram Panchayat': data.meta.gramPanchayat,
        'Vidhan Sabha': data.meta.vidhanSabha,
        Block: data.meta.block,
        Pincode: data.meta.pinCode,
        Purpose: data.purpose,
        'Want To ?': data.meta.callerMeet,
      };
    });

    let date = new Date();

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(
      data,
      'Calling_Directory_data' +
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
        fileExtension
    );
  };

  render() {
    return (
      <div className='BackgroundHomeframe'>
        <Header isLoading={this.state.isLoading} />
        <div className='frame2' style={{ marginTop: '100px' }}>
          <div className='FormOuterFrame'>
            <div
              className='DivHeading'
              style={{ justifyContent: 'center', marginTop: '-17px' }}
            >
              <p className='ConstituencyHead' style={{ marginLeft: '33%' }}>
                Manage Calling Directory
              </p>
              <Link style={{ marginLeft: '25%' }} to={'/add-calling-directory'}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p className='UpperTabTxt' style={{ marginRight: '10px' }}>
                    Add
                  </p>
                  <img src={Plus} alt='' />
                </div>
              </Link>
            </div>
            <div className='constituencyTabs'>
              <div className='SearchDiv'>
                <div className='DateSearch'>
                  <div
                    onClick={() => this.setState({ showCalender: true })}
                    style={{ borderRight: '1px solid #E3E3E8' }}
                  >
                    <img className='calender' src={DateIcon} alt=''></img>
                  </div>
                </div>
                <div className='SearchDivLayoutCallingDirectory'>
                  <input
                    type='text'
                    placeholder='Search Requests (Name, Mobile Number)'
                    className='SearchInput'
                    value={this.state.searchInput}
                    onChange={(e) => {
                      this.state.fromDate === 'From'
                        ? this.captureSearchInput(e)
                        : this.saveToFromSearch(e, this.state.rangeDate);
                    }}
                  />
                  <img src={Search} alt='' className='SearchIcon' />
                </div>
                <button
                  type='button'
                  className='resetBtn'
                  onClick={() => this.resetHandler()}
                >
                  Reset
                </button>
                <div id='imprtExport' className='importExportSec'>
                  <div class='importExportBtn'>
                    <label className='importLabel'>Import</label>
                    <input
                      className='importBtn'
                      type='file'
                      accept='.xlsx, .xls'
                      onChange={this.onImportExcel}
                    />
                    {svg.importGrey}
                  </div>
                  <div
                    class='importExportBtn export'
                    onClick={() => this.exportData()}
                  >
                    <p>Export</p>
                    {svg.importGrey}
                  </div>
                </div>
              </div>
            </div>
            <div className='FormFrame'>
              {this.state.isLoading ? null : this.state.showWarning ? (
                <Warning warningMsg='No Data Found' />
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
                          <p className='HeadingTxt'>Date</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{
                            borderTop: 'none',
                            width: '12%',
                          }}
                        >
                          <p className='HeadingTxt'>Caller Name</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '11%' }}
                        >
                          <p className='HeadingTxt'>Mobile Number</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '9%' }}
                        >
                          <p className='HeadingTxt1'>From</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '10%' }}
                        >
                          <p className='HeadingTxt'>Request Type</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ borderTop: 'none', width: '40%' }}
                        >
                          <p className='HeadingTxt'>Purpose</p>
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
                      {this.state.callingDirectoryData.rows
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((data) => {
                          return (
                            <Table.Row>
                              <Table.Cell>
                                <p className='DataTxt'>
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
                                  <p className='DataTxt'>{data.name}</p>
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                <p className='DataTxt'>{data.mobileNumber} </p>
                              </Table.Cell>
                              <Table.Cell>
                                <p className='DataTxt'>{data.callerFrom}</p>
                              </Table.Cell>
                              <Table.Cell>
                                <p className='DataTxt'>
                                  {data.meta.callerMeet}
                                </p>
                              </Table.Cell>
                              <Table.Cell>
                                <p className='DataTxt'>{data.purpose}</p>
                              </Table.Cell>
                              <Table.Cell>
                                {this.state.role === 'USER' ? null : (
                                  <img
                                    src={Trash}
                                    alt=''
                                    className='deleteIcon'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                      this.deleteCallingDirectory(data.id)
                                    }
                                  ></img>
                                )}
                              </Table.Cell>
                              <Table.Cell
                                onClick={() =>
                                  this.updateCallingDirectory(data)
                                }
                              >
                                <img src={Back} alt='' className='Back' />
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                    </Table.Body>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component='div'
                    count={this.state.callingDirectoryData.rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.setPage}
                    onChangeRowsPerPage={this.setRowsPerPage}
                  />
                </Fragment>
              )}
            </div>
          </div>
          <div className='DashboardFooter'>
            <Footer />
            <CopyRightFooter />
          </div>
        </div>
        {this.state.isLoading ? <Loader /> : null}
        {this.state.showCalender ? (
          <div className='Modal'>
            <div className='modalContainer'>
              {console.log('Range date', this.state.rangeDate)}
              <DateRangePicker
                onChange={(item) =>
                  this.setState({ rangeDate: item.selection })
                }
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={[this.state.rangeDate]}
                direction='horizontal'
              />
              <div className='datePickerBtns'>
                <button
                  type='button'
                  className='resetBtn'
                  onClick={() => this.setState({ showCalender: false })}
                  style={{ margin: '0 10px' }}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='resetBtn'
                  style={{ margin: '0 10px' }}
                  onClick={(e) =>
                    this.saveToFromSearch(e, this.state.rangeDate)
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className='emptyDiv'></div>
      </div>
    );
  }
}
