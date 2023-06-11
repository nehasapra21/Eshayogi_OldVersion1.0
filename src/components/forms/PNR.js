import React, { Component } from "react";
import "../forms/event/Event.css";
import "../forms/job/Job.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CopyrightFooter from "../footer/CopyrightFooter";
import "../forms/newclient/NewClient.css";
import "../forms/complaint/Complaint.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import api from "../../utils/api";
import { Typeahead } from "react-bootstrap-typeahead";
import backIcon from "../../utils/images/icons-lelt-open-arrow.svg";
import { getYear } from "../../utils/validations";
import Loader from "../hoc/Loader/Loader";
import ReactDOM from "react-dom";
import { Prompt } from "react-router-dom";
import { toast } from "react-toastify";

class PNR extends Component {
  state = {
    isBlocking: false,
  };
  constructor(props) {
    super(props);
    document.title = "PNR Registraion";
    const { state: historyState } = props.location;
    const { PNR } = { ...historyState };
    console.log(PNR, "citizen");

    if (PNR) {
      const {
        recommendedName,
        recommendedNumber,
        citizenName,
        citizenMobileNumber,
        citizenPincode,
        citizenAddress,
        location,
        to,
        category,
        dateOfJourney,
        date,
        ticketNumber,
        trainNumber,
        pnr,
        passengerName,
        sectorFrom,
        sectorTo,
        ticketClass,
        signedBy,
        mobileNumber,
        ticketStatus,
        referenceName,
        digitalSignature,
      } = { ...PNR.request };
      const { ref, status } = { ...PNR };

      this.state = {
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        ref,
        citizenName,
        citizenMobileNumber,
        citizenPincode,
        citizenAddress,
        location,
        to,
        category,
        dateOfJourney: new Date(dateOfJourney),
        officelocations: [],
        date,
        ticketNumber,
        trainNumber,
        pnr,
        passengerName,
        sectorFrom,
        sectorTo,
        ticketClass,
        signedBy,
        mobileNumber,
        ticketStatus,
        referenceName,
        digitalSignature,
        status,
        previousStatus: status,
        classes: [
          { name: "Sleeper Class" },
          { name: "First Class AC" },
          { name: "AC-Two tier" },
          { name: "AC-Three Tier" },
          { name: "Seater Class" },
          { name: "AC chair car" },
        ],
        signs: [
          { name: "None" },
          { name: "Anurag Singh Thakur" },
          { name: "Binod Kumar" },
          { name: "Astik Sinha" },
        ],
        locationsLoaded: false,
        isUpdateRequest: true,
        showLoader: false,
        isLoading: true,
        errors: {
          recommendedName: "",
          recommendedNumber: "",
          pnr: "",
          trainNumber: "",
          sectorFrom: "",
          sectorTo: "",
          dateOfJourney: "",
        },
        doNewFileUpload: false,
        doFileChanged: false,
      };
      console.log(this.state.previousStatus, "ashu");
    } else {
      const { citizen } = { ...historyState };

      console.log("props from the complaint form", citizen);

      const {
        firstName,
        callingNumber,
        pincode,
        address,
        recommendedName,
        recommendedNumber,
      } = { ...citizen };

      this.state = {
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        citizenName: firstName,
        citizenMobileNumber: callingNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        location: "",
        officelocations: [],
        to: "",
        toArray: [
          { name: "Railway Minister" },
          { name: "PS to Railway Minister" },
          { name: "MOS Railway" },
          { name: "PS to MOS Railway" },
          { name: "WCR HQ Kota" },
        ],
        category: "",
        dateOfJourney: "",
        date: new Date(),
        trainNumber: "",
        pnr: "",
        passengerName: "",
        sectorFrom: "",
        sectorTo: "",
        classes: [
          { name: "Sleeper Class" },
          { name: "First Class AC" },
          { name: "AC-Two tier" },
          { name: "AC-Three Tier" },
          { name: "Seater Class" },
          { name: "AC chair car" },
        ],
        class: "",
        signs: [
          { name: "None" },
          { name: "Anurag Singh Thakur" },
          { name: "Binod Kumar" },
          { name: "Astik Sinha" },
        ],
        signedBy: "",
        ticketNumber: "",
        mobileNumber: "",
        ticketStatus: "",
        referenceName: "",
        status: "NOTCONFIRMED",
        digitalSignature: "yes",
        locationsLoaded: false,
        isUpdateRequest: false,
        showLoader: false,
        errors: {
          recommendedName: "",
          recommendedNumber: "",
          pnr: "",
          trainNumber: "",
          sectorFrom: "",
          sectorTo: "",
          dateOfJourney: "",
        },
        doNewFileUpload: false,
        doFileChanged: false,
      };
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "recommendedName":
        errors.recommendedName =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "recommendedNumber":
        errors.recommendedNumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "pnr":
        errors.pnr = value.length === 0 ? "This is a required field." : "";
        break;
      case "trainNumber":
        errors.trainNumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "sectorFrom":
        errors.sectorFrom =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "sectorTo":
        errors.sectorTo = value.length === 0 ? "This is a required field." : "";
        break;
      default:
        break;
    }
    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  returnToManage = () => {
    this.props.history.push({
      pathname: "/manage-request",
      state: {
        manage: "PNR",
      },
    });
  };
  sayHello() {
    let isBlocking = false;
  }
  render() {
    var { isBlocking } = this.state;
    const {
      recommendedName,
      recommendedNumber,
      ref,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      location,
      to,
      category,
      dateOfJourney,
      date,
      ticketNumber,
      trainNumber,
      pnr,
      passengerName,
      sectorFrom,
      sectorTo,
      ticketClass,
      signedBy,
      mobileNumber,
      ticketStatus,
      referenceName,
      digitalSignature,
      status,
      previousStatus,
    } = this.state;

    const requestData = {
      recommendedName,
      recommendedNumber,
      ref,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      location,
      category,
      dateOfJourney,
      date,
      trainNumber,
      pnr,
      sectorFrom,
      sectorTo,
      status,
    };
    let newDate = new Date();
    let currentdate = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const { history } = this.props;
    const { state: historyState } = this.props.location;
    const { citizen, PNR } = { ...historyState };
    let citizendata = citizen;
    if (PNR) {
      citizendata = PNR.citizen;
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...PNR };
    const handleSubmit = async (event) => {
      this.setState({
        isBlocking: false,
      });
      event.preventDefault();
      if (status === "NOTCONFIRMED") {
        ////BULK IMPORT CODE//////
        /*for( let i=0; i <= 2000 ; i++) {
                        setTimeout(
                          () => (
                            api.createRequest({
                                dd: `${currentdate}`,
                                mm: `${month}`,
                                yy: `${year}`,
                                typeOfRequest: "PNR",
                                status: "PROCESSING",
                                request: requestData,
                                addressee: null,
                                citizen: citizen
                            }).then(
                                (response) => {
                                    if (response.ok) {
                                        console.log('PNR response', response.data)
                                    }
                                    else {
                                        alert('Error occured')
                                        console.log(response.data)
                                    }
                                },
                                (err) => {
                                    console.log('err ', err)
                                }
                            )
                          ), 2000 + i*500
                        )
                    }*/

        await api
          .createRequest({
            dd: `${currentdate}`,
            mm: `${month}`,
            yy: `${year}`,
            typeOfRequest: "PNR",
            status: status,
            request: requestData,
            addressee: null,
            citizen: citizen,
          })
          .then(
            (response) => {
              if (response.ok) {
                if (response.data.error) {
                  toast.error("Request Failed !", {
                    autoClose: 1250,
                    closeButton: false,
                  });
                  return;
                } else {
                  toast.success("Request Created Successfully !", {
                    autoClose: 1250,
                    closeButton: false,
                  });
                  history.push({
                    pathname: "/manage-request",
                    state: {
                      manage: "PNR",
                    },
                  });
                }
              } else {
                toast.error("Request Failed !", {
                  autoClose: 1250,
                  closeButton: false,
                });
              }
            },
            (err) => {
              toast.error("Something Went Wrong. Pease Refresh !", {
                autoClose: 1250,
                closeButton: false,
              });
              console.log("err ", err);
            }
          );
      }
    };
    const handlePNRUpdate = async () => {
      if (this.state.previousStatus === "CONFIRMED") {
        toast.success("Already Procceded !", {
          autoClose: 1250,
          closeButton: false,
        });
        return;
      }

      console.log("Update request with following state", this.state);
      console.log("update initiated");
      await api
        .updateRequest({
          dd,
          mm,
          yy,
          typeOfRequest,
          status: `${this.state.status}`,
          byUser,
          ref,
          orgId,
          id,
          request: requestData,
          addressee: null,
        })
        .then(
          (response) => {
            if (response.ok) {
              if (response.data.error) {
                toast.error("Request Update Failed !", {
                  autoClose: 1250,
                  closeButton: false,
                });
                return;
              } else {
                toast.success("Request Updated Successfully !", {
                  autoClose: 1250,
                  closeButton: false,
                });
                history.push({
                  pathname: "/manage-request",
                  state: {
                    manage: "PNR",
                  },
                });
              }
            } else {
              toast.error("Request Update Failed !", {
                autoClose: 1250,
                closeButton: false,
              });
            }
          },
          (err) => {
            toast.error("Something Went Wrong. Pease Refresh !", {
              autoClose: 1250,
              closeButton: false,
            });
            console.log("err ", err);
          }
        );
    };
    if (this.state.isUpdateRequest === true) {
      isBlocking = false;
    }
    return (
      <div className="NewClientForm">
        <Header isLoading={this.state.isLoading} />
        <Prompt
          when={isBlocking}
          message={(location) => "Are you sure want to go?"}
        />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              {this.state.isUpdateRequest ? (
                <img
                  src={backIcon}
                  alt=""
                  className="backIcon"
                  onClick={() => this.returnToManage()}
                ></img>
              ) : null}
              <p className="TxtHeading">PNR</p>
              <div className="DivHeadUserInfo">
                <p className="TxtName">{citizenName}</p>
                <p className="TxtName">{`+91-${citizenMobileNumber}`}</p>
                <p className="TxtName">{citizenPincode}</p>
              </div>
            </div>
            <form className="FormFrame" onSubmit={handleSubmit}>
              <div className="TxtInputFrame">
                <p className="TxtInput">Recommended By Name</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="recommendedName"
                name="recommendedName"
                disabled={true}
                className="InputFrame"
                value={this.state.recommendedName}
                placeholder="Please enter Recommended by Name"
                required
                onChange={(e) => {
                  this.handleChange(e);
                  this.setState({ recommendedName: e.target.value });
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.recommendedName}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Recommended By Number</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="invitorName"
                name="recommendedNumber"
                disabled={true}
                className="InputFrame"
                value={this.state.recommendedNumber}
                placeholder="Please enter Recommended by Number"
                required
                onChange={(e) => {
                  this.handleChange(e);
                  this.setState({ recommendedNumber: e.target.value });
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.recommendedNumber}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">PNR</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="invitorName"
                name="pnr"
                disabled={this.state.status === "CONFIRMED" ? true : false}
                maxLength="10"
                className="InputFrame"
                value={this.state.pnr}
                placeholder="25 Characters"
                required
                onChange={(e) => {
                  if (e.target.value.length <= 25) {
                    this.handleChange(e);
                    this.setState({ pnr: e.target.value });
                  }
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.pnr}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Train Number</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type='text'
                disabled={this.state.status === "CONFIRMED" ? true : false}
                id="invitorName"
                name="trainNumber"
                maxLength="10"
                className="InputFrame"
                value={this.state.trainNumber}
                placeholder="25 Characters"
                required
                onChange={(e) => {
                  if (e.target.value.length <= 25) {
                    this.handleChange(e);
                    this.setState({ trainNumber: e.target.value });
                  }
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.trainNumber}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Date of Journey</p>
                <p className="TxtStar">*</p>
              </div>
              <div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  disabled={this.state.status === "CONFIRMED" ? true : false}
                  required
                  placeholder="Pick from calendar view"
                  className="InputFrame"
                  selected={this.state.dateOfJourney}
                  onChange={(date) => {
                    let errors = this.state.errors;
                    if (getYear(date).toString().length == 4) {
                      errors.dateOfJourney = "";
                      this.setState({ dateOfJourney: date, errors });
                    } else {
                      errors.dateOfJourney = "Invalid Year";
                      this.setState({ errors });
                    }
                  }}
                  minDate={new Date()}
                />
              </div>
              <span className="validation-error-message">
                {this.state.errors.dateOfJourney}
              </span>

              <div className="Experience">
                <div className="InnerExperience">
                  <div className="TxtInputFrame">
                    <p className="TxtInput">From</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    disabled={this.state.status === "CONFIRMED" ? true : false}
                    name="sectorFrom"
                    className="InputFrame"
                    value={this.state.sectorFrom}
                    placeholder="From"
                    required
                    onChange={(e) => {
                      this.handleChange(e);
                      this.setState({ sectorFrom: e.target.value });
                    }}
                  />
                </div>

                <div className="InnerExperience">
                  <div className="TxtInputFrame">
                    <p className="TxtInput">To</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    name="sectorTo"
                    type="text"
                    disabled={this.state.status === "CONFIRMED" ? true : false}
                    className="InputFrame"
                    value={this.state.sectorTo}
                    placeholder="To"
                    required
                    onChange={(e) => {
                      this.handleChange(e);
                      this.setState({ sectorTo: e.target.value });
                    }}
                  />
                </div>
              </div>
              <span className="validation-error-message">
                {this.state.errors.sectorFrom
                  ? this.state.errors.sectorFrom
                  : this.state.errors.sectorTo}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Status</p>
                <p className="TxtStar">*</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                {
                  <div className="SelectRadio">
                    <label
                      disabled={
                        this.state.status === "CONFIRMED" ? true : false
                      }
                      className="radiobutton"
                      onClick={() => this.setState({ status: "NOTCONFIRMED" })}
                    >
                      <span
                        className={
                          this.state.status === "NOTCONFIRMED"
                            ? "checked"
                            : "unchecked"
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Not Confirmed</p>
                  </div>
                }
                <div
                  className="SelectRadio"
                  style={
                    !this.state.isUpdateRequest
                      ? { filter: "contrast(0.5)" }
                      : null
                  }
                >
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ status: "CONFIRMED" })}
                    style={
                      !this.state.isUpdateRequest
                        ? { pointerEvents: "none" }
                        : null
                    }
                  >
                    <span
                      className={
                        this.state.status === "CONFIRMED"
                          ? "checked"
                          : "unchecked"
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Confirmed</p>
                </div>
              </div>

              {this.state.isUpdateRequest === false ? (
                <input
                  type="submit"
                  value="Submit"
                  className="BtnSubmit"
                  onClick={this.sayHello}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "40px",
                  }}
                >
                  <button
                    className="PrintBtn UpdateButton"
                    type="button"
                    onClick={() => handlePNRUpdate()}
                  >
                    Update
                  </button>
                </div>
              )}
            </form>
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className="emptyDiv" />
        {this.state.showLoader ? <Loader /> : null}
      </div>
    );
  }
}
export default PNR;
