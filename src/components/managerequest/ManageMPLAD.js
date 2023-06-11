import React, { Component } from 'react'
import Back from '../../utils/images/back.svg'
import { Table } from 'semantic-ui-react'
import TablePagination from '@material-ui/core/TablePagination'

import api from '../../utils/api'

class ManageMPLAD extends Component {
  constructor(props) {
    document.title = 'MPLAD Management Panel'
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
      pathname: '/confirmation/mplad',
      state: { MPLAD: request },
      search: '?show-MPLAD',
    })
  }

  render(props) {
    return (
      <div className="ManageRequests">
        <div className="frame2">
          <div className="FormOuterFrame">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '13%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">Reference No</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '14%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">District</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%' }}>
                    <div>
                      <p className="HeadingTxt">Vidhan sabha</p>
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '10%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">Polling Station</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '14%' }}>
                    <p className="HeadingTxt1">Gram Panchayat</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className="HeadingTxt">Work</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '15%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">Amount Sanctioned</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '19%', paddingLeft: '2%' }}>
                    <p className="HeadingTxt">FY Year </p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '17%' }}>
                    <p className="HeadingTxtstatus">Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '21%', textAlign: 'left' }}>
                    <p className="HeadingTxtstatusletter">File Attachment</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.MPLAD.data.rows.map((MPLAD, index) => {
                  const {
                    workName,
                    vidhanSabha,
                    financialYear,
                    financialSanctionAmount,

                    status,
                    gramPanchayat,
                    attachments,
                  } = MPLAD.request
                  let files = attachments ? attachments : []

                  return (
                    <Table.Row>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">{MPLAD.ref}</p>
                      </Table.Cell>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">
                          {MPLAD.request?.district || ''}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          <p className="DataTxt">
                            {vidhanSabha
                              ? typeof vidhanSabha === 'string' ||
                                vidhanSabha === ''
                                ? vidhanSabha
                                : vidhanSabha.length !== 0
                                ? vidhanSabha[0].name
                                : ''
                              : ''}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">
                          {MPLAD?.request?.pollingStation || ''}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">
                          {gramPanchayat
                            ? typeof gramPanchayat === 'string' ||
                              gramPanchayat === ''
                              ? gramPanchayat
                              : gramPanchayat.length !== 0
                              ? gramPanchayat[0].name
                              : ''
                            : ''}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className="DataTxt">{workName}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">{financialSanctionAmount}</p>
                      </Table.Cell>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className="DataTxt">{financialYear}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          className={
                            status === 'UNDERREVIEW'
                              ? 'StatusDesc statusSanctioned'
                              : MPLAD.status === 'SANCTIONED'
                              ? 'StatusDesc statusWorkInProgress'
                              : MPLAD.status === 'WORK IN PROGRESS'
                              ? 'StatusDesc statusWorkInProgress'
                              : MPLAD.status === 'WORK DONE'
                              ? 'StatusDesc statusWorkDone'
                              : 'StatusDesc statusInaugurated'
                          }
                        >
                          <p id="datatxt" className="StatusTxt whiteTxt">
                            {status === 'UNDERREVIEW' ? 'UNDER REVIEW' : status}
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
                      <Table.Cell onClick={() => this.historyFunction(MPLAD)}>
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
            count={this.props.MPLAD.data.count}
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
export default ManageMPLAD
