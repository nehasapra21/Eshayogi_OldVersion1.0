import React from "react";
import ReactToPrint from "react-to-print";
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import { Row, Col } from 'reactstrap'


class ComponentToPrintJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client:this.props.client,
            job: this.props.job,
            date: this.props.date,
            username: this.props.username,
            complainant: this.props.complainant,
            recommendedName :this.props.recommendedName,
            employment:this.props.employment,
            salary:this.props.salary,
            education:this.props.education,
            important:this.props.important,
            status:this.props.status,
            experience:this.props.experience,
            resume:this.props.resume,
            comments:this.props.comments,
            highestEduQualification : this.props.highestEduQualification,
            professionalQualification : this.props.professionalQualification,
            sharedToDesignation : this.props.sharedToDesignation,
            sharedToName : this.props.sharedToName,
            sharedToNumber : this.props.sharedToNumber,
            sharedToOrganisation : this.props.sharedToOrganisation 
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
                        { /*<p className="TxtOfficeof">Office of</p>*/ }
                        <p className="TxtSubheader">{this.state.client}</p>
                    </div>
                    <div className="SubheaderTxtDiv">
                        <p className="TxtPoweredBy">Powered by</p>
                        <img src={Esahiyogi} alt="" className="SubheaderImg"/>
                    </div>
                </div>
                <div style={{ backgroundColor : '#f7f8fa' ,padding : "0 30px", marginTop : '10px' }}>
                    <div style={{ borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmationB">Reference No.:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmationB">Job, {this.state.job}</p>
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
                        <p className="TxtBConfirmation">{this.state.username}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Complainant details:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation"> {this.state.complainant}</p>
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
                        <p className="TxtConfirmation">Employed:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.employment}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Salary:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.salary}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8",marginBottom:"20px", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Qualification :</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtConfirmDiscription">
                        {this.state.highestEduQualification}
                        </p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Professional Qualification:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.professionalQualification}</p>
                        </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ backgroundColor : '#f7f8fa', padding : '0 30px' }}>
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
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Resume attached:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBAttachConfirmation">{this.state.resume.length} attachments</p>
                                            {this.state.resume.map((attach, index) => (

                                                <a href={attach.url} target="_blank"><p className="TxtAttachConfirmation">{attach.name}</p></a>
                                            ))}
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Experience:</p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.experience}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom:"20px",borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Status:</p>
                        </Col>
                        
                        <Col xs={8} >
                        <p className="TxtBConfirmation">{this.state.status}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation">Shared To </p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.sharedToName}</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation"></p>
                        </Col>
                        
                        <Col xs={8}>
                                            <p className="TxtBConfirmation">{this.state.sharedToDesignation}, { this.state.sharedToOrganisation }</p>
                        </Col>
                        </Row>
                    </div>
                    <div style={{borderBottom:"1px solid #E3E3E8", padding : '0 10px'}}>
                        <Row>
                        <Col xs={4}>
                        <p className="TxtConfirmation"></p>
                        </Col>
                        
                        <Col xs={8}>
                        <p className="TxtBConfirmation">{this.state.sharedToNumber}</p>
                        </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ padding : '0 30px' }}>
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

class ExampleJob extends React.Component {
    historyFunction(request) {

        this.props.history.push({
        pathname: '/job',
        state: { job: request }
    })
}
  render() {
    return (
      <div>
          <ComponentToPrintJob ref={el => (this.componentRef = el)} 
          client={this.props.client}
          job= {this.props.job}
          date= {this.props.date}
          username= {this.props.username}
          complainant= {this.props.complainant}
          recommendedName={this.props.recommendedName}
          employment={this.props.employment}
          salary={this.props.salary}
          sector={this.props.sector}
          education={this.props.education}
          important={this.props.important}
          status={this.props.status}
          experience={this.props.experience}
          resume={this.props.resume}
          comments={this.props.comments}
          highestEduQualification = { this.props.highestEduQualification }
          professionalQualification = { this.props.professionalQualification }
          sharedToDesignation = { this.props.sharedToDesignation }
          sharedToName = { this.props.sharedToName }
          sharedToNumber = { this.props.sharedToNumber }
          sharedToOrganisation = { this.props.sharedToOrganisation }          />
          
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

export default ExampleJob;
