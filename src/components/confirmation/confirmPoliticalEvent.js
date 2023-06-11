import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExampleEvent from './PrintPoliticalEvent'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Pdf from 'react-to-pdf'
import Alert from '../hoc/Alert/Alert'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import { Fragment } from 'react'

import api from '../../utils/api'

class ConfirmationPoliticalEvent extends Component {
  constructor(props) {
    super(props)
    const { firstName, lastName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data
    const { h1 } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org
    const { state: historyState } = props.location

    const { event } = { ...historyState }

    console.log('props from the confiramtion page', event)

    const {
      _id,
      citizenPhone,
      citizenName,
      citizenAddress,
      citizenPincode,
      referenceFirstName,
      referenceLastName,
      inviteeName,
      eventTitle,
      eventType,
      subType,
      location,
      city,
      eventDate,
      time,
      duration,
      invitation,
      isImportant,
      pressIntimation,
      status,
      comments,
      createdBy,
      createdOn,
      block,
      gramPanchayat,
      vidhanSabha,
    } = { ...event.request }
    const { ref } = { ...event }

    this.state = {
      data: event,
      history: this.props.history,
      client: h1,
      event: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName} ${lastName}`,
      inviteedetail: `${citizenName}, +91${citizenPhone}, ${citizenPincode}`,
      referenceof: `${referenceFirstName} ${referenceLastName}`,
      eventdate: convertISOToDate(eventDate),
      eventtime: time,
      eventtitle: eventTitle,
      eventtype: eventType,
      location: location,
      city: city,
      duration: duration,
      invitation: invitation,
      important: isImportant ? 'Yes' : 'No',
      status: status,
      press: pressIntimation,
      comments: comments,
      block: block,
      gramPanchayat: gramPanchayat,
      vidhanSabha: vidhanSabha,
    }

    console.log('here is the state from ', this.state)
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/politicalevent',
      state: { event: request },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: {
        manage: 'POLITICALEVENT',
      },
    })
  }
  render() {
    let message =
      this.props.location.search === 'politicalevent-updated'
        ? 'Political Event Updated'
        : 'Your Political Event Request Number'
    let printComponent = (
      <Fragment>
        <div className="noprint">
          <Header />
        </div>
        <div
          className="Confirmationframe Confirmationframeprint print"
          style={{ marginTop: '-40px' }}
        >
          <div className="FormOuterFrame">
            <div>
              <div className="Subheader">
                <div className="SubheaderTxtDiv">
                  {/*<p className="TxtOfficeof">Office of </p>*/}
                  <img
                    src={backIcon}
                    alt=""
                    className="backIcon"
                    onClick={() => this.returnToManage()}
                  ></img>
                  <p className="TxtSubheader">{this.state.client}</p>
                </div>
                <div className="SubheaderTxtDiv">
                  <p className="TxtPoweredBy">Powered by</p>
                  <img src={Esahiyogi} alt="" className="SubheaderImg" />
                </div>
              </div>
              <div
                style={{
                  backgroundColor: '#f7f8fa',
                  padding: '0 30px',
                  marginTop: '10px',
                }}
              >
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationB">Request details:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmationB">
                        Political Event, {this.state.event}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Date &amp; Time:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.date}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Username:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.username}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Invitee details:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.inviteedetail}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Event Title:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.eventtitle}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Event Type:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.eventtype}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Date:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.eventdate}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Time:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.eventtime}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Vidhan Sabha:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.vidhanSabha}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Gram Panchayat:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.gramPanchayat}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Block :</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.block}</p>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Place:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.location}</p>
                    </Col>
                  </Row>
                </div>

                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Status:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.status}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Invitation</p>
                    </Col>
                    <Col xs={8}>
                      <p className="TxtBAttachConfirmation">
                        {this.state.invitation.length} attachments
                      </p>
                      {this.state.invitation.map((attach, index) => {
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

                <div style={{ padding: '0 10px 100px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Remarks:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtConfirmDiscription">
                        {this.state.comments}
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
              <Pdf
                x={8}
                scale="1.2"
                filename={this.state.event.replace('/', '-')}
              >
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
        {this.props.location.search === '?show-politicalevent' ? (
          printComponent
        ) : (
          <Alert
            alertMsg={message}
            referenceNumber={this.state.event}
            buttonName="View"
          >
            {printComponent}
          </Alert>
        )}
      </div>
    )
  }
}
export default ConfirmationPoliticalEvent
