import React from "react";
import ReactToPrint from "react-to-print";
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'
import signature from '../../utils/images/sign.png'

class ComponentToPrintLetter extends React.Component {
    constructor(props) {
        super(props);
        const { meta } = JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;
        var sign = meta == undefined ? "" : meta.sign

        this.state = {
            client: this.props.client,
            from: this.props.from,
            to: this.props.to,
            subject: this.props.subject,
            date: this.props.date,
            data: this.props.data,
            history: this.props.history,
            refNo: this.props.refNo,
            digitalSignature: this.props.digitalSignature,
            signature: sign
        }
        console.log(this.props, "lovish")
    };

    render() {
        console.log(this.state.subject, "rr")
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="Confirmationframe">
                    <div className="FormOuterFrame">
                        <div style={{ paddingTop: "30px" }}>

                            <div style={{ background: "#F7F8FA", padding: '0 30px', marginTop: '20px' }}>
                                {console.log(this.state.ref, "hey there")}
                                <p className="TxtConfirmationLettersRight">No. {this.state.data.ref}</p>
                                <p className="TxtConfirmationLettersRight">Date {this.state.date}</p>

                            </div>
                            <div style={{ backgroundColor: '#F7F8FA', padding: '20px 10px 30px 30px' }}>
                                <div style={{ background: "#F7F8FA", padding: '10px 10px' }}>
                                    <Row>
                                        <Col xs={10}>
                                            <p className="TxtConfirmationLetter">कृपया संबंधित परीक्षण के संलग्न आवेदन को देखें {this.state.from}
के बारे में {this.state.subject}|आवेदन की सामग्री आत्म व्याख्यात्मक हैं|</p>
                                            <p className="TxtConfirmationLetter"> यदि अनुरोध है तो मैं आपका आभारी रहूंगा {this.state.from}
सहानुभूतिपूर्वक विचार किया जाता है और तदनुसार कार्रवाई की जाती है|</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "#F7F8FA", padding: '0 30px', marginTop: '20px' }}>
                                {this.state.digitalSignature == "yes" ? <div><img src={signature} style={{ marginLeft: "390px" }} alt="Shri. Anurag Thakur" /></div> : <div />}
                                <p className="TxtConfirmationLettersRight">
                                    भवदीय</p>
                                <p className="TxtConfirmationLettersRight">({this.state.client})</p>
                            </div>
                            <div style={{ backgroundColor: '#F7F8FA', padding: '20px 10px 30px 30px' }}>
                                <div style={{ backgroundColor: "#F7F8FA", padding: '10px 10px' }}>
                                    <Row>
                                        <Col xs={10}>
                                            <p className="TxtConfirmationLetter" style={{width:"25%"}}>{this.state.to}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ExampleLetters extends React.Component {

    historyFunction(request) {

        this.props.history.push({
            pathname: '/letter',
            state: { Letters: request },

        })
    }

    render(props) {

        console.log('Letter props 1', this.props)

        return (
            <div>
                <ComponentToPrintLetter  ref={el => (this.componentRef = el)}
                    client={this.props.client}
                    from={this.props.from}
                    to={this.props.to}
                    subject={this.props.subject}
                    date={this.props.date}
                    data={this.props.data}
                    refNo={this.props.refNo}
                    digitalSignature={this.props.digitalSignature}
                    history={this.props.history} />
                {console.log(this.props, "hiiL")}
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: "50px" }}>
                    <ReactToPrint
                    
                        trigger={() => <button className="PrintBtn EditButton">Print</button>}
                        content={() => this.componentRef}
                    />
                    {console.log(this.props.data, "vv")}
                    <button type="button" className="PrintBtn UpdateButton" onClick={() => this.historyFunction(this.props.data)}>Edit</button>
                </div>
            </div>
        );
    }
}

export default ExampleLetters;
