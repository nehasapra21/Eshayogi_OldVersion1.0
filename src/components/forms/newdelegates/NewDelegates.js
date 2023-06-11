import React, { Component } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CopyrightFooter from "../../footer/CopyrightFooter";
import "../newclient/NewClient.css";
import { Helmet } from "react-helmet";
import api from ".././../../utils/api";
import { toast } from "react-toastify";
import { validEmailRegex } from "../../../utils/validations";

class NewDelegate extends Component {
  constructor(props) {
    super(props);

    const { orgId, byUser } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;

    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      mobilenumber: "",
      status: "active",
      orgId,
      byUser,
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        mobilenumber: "",
      },
    };
  }

  componentDidMount() {}

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
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  createNewDelegate(delegateDetails) {
    console.log("trying to create delegate with values ", delegateDetails);
    const {
      firstname,
      lastname,
      email,
      mobilenumber,
      status,
      byUser,
      orgId,
    } = delegateDetails;

    api
      .createDelegate({
        firstName: firstname,
        lastName: lastname,
        emailId: email,
        mobileNumber: mobilenumber,
        status: "true",
        byUser,
        orgId,
      })
      .then(
        (response) => {
          if (response.ok) {
            toast.success("Delegate Saved Successfully");
            this.props.history.push("/dashboard");
            return;
          }

          toast.error("Error Occured");
        },
        (err) => {
          toast.error("Unkonwn Error");
        }
      );
  }

  renderNewDelegateForm(handleSubmit) {
    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="TxtHeading">New Delegates</p>
            </div>
            <div className="FormFrame">
              <form onSubmit={handleSubmit}>
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
                  maxLength="25"
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
                  maxLength="25"
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
                  <p className="TxtInput">Email ID</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter the email"
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
                  <p className="TxtInput">Mobile Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="number"
                  id="mobilenumber"
                  name="mobilenumber"
                  className="InputFrame"
                  placeholder="Please enter the mobile number"
                  value={this.state.mobilenumber}
                  maxLength="10"
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
                  <p className="TxtInput">Status</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: "active" })}
                    >
                      <span
                        className={
                          this.state.status === "active"
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
                      onClick={() => this.setState({ status: "inactive" })}
                    >
                      <span
                        className={
                          this.state.status === "inactive"
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
    );
  }
  render() {
    const { orgId } = this.state;
    const handleSubmit = (event) => {
      event.preventDefault();
      this.createNewDelegate(this.state);
    };

    if (orgId) {
      return (
        <>
          <Helmet>
            <title>New Delegate</title>
          </Helmet>
          {this.renderNewDelegateForm(handleSubmit)}
        </>
      );
    }
    // TODO: add a loading spinner for better UX
    return <div>Loading</div>;
  }
}
export default NewDelegate;
