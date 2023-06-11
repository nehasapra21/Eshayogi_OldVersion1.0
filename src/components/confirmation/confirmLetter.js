import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExampleLetters from './PrintLetters'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'
import Pdf from 'react-to-pdf'
import signature from '../../utils/images/sign.png'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'

class ConfirmationLetters extends Component {
  constructor(props) {
    super(props)

    const { firstName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data
    const { h1 } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org

    const { state: historyState } = props.location

    const { Letters } = { ...historyState }
    console.log('Clicked', Letters.request)

    const { to, from, date, subject, digitalSignature, language, citizenName } =
      { ...Letters.request }

    const { ref } = { ...Letters }
    console.log('this is my props', this.props)

    this.state = {
      history: this.props.history,
      client: h1,
      data: Letters,
      ref,
      to,
      from,
      subject,
      date,
      digitalSignature,
      language,
      citizenName,
    }

    console.log('here is the state from ', this.state)
  }

  historyFunction(request) {
    this.props.history.push({
      pathname: '/letter',
      state: { Letters: request },
    })
  }

  returnToManage = () => {
    this.props.history.push({
      path: '/manage-request',
      state: {
        manage: 'LETTERS',
      },
    })
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  render(props) {
    const { client } = this.state
    const ref = React.createRef()
    let message =
      this.props.location.search === '?updated-Letter'
        ? 'Letter Updated'
        : 'Your Complaint Number'
    console.log(this.state.data, 'yyy')

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '250px',
          }}
        >
          <Header />
          <div className="Confirmationframe">
            <div className="FormOuterFrame" style={{ marginTop: '-500px' }}>
              <div className="FormOuterFrame" ref={ref}>
                <div style={{ padding: '0 30px' }}>
                  {console.log(this.state.ref, 'hey there')}
                  <p className="TxtConfirmationLettersRight">
                    No. {this.state.data.ref}
                  </p>
                  <p className="TxtConfirmationLettersRight">
                    {this.state.language === 'hindi'
                      ? `Date ${this.state.date}`
                      : `दिनांक ${this.state.date}`}
                  </p>
                </div>
                <div style={{ padding: '20px 10px 20px 20px' }}>
                  <div>
                    <Row>
                      {this.state.language === 'hindi' ? (
                        <Col xs={10}>
                          <p className="TxtConfirmationLetter">
                            कृपया संबंधित परीक्षण के संलग्न आवेदन को देखें{' '}
                            {this.state.from} के बारे में {this.state.subject}
                            |आवेदन की सामग्री आत्म व्याख्यात्मक हैं|
                          </p>
                          <p className="TxtConfirmationLetter">
                            {' '}
                            यदि अनुरोध है तो मैं आपका आभारी रहूंगा
                            सहानुभूतिपूर्वक विचार किया जाता है और तदनुसार
                            कार्रवाई की जाती है|
                          </p>
                        </Col>
                      ) : (
                        <Col xs={10}>
                          <p className="TxtConfirmationLetter">
                            Kindly refer to the enclosed application of{' '}
                            {this.state.from} regarding {this.state.subject}.The
                            contents of the application are self explanatory.
                          </p>
                          <p className="TxtConfirmationLetter">
                            I shall be grateful to you if the request of Pallav
                            is considered sympathetically and action taken
                            accordingly
                          </p>
                        </Col>
                      )}
                    </Row>
                  </div>
                </div>
                <div style={{ padding: '0 30px', marginTop: '20px' }}>
                  {this.state.digitalSignature == 'yes' ? (
                    <div>
                      {/* <img
                        src={signature}
                        style={{ marginLeft: '390px' }}
                        alt="Shri. Anurag Thakur"
                      /> */}
                      <p style={{ marginLeft: '390px' }}>Shri. Anurag Thakur</p>
                    </div>
                  ) : (
                    <div />
                  )}
                  {this.state.language == 'hindi' ? (
                    <div>
                      <p className="TxtConfirmationLettersRight">भवदीय</p>
                      <p className="TxtConfirmationLettersRight">
                        ({this.state.client})
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="TxtConfirmationLettersRight">
                        Your Sincerely
                      </p>
                      <p className="TxtConfirmationLettersRight">
                        ({this.state.client})
                      </p>
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px 10px 30px 30px' }}>
                  <div>
                    <Row>
                      <Col xs={10}>
                        <p
                          className="TxtConfirmationLetter"
                          style={{ width: '25%' }}
                        >
                          {this.state.to}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
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
            y="10"
            scale="1.33"
            targetRef={ref}
            filename={this.state.data.ref + '.pdf'}
          >
            {({ toPdf }) => (
              <button onClick={toPdf} className="PrintBtn EditButton ">
                Download
              </button>
            )}
          </Pdf>
          <button
            type="button"
            className="PrintBtn UpdateButton "
            onClick={() => this.historyFunction(this.state.data)}
          >
            Edit
          </button>
        </div>
      </div>
    )
    /*}
        return (
            <div>Loading</div>
        )*/
  }
}
export default ConfirmationLetters
