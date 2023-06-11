import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CopyrightFooter from "../footer/CopyrightFooter";
import "./newclient/NewClient.css";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import importIcon from "../../utils/images/import.svg";
import api from "../../utils/api";
import Loader from "../hoc/Loader/Loader";
import XLSX from "xlsx";
import moment from "moment";
import { toast } from "react-toastify";
import {
  validEmailRegex,
  validNumberRegex,
  getYear,
} from "../../utils/validations";
import backIcon from "../../utils/images/icons-lelt-open-arrow.svg";
import { Calendar } from "react-date-range";
import { NONE } from "apisauce";
class Birthday extends Component {
  constructor(props) {
    super(props);
    console.log(JSON.parse(localStorage.getItem("eSahyogiUser")).data);
    const { orgId, byUser } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;
    const { state: historyState } = props.location;
    const { occasion } = { ...historyState };
    console.log("occasion Data", occasion);

    if (occasion) {
      const {
        dateOfBirthday,
        dateOfAnniversary,
        name,
        state,
        party,
        designation,
        department,
        address,
        whatsappNumber,
        callingNumber1,
        callingNumber2,
        callingNumber3,
        landlineNumber1,
        landlineNumber2,
        landlineNumber3,
        emailId,
        house,
        constituency,
      } = occasion.meta;
      const { id } = occasion;

      this.state = {
        id,
        dateOfBirthday: new Date(dateOfBirthday),
        dateOfAnniversary:
          dateOfAnniversary == ""
            ? dateOfAnniversary
            : new Date(dateOfAnniversary),
        name,
        state,
        party,
        designation,
        department,
        address,
        whatsappNumber,
        callingNumber1,
        callingNumber2,
        callingNumber3,
        landlineNumber1,
        landlineNumber2,
        landlineNumber3,
        emailId,
        constituency,
        errors: {
          name: "",
          state: "",
          party: "",
          emailId: "",
          dateOfAnniversary: "",
          dateOfBirthday: "",
        },
        designations: [
          { name: "MP" },
          { name: "MLA" },
          { name: "Chief Minister" },
          { name: "Governor" },
          { name: "Vice President of India" },
          { name: "President of India" },
          { name: "Prime Minister of India" },
        ],
        houses: [
          { name: "Rajya Sabha" },
          { name: "Lok Sabha" },
          { name: "Vidhan Sabha" },
        ],
        house,
        isUpdateRequest: true,
      };
    } else {
      this.state = {
        dateOfBirthday: "",
        dateOfAnniversary: "",
        name: "",
        state: "",
        party: "",
        designation: "",
        department: "",
        address: "",
        whatsappNumber: "",
        callingNumber1: "",
        callingNumber2: "",
        callingNumber3: "",
        landlineNumber1: "",
        landlineNumber2: "",
        landlineNumber3: "",
        emailId: "",
        constituency: "",
        errors: {
          name: "",
          state: "",
          party: "",
          emailId: "",
          dateOfAnniversary: "",
          dateOfBirthday: "",
        },
        designations: [
          { name: "MP" },
          { name: "MLA" },
          { name: "Chief Minister" },
          { name: "Governor" },
          { name: "Vice President of India" },
          { name: "President of India" },
          { name: "Prime Minister of India" },
        ],
        houses: [
          { name: "Rajya Sabha" },
          { name: "Lok Sabha" },
          { name: "Vidhan Sabha" },
        ],
        house: "",
        isUpdateRequest: false,
      };
    }
  }

  showLoader = false;

  handleUpdateOccassion = () => {
    this.showLoader = true;
    let date = new Date(this.state.dateOfBirthday);
    let doaDate = new Date(this.state.dateOfAnniversary);
    console.log("New Date", date.getFullYear());
    console.log("id hai", this.state.id);
    api
      .updateOccassion({
        id: `${this.state.id}`,
        type: "Birthday",
        meta: {
          ...this.state,
          dd:
            date.getDate() + 1 > 9 ? `${date.getDate()}` : `0${date.getDate()}`,
          mm:
            date.getMonth() + 1 > 9
              ? `${date.getMonth() + 1}`
              : `0${date.getMonth() + 1}`,
          year: date.getFullYear().toString(),
          yetToCalled: true,
          dob: {
            dd:
              date.getDate() + 1 > 9
                ? `${date.getDate()}`
                : `0${date.getDate()}`,
            mm:
              date.getMonth() + 1 > 9
                ? `${date.getMonth() + 1}`
                : `0${date.getMonth() + 1}`,
            year: `${date.getFullYear()}`,
          },
          doa: {
            dd:
              doaDate.getDate() + 1 > 9
                ? `${doaDate.getDate()}`
                : `0${doaDate.getDate()}`,
            mm:
              doaDate.getMonth() + 1 > 9
                ? `${doaDate.getMonth() + 1}`
                : `0${doaDate.getMonth() + 1}`,
            year: `${doaDate.getFullYear()}`,
          },
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log("Occassion created successfully", response);
          toast.success("Occassion Updated Successfully");
          this.props.history.push({
            pathname: "/manage-occasion",
          });
        } else {
          console.log("Something wrong", response);
          alert("Something Wrong");
        }
      });
  };

  importFile = (evt) => {
    console.log("11111111111111111");
    const selectedFile = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
      });
      let json_object = "";
      workbook.SheetNames.forEach(function (sheetName) {
        const XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        json_object = JSON.stringify(XL_row_object);
        console.log("1111111111111111", json_object);
      });
      if (json_object.length) {
        const a = [
          ["dateOfBirthday", "Date of Birth"],
          ["name", "Name"],
          ["designation", "Designation"],
          ["department", "Department"],
          ["address", "Address"],
          ["whatsappNumber", "Whatsapp number"],
          ["callingNumber", "Calling Number 1"],
          ["constituency", "Constituency"],
          ["state", "State"],
          ["email", "Email ID"],
          ["callingNumber2", "Calling Number 2"],
          ["party", "Party"],
          ["dateOfAnniversary", "Date of Marriage"],
          ["callingNumber3", "Calling Number 3"],
          ["landlineNumber1", "Landline Number. 1"],
          ["landlineNumber2", "Landline Number 2"],
          ["landlineNumber3", "Landline Number 3"],
          ["house", "House"],
        ];
        let data = json_object;
        a.forEach((obj) => {
          const re = new RegExp(obj[1], "g");
          data = data.replace(re, obj[0]);
        });
        console.log(data);
        const abc = JSON.parse(data);
        console.log(JSON.parse(data));
        const array = [];
        abc.forEach((dataObject) => {
          const validDOB = moment(
            dataObject.dateOfBirthday,
            "DD.MM.YYYY",
            true
          ).isValid();
          const validDOA = moment(
            dataObject.dateOfAnniversary,
            "DD.MM.YYYY",
            true
          ).isValid();
          if (validDOB || validDOA) {
            let dateOfBirthday = "",
              dd = "",
              mm = "",
              year = "",
              dobDate = "",
              dobMonth = "",
              dobyear = "",
              dateOfAnniversary = "",
              doaDate = "",
              doaMonth = "",
              doayear = "";
            if (validDOB) {
              dateOfBirthday = moment(
                dataObject.dateOfBirthday,
                "DD.MM.YYYY"
              ).format();
              dd = moment(dateOfBirthday).format("DD");
              mm = moment(dateOfBirthday).format("MM");
              year = moment(dateOfBirthday).format("YYYY");
              dobDate = moment(dateOfBirthday).format("DD");
              dobMonth = moment(dateOfBirthday).format("MM");
              dobyear = moment(dateOfBirthday).format("YYYY");
            }

            if (validDOA) {
              dateOfAnniversary = moment(
                dataObject.dateOfAnniversary,
                "DD.MM.YYYY"
              ).format();
              doaDate = moment(dateOfAnniversary).format("DD");
              doaMonth = moment(dateOfAnniversary).format("MM");
              doayear = moment(dateOfAnniversary).format("YYYY");
            }
            const body = {
              type: "Birthday",
              meta: {
                ...dataObject,
                dateOfBirthday: dateOfBirthday,
                dd: dd,
                mm: mm,
                year: year,
                dob: {
                  dd: dobDate,
                  mm: dobMonth,
                  year: dobyear,
                },
                dateOfAnniversary: dateOfAnniversary,
                doa: {
                  dd: doaDate,
                  mm: doaMonth,
                  year: doayear,
                },
                yetToCalled: true,
              },
            };

            api.addOccassion({ ...body }).then((response) => {
              if (response.ok) {
                console.log(
                  "birthday Occassion created successfully",
                  response
                );
                toast.success("Ocassion Added Successfully", {
                  autoClose: 1250,
                  closeButton: false,
                });
              } else {
                console.log("Something wrongin birthday", response);
                alert("Something Wrong in birthday");
              }
            });
          }
          // if (dataObject.dateOfAnniversary) {
          //   const date = new Date(dataObject.dateOfBirthday)
          //   if (date != 'Invalid Date') {
          //     api
          //       .addOccassion({
          //         type: 'Anniversary',
          //         meta: {
          //           ...dataObject,
          //           dateOfAnniversary: date,
          //           dd: date.getDate(),
          //           mm: date.getMonth(),
          //           year: date.getFullYear(),
          //           yetToCalled: true,
          //         },
          //       })
          //       .then((response) => {
          //         if (response.ok) {
          //           console.log(
          //             'Anniversary Occassion created successfully',
          //             response
          //           )
          //         } else {
          //           console.log('Something wrong inAnniversary ', response)
          //           alert('Something Wrong in Anniversary')
          //         }
          //       })
          //   }
          // }
        });
      }
    };

    reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsBinaryString(selectedFile);
  };

  SheetJSFT = () =>
    [
      "xlsx",
      "xlsb",
      "xlsm",
      "xls",
      "xml",
      "csv",
      "txt",
      "ods",
      "fods",
      "uos",
      "sylk",
      "dif",
      "dbf",
      "prn",
      "qpw",
      "123",
      "wb*",
      "wq*",
      "html",
      "htm",
    ]
      .map(function (x) {
        return "." + x;
      })
      .join(",");

  showCalender = () => {
    var showCalender = document.getElementById("calender");
    if (showCalender.style.display === "block") {
      showCalender.style.display = "none";
    } else {
      showCalender.style.display = "block";
    }
  };

  renderBirthday(handleSubmit) {
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
              />
              <p className="TxtHeading" style={{ width: "90%" }}>
                Occasion
              </p>
              {/*!this.state.isUpdateRequest?
              <button
                type="button"
                style={{
                  float: "right",
                  backgroundColor: "white",
                  boxShadow: "0 0 6px rgb(0,0,0,0)",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginBottom: "0px",
                  }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.importFile}
                    accept={this.SheetJSFT()}
                  />
                  <p style={{ margin: "0px", marginRight: "8px" }}>Import</p>
                  <img src={importIcon} alt="" className="ImgTabIcon" />
                </label>
              </button>
            </div>*/}
            </div>
            <div className="FormFrame">
              <form onSubmit={handleSubmit}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="InputFrame"
                  value={this.state.name}
                  placeholder="Please enter Name"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ name: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.name}
                </span>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Designation</p>
                  <p className="TxtStar">*</p>
                </div>
                <Typeahead
                  labelKey="name"
                  style={{ marginBottom: "30px" }}
                  onChange={(event) => {
                    this.setState(
                      { designation: event[0].name },
                      console.log(event[0].name, "event")
                    );
                  }}
                  inputProps={{ required: true }}
                  options={this.state.designations}
                  //selected={this.state.designation}
                  defaultInputValue={this.state.designation}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">House</p>
                  <p className="TxtStar">*</p>
                </div>
                <Typeahead
                  labelKey="name"
                  style={{ marginBottom: "30px" }}
                  onChange={(event) => {
                    this.setState(
                      { house: event[0].name },
                      console.log("House", event[0].name)
                    );
                  }}
                  inputProps={{ required: true }}
                  options={this.state.houses}
                  //selected={this.state.house}
                  defaultInputValue={this.state.house}
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">Department</p>
                </div>
                <input
                  type="text"
                  id="department"
                  placeholder="Please enter Department"
                  className="InputFrame"
                  value={this.state.department}
                  onChange={(e) => {
                    this.setState({ department: e.target.value });
                  }}
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">State</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="address"
                  name="state"
                  className="InputFrame"
                  value={this.state.state}
                  placeholder="Please enter Address"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ state: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.state}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Constituency</p>
                </div>
                <input
                  type="text"
                  id="address"
                  className="InputFrame"
                  value={this.state.constituency}
                  placeholder="Please enter Address"
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ constituency: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Party</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="address"
                  name="party"
                  className="InputFrame"
                  value={this.state.party}
                  placeholder="Please enter Address"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ party: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.party}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date of Marriage</p>
                </div>
                <input
                  type="text"
                  id="dateOfMarriage"
                  className="InputFrame"
                  value={
                    this.state.dateOfAnniversary === ""
                      ? ""
                      : new Date(this.state.dateOfAnniversary)
                  }
                  placeholder="Please Select Anniversary date"
                  onClick={() => this.showCalender()}
                />
                <div
                  id="calender"
                  className="calenderDiv"
                  // style={{
                  //   display: "none",
                  //   position: "absolute",
                  //   left: "0px",
                  //   zIndex: "1",
                  // }}
                >
                  {/* <Calendar
                    onChange={(date) => {
                      console.log("calender date", date);
                      this.setState({ dateOfAnniversary: date }, () =>
                        this.showCalender()
                      );
                    }}
                    date={this.state.date}
                    color="#2f2d64"
                  /> */}
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    required
                    placeholderText="Pick from calendar view"
                    className="InputFrame"
                    selected={this.state.dateOfAnniversary}
                    onChange={(date) => {
                      console.log("date picker date", date);
                      let errors = this.state.errors;
                      if (
                        getYear(date).toString().length == 4 &&
                        date <= new Date()
                      ) {
                        errors.dateOfAnniversary = "";
                        this.setState({ dateOfAnniversary: date, errors });
                      } else {
                        errors.dateOfAnniversary = "Invalid Date of Marriage";
                        this.setState({ errors });
                      }
                    }}
                  />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.dateOfAnniversary}
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
                    selected={this.state.dateOfBirthday}
                    onChange={(date) => {
                      let errors = this.state.errors;
                      if (
                        getYear(date).toString().length == 4 &&
                        date <= new Date()
                      ) {
                        errors.dateOfBirthday = "";
                        this.setState({ dateOfBirthday: date, errors });
                      } else {
                        errors.dateOfBirthday = "Invalid Date of Birth";
                        this.setState({ errors });
                      }
                    }}
                  />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.dateOfBirthday}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Whatsapp Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.whatsappNumber}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ whatsappNumber: e.target.value });
                    }
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Calling Number 1</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.callingNumber1}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ callingNumber1: e.target.value });
                    }
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Calling Number 2</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.callingNumber2}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ callingNumber2: e.target.value });
                    }
                  }}
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">Calling Number 3</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.callingNumber3}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ callingNumber3: e.target.value });
                    }
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Landline Number 1</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.landlineNumber1}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ landlineNumber1: e.target.value });
                    }
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Landline Number 2</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.landlineNumber2}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ landlineNumber2: e.target.value });
                    }
                  }}
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">Landline Number 3</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  value={this.state.landlineNumber3}
                  placeholder="Please enter number"
                  onChange={(e) => {
                    if (
                      (validNumberRegex.test(e.target.value) ||
                        e.target.value === "") &&
                      e.target.value.length <= 10
                    ) {
                      this.setState({ landlineNumber3: e.target.value });
                    }
                  }}
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">Email ID</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="email"
                  id="email"
                  name="emailId"
                  placeholder="Please enter email"
                  className="InputFrame"
                  value={this.state.emailId}
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ emailId: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.emailId}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Address</p>
                </div>
                <input
                  type="text"
                  id="address"
                  className="InputFrame"
                  value={this.state.address}
                  placeholder="Please enter Address"
                  onChange={(e) => {
                    this.setState({ address: e.target.value });
                  }}
                />

                {this.state.isUpdateRequest === false ? (
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
                        this.handleUpdateOccassion();
                      }}
                    >
                      Update
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          <Footer />
          <CopyrightFooter />
        </div>
        <div className="emptyDiv" />
        {this.showLoader ? (
          <Loader />
        ) : (
          console.log("show Loader", this.showLoader)
        )}
      </div>
    );
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        errors.name = value.length === 0 ? "This is a required field." : "";
        break;
      case "state":
        errors.state = value.length === 0 ? "This is a required field." : "";
        break;
      case "party":
        errors.party = value.length === 0 ? "This is a required field." : "";
        break;
      case "emailId":
        errors.emailId = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      this.showLoader = true;
      let date = new Date(this.state.dateOfBirthday);
      let doaDate = new Date(this.state.dateOfAnniversary);
      console.log("New Date", date.getFullYear());
      api
        .addOccassion({
          type: "Birthday",
          meta: {
            ...this.state,
            dd:
              date.getDate() + 1 > 9
                ? `${date.getDate()}`
                : `0${date.getDate()}`,
            mm:
              date.getMonth() + 1 > 9
                ? `${date.getMonth() + 1}`
                : `0${date.getMonth() + 1}`,
            year: `${date.getFullYear()}`,
            yetToCalled: true,
            dob: {
              dd:
                date.getDate() + 1 > 9
                  ? `${date.getDate()}`
                  : `0${date.getDate()}`,
              mm:
                date.getMonth() + 1 > 9
                  ? `${date.getMonth() + 1}`
                  : `0${date.getMonth() + 1}`,
              year: `${date.getFullYear()}`,
            },
            doa: {
              dd:
                doaDate.getDate() + 1 > 9
                  ? `${doaDate.getDate()}`
                  : `0${doaDate.getDate()}`,
              mm:
                doaDate.getMonth() + 1 > 9
                  ? `${doaDate.getMonth() + 1}`
                  : `0${doaDate.getMonth() + 1}`,
              year: `${doaDate.getFullYear()}`,
            },
          },
        })
        .then((response) => {
          if (response.ok) {
            console.log("Occassion created successfully", response);
            toast.success("Occassion Added Successfully", {
              autoClose: 1250,
              closeButton: false,
            });
            this.props.history.push({
              pathname: "/manage-occasion",
              state: {
                birthdayData: response.data.data,
                occassionType: "Birthday",
              },
            });
          } else {
            console.log("Something wrong", response);
            alert("Something Wrong");
          }
        });
    };

    return <>{this.renderBirthday(handleSubmit)}</>;

    // TODO: add a loading spinner for better UX
    return <div>Loading</div>;
  }
}
export default Birthday;
