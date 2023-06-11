import React from 'react'
import ReactToPrint from 'react-to-print'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'

class ComponentToPrintComplaint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client: this.props.client,
      complaint: this.props.complaint,
      date: this.props.date,
      username: this.props.username,
      complainant: this.props.complainant,
      recommendedName: this.props.recommendedName,
      recommendedNumber: this.props.recommendedNumber,
      description: this.props.description,
      important: this.props.important,
      resolutiondate: this.props.resolutiondate,
      status: this.props.status,
      department: this.props.department,
      assignedaddresse: this.props.assignedaddresse,
      attachment: this.props.attachment,
      comments: this.props.comments,
    }

    console.log(this.props, 'lovish')
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="Confirmationframe">
          <div className="FormOuterFrame">
            <div>
              <div className="Subheader">
                <div className="SubheaderTxtDiv">
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmationB">Request details:</p>
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
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
                <div
                  style={{
                    background: '#F7F8FA',
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Username:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        Sh. {this.state.username}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    marginBottom: '20px',
                    padding: '0 10px',
                  }}
                >
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    marginBottom: '20px',
                    padding: '0 10px',
                  }}
                >
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
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
                <div
                  style={{
                    marginBottom: '20px',
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Attachments:</p>
                    </Col>
                    <Col xs={7} style={{ paddingBottom: '10px' }}>
                      <p className="TxtBAttachConfirmation">
                        {this.state.attachment.length} attachments
                      </p>
                      {this.state.attachment.map((attach, index) => (
                        <a href={attach.url} target="_blank">
                          <p className="TxtAttachConfirmation">{attach.name}</p>
                        </a>
                      ))}
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px', backgroundColor: '#f7f8fa' }}>
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Status:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmation">{this.state.status}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#f7f8fa', padding: '0 30px' }}>
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
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
                  style={{
                    marginBottom: '20px',
                    background: '#F7F7FA',
                    borderBottom: '1px solid #E3E3E7',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Department:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmation">{this.state.department}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ padding: '0 30px', paddingBottom: '100px' }}>
                <div style={{ padding: '0 10px' }}>
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Comments:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtConfirmDiscription">
                        {this.state.comments}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ExampleComplaint extends React.Component {
  historyFunction(request) {
    this.props.history.push({
      pathname: '/complaint',
      state: { complaint: request, isEdit: true },
    })
  }
  render(props) {
    return (
      <div>
        <ComponentToPrintComplaint
          ref={(el) => (this.componentRef = el)}
          client={this.props.client}
          complaint={this.props.complaint}
          date={this.props.date}
          username={this.props.username}
          complainant={this.props.complainant}
          recommendedName={this.props.recommendedName}
          recommendedNumber={this.props.recommendedNumber}
          description={this.props.description}
          important={this.props.important}
          status={this.props.status}
          department={this.props.department}
          assignedaddresse={this.props.assignedaddresse}
          attachment={this.props.attachment}
          comments={this.props.comments}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '50px',
          }}
        >
          <ReactToPrint
            trigger={() => (
              <button className="PrintBtn EditButton">Print</button>
            )}
            content={() => this.componentRef}
          />
          <button
            type="button"
            className="PrintBtn UpdateButton"
            onClick={() => this.historyFunction(this.props.data)}
          >
            Edit
          </button>
        </div>
      </div>
    )
  }
}

export default ExampleComplaint
