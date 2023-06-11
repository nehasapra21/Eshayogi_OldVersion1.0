import React from "react";
import ReactToPrint from "react-to-print";
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'


class ComponentToPrintEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        client:this.props.client,
        event: this.props.event,
        date: this.props.date,
        username: this.props.username,
        inviteedetail: this.props.inviteedetail,
        recommendedName:this.props.recommendedName,
        eventtitle:this.props.eventtitle,
        eventtype:this.props.eventtype,
        eventtime:this.props.eventtime,
        eventdate:this.props.eventdate,
        duration:this.props.duration,
        location:this.props.location,
        city:this.props.city,
        status:this.props.status,
        invitation:this.props.invitation,
        important:this.props.important,
        press:this.props.press,
        comments:this.props.comments        
        };
    }
  render() {
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
        <div className="Confirmationframe">
        <div className="FormOuterFrame">
            
            <div>
                <div className="Subheader">
                    <div className="SubheaderTxtDiv">
                        { /* <p className="TxtOfficeof">Office of</p> */ }
                        <p className="TxtSubheader">{this.state.client}</p>
                    </div>
                    <div className="SubheaderTxtDiv">
                        <p className="TxtPoweredBy">Powered by</p>
                        <img src={Esahiyogi} alt="" className="SubheaderImg"/>
                    </div>
                </div>
                <div style={{ backgroundColor : '#f7f8fa', padding : '0 30px', marginTop : '10px' }}>
                    <div style={{background:"#F7F8FA",borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmationB">Request details:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmationB">Event, {this.state.event}</p>
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
                        <p className="TxtBConfirmation">{this.state.inviteedetail}</p>
                        </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ padding : '0 30px' }}>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Recommended Name :</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.recommendedName}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Event Title:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.eventtitle}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Event Type:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.eventtype}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Date:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.eventdate}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
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
                <div style={{ backgroundColor : '#f7f8fa', padding : '0 30px' }}>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Duration:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.duration}</p>
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
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">City:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.city}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
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
                    <div style={{marginBottom:"20px",borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Invitation (Max file size 1MB &amp; PDF/JPG/JPEG format only)</p>
                        </Col>
                        <Col xs={8}>
                        <p className="TxtBAttachConfirmation">{this.state.invitation.length} attachments</p>
                                            {this.state.invitation.map((attach, index) => (
                                                <a href={attach.url} target="_blank"><p className="TxtAttachConfirmation">{attach.name}</p></a>
                                            ))}
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Important:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.important}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Press Intimation:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.press}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ padding : '0 10px 100px 10px' }}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Comments:</p>
                        </Col>
                        
                        <Col xs={8}>
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
    );
  }
}

class ExampleEvent extends React.Component {
    historyFunction(request) {

        this.props.history.push({
        pathname: '/event',
        state: { event: request }
    })
}
  render() {
    return (
      <div>
          <ComponentToPrintEvent ref={el => (this.componentRef = el)} 
          
          client={this.props.client}
     event= {this.props.event}
     date= {this.props.date}
     username= {this.props.username}
     inviteedetail= {this.props.inviteedetail}
     recommendedName={this.props.recommendedName}
     eventtime={this.props.eventtime}
     eventdate={this.props.eventdate}
     eventtitle={this.props.eventtitle}
     eventtype={this.props.eventtype}
     duration={this.props.duration}
     city={this.props.city}
     location={this.props.location}
     status= {this.props.status}
     invitation= {this.props.invitation}
     important= {this.props.important}
     press={this.props.press}
     comments= {this.props.comments}
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

export default ExampleEvent;
