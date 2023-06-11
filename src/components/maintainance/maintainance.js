import React from "react";
import { Component } from "react";
import SahyogiLogo from "../../utils/images/esahyogiblue.svg";
import MaintainanceLogo from "../../utils/images/maintainance.svg";
import "./maintainance.css";

class Maintainance extends Component {
  render() {
    return (
      <div className="BackgroundHomeframe">
        <div className="frame2">
          <div className="FormOuterFrame">
            <div
              className="DivHeading"
              style={{ justifyContent: "center", marginTop: "80px" }}
            >
              <img src={SahyogiLogo} className="ImgeSahyogi"></img>
            </div>
            <div className="FormFrame" style={{ padding: "85px 20px" }}>
              <div className="maintainanceMsg">
                <img src={MaintainanceLogo} className="maintainanceImg"></img>
              </div>
              <div className="msg">
                <h1 className="maintainanceHeader">
                  The site is currently down for maintenance
                </h1>
                <h2 className="maintainanceSubHeader">
                  Service is expected to resume in an hour
                </h2>
                <p className="maintainancePara">
                  We apologise for any inconvenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Maintainance;
