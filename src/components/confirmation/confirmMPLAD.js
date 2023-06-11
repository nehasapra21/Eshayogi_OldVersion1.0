import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Row, Col } from 'reactstrap'
import { convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'
import Pdf from 'react-to-pdf'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import { Fragment } from 'react'

import api from '../../utils/api'

class ConfirmationMPLAD extends Component {
  constructor(props) {
    super(props)

    const { firstName, lastName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data
    const { h1 } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org

    const { state: historyState } = props.location

    const { MPLAD } = { ...historyState }
    debugger

    const {
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      attachments,
      vidhanSabha,
      gramPanchayat,
      workName,
      workCategory,
      workDescription,
      financialSanctionAmount,
      status,
      sanctionDate,
      selected,
      remarks,
      createdOn,
      block,
      constituency,
      financialYear,
    } = { ...MPLAD.request }

    const { ref } = { ...MPLAD }

    this.state = {
      data: MPLAD,
      history: this.props.history,
      client: h1,
      MPLAD: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName} ${lastName}`,
      complainant: `${citizenName}, +91${citizenMobileNumber}, ${citizenPincode}`,
      vidhanSabha,
      gramPanchayat,
      workName,
      workCategory,
      workDescription,
      constituency,
      block,
      financialYear,
      sanctionDate: convertISOToDateTime(sanctionDate),
      financialSanctionAmount,
      status: status,
      attachment: attachments,
      remarks,
    }
  }

  historyFunction(request) {
    this.props.history.push({
      pathname: '/mplad',
      state: { MPLAD: request, isEdit: true },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: {
        manage: 'MPLAD',
      },
    })
  }
  render(props) {
    let message =
      this.props.location.search === '?updated-MPLAD'
        ? 'MPLAD Application Updated'
        : 'Your MPLAD Number'

    let printComponent = (
      <Fragment>
        <div className="noprint">
          <Header />
        </div>
        <div
          className="Confirmationframe Confirmationframemplad print"
          style={{ marginTop: '-40px' }}
        >
          <div className="FormOuterFrame">
            <div>
              <div className="Subheader">
                <div className="SubheaderTxtDiv">
                  <img
                    src={backIcon}
                    alt=""
                    className="backIcon"
                    onClick={() => this.returnToManage()}
                  ></img>
                  {/*<p className="TxtOfficeof">Office of </p>*/}
                  <p className="TxtSubheader">{this.state.client}</p>
                </div>
                <div className="SubheaderTxtDiv">
                  <p className="TxtPoweredBy">Powered by</p>
                  <img src={Esahiyogi} alt="" className="SubheaderImg" />
                </div>
              </div>
              <div
                style={{
                  background: '#F7F8FA',
                  padding: '0 30px',
                  marginTop: '10px',
                }}
              >
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmationB">Reference No:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmationB">
                        MPLAD, {this.state.MPLAD}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ background: '#F7F8FA', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Date &amp; Time:</p>
                    </Col>
                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.date}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Username:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.username}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">MPLAD details:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.complainant}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Constituency:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.constituency}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Vidha Sabha:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.vidhanSabha
                          ? typeof this.state.vidhanSabha === 'string' ||
                            this.state.vidhanSabha === ''
                            ? this.state.vidhanSabha
                            : this.state.vidhanSabha.length !== 0
                            ? this.state.vidhanSabha[0].name
                            : ''
                          : ''}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Block:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.block}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Gram Panchayat:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {typeof this.state.gramPanchayat === 'string' ||
                        this.state.gramPanchayat === ''
                          ? this.state.gramPanchayat
                          : this.state.gramPanchayat.length !== 0
                          ? this.state.gramPanchayat[0].name
                          : ''}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ padding: '0 30px' }}></div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Work Name:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.workName}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Work Category:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.workCategory}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Work Description:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.workDescription}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    marginBottom: '20px',
                    padding: '0 10px',
                  }}
                  className="databorder"
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Date of Sanction:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmDiscription">
                        {this.state.sanctionDate == ''
                          ? 'N/A'
                          : this.state.sanctionDate}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Sanctioned Amount:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.financialSanctionAmount}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Status:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.status}</p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Request letter:</p>
                    </Col>
                    <Col xs={7} style={{ paddingBottom: '10px' }}>
                      <p className="TxtBAttachConfirmation">
                        {this.state.attachment.length} attachments
                      </p>
                      {this.state.attachment.map((attach, index) => {
                        let url = attach.url

                        if (attach.url.includes('https://node-test.fdpay.in')) {
                          url = attach.url.replace(
                            'https://node-test.fdpay.in/',
                            ''
                          )

                          return (
                            <a
                              href={`${api.BASE_URL_1}/${url}`}
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
                          url = attach.url.replace('https://eV2.fdpay.in/', '')

                          return (
                            <a
                              href={`${api.BASE_URL_1}/${url}`}
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
                              href={`${api.BASE_URL_1}/${url}`}
                              target="_blank"
                            >
                              <p className="TxtAttachConfirmation pad">
                                {attach.name}
                              </p>
                            </a>
                          )
                        }
                      })}
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ padding: '0 30px', paddingBottom: '100px' }}>
                <div style={{ padding: '0 10px' }}>
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Remarks:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmDiscription">
                        {this.state.remarks}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '50px',
              }}
            >
              <Pdf scale="1.3" filename={this.state.MPLAD.replace('/', '-')}>
                {({ toPdf }) => (
                  <button
                    onClick={() => window.print()}
                    className="PrintBtn EditButton noprint"
                  >
                    Download
                  </button>
                )}
              </Pdf>
              <button
                type="button"
                className="PrintBtn UpdateButton noprint"
                onClick={() => this.historyFunction(this.state.data)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    )

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '150px',
        }}
      >
        {this.props.location.search === '?show-MPLAD' ? (
          printComponent
        ) : (
          <Alert
            alertMsg={message}
            referenceNumber={this.state.MPLAD}
            buttonName="View"
          >
            {printComponent}
          </Alert>
        )}
      </div>
    )
    /*}
        return (
            <div>Loading</div>
        )*/
  }
}
export default ConfirmationMPLAD
