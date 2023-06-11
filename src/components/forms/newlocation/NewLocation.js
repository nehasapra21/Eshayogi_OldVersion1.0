import React, { Component } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CopyrightFooter from "../../footer/CopyrightFooter";
import "../newclient/NewClient.css";
import { Helmet } from "react-helmet";
import api from ".././../../utils/api";
import moment from "moment";
import { toast } from "react-toastify";
import { getYear } from "../../../utils/validations";

import DatePicker from "react-datepicker";

class Location extends Component {
  constructor(props) {
    super(props);

    const { orgId, byUser } = JSON.parse(
      localStorage.getItem("eSahyogiUser")
    ).data;

    this.state = {
      nickName: "",
      address: "",
      startdate: "",
      enddate: "",
      orgId: orgId,
      byUser: byUser,
      errors: {
        nickName: "",
        address: "",
        startdate: "",
        enddate: ""
      },
    };
  }

  componentDidMount() { }

  createLocation(locationDetails) {
    const {
      nickName,
      address,
      orgId,
      startdate,
      enddate,
      byUser,
    } = locationDetails;

    api
      .createLocation({
        name: nickName,
        startDate: startdate,
        endDate: enddate,
        address,
        orgId: orgId,
        byUser: byUser,
      })
      .then(
        (response) => {
          if (response.ok) {
            toast.success("Location Saved Successfully");
            this.props.history.push("/search-database");
            return;
          }

          toast.error("Error Occured");
        },
        (err) => {
          toast.error("Unkonwn Error");
        }
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.createLocation(this.state);
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "nickName":
        errors.nickName = value.length === 0 ? "This is a required field." : "";
        break;
      case "address":
        errors.address = value.length === 0 ? "This is a required field." : "";
        break;
      default:
        break;
    }

    this.setState({ errors }, () => {
      console.log(errors);
    });
  };

  render() {
    const { orgId } = this.state;

    if (orgId) {
      return (
        <>
          <Helmet>
            <title>Location</title>
          </Helmet>

          <div className="NewClientForm">
            <Header />
            <div className="frame">
              <div className="FormOuterFrame">
                <div className="DivHeading">
                  <p className="TxtHeading">New Office Location</p>
                </div>
                <div className="FormFrame">
                  <form onSubmit={this.handleSubmit}>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">Office Nick Name</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      id="nickname"
                      name="nickName"
                      className="InputFrame"
                      placeholder="Please enter nick name"
                      value={this.state.nickName}
                      required
                      maxLength="25"
                      onChange={(e) => {
                        this.handleChange(e);
                        this.setState({ nickName: e.target.value });
                      }}
                    />
                    <span className="validation-error-message">
                      {this.state.errors.nickName}
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
                      placeholder="Please enter address"
                      value={this.state.address}
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
                      <p className="TxtInput">Start Date</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <div>
                      <DatePicker
                        required
                        placeholder="Pick from calendar view"
                        className="InputFrame"
                        minDate={moment().toDate()}
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

                    <input type="submit" value="Submit" className="BtnSubmit" />
                  </form>
                </div>
              </div>
              <div className="DashboardFooter">
                <Footer />
                <CopyrightFooter />
              </div>
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
export default Location;
