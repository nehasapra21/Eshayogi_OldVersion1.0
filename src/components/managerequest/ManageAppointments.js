import React, { Component } from 'react'
import Api from '../../utils/api'
import Flag from '../../utils/images/flag.svg'
import Attachment from '../../utils/images/attachment.svg'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react'
import ComplaintForm from '../forms/complaint/Complaint'
import TablePagination from '@material-ui/core/TablePagination'

class ManageAppointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 5,
    }
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage })
  }

  setRowsPerPage = (event) => {
    let temp = this.state.rowsPerPage

    this.setState({ rowsPerPage: +event.target.value, page: 0 })
  }

  historyFunction(request) {
    console.log()
    this.props.history.push({
      pathname: '/confirmation/appointment',
      state: { appointment: request },
      search: '?show-appointment',
    })
  }

  render(props) {
    var array = this.props.appointments
    console.log(array, 'hey')
    console.log(this.props.statusFilter)
    return (
      <div className="ManageRequests">
        <div className="frame2">
          <div className="FormOuterFrame">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '12%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">REF. NUMBER</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className="HeadingTxt">DATE &amp; ADMIN</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <div style={{ height: '100%' }}>
                      <p className="HeadingTxt">DESCRIPTION</p>
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className="HeadingTxt1">ORGANISATION</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '15%' }}>
                    <p className="HeadingTxt">STATUS</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className="HeadingTxt">TIME &amp; LOCATION</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.appointments.data.rows
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((appointment, index) => {
                    const {
                      referenceFirstName,
                      referenceLastName,
                      citizenPhone,
                      citizenName,
                      preferredTime,
                      city,
                      isImportant,
                      invitation,
                      organisation,
                    } = appointment.request
                    const { firstName, lastName } = appointment.byUser
                    return (
                      <Table.Row>
                        <Table.Cell style={{ paddingLeft: '2%' }}>
                          <p className="DataTxt">{appointment.ref}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{ alignSelf: 'center', textAlign: 'left' }}
                          >
                            <p className="DataTxt">
                              {appointment.dd}/{appointment.mm}/{appointment.yy}
                            </p>
                            <p className="DataTxt">
                              {firstName} {lastName}
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <div style={{ display: 'flex' }}>
                              <p className="DataTxt1">{citizenName}</p>
                              <img
                                src={Flag}
                                alt=""
                                className={
                                  isImportant === true ? 'Flag' : 'None'
                                }
                              />
                              <img
                                src={Attachment}
                                alt=""
                                className={
                                  invitation != undefined
                                    ? invitation.length == 0
                                      ? 'None'
                                      : 'Flag'
                                    : 'None'
                                }
                              />
                            </div>
                            <p className="DataTxt">
                              Reference Of {referenceFirstName}{' '}
                              {referenceLastName}
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">{organisation}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            className={
                              appointment.status === 'PENDING'
                                ? 'StatusDesc statusPending'
                                : appointment.status === 'SCHEDULED'
                                ? 'StatusDesc statusScheduled'
                                : appointment.status === 'ATTENDED'
                                ? 'StatusDesc statusAttended'
                                : appointment.status === 'REJECTED'
                                ? 'StatusDesc statusRejected'
                                : appointment.status === 'DELEGATED'
                                ? 'StatusDesc statusDelegated'
                                : 'StatusDesc statusDiscuss'
                            }
                          >
                            <p className="StatusTxt whiteTxt">
                              {appointment.status}
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">{preferredTime}</p>
                          <p className="DataTxt">{city}</p>
                        </Table.Cell>
                        <Table.Cell
                          onClick={() => this.historyFunction(appointment)}
                        >
                          <img src={Back} alt="" className="Back" />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.props.appointments.data.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.setPage}
            onChangeRowsPerPage={this.setRowsPerPage}
          />
        </div>
      </div>
    )
  }
}
export default ManageAppointments
