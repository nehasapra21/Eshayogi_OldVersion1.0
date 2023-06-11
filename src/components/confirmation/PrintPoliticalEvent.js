import React from "react";
import ReactToPrint from "react-to-print";
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'


class ComponentToPrintPoliticalEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client:this.props.client,
     event: this.props.event,
     date: this.props.date,
     username: this.props.username,
     inviteedetail: this.props.inviteedetail,
     referenceof:this.props.referenceof,
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
     vidhanSabha:this.props.vidhanSabha,
     gramPanchayat:this.props.gramPanchayat,
     block:this.props.block,
     comments:this.props.comments        };
      }
  render() {
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
        <div className="Confirmationframe">
        <div className="FormOuterFrame">
            
            <div>
                <div className="Subheader">
                    <div className="SubheaderTxtDiv">
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
                        <p className="TxtBConfirmationB">Political Event, {this.state.event}</p>
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
                        <p className="TxtConfirmation">Vidhan Sabha:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.vidhanSabha}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Gram Panchayat:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.gramPanchayat}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Block :</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.block}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Place:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.location}</p>
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
                        <p className="TxtConfirmation">Invitation</p>
                        </Col>
                        <Col xs={8}>
                        <p className="TxtBAttachConfirmation">{this.state.invitation.length} attachments</p>
                                            {this.state.invitation.map((attach, index) => (
                                                <a href={attach.url} target="_blank"><p className="TxtAttachConfirmation">{attach.name}</p></a>
                                            ))}
                        </Col>
                        </Row>
                    </div>
                    
                    <div style={{ padding : '0 10px 100px 10px' }}>
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
                </div>    
            </div>
            </div>
            
        </div>
        
    </div>
    );
  }
}

class ExamplePoliticalEvent extends React.Component {
    historyFunction(request) {

        this.props.history.push({
        pathname: '/politicalevent',
        state: { event: request }
    })
}
  render() {
    return (
      <div>
          <ComponentToPrintPoliticalEvent ref={el => (this.componentRef = el)} 
          
          client={this.props.client}
     event= {this.props.event}
     date= {this.props.date}
     username= {this.props.username}
     inviteedetail= {this.props.inviteedetail}
     referenceof={this.props.referenceof}
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
     block={this.props.block}
     gramPanchayat={this.props.gramPanchayat}
     vidhanSabha={this.props.vidhanSabha}
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

export default ExamplePoliticalEvent;
