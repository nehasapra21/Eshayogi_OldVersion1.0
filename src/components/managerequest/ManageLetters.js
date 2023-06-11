import React, { Component } from 'react'
import api from '../../utils/api'
import Flag from '../../utils/images/flag.svg'
import Attachment from '../../utils/images/attachment.svg'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react'
import TablePagination from '@material-ui/core/TablePagination'
import { create } from 'apisauce'

class ManageLetters extends Component {
  constructor(props) {
    document.title = 'Letter Management Panel'
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 25,
    }
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage })
    this.props.changeOffset(newPage)
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 })
    this.props.changeLimit(+event.target.value)
  }

  historyFunction(request) {
    console.log()
    this.props.history.push({
      // pathname: '/confirmation/letter',
      pathname: '/letter',
      state: { Letters: request },
      search: '?show-letter',
    })
  }

  render(props) {
    var array = this.props.Letters
    console.log(array, 'hey')
    console.log(this.props.statusFilter)

    return (
      <div className="ManageRequests">
        <div className="frame2">
          <div className="FormOuterFrame">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '13%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">DO No.</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '13%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">Folder No.</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '15%' }}>
                    <p className="HeadingTxt">Date &amp; Admin</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className="HeadingTxt1">From</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className="HeadingTxt1">Mobile Number</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%' }}>
                    <p className="HeadingTxt1">Follow Up 1</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%' }}>
                    <p className="HeadingTxt1">Follow Up 2</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 'auto' }}>
                    <p className="HeadingTxtstatusletter">Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '21%', textAlign: 'left' }}>
                    <p className="HeadingTxtstatusletter">File Attachment</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.Letters.data.rows.map((Letters, index) => {
                  const {
                    from,
                    to,
                    date,
                    recommendedName,
                    followUp1,
                    followUp2,
                    attachments,
                  } = Letters.request
                  let letterDate = new Date(date)
                  let followup1 = followUp1 ? new Date(followUp1) : ''
                  let followup2 = followUp2 ? new Date(followUp2) : ''
                  let files = attachments ? attachments : []
                  const { firstName, lastName } = Letters.byUser
                  return (
                    <Table.Row>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">{Letters.ref}</p>
                      </Table.Cell>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">
                          {Letters.meta === null ? '' : Letters.meta.number}
                        </p>
                        <p className="DataTxt">
                          {Letters.meta === null ? '' : Letters.meta.name}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className="DataTxt">{`${letterDate.getDate()}/${
                            letterDate.getMonth() + 1
                          }/${letterDate.getFullYear()}`}</p>
                        </div>
                        <p className="DataTxt">
                          {firstName} {lastName}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">{Letters.citizen.citizenName}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">
                          {Letters.citizen.citizenMobileNumber !== ''
                            ? Letters.citizen.citizenMobileNumber
                            : 'N/A'}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">
                          {followup1 !== ''
                            ? `${followup1.getDate()}/${
                                followup1.getMonth() + 1
                              }/${followup1.getFullYear()}`
                            : ''}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">
                          {followup2 !== ''
                            ? `${followup2.getDate()}/${
                                followup2.getMonth() + 1
                              }/${followup2.getFullYear()}`
                            : ''}
                        </p>
                      </Table.Cell>

                      <Table.Cell>
                        <div
                          id="lettercss"
                          style={{ width: '120px' }}
                          className={
                            Letters.status === 'VERYIMPORTANT'
                              ? 'StatusDesc statusPending'
                              : Letters.status === 'GENERAL'
                              ? 'StatusDesc statusResponseNeeded'
                              : Letters.status === 'ACKNOWLEDGED'
                              ? 'StatusDesc statusDelegated'
                              : 'StatusDesc statusRespondedTo'
                          }
                        >
                          <p id="datatxt" className="StatusTxt whiteTxt">
                            {Letters.status == 'VERYIMPORTANT'
                              ? 'VERY IMPORTANT'
                              : Letters.status}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {files.map((attach, index) => {
                          let url = attach.url

                          if (
                            attach.url.includes('https://node-test.fdpay.in')
                          ) {
                            url = attach.url.replace(
                              'https://node-test.fdpay.in/',
                              ''
                            )

                            return (
                              <a
                                href={`${api.fileBaseUrl}/${url}`}
                                target="_blank"
                              >
                                <p className="TxtAttachConfirmation pad">
                                  {attach.name}
                                </p>
                              </a>
                            )
                          } else if (
                            attach.url.includes('https://eV2.fdpay.in')
                          ) {
                            url = attach.url.replace(
                              'https://eV2.fdpay.in/',
                              ''
                            )

                            return (
                              <a
                                href={`${api.fileBaseUrl}/${url}`}
                                target="_blank"
                              >
                                <p className="TxtAttachConfirmation pad">
                                  {attach.name}
                                </p>
                              </a>
                            )
                          } else if (
                            attach.url.includes(
                              'https://prod-eshayogi.fdpay.in'
                            )
                          ) {
                            url = attach.url.replace(
                              'https://prod-eshayogi.fdpay.in/',
                              ''
                            )

                            return (
                              <a
                                href={`${api.fileBaseUrl}/${url}`}
                                target="_blank"
                              >
                                <p className="TxtAttachConfirmation pad">
                                  {attach.name}
                                </p>
                              </a>
                            )
                          } else {
                            return (
                              <a
                                href={`${api.fileBaseUrl}/${url}`}
                                target="_blank"
                              >
                                <p className="TxtAttachConfirmation pad">
                                  {attach.name}
                                </p>
                              </a>
                            )
                          }
                        })}
                      </Table.Cell>

                      <Table.Cell onClick={() => this.historyFunction(Letters)}>
                        <img src={Back} alt="" className="Back" />
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={this.props.Letters.data.count}
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
export default ManageLetters
