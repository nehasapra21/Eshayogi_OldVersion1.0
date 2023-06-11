import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExamplePNR from './PrintPNR'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'
import Pdf from 'react-to-pdf'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'

class ConfirmationPNR extends Component {
  constructor(props) {
    super(props)

    const { firstName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data
    const { h1 } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org

    const { state: historyState } = props.location

    const { PNR } = { ...historyState }
    console.log('Clicked', PNR.request)

    const {
      location,
      to,
      category,
      dateOfJourney,
      date,
      trainNumber,
      pnr,
      passengerName,
      sectorFrom,
      sectorTo,
      ticketClass,
      signedBy,
      mobileNumber,
      digitalSignature,
    } = { ...PNR.request }

    const { ref } = { ...PNR }
    console.log('this is my props', this.props)

    this.state = {
      history: this.props.history,
      client: h1,
      data: PNR,
      ref,
      location,
      to,
      category,
      dateOfJourney,
      date,
      trainNumber,
      pnr,
      passengerName,
      sectorFrom,
      sectorTo,
      ticketClass,
      signedBy,
      mobileNumber,
      digitalSignature,
    }

    console.log('here is the state from ', this.state)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { client } = this.state
    console.log('Here is the confiramtion page state', this.state)
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/PNR',
      state: { PNR: request },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: {
        manage: 'PNR',
      },
    })
  }

  render(props) {
    const { client } = this.state
    console.log(this.state, 'yyy')
    const ref = React.createRef()
    let message =
      this.props.location.search === '?updated-PNR'
        ? 'PNR Updated'
        : 'Your Complaint Number'
    let date = new Date(this.state.dateOfJourney)

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="noprint">
          <Header />
        </div>
        <div className="Confirmationframe print" ref={ref}>
          <div className="FormOuterFrame">
            <div ref={ref} style={{ marginTop: '80px' }}>
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
                  marginTop: '20px',
                }}
              >
                <div style={{ padding: '10px 10px' }}>
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR"></p>
                      <p className="TxtConfirmationPNR">Government of India</p>
                      <p className="TxtConfirmationPNR">
                        Rail Bhawan, New Delhi
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ background: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ padding: '10px 10px' }}>
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmation">Respected Sir/Madam</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: '#F7F8FA',
                  padding: '0px 10px 30px 30px',
                }}
              >
                <div style={{ background: '#F7F8FA', padding: '10px 10px' }}>
                  <Row>
                    <Col xs={10}>
                      <p className="TxtConfirmationPNR">
                        I shall be grateful if you could kindly confirm the
                        following rail reservation a {this.state.category} of
                        Hon'ble MoS:.
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">PNR</p>
                    </Col>
                    <Col xs={1}>
                      <p className="TxtConfirmationPNR">:</p>
                    </Col>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">{this.state.pnr}</p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">Train</p>
                    </Col>
                    <Col xs={1}>
                      <p className="TxtConfirmationPNR">:</p>
                    </Col>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">
                        {this.state.trainNumber}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">Sector</p>
                    </Col>
                    <Col xs={1}>
                      <p className="TxtConfirmationPNR">:</p>
                    </Col>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">
                        {this.state.sectorFrom} to {this.state.sectorTo}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">Date of Journey</p>
                    </Col>
                    <Col xs={1}>
                      <p className="TxtConfirmationPNR">:</p>
                    </Col>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">
                        {date.getDate()}-{date.getMonth() - 1}-
                        {date.getFullYear()}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div
                  style={{ background: '#F7F8FA', padding: '0px 10px' }}
                ></div>
              </div>

              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">Name of Passenger</p>
                    </Col>
                    <Col xs={1}>
                      <p className="TxtConfirmationPNR">:</p>
                    </Col>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">
                        {this.state.passengerName}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={{ backgroundColor: '#F7F8FA', padding: '0 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">Contact no.</p>
                    </Col>
                    <Col xs={1}>
                      <p className="TxtConfirmationPNR">:</p>
                    </Col>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">
                        {this.state.mobileNumber}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ backgroundColor: '#F7F8FA', padding: '20px 30px' }}>
                <div style={{ background: '#F7F8FA', padding: '0px 10px' }}>
                  <Row>
                    <Col xs={4}>
                      <p className="TxtConfirmationPNR">Thanking You</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div
                style={{
                  background: '#F7F8FA',
                  padding: '0 30px',
                  marginTop: '20px',
                }}
              >
                <div style={{ padding: '10px 10px' }}>
                  <Row>
                    <Col xs={5}>
                      <p className="TxtConfirmationPNR">Your Sincerely</p>
                      <p className="TxtConfirmationPNR">Sh. Anurag Thakur</p>
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
                <Pdf scale="1.3" targetRef={ref} filename="PNR.pdf">
                  {({ toPdf }) => (
                    <button
                      onClick={toPdf}
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
    )
    /*}
        return (
            <div>Loading</div>
        )*/
  }
}
export default ConfirmationPNR
