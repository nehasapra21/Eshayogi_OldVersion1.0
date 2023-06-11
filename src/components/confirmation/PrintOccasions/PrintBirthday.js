import React, { Component, Fragment } from "react";
import Header from "../../header/Header";
import Esahiyogi from "../../../utils/images/esahyogiblue.svg";
import ReactToPrint from "react-to-print";

class ComponentToPrintBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdayData: this.props.birthdayData,
    };
  }

  render() {
    return (
      <div className="Confirmationframe">
        <div className="FormOuterFrame">
          <div className="Subheader">
            <div className="SubheaderTxtDiv">
              <p className="TxtOfficeof">Office of Sh.</p>
              <p className="TxtSubheader">
                {this.state.birthdayData.byUser.firstName}{" "}
                {this.state.birthdayData.byUser.lastName}
              </p>
            </div>
            <div className="SubheaderTxtDiv">
              <p className="TxtPoweredBy">Powered by</p>
              <img src={Esahiyogi} alt="" className="SubheaderImg" />
            </div>
          </div>
          <div
            style={{
              background: "#F7F8FA",
              padding: "0 30px",
              marginTop: "75px",
            }}
          >
            <p className="TxtConfirmationLettersRight">
              Date{" "}
              {this.state.birthdayData.createdAt
                .substring(0, 10)
                .split("")
                .reverse()
                .join("")}
            </p>
          </div>
          <div style={{ backgroundColor: "#F7F8FA", padding: "60px 30px" }}>
            <p className="TxtConfirmationLetter">
              {this.state.birthdayData.meta.name},
            </p>
            <p className="TxtConfirmationLetter">
              Please accept my best wishes and congratulations on the auspicious
              occasion of your birthday. I pray to God for eternal prosperity
              and happiness in your life.
              <br />
              Love
            </p>
          </div>
          <div
            style={{
              background: "#F7F8FA",
              padding: "0 30px",
              marginTop: "20px",
            }}
          >
            <p className="TxtConfirmationLettersRight">Your Sincerely,</p>
            <p className="TxtConfirmationLettersRightB">
              Sh. {this.state.birthdayData.byUser.firstName}{" "}
              {this.state.birthdayData.byUser.lastName}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#F7F8FA",
              padding: "20px 10px 30px 30px",
            }}
          >
            <div style={{ background: "#F7F8FA", padding: "10px 10px" }}>
              <p className="TxtConfirmationLetter" style={{ margin: "0" }}>
                Name : {this.state.birthdayData.meta.name}
              </p>
              <p className="TxtConfirmationLetter" style={{ margin: "0" }}>
                Designation :{this.state.birthdayData.meta.designation[0].name}
              </p>
              <p className="TxtConfirmationLetter" style={{ margin: "0" }}>
                Department : {this.state.birthdayData.meta.department}
              </p>
              <p className="TxtConfirmationLetter" style={{ margin: "0" }}>
                Address : {this.state.birthdayData.meta.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class PrintBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdayData: this.props.location.state.birthdayData,
    };
  }

  render() {
    console.log("Props recieving", this.props);
    console.log("State", this.state);

    return (
      <div className="NewClientForm">
        <Header />
        <ComponentToPrintBirthday
          ref={(el) => (this.componentRef = el)}
          birthdayData={this.state.birthdayData}
        />
        <ReactToPrint
          trigger={() => <button className="PrintBtn EditButton">Print</button>}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}
