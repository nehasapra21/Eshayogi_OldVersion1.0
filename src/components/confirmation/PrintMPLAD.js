import React from 'react'
import ReactToPrint from 'react-to-print'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'

class ComponentToPrintMPLAD extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client: this.props.client,
      MPLAD: this.props.MPLAD,
      date: this.props.date,
      username: this.props.username,
      complainant: this.props.complainant,
      vidhanSabha: this.props.vidhanSabha,
      gramPanchayat: this.props.gramPanchayat,
      workName: this.props.workName,
      sanctionDate: this.props.sanctionDate,
      recommendationAmount: this.props.recommendationAmount,
      utilizationAmount: this.props.utilizationAmount,
      financialSanctionAmount: this.props.financialSanctionAmount,
      doctrailScheme: this.props.doctrailScheme,
      doctrailAmount: this.props.doctrailAmount,
      totalProjectCost: this.props.totalProjectCost,
      status: this.props.status,
      attachment: this.props.attachment,
      remarks: this.props.remarks,
      data: this.props.data,
      history: this.props.history,
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
                      <p className="TxtBConfirmation">{this.state.username}</p>
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Vidha Sabha:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.vidhanSabha[0].name}
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
                      <p className="TxtConfirmation">Gram Panchayat:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.gramPanchayat[0].name}
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
                      <p className="TxtConfirmation">Work Name:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.workName}</p>
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">recommendation Amount:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.recommendationAmount}
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
                      <p className="TxtConfirmation">
                        Financial Sanction Amount:
                      </p>
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
                <div
                  style={{
                    borderBottom: '1px solid #E3E3E8',
                    padding: '0 10px',
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Utilization Amount:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.utilizationAmount}
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
                      <p className="TxtConfirmation">Doctrail Scheme:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.doctrailScheme}
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
                      <p className="TxtConfirmation">Doctrail Amount:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.doctrailAmount}
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
                      <p className="TxtConfirmation">Total Project Cost:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">
                        {this.state.totalProjectCost}
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
                      <p className="TxtConfirmation">Status:</p>
                    </Col>

                    <Col xs={7}>
                      <p className="TxtBConfirmation">{this.state.status}</p>
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
                      <p className="TxtConfirmation">Request letter:</p>
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
          </div>
        </div>
      </div>
    )
  }
}

class ExampleMPLAD extends React.Component {
  historyFunction(request) {
    this.props.history.push({
      pathname: '/mplad',
      state: { MPLAD: request, isEdit: true },
    })
  }
  render(props) {
    return (
      <div>
        <ComponentToPrintMPLAD
          ref={(el) => (this.componentRef = el)}
          client={this.props.client}
          MPLAD={this.props.MPLAD}
          date={this.props.date}
          username={this.props.username}
          complainant={this.props.complainant}
          vidhanSabha={this.props.vidhanSabha}
          gramPanchayat={this.props.gramPanchayat}
          workName={this.props.workName}
          sanctionDate={this.props.sanctionDate}
          recommendationAmount={this.props.recommendationAmount}
          utilizationAmount={this.props.utilizationAmount}
          financialSanctionAmount={this.props.financialSanctionAmount}
          doctrailScheme={this.props.doctrailScheme}
          doctrailAmount={this.props.doctrailAmount}
          totalProjectCost={this.props.totalProjectCost}
          status={this.props.status}
          attachment={this.props.attachment}
          remarks={this.props.remarks}
          data={this.props.data}
          history={this.props.history}
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

export default ExampleMPLAD
