import React from "react";
import ReactToPrint from "react-to-print";
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'

class ComponentToPrintPNR extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client:this.props.client,
            location: this.props.location,
                to: this.props.to,
                category:this.props.category,
                dateOfJourney:this.props.dateOfJourney,
                date:this.props.date,
                trainNumber:this.props.trainNumber,
                passengerName:this.props.passengerName,
                pnr:this.props.pnr,
                sectorFrom:this.props.sectorFrom,
                sectorTo:this.props.sectorTo,
                ticketClass:this.props.ticketClass,
                signedBy:this.props.signedBy,
                mobileNumber:this.props.mobileNumber,
                digitalSignature:this.props.digitalSignature,
                history:this.props.history
            } 
            console.log(this.props,"lovish")
        };
        
        
    
    
    render() {
        var date = new Date(this.state.dateOfJourney)
        var journeyDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="Confirmationframe">
                    <div className="FormOuterFrame">

                        <div>
                            <div className="Subheader">
                                <div className="SubheaderTxtDiv">
                                    { /*<p className="TxtOfficeof">Office of </p>*/ }
                                    <p className="TxtSubheader">{this.state.client}</p>
                                </div>
                                <div className="SubheaderTxtDiv">
                                    <p className="TxtPoweredBy">Powered by</p>
                                    <img src={Esahiyogi} alt="" className="SubheaderImg" />
                                </div>
                            </div>
                            <div style={{ background: "#F7F8FA", padding : '0 30px', marginTop : '20px' }}>
                                <div style={{ padding : '10px 10px'}}>
                                    <Row>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR"></p>
                                            <p className="TxtConfirmationPNR">Government of India</p>
                                            <p className="TxtConfirmationPNR">Rail Bhawan, New Delhi</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{ background: "#F7F8FA", padding : '0 30px' }}>
                                <div style={{  padding : '10px 10px'}}>
                                    <Row>
                                        <Col xs={5}>
                                            <p className="TxtConfirmation">Respected Sir/Madam</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{backgroundColor : '#F7F8FA', padding: '0px 10px 30px 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '10px 10px' }}>
                                    <Row>
                                        <Col xs={10}>
                                            <p className="TxtConfirmationPNR">I shall be grateful if you could kindly confirm the following rail reservation a {this.state.category} of Hon'ble MoS:.</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
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

                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                    <Row>
                                        <Col xs={4}>
                                            <p className="TxtConfirmationPNR">Train</p>
                                        </Col>
                                        <Col xs={1}>
                                            <p className="TxtConfirmationPNR">:</p>
                                        </Col>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR">{this.state.trainNumber}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                    <Row>
                                        <Col xs={4}>
                                            <p className="TxtConfirmationPNR">Sector</p>
                                        </Col>
                                        <Col xs={1}>
                                            <p className="TxtConfirmationPNR">:</p>
                                        </Col>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR">{this.state.sectorFrom} to {this.state.sectorTo}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                    <Row>
                                        <Col xs={4}>
                                            <p className="TxtConfirmationPNR">Date of Journey</p>
                                        </Col>
                                        <Col xs={1}>
                                            <p className="TxtConfirmationPNR">:</p>
                                        </Col>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR">{journeyDate}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                </div>
                            </div>

                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                    <Row>
                                        <Col xs={4}>
                                            <p className="TxtConfirmationPNR">Name of Passenger</p>
                                        </Col>
                                        <Col xs={1}>
                                            <p className="TxtConfirmationPNR">:</p>
                                        </Col>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR">{this.state.passengerName}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div style={{backgroundColor : '#F7F8FA', padding: '0 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                    <Row>
                                        <Col xs={4}>
                                            <p className="TxtConfirmationPNR">Contact no.</p>
                                        </Col>
                                        <Col xs={1}>
                                            <p className="TxtConfirmationPNR">:</p>
                                        </Col>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR">{this.state.mobileNumber}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{backgroundColor : '#F7F8FA', padding: '20px 30px' }}>
                                <div style={{ background: "#F7F8FA", padding : '0px 10px' }}>
                                    <Row>
                                        <Col xs={4}>
                                            <p className="TxtConfirmationPNR">Thanking You</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div style={{ background: "#F7F8FA", padding : '0 30px', marginTop : '20px' }}>
                                <div style={{ padding : '10px 10px'}}>
                                    <Row>
                                        <Col xs={5}>
                                            <p className="TxtConfirmationPNR">Your Sincerely</p>
                                            <p className="TxtConfirmationPNR">Sh. Anurag Thakur</p>
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

class ExamplePNR extends React.Component {
    
    historyFunction(request) {

        this.props.history.push({
        pathname: '/PNR',
        state: {PNR: request },
        
    })
}

    render(props) {
        
        return (

            <div>
                <ComponentToPrintPNR ref={el => (this.componentRef = el)}
                 client= {this.props.client}
                 location= {this.props.location}
                 to= {this.props.to}
                 category= {this.props.category}
                 dateOfJourney= {this.props.dateOfJourney}
                 date= {this.props.date}
                 trainNumber= {this.props.trainNumber}
                 passengerName= {this.props.passengerName}
                 pnr= {this.props.pnr}
                 sectorFrom= {this.props.sectorFrom}
                 sectorTo= {this.props.sectorTo}
                 ticketClass= {this.props.ticketClass}
                 signedBy= {this.props.signedBy}
                 mobileNumber= {this.props.mobileNumber}
                 digitalSignature= {this.props.digitalSignature}
                 history={this.props.history} />
                
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: "50px" }}>
                <ReactToPrint
                    trigger={() => <button className="PrintBtn EditButton">Print</button>}
                    content={() => this.componentRef}
                />
                {console.log(this.props.data,"vv")}
                <button type="button" className="PrintBtn UpdateButton" onClick={()=>this.historyFunction(this.props.data)}>Edit</button>
                    </div>

            </div>
        );
    }
}

export default ExamplePNR;
