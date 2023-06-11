import React, { Component } from "react";
import "./Confirmation.css";
import Esahiyogi from "../../utils/images/esahyogiblue.svg";
import Header from "../header/Header";
import { Container, Row, Col } from "reactstrap";
import ExampleAppointmnet from "../confirmation/PrintAppointment";
import { convertISOToDate, convertISOToDateTime } from "../../utils/dateTime";

import Alert from "../hoc/Alert/Alert";

class ConfirmationAppointment extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;
    const { h1 } = JSON.parse(localStorage.getItem("eSahyogiUser")).data.org;
    const { state: historyState } = props.location;

    const { appointment } = { ...historyState };

    console.log("props from the confiramtion page");

    const {
      _id,
      citizenPhone,
      citizenName,
      citizenAddress,
      citizenPincode,
      referenceFirstName,
      referenceLastName,
      type,
      pupose,
      city,
      preferredDate,
      preferredTime,
      duration,
      invitation,
      isImportant,
      officeLocation,
      status,
      comments,
      createdBy,
      createdOn,
    } = { ...appointment.request };
    const { ref } = { ...appointment };

    this.state = {
      data: appointment,
      history: this.props.history,
      client: h1,
      appointment: ref,
      date: convertISOToDateTime(createdOn),
      username: `${firstName}`,
      inviteeDetail: `${citizenName} +91${citizenPhone} (${citizenPincode})`,
      referenceof: `${referenceFirstName} ${referenceLastName}`,
      date: convertISOToDateTime(createdOn),
      appointmentDate: convertISOToDate(preferredDate),
      appointmentTime: preferredTime,
      appointmentType: type,
      duration: duration,
      city: city,
      location: `${officeLocation[0] ? officeLocation[0].name : ""}, ${
        officeLocation[0] ? officeLocation[0].address : ""
      }`,
      status: status,
      requestLetter: invitation,
      important: isImportant ? "Yes" : "No",
      comments: comments,
    };

    console.log("here is the state from ", this.state);
  }
  render() {
    let printAppointment = (
      <ExampleAppointmnet
        client={this.state.client}
        appointment={this.state.appointment}
        date={this.state.date}
        username={this.state.username}
        inviteeDetail={this.state.inviteeDetail}
        referenceof={this.state.referenceof}
        date={this.state.date}
        appointmentDate={this.state.appointmentDate}
        appointmentTime={this.state.appointmentTime}
        appointmentType={this.state.appointmentType}
        duration={this.state.duration}
        city={this.state.city}
        location={this.state.location}
        status={this.state.status}
        requestLetter={this.state.requestLetter}
        important={this.state.important}
        comments={this.state.comments}
        data={this.state.data}
        history={this.state.history}
      />
    );

    let message =
      this.props.location.search === "?appointment-updated"
        ? "Appointment Updated"
        : "Your appointment Number";

    return (
      <div className="NewClientForm">
        <Header />
        {this.props.location.search === "?show-appointment" ? (
          printAppointment
        ) : (
          <Alert
            alertMsg={message}
            referenceNumber={this.state.appointment}
            buttonName="View"
          >
            {printAppointment}
          </Alert>
        )}
      </div>
    );
  }
}
export default ConfirmationAppointment;
