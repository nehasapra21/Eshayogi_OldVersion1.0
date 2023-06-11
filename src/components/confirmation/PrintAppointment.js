import React from "react";
import ReactToPrint from "react-to-print";
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'


class ComponentToPrintAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          client:this.props.client,
          appointment:this.props.appointment,
          date:this.props.date,
          username:this.props.username,
          inviteeDetail:this.props.inviteeDetail,
          referenceof:this.props.referenceof,
          date:this.props.date,
          appointmentDate:this.props.appointmentDate,
          appointmentTime:this.props.appointmentTime,
          appointmentType:this.props.appointmentType,
          duration:this.props.duration,
          city:this.props.city,
          location:this.props.location,
          status:this.props.status,
          requestLetter:this.props.requestLetter,
          important:this.props.important,
          comments:this.props.comments

        };
    }

    

  render() {

    console.log('requestLetter ', this.props)
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
        <div className="Confirmationframe">
        <div className="FormOuterFrame">
            
            <div>
                <div className="Subheader">
                    <div className="SubheaderTxtDiv">
                        { /*<p className="TxtOfficeof">Office of</p>*/ }
                        <p className="TxtSubheader">{this.state.client}</p>
                    </div>
                    <div className="SubheaderTxtDiv">
                        <p className="TxtPoweredBy">Powered by</p>
                        <img src={Esahiyogi} alt="" className="SubheaderImg"/>
                    </div>
                </div>
                <div style={{ backgroundColor : '#f7f8fa', padding : '0 30px', marginTop : '10px' }}>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmationB">Reference No.:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmationB">Appointment, {this.state.appointment}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Date &amp; Time:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.date}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Username:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">Sh. {this.state.username}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Invitee details:</p>
                        </Col>
                        <Col xs={8}>
                        <p className="TxtBConfirmation"> {this.state.inviteeDetail}</p>
                        </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ padding : '0 30px' }}>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Reference of:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.referenceof}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Appointment Type:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.appointmentType}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Date:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.appointmentDate}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Time:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtConfirmDiscription">{this.state.appointmentTime}</p>
                        </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ backgroundColor: '#f7f8fa', padding : '0 30px' }}>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Duration:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.duration}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">City:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.city}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Location:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.location}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom:"20px", borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
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
                <div style={{ padding : '0 30px' }}>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Request letter (Max file size 1MB &amp; PDF/JPG/JPEG format only)</p>
                        </Col>
                        <Col xs={8}>
                        <p className="TxtBAttachConfirmation">{this.state.requestLetter.length} attachments</p>
                                            {this.state.requestLetter.map((attach, index) => (
                                                <a href={attach.url} target="_blank"><p className="TxtAttachConfirmation">{attach.name}</p></a>
                                            ))}
                        </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom:"20px",borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Important:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.important}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ paddingBottom : '100px' }}>
                        <div style={{ padding : '0 10px' }}>
                            <Row>
                            <Col xs={4}>
                            <p className="TxtConfirmation">Comments:</p>
                            </Col>
                            
                            <Col xs={8}>
                            <p className="TxtConfirmDiscription">{this.state.comments}</p>
                            </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
    </div>
    );
  }
}

class ExampleAppointmnet extends React.Component {
    historyFunction(request) {

        this.props.history.push({
        pathname: '/appointment',
        state: { appointment: request }
    })
}
  render(props) {
    return (
      <div>
          <ComponentToPrintAppointment ref={el => (this.componentRef = el)} 
          client={this.props.client}
          appointment={this.props.appointment}
          date={this.props.date}
          username={this.props.username}
          inviteeDetail={this.props.inviteeDetail}
          referenceof={this.props.referenceof}
          date={this.props.date}
          appointmentDate={this.props.appointmentDate}
          appointmentTime={this.props.appointmentTime}
          appointmentType={this.props.appointmentType}
          duration={this.props.duration}
          city={this.props.city}
          location={this.props.location}
          status={this.props.status}
          requestLetter={this.props.requestLetter}
          important={this.props.important}
          comments={this.props.comments}
          />
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "40px" }}>
                <ReactToPrint
                    trigger={() => <button className="PrintBtn EditButton">Print</button>}
                    content={() => this.componentRef}
                />
                <button type="button" className="PrintBtn UpdateButton" onClick={()=>this.historyFunction(this.props.data)}>Edit</button>
                    </div>

        
      </div>
    );
  }
}

export default ExampleAppointmnet;
