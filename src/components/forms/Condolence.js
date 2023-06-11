import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CopyrightFooter from "../footer/CopyrightFooter";
import "./newclient/NewClient.css";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import api from "../../utils/api";
import { validEmailRegex, validNumberRegex, getYear } from "../../utils/validations";
import { toast } from "react-toastify";
class Condolence extends Component {
  constructor(props) {
    super(props);
    console.log(JSON.parse(localStorage.getItem("eSahyogiUser")).data);
    const { orgId, byUser } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;

    this.state = {
      date: "",
      dateOfDeath: "",
      nameOfDead: "",
      nameOfRelative: "",
      address: "",
      whatsappNumber: "",
      email: "",
      referenceName: "",
      errors: {
        nameOfDead: "",
        nameOfRelative: "",
        address: "",
        whatsappNumber: "",
        email: "",
        referenceName: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "nameOfDead":
        errors.nameOfDead =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "nameOfRelative":
        errors.nameOfRelative =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "address":
        errors.address = value.length === 0 ? "This is a required field." : "";
        break;
      case "whatsappNumber":
        errors.whatsappNumber =
          value.length === 0 ? "This is a required field." : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "referenceName":
        errors.referenceName =
          value.length === 0 ? "This is a required field." : "";
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  renderCondolence(handleSubmit) {
    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="TxtHeading">Condolence</p>
            </div>
            <div className="FormFrame">
              <form onSubmit={handleSubmit}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Date</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    required
                    placeholder="Pick from calendar view"
                    className="InputFrame"
                    selected={this.state.date}
                    onChange={(date) => {
                      this.setState({ date: date });
                    }}
                  />
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date Of Death</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    required
                    placeholder="Pick from calendar view"
                    className="InputFrame"
                    selected={this.state.dateOfDeath}
                    onChange={(date) => {
                      this.setState({ dateOfDeath: date });
                    }}
                  />
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Name Of Dead</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="name"
                  name="nameOfDead"
                  className="InputFrame"
                  value={this.state.nameOfDead}
                  placeholder="Please enter Name of Dead"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ nameOfDead: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.nameOfDead}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Name Of Relative</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="nameOfRelative"
                  name="nameOfRelative"
                  className="InputFrame"
                  value={this.state.nameOfRelative}
                  placeholder="Please enter Name of Relative"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ nameOfRelative: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.nameOfRelative}
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
                  value={this.state.address}
                  placeholder="Please enter Address"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ address: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.address}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">WhatsApp Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  placeholder="Please enter WhatsApp Number"
                  value={this.state.whatsappNumber}
                  required
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
                  <p className="TxtInput">Email</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="InputFrame"
                  value={this.state.email}
                  placeholder="Please Enter e-mail"
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
                  <p className="TxtInput">Reference Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="referenceName"
                  name="referenceName"
                  className="InputFrame"
                  value={this.state.referenceName}
                  placeholder="Please enter Reference Name"
                  required
                  onChange={(e) => {
                    this.handleChange(e);
                    this.setState({ referenceName: e.target.value });
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.referenceName}
                </span>

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
    const handleSubmit = (event) => {
      event.preventDefault();
      api
        .addOccassion({
          type: "Condolence",
          meta: {
            ...this.state,
          },
        })
        .then((response) => {
          console.log("Condolence response", response);
          toast.success("Condolence Added Successfully");
          this.props.history.push({
            pathname: "/confirm/condolence",
            state: {
              condolenceData: response.data.data,
            },
          });
        });
    };

    return <>{this.renderCondolence(handleSubmit)}</>;

    // TODO: add a loading spinner for better UX
    return <div>Loading</div>;
  }
}
export default Condolence;
