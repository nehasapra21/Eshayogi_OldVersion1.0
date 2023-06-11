import React, { Component } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CopyrightFooter from "../../footer/CopyrightFooter";
import "../newclient/NewClient.css";
import { Helmet } from "react-helmet";
import api from ".././../../utils/api";
import Trash from "../../../utils/images/trash.svg";
import Attach from "../../../utils/images/attach.svg";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { validEmailRegex, getYear } from "../../../utils/validations";

class NewAddressee extends Component {
  constructor(props) {
    super(props);

    const { orgId, byUser } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;

    this.state = {
      firstname: "",
      lastname: "",
      designation: "",
      responsibilities: "",
      department: "",
      email: "",
      mobilenumber: "",
      password: "",
      startdate: "",
      enddate: "",
      status: true,
      ImageFormData: new FormData(),
      image: null,
      orgId: orgId,
      byUser: byUser,
      passwordType: "password",
      errors: {
        firstname: "",
        lastname: "",
        mobilenumber: "",
        email: "",
        password: "",
        designation: "",
        responsibilities: "",
        department: "",
        startdate: "",
        enddate: ""
      },
    };
    this.ref = React.createRef();
  }
  onFileChange = (event) => {
    let file = event.target.files[0];
    if (file.size < 1048576) {
      this.setState({ image: file });
    } else {
      toast.error("File Size Exceeds");
    }
  };

  fileData = () => {
    if (this.state.image) {
      return (
        <div className="SelectedItemFrame">
          <img
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={(e) => {
              this.setState({ image: null });
            }}
          />
          <p className="TxtBrowse">{this.state.image.name}</p>
        </div>
      );
    }
  };

  componentDidMount() { }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstname":
        errors.firstname =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "lastname":
        errors.lastname = value.length === 0 ? "This is a required field." : "";
        break;
      case "mobilenumber":
        errors.mobilenumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password = value.length === 0 ? "This is a required field." : "";
        break;
      case "designation":
        errors.designation =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "responsibilities":
        errors.responsibilities =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "department":
        errors.department =
          value.length === 0 ? "This is a required field." : "";
        break;

      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  handleEyeClick = () => {
    if (this.state.passwordType === "password") {
      this.setState({ passwordType: "text" });
    } else {
      this.setState({ passwordType: "password" });
    }
  };

  createNewAddressee(addresseeDetails) {
    let imageData = "";
    async function Main(props) {
      const {
        firstname,
        lastname,
        email,
        mobilenumber,
        startdate,
        department,
        designation,
        responsibilities,
        enddate,
        status,
        byUser,
        orgId,
        image,
        ImageFormData,
        password,
      } = addresseeDetails;

      if (image) {
        ImageFormData.append("file", image);

        await api.uploadFile(ImageFormData).then(
          (response) => {
            if (response.ok) {
              imageData = response.data.data;
            } else {
              console.log(response);
            }
          },
          (err) => {
            console.log("err", err);
          }
        );
      }

      api
        .createAddressee({
          firstName: firstname,
          lastName: lastname,
          responsibility: responsibilities,
          mobileNumber: mobilenumber,
          emailId: email,
          designation,
          department,
          password,
          image: imageData,
          status: status,
          orgId: orgId,
          byUser: byUser,
        })
        .then(
          (response) => {
            if (response.ok) {
              toast.success("Addressee Saved Successfully");
              props.history.push("/dashboard");
              return;
            }
            console.log(response);
            toast.error("Error Occured");
          },
          (err) => {
            console.log(err);
            toast.error("Unkonwn Error");
          }
        );
    }
    Main(this.props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.createNewAddressee(this.state);
  };

  render() {
    const { orgId } = this.state;
    console.log(this.state.startdate);

    if (orgId) {
      return (
        <>
          <Helmet>
            <title>New Addressee</title>
          </Helmet>
          <div className="NewClientForm">
            <Header />
            <div className="frame">
              <div className="FormOuterFrame">
                <div className="DivHeading">
                  <p className="TxtHeading">New Addressee</p>
                </div>
                <div className="FormFrame">
                  <form onSubmit={this.handleSubmit}>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">First Name</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="InputFrame"
                      placeholder="Please enter first name"
                      value={this.state.firstname}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ firstname: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.firstname}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Last Name</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="InputFrame"
                      value={this.state.lastname}
                      placeholder="Please enter last name"
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ lastname: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.lastname}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Mobile Number</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="number"
                      id="mobilenumber"
                      name="mobilenumber"
                      className="InputFrame"
                      maxLength="10"
                      minLength="10"
                      placeholder="Please enter mobile number"
                      value={this.state.mobilenumber}
                      required
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          this.handleChange(e);
                          this.setState({ mobilenumber: e.target.value });
                        }
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.mobilenumber}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Email ID</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Please enter email"
                      className="InputFrame"
                      value={this.state.email}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ email: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.email}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Password</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      style={{ marginBottom: "10px" }}
                      id="password"
                      name="password"
                      type={this.state.passwordType}
                      className="InputFrame"
                      placeholder="Please enter password"
                      value={this.state.password}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ password: e.target.value });
                      }}
                    />
                    <FontAwesomeIcon
                      className="eye-button2"
                      onClick={this.handleEyeClick}
                      icon={faEye}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.password}
                    </span>

                    <p className="TxtInput">
                      Addressee Image <span>(max size : 1 Mb)</span>
                    </p>
                    {this.fileData()}
                    <input
                      type="file"
                      onChange={this.onFileChange}
                      ref={this.ref}
                      className="FileInput"
                    />
                    <div
                      className="SelectFile"
                      onClick={() => {
                        this.ref.current.click();
                      }}
                    >
                      <img src={Attach} alt="" className="AttachFile" />
                      <p className="TxtBrowse">Browse Files</p>
                    </div>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Designation</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="lastname"
                      name="designation"
                      className="InputFrame"
                      placeholder="Please enter designation"
                      value={this.state.designation}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ designation: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.designation}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Responsibilities</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="lastname"
                      name="responsibilities"
                      className="InputFrame"
                      placeholder="Please enter responsibilities"
                      value={this.state.responsibilities}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ responsibilities: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.responsibilities}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Department</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="lastname"
                      name="department"
                      className="InputFrame"
                      placeholder="Please enter department"
                      value={this.state.department}
                      required
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ department: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.department}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Start Date</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <div>
                      <DatePicker
                        placeholder="Pick from calendar view"
                        className="InputFrame"
                        required
                        selected={this.state.startdate}
                        onChange={(date) => {
                          let errors = this.state.errors;
                          if (getYear(date).toString().length == 4) {
                            errors.startdate = "";
                            this.setState({ startdate: date, errors });
                          } else {
                            errors.startdate = "Invalid Year";
                            this.setState({ errors });
                          }
                        }}
                      />
                    </div>
                    <span className="validation-error-message">
                      {this.state.errors.startdate}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">End Date</p>
                      {/* <p className="TxtStar">*</p> */}
                    </div>
                    <div>
                      <DatePicker
                        placeholder="Pick from calendar view"
                        className="InputFrame"
                        minDate={this.state.startdate}
                        selected={this.state.enddate}
                        onChange={(date) => {
                          let errors = this.state.errors;
                          if (getYear(date).toString().length == 4) {
                            errors.enddate = "";
                            this.setState({ enddate: date, errors });
                          } else {
                            errors.enddate = "Invalid Year";
                            this.setState({ errors });
                          }
                        }}
                      />
                    </div>
                    <span className="validation-error-message">
                      {this.state.errors.enddate}
                    </span>

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Status</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <div style={{ marginBottom: "30px" }}>
                      <div className="SelectRadio">
                        <label
                          className="radiobutton"
                          onClick={() => this.setState({ status: true })}
                        >
                          <span
                            className={
                              this.state.status === true
                                ? "checked"
                                : "unchecked"
                            }
                          />
                        </label>
                        <p className="TxtRadioInput">Active</p>
                      </div>
                      <div className="SelectRadio">
                        <label
                          className="radiobutton"
                          onClick={() => this.setState({ status: false })}
                        >
                          <span
                            className={
                              this.state.status === false
                                ? "checked"
                                : "unchecked"
                            }
                          />
                        </label>
                        <p className="TxtRadioInput">Inactive</p>
                      </div>
                    </div>

                    <input type="submit" value="Submit" className="BtnSubmit" />
                  </form>
                </div>
              </div>
              <Footer />
              <CopyrightFooter />
            </div>
            <div className="emptyDiv" />
          </div>
        </>
      );
    }
    // TODO: add a loading spinner for better UX
    return <div>Loading</div>;
  }
}
export default NewAddressee;
