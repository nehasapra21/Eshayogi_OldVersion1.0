import React, { Component } from 'react';
import Flag from '../../utils/images/flag.svg';
import Attachment from '../../utils/images/attachment.svg';
import Back from '../../utils/images/back.svg';
import { Table, Label } from 'semantic-ui-react';
import ComplaintForm from '../forms/complaint/Complaint';
import TablePagination from '@material-ui/core/TablePagination';

class ManageJob extends Component {
  constructor(props) {
    document.title = 'Job Management Panel';
    super(props);
    console.log('Jobs ke props', this.props);
    this.state = {
      page: 0,
      rowsPerPage: 25,
    };
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage });
    this.props.changeOffset(newPage);
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
    this.props.changeLimit(+event.target.value);
  };

  historyFunction(request) {
    console.log();
    this.props.history.push({
      pathname: '/confirmation/job',
      state: { job: request },
      search: '?show-application',
    });
  }

  render(props) {
    let array = this.props.jobs;

    return (
      <div className='ManageRequests'>
        <div className='frame2'>
          <div className='FormOuterFrame'>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '13%', paddingLeft: '2%' }}>
                    <p className='HeadingTxt'>Reference No</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxt'>Date &amp; Admin</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '27%' }}>
                    <div style={{ height: '100%' }}>
                      <p className='HeadingTxt'>Description</p>
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%' }}>
                    <p className='HeadingTxt1'>Mobile Number</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '8%' }}>
                    <p className='HeadingTxt1'>Professional Qulaification</p>
                  </Table.HeaderCell>

                  <Table.HeaderCell style={{ width: '10%' }}>
                    <p className='HeadingTxt'>Shared To</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%' }}>
                    <p className='HeadingTxt'>Qualification &amp; Experience</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%' }}>
                    <p className='HeadingTxtstatus'>Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.jobs.data.rows.map((job, index) => {
                  const {
                    citizenPhone,
                    comments,
                    citizenName,
                    experienceYears,
                    highestEduQualification,
                    important,
                    invitation,
                    preferredSector,
                    recommendedName,
                    professionalQualification,
                    sharedToName,
                    sharedToDepartment,
                    experienceMonths
                  } = job.request;
                  const { firstName, lastName } = job.byUser;
                  return (
                    <Table.Row onClick={() => this.historyFunction(job)}>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className='DataTxt'>{job.ref}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className='DataTxt'>
                            {job.dd}/{job.mm}/{job.yy}
                          </p>
                          <p className='DataTxt'>
                            {firstName} {lastName}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          <div style={{ display: 'flex' }}>
                            <p className='DataTxt'>{citizenName}</p>
                            <img
                              src={Flag}
                              alt=''
                              className={important === 'yes' ? 'Flag' : 'None'}
                            />
                            <img
                              src={Attachment}
                              alt=''
                              className={
                                invitation != undefined
                                  ? invitation.length == 0
                                    ? 'None'
                                    : 'Flag'
                                  : 'None'
                              }
                            />
                          </div>
                          <p className='DataTxt'>
                            {comments.substring(0, 150)}
                          </p>
                          <p className='DataTxt1'>
                            Recommended By : {recommendedName}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>{citizenPhone !== '' ? citizenPhone : 'N/A'}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>{professionalQualification}</p>
                      </Table.Cell>

                      <Table.Cell>
                        <p className='DataTxt'>{sharedToName}</p>
                        <p className='DataTxt'>{sharedToDepartment}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>{highestEduQualification}</p>
                        <p className='DataTxt'>{experienceYears} years { experienceMonths } months</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          className={
                            job.status === 'PENDING'
                              ? 'StatusDesc statusPending'
                              : job.status === 'SHARED'
                              ? 'StatusDesc statusShared'
                              : job.status === 'PLACED'
                              ? 'StatusDesc statusPlaced'
                              : 'StatusDesc statusRejected'
                          }
                        >
                          <p className='StatusTxt white' id='datatxt'>
                            {job.status}
                          </p>
                        </div>
                      </Table.Cell> 
                      <Table.Cell>
                        <img src={Back} alt='' className='Back' />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component='div'
            count={this.props.jobs.data.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.setPage}
            onChangeRowsPerPage={this.setRowsPerPage}
          />
        </div>
      </div>
    );
  }
}
export default ManageJob;
