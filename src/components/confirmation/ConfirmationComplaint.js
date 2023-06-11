import React, { Component } from "react";
import "./Confirmation.css";
import Esahiyogi from "../../utils/images/esahyogiblue.svg";
import Header from "../header/Header";
import { Container, Row, Col } from "reactstrap";
import ExampleCompliant from "../confirmation/PrintComplaint";
import { convertISOToDate, convertISOToDateTime } from "../../utils/dateTime";
import Alert from "../hoc/Alert/Alert";

class ConfirmationComplaint extends Component {
  constructor(props) {
    super(props);

    const { firstName, lastName } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;
    const { h1 } = JSON.parse(localStorage.getItem("eSahyogiUser")).data.org;

    const { state: historyState } = props.location;

    console.log("Complaint props", this.props);

    const { complaint } = { ...historyState };
    console.log("Clicked", complaint);

    console.log("Complaint.request", complaint.request);

    const {
      citizenMobileNumber,
      citizenName,
      citizenAddress,
      citizenPincode,
      recommendedName,
      recommendedNumber,
      description,
      location,
      isImportant,
      attachments,
      status,
      comments,
      createdOn,
      assignedTo,
      department,
      assignedAddresse,
      uploadedFileDetails,
    } = { ...complaint.request };
    const { ref } = { ...complaint };
    console.log(ref, "number");

    console.log("this is my props", this.props);

    this.state = {
      data: complaint,
      history: this.props.history,
      client: h1,
      complaint: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName}`,
      complainant: `${citizenName}, +91${citizenMobileNumber}, ${citizenPincode}`,
      recommendedName: `${recommendedName}`,
      recommendedNumber: `${recommendedNumber}`,
      description,
      important: isImportant ? "No" : "Yes",
      status: status,
      department: department ? department : "N/A",
      assignedaddresse: assignedTo
        ? assignedTo: "N/A",
      attachment: attachments,
      comments: comments,
    };

    console.log("here is the state from ", this.state);
  }

  componentDidMount() {
    const { client } = this.state;

    console.log("Here is the confiramtion page state", this.state);
    //alert(this.state)
    //this.props.history.push('/home')
  }

  render(props) {
    const { client } = this.state;

    let message =
      this.props.location.search === "?updated-complaint"
        ? "Complaint Updated"
        : "Your Complaint Number";

    let printComponent = (
      <ExampleCompliant
        client={this.state.client}
        complaint={this.state.complaint}
        date={this.state.date}
        username={this.state.username}
        complainant={this.state.complainant}
        recommendedName={this.state.recommendedName}
        recommendedNumber={this.state.recommendedNumber}
        description={this.state.description}
        important={this.state.important}
        status={this.state.status}
        department={this.state.department}
        assignedaddresse={
          this.state.assignedaddresse ? this.state.assignedaddresse : "N/A"
        }
        attachment={this.state.attachment}
        comments={this.state.comments}
        data={this.state.data}
        history={this.state.history}
      />
    );

    return (
      <div className="NewClientForm">
        <Header />
        {this.props.location.search === "?show-complaint" ? (
          printComponent
        ) : (
          <Alert
            alertMsg={message}
            referenceNumber={this.state.complaint}
            buttonName="View"
          >
            {printComponent}
          </Alert>
        )}
      </div>
    );
    /*}
        return (
            <div>Loading</div>
        )*/
  }
}
export default ConfirmationComplaint;
