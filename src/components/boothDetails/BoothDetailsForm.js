import React, { Component, Fragment } from "react";
import Header from "../header/Header";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { validNumberRegex, getYear } from "../../utils/validations";
import { Typeahead } from "react-bootstrap-typeahead";
// import { CloseButton } from 'react-toastify/dist/components'
import backIcon from "../../utils/images/icons-lelt-open-arrow.svg";
import DatePicker from "react-datepicker";
import moment from "moment";

class BoothDetailsForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state) {
      this.state = {
        ...this.props.location.state,
        errors: {
          mandalName: "",
          boothNumber: "",
          boothName: "",
          boothPresident: "",
          callingNumber: "",
          whatsappNumber: "",
          address: "",
          dob: "",
          doa: "",
        },
        mandals: [],
      };
    } else {
      this.state = {
        mandalName: "",
        boothNumber: "",
        boothName: "",
        boothPresident: "",
        wish: false,
        callingNumber: "",
        whatsappNumber: "",
        address: "",
        dob: {
          dt: "",
          dd: "",
          mm: "",
          yyyy: "",
        },
        doa: {
          dt: "",
          dd: "",
          mm: "",
          yyyy: "",
        },
        remarks: "",
        errors: {
          mandalName: "",
          boothNumber: "",
          boothName: "",
          boothPresident: "",
          callingNumber: "",
          whatsappNumber: "",
          address: "",
          dob: "",
          doa: "",
        },
        mandals: [],
      };
    }
  }

  componentDidMount() {
    this.fetchMandal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mandals.length < 0) {
      this.fetchMandal();
    }
  }

  fetchMandal = () => {
    //Fetch Mandal
    api
      .getConstituencyData({
        type: "Mandal Level",
        limit: "10",
        offset: "0",
        status: true,
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.data === undefined) {
            this.showWarning = true;
          } else {
            const mandal = response.data.data.rows.map(
              (wonderer) => wonderer.meta.name
            );
            this.setState({ mandals: mandal });
          }
        }
      });
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "mandalName":
        errors.mandalName =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "boothNumber":
        errors.boothNumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "boothName":
        errors.boothName =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "boothPresident":
        errors.boothPresident =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "callingNumber":
        errors.callingNumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "whatsappNumber":
        errors.whatsappNumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "address":
        errors.address = value.length === 0 ? "This is a required field." : "";
        break;
      case "dob":
        errors.dob.dt = value.length === 0 ? "This is a required field." : "";
        break;
      case "doa":
        errors.doa.dt = value.length === 0 ? "This is a required field." : "";
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  render() {
    const {
      id,
      mandalName,
      boothNumber,
      boothName,
      boothPresident,
      wish,
      callingNumber,
      whatsappNumber,
      address,
      dob,
      doa,
      remarks,
      isUpdateRequest,
      mandals,
    } = this.state;

    const data = {
      mandalName,
      boothNumber: boothNumber,
      boothName: boothName,
      boothPresident: boothPresident,
      wish: wish,
      callingNumber: callingNumber,
      whatsappNumber: whatsappNumber,
      address: address,
      dob: {
        // dt: `${dob.dt}`,
        dt: dob.dt,
        dd: dob.dd,
        mm: dob.mm,
        yyyy: dob.yyyy,
      },
      doa: {
        // dt: `${doa.dt}`,
        dt: doa.dt,
        dd: doa.dd,
        mm: doa.mm,
        yyyy: doa.yyyy,
      },
      remarks: remarks,
      meta: {
        yetToCalled: true,
        yetToCalled1: true,
      },
    };

    const handleAddBoothDetails = (event) => {
      event.preventDefault();

      api
        .addBoothDetails({
          ...data,
        })
        .then((response) => {
          if (response.ok) {
            toast.success("Booth Details added Successfully", {
              autoClose: 1250,
              closeButton: false,
            });
            this.setState({
              mandalName: "",
              boothNumber: "",
              boothName: "",
              boothPresident: "",
              wish: false,
              callingNumber: "",
              whatsappNumber: "",
              address: "",
              dob: {
                dt: "",
                dd: "",
                mm: "",
                yyyy: "",
              },
              doa: {
                dt: "",
                dd: "",
                mm: "",
                yyyy: "",
              },
              remarks: "",
            });
            this.props.history.push({
              pathname: `/constituency/manage-booth-details/${mandalName}`,
            });
          } else {
            toast.error("Error occured", {
              autoClose: 1250,
              closeButton: false,
            });
          }
        });
    };

    const handleUpdateBoothDetails = (event) => {
      api
        .updateBoothDetails({
          id: id,
          ...data,
        })
        .then((response) => {
          if (response.ok) {
            toast.success("Updated Successful", {
              autoClose: 1250,
              closeButton: false,
            });
            this.props.history.push({
              pathname: `/constituency/manage-booth-details/${mandalName}`,
            });
          } else {
            toast.error("Error occured", {
              autoClose: 1250,
              closeButton: false,
            });
          }
        });
    };

    const dateOfBirthday = dob.dt ? new Date(dob.dt) : "";
    const dateOfAnniversary = doa.dt ? new Date(doa.dt) : "";

    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <img
                src={backIcon}
                alt=""
                className="backIcon"
                onClick={() => this.props.history.goBack()}
              ></img>
              <p className="TxtHeading">Booth Details</p>
            </div>
            <div className="FormFrame">
              <form onSubmit={handleAddBoothDetails}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Mandal Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <Typeahead
                  id="mandalName"
                  labelKey="mandalName"
                  name="mandalName"
                  required
                  style={{ marginBottom: "30px" }}
                  placeholder="Please select a Mandal"
                  onChange={(mandal) => {
                    this.setState({ mandalName: mandal[0] });
                  }}
                  options={mandals}
                  defaultInputValue={mandalName}
                />
                {/* <input
                  type="text"
                  id="mandalName"
                  name="mandalName"
                  className="InputFrame"
                  placeholder="Please enter Mandal Name"
                  required
                  value={mandalName}
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ mandalName: e.target.value })
                  }}
                /> */}
                <span className="validation-error-message">
                  {this.state.errors.mandalName}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Booth Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="number"
                  id="boothNumber"
                  name="boothNumber"
                  className="InputFrame"
                  placeholder="Please enter Booth Number"
                  required
                  value={boothNumber}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ boothNumber: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.boothNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Booth Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="boothName"
                  name="boothName"
                  className="InputFrame"
                  placeholder="Please enter Booth Name"
                  required
                  value={boothName}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ boothName: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.boothName}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Booth President Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="boothPresident"
                  name="boothPresident"
                  className="InputFrame"
                  placeholder="Please enter Booth President Name"
                  required
                  value={boothPresident}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ boothPresident: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.boothPresident}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Wishing</p>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() =>
                        this.setState({
                          wish: true,
                        })
                      }
                    >
                      <span className={wish ? "checked" : "unchecked"} />
                    </label>
                    <p className="TxtRadioInput">Yes</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() =>
                        this.setState({
                          wish: false,
                        })
                      }
                    >
                      <span className={!wish ? "checked" : "unchecked"} />
                    </label>
                    <p className="TxtRadioInput">No</p>
                  </div>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Calling Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="callingNumber"
                  name="callingNumber"
                  className="InputFrame"
                  placeholder="Enter your Calling Number"
                  required
                  value={callingNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.handleChange(e);
                      this.setState({ callingNumber: e.target.value });
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.callingNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Whatsapp Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  className="InputFrame"
                  placeholder="Enter your Whatsapp Number"
                  required
                  value={whatsappNumber}
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.handleChange(e);
                      this.setState({ whatsappNumber: e.target.value });
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.whatsappNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Address</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="InputFrame"
                  placeholder="Please enter Address"
                  required
                  value={address}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ address: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.address}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date Of Birth</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    required
                    placeholderText="Pick from calendar view"
                    className="InputFrame"
                    selected={dateOfBirthday}
                    onChange={(date) => {
                      let errors = this.state.errors;
                      if (
                        getYear(date).toString().length === 4 &&
                        date <= new Date()
                      ) {
                        errors.dob = "";
                        this.setState({
                          dob: {
                            dt: `${date}`,
                            dd: moment(date).format("DD"),
                            mm: moment(date).format("MM"),
                            yyyy: moment(date).format("YYYY"),
                          },
                          errors,
                        });
                      } else {
                        errors.dob = "Invalid Date of Birth";
                        this.setState({ errors });
                      }
                    }}
                  />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.dob}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date Of Anniversary</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    required
                    placeholderText="Pick from calendar view"
                    className="InputFrame"
                    selected={dateOfAnniversary}
                    onChange={(date) => {
                      let errors = this.state.errors;
                      if (
                        getYear(date).toString().length === 4 &&
                        date <= new Date()
                      ) {
                        errors.doa = "";
                        this.setState({
                          doa: {
                            dt: `${date}`,
                            dd: moment(date).format("DD"),
                            mm: moment(date).format("MM"),
                            yyyy: moment(date).format("YYYY"),
                          },
                          errors,
                        });
                      } else {
                        errors.doa = "Invalid Date of Birth";
                        this.setState({ errors });
                      }
                    }}
                  />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.doa}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Remarks</p>
                </div>
                <input
                  type="text"
                  id="remarks"
                  name="remarks"
                  className="InputFrame"
                  placeholder="Please enter Remarks"
                  value={remarks}
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ remarks: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.remarks}
                </span>

                {!isUpdateRequest ? (
                  <input type="submit" value="Submit" className="BtnSubmit" />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "40px",
                    }}
                  >
                    <button
                      type="button"
                      className="PrintBtn UpdateButton"
                      onClick={() => {
                        handleUpdateBoothDetails();
                      }}
                    >
                      Update
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoothDetailsForm;
