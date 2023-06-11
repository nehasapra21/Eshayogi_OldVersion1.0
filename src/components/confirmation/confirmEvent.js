import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExampleEvent from '../confirmation/PrintEvent'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Pdf from 'react-to-pdf'
import Alert from '../hoc/Alert/Alert'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import { Fragment } from 'react'

import api from '../../utils/api'

class ConfirmationEvent extends Component {
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
      recommendedName,
      recommendedNumber,
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
    } = { ...event.request }
    const { ref, typeOfRequest } = { ...event }

    this.state = {
      data: event,
      history: this.props.history,
      client: h1,
      event: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName} ${lastName}`,
      inviteedetail: `${citizenName}, +91${citizenPhone}, ${citizenPincode}`,
      recommendedName: recommendedName,
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
    }

    console.log('here is the state from ', this.state)
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/event',
      state: { event: request, isEdit: true },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: {
        manage: 'EVENT',
      },
    })
  }

  render() {
    let printComponent = (
      <Fragment>
        <div className="noprint">
          <Header />
        </div>
        <div
          className="Confirmationframe Confirmationframeevent print"
          style={{ marginTop: '-60px' }}
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
                        Event, {this.state.event}
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
                      <p className="TxtBConfirmation"> {this.state.username}</p>
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
                      <p className="TxtConfirmation">Recommended Name :</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.recommendedName}
                      </p>
                    </Col>
                  </Row>
                </div>
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
                      <p className="TxtConfirmation">Duration:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.duration}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Location:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.location}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">City:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.city}</p>
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

                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Press Intimation:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.press}</p>
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
          </div>
        </div>
      </Fragment>
    )

    let message =
      this.props.location.search === '?event-updated'
        ? 'Event Updated'
        : 'Your Event Request Number'

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '150px',
        }}
      >
        {this.props.location.search === '?show-event' ? (
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
export default ConfirmationEvent
