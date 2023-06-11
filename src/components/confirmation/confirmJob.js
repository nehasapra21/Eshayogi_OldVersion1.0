import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Row, Col } from 'reactstrap'
import { convertISOToDateTime } from '../../utils/dateTime'
import Pdf from 'react-to-pdf'
import Alert from '../hoc/Alert/Alert'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import { Fragment } from 'react'

import api from '../../utils/api'

class ConfirmationJob extends Component {
  constructor(props) {
    super(props)

    const { firstName, lastName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data
    const { h1 } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org
    const { state: historyState } = props.location
    const { job } = { ...historyState }
    console.log(job, 'hey')
    const {
      citizenPhone,
      citizenName,
      citizenAddress,
      citizenPincode,
      recommendedName,
      recommendedNumber,
      currentlyEmployed,
      lastMonthlySalary,
      experienceYears,
      experienceMonths,
      highestEduQualification,
      isImportant,
      invitation,
      professionalQualification,
      sharedToName,
      sharedToDesignation,
      sharedToNumber,
      sharedToOrganisation,
      status,
      comments,
      createdOn,
    } = { ...job.request }
    const { ref } = { ...job }
    console.log(ref, 'referal number')

    //currentlyEmployed: true
    this.state = {
      data: job,
      history: this.props.history,
      client: h1,
      jobreferalno: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName} ${lastName}`,
      complainant: `${citizenName}, +91${citizenPhone}, ${citizenPincode}`,
      recommendedName: recommendedName,
      employed: currentlyEmployed ? 'Yes' : 'No',
      salary: lastMonthlySalary,
      education: highestEduQualification,
      resume: invitation,
      experience: `${
        experienceYears ? `${experienceYears} years` : '0 Years'
      } ${experienceMonths ? `${experienceMonths} month` : '0 Months'}`,
      important: isImportant ? 'Yes' : 'No',
      status: status,
      comments: comments,
      highestEduQualification: highestEduQualification,
      professionalQualification: professionalQualification,
      sharedToDesignation: sharedToDesignation,
      sharedToName: sharedToName,
      sharedToNumber: sharedToNumber,
      sharedToOrganisation: sharedToOrganisation,
    }

    console.log('here is the state from ', this.state)
  }

  componentDidMount() {
    const { client } = this.state

    //if (!client) {
    console.log('Here is the confiramtion page state', this.state)
    //alert(this.state)
    //this.props.history.push('/home')
    //}
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/job',
      state: { job: request, isEdit: true },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: {
        manage: 'JOB',
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
          className="Confirmationframe Confirmationframejob"
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
                  {/*<p className="TxtOfficeof">Office of</p>*/}
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
                      <p className="TxtConfirmationB">Reference No.:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmationB">
                        Job, {this.state.jobreferalno}
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
                      <p className="TxtConfirmation">Complainant details:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {' '}
                        {this.state.complainant}
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
                      <p className="TxtConfirmation">Employed:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.employment}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Salary:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.salary}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Qualification :</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtConfirmDiscription">
                        {this.state.highestEduQualification}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">
                        Professional Qualification:
                      </p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.professionalQualification}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Important:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">{this.state.important}</p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Resume attached:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBAttachConfirmation">
                        {this.state.resume.length} attachments
                      </p>
                      {this.state.resume.map((attach, index) => {
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
                      <p className="TxtConfirmation">Experience:</p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.experience}
                      </p>
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
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation">Shared To </p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.sharedToName}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation"></p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.sharedToDesignation},{' '}
                        {this.state.sharedToOrganisation}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="databorder">
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmation"></p>
                    </Col>

                    <Col xs={8}>
                      <p className="TxtBConfirmation">
                        {this.state.sharedToNumber}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
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
                    x="8"
                    scale="1.2"
                    filename={this.state.jobreferalno.replace('/', '-')}
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

    const { client } = this.state
    let message =
      this.props.location.search === '?application-updated'
        ? 'Application Updated'
        : 'Your Job Application Number'

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '150px',
        }}
      >
        {this.props.location.search === '?show-application' ? (
          printComponent
        ) : (
          <Alert
            alertMsg={message}
            referenceNumber={this.state.jobreferalno}
            buttonName="View"
          >
            {printComponent}
          </Alert>
        )}
      </div>
    )
  }
}
export default ConfirmationJob
