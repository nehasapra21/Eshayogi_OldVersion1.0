import React, { Component } from 'react';
import Flag from '../../utils/images/flag.svg';
import Attachment from '../../utils/images/attachment.svg';
import Back from '../../utils/images/back.svg';
import { Table, Label } from 'semantic-ui-react';
import ComplaintForm from '../forms/complaint/Complaint';
import TablePagination from '@material-ui/core/TablePagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class ManageEvents extends Component {
  constructor(props) {
    document.title = 'Event Management Panel';
    super(props);
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
      pathname: '/confirmation/event',
      state: { event: request },
      search: '?show-event',
    });
  }

  render(props) {
    let array = this.props.events;

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
                    <p className='HeadingTxt1'>Organisation</p>
                  </Table.HeaderCell>

                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxt'>Time &amp; Location</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '6%' }}>
                    <p className='HeadingTxt'>Gallery</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxtstatus'>Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.events.data.rows.map((event, index) => {
                  const {
                    referenceFirstName,
                    referenceLastName,
                    citizenPhone,
                    citizenName,
                    time,
                    location,
                    important,
                    invitation,
                    speech,
                    organisation,
                    recommendedName,
                    description,
                    discussWith,
                    delegatedTo,
                  } = event.request;
                  const { firstName, lastName } = event.byUser;
                  return (
                    <Table.Row>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className='DataTxt'>{event.ref}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className='DataTxt'>
                            {event.dd}/{event.mm}/{event.yy}
                          </p>
                          <p className='DataTxt'>{description}</p>
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
                          <p className='DataTxt1'>
                            Recommended By: {recommendedName}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>{organisation}</p>
                      </Table.Cell>

                      <Table.Cell>
                        <p className='DataTxt'>{time}</p>
                        <p className='DataTxt'>{location}</p>
                      </Table.Cell>
                      <Table.Cell
                        onClick={() =>
                          this.props.history.push({
                            pathname: '/gallery',
                            eventData: event,
                            search: 'event',
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          id='eventstatusdiv'
                          className={
                            event.status === 'PENDING'
                              ? 'StatusDesc statusPending'
                              : event.status === 'SCHEDULED'
                              ? 'StatusDesc statusScheduled'
                              : event.status === 'ATTENDED'
                              ? 'StatusDesc statusAttended'
                              : event.status === 'REJECTED'
                              ? 'StatusDesc statusRejected'
                              : event.status === 'DELEGATED'
                              ? 'StatusDesc statusDelegated'
                              : 'StatusDesc statusDiscuss'
                          }
                        >
                          <p
                            id='datatxt'
                            className={
                              event.status === 'DISCUSS' ||
                              event.status === 'DELEGATED'
                                ? 'StatusTxtDiscuss whiteTxt'
                                : 'StatusTxt whiteTxt'
                            }
                          >
                            {event.status === 'DISCUSS'
                              ? `${event.status} w/ ${discussWith.substring(
                                  0,
                                  8
                                )}`
                              : event.status === 'DELEGATED'
                              ? `${event.status} to ${delegatedTo.substring(
                                  0,
                                  8
                                )}`
                              : `${event.status}`}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => {
                          this.historyFunction(event);
                        }}
                      >
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
            count={this.props.events.data.count}
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
export default ManageEvents;
