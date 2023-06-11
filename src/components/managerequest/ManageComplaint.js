import React, { Component } from 'react';
import Api from '../../utils/api';
import Flag from '../../utils/images/flag.svg';
import Attachment from '../../utils/images/attachment.svg';
import Back from '../../utils/images/back.svg';
import { Table } from 'semantic-ui-react';
import TablePagination from '@material-ui/core/TablePagination';

class ManageComplaint extends Component {
  constructor(props) {
    document.title = 'Complaint Management Panel';
    super(props);
    console.log('Props aa gaye ', this.props);
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
      pathname: '/confirmation/complaint',
      state: { complaint: request },
      search: 'show-complaint',
    });
  }
  componentDidMount() {
    function titleCase(str) {
      return str
        .split(' ')
        .map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        )
        .join(' ');
    }
  }
  render(props) {
    return (
      <div className='ManageRequests'>
        <div className='frame2'>
          <div className='FormOuterFrame'>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    style={{
                      width: '13%',
                      paddingLeft: '2%',
                      borderTop: 'none',
                    }}
                  >
                    <p className='HeadingTxt'>Reference No</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{
                      width: '12%',
                      borderTop: 'none',
                      borderTop: 'none',
                    }}
                  >
                    <p className='HeadingTxt'>Date &amp; Admin</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '27%', borderTop: 'none' }}>
                    <div style={{ height: '100%' }}>
                      <p className='HeadingTxt'>Description</p>
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '9%', borderTop: 'none' }}>
                    <p className='HeadingTxt1'>Mobile Number</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '9%', borderTop: 'none' }}>
                    <p className='HeadingTxt'>Follow Up 1</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '9%', borderTop: 'none' }}>
                    <p className='HeadingTxt'>Follow Up 2</p>
                  </Table.HeaderCell>

                  <Table.HeaderCell style={{ width: '8%', borderTop: 'none' }}>
                    <p className='HeadingTxt1'>ASSIGNED TO</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%', borderTop: 'none' }}>
                    <p className='HeadingTxtstatus'>Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ borderTop: 'none' }} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.complaints.data.rows.map((complaint, index) => {
                  const {
                    citizenMobileNumber,
                    important,
                    attachments,
                    description,
                    citizenName,
                    followUp1,
                    followUp2,
                    recommendedName,
                    assignedTo,
                  } = complaint.request;
                  const { firstName, lastName } = complaint.byUser;
                  const assigneeName = `${complaint.addressee.addresseName}`;

                  let followUp1Date = followUp1 ? new Date(followUp1) : '';
                  let followUp2Date = followUp2 ? new Date(followUp2) : '';

                  return (
                    <Table.Row>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className='DataTxt'>{complaint.ref}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className='DataTxt'>
                            {complaint.dd}/{complaint.mm}/{complaint.yy}
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
                                attachments.length === 0 ? 'None' : 'Flag'
                              }
                            />
                          </div>
                          <p className='DataTxt1'>
                            Recommended By : {recommendedName}
                          </p>
                          <p className='DataTxt'>
                            {description.substring(0, 150)}....
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>
                          {citizenMobileNumber !== ''
                            ? citizenMobileNumber
                            : 'N/A'}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>
                          {followUp1
                            ? `${followUp1Date.getDate()}/${
                                followUp1Date.getMonth() + 1
                              }/${followUp1Date.getFullYear()}`
                            : ''}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>
                          {followUp2
                            ? `${followUp2Date.getDate()}/${
                                followUp2Date.getMonth() + 1
                              }/${followUp2Date.getFullYear()}`
                            : ''}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>
                          {assignedTo === 'undefined' ? 'N/A' : assignedTo}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          className={
                            complaint.status === 'PENDING'
                              ? 'StatusDesc statusPending'
                              : complaint.status === 'ASSIGNED'
                              ? 'StatusDesc statusAssigned'
                              : complaint.status === 'SOLVED'
                              ? 'StatusDesc statusSolved'
                              : 'StatusDesc statusUnsuccessful'
                          }
                        >
                          <p className='StatusTxt whiteTxt' id='datatxt'>
                            {complaint.status}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => this.historyFunction(complaint)}
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
              count={this.props.complaints.data.count}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.setPage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ManageComplaint;

//commented code for splicing
// .slice(
//                     this.state.page * this.state.rowsPerPage,
//                     this.state.page * this.state.rowsPerPage +
//                       this.state.rowsPerPage
//                   )
