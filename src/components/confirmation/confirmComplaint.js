import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExampleCompliant from '../confirmation/PrintComplaint'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'
import Pdf from 'react-to-pdf'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import './Confirmation.css'
import { Fragment } from 'react'
import api from '../../utils/api'

class ConfirmationComplaint extends Component {
  constructor(props) {
    super(props)

    const { firstName, lastName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    ).data
    const { h1 } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org

    const { state: historyState } = this.props.location

    const { complaint } = { ...historyState }

    const {
      citizenMobileNumber,
      citizenName,
      citizenAddress,
      citizenPincode,
      recommendedName,
      recommendedNumber,
      description,
      location,
      isImportant,
      attachments,
      status,
      comments,
      createdOn,
      assignedTo,
      department,
      assignedAddresse,
      uploadedFileDetails,
    } = { ...complaint.request }
    const { ref, typeOfRequest } = { ...complaint }
    console.log(ref, 'number')

    this.state = {
      data: complaint,
      history: this.props.history,
      client: h1,
      complaint: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName} ${lastName}`,
      complainant: `${citizenName}, +91${citizenMobileNumber}, ${citizenPincode}`,
      recommendedName: `${recommendedName}`,
      recommendedNumber: `${recommendedNumber}`,
      description,
      important: isImportant ? 'No' : 'Yes',
      status: status,
      department: department ? department : 'N/A',
      assignedaddresse: assignedTo ? assignedTo : 'N/A',
      attachment: attachments,
      comments: comments,
    }
  }

  componentDidMount() {
    const { client } = this.state
    document.title = this.state.complaint
    console.log('Here is the confiramtion page state', this.state)
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/complaint',
      state: { complaint: request, isEdit: true },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: {
        manage: 'COMPLAINT',
      },
    })
  }

  render() {
    let message =
      this.props.location.search === '?updated-complaint'
        ? 'Complaint Updated'
        : 'Your Complaint Number'

    let printComponent = (
      <Fragment>
        <div className="noprint">
          <Header />
        </div>
        <div className="Confirmationframe print">
          <div className="FormOuterFrame confirmleft">
            <div style={{ marginTop: '80px' }}>
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
              <div className="databorder">
                <div>
                  <Row>
                    <Col xs={5}>
                      <p
                        style={{ marginLeft: '30px' }}
                        className="TxtConfirmationB confirmtxt"
                      >
                        Request details:
                      </p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmationB">
                        Complaint, {this.state.complaint}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ background: '#F7F8FA', padding: '0 30px' }}>
                <div className="databorder" style={{}}>
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
                      <p className="TxtBConfirmation"> {this.state.username}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Complainant details:</p>
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
                      <p className="TxtConfirmation">Recommended Name :</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.recommendedName}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Recommended Number :</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.recommendedNumber}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Description:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmDiscription">
                        {this.state.description}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Important:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.important}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Attachments:</p>
                    </Col>
                    <Col xs={7} style={{ paddingBottom: '10px' }}>
                      <p className="TxtBAttachConfirmation pad">
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
              <div style={{ padding: '0 30px', backgroundColor: '#f7f8fa' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Status:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmation pad">{this.state.status}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div className="databorder">
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">
                        Assigned to Addressee name:
                      </p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.assignedaddresse}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div
                  className="databorder"
                  style={{
                    marginBottom: '20px',

                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Department:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmation pad">
                        {this.state.department}
                      </p>
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
                      <p className="TxtConfirmDiscription pad">
                        {this.state.comments}
                      </p>
                    </Col>
                  </Row>
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
                  scale="1.3"
                  filename={this.state.complaint}
                  filename={this.state.complaint.replace('/', '-')}
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
      </Fragment>
    )
    console.log('print component', printComponent)
    return (
      <div className="NewClientForm">
        {this.props.location.search === '?show-complaint' ? (
          printComponent
        ) : (
          <Alert
            alertMsg={message}
            referenceNumber={this.state.complaint}
            buttonName="View"
          >
            {printComponent}
          </Alert>
        )}
      </div>
    )
  }
}
export default ConfirmationComplaint
