import React, { Component } from "react";
import "../footer/Footer.css";

class Footer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="Footerframe">
        <div className="DivLinks">
          <div className="InnerdivLinks">
            <p className="TxtLinkHeading"> Trust and Safety</p>
            <p className="TxtLink">
              <a className="anchor" href="/privacy-policy">
                Privacy and Data Policy
              </a>
            </p>
          </div>
          <div className="second" id="support">
            <p className="TxtLinkHeading">Support</p>
            <p className="TxtLink">
              <a className="anchor" href="/help-center">
                Help Center
              </a>
            </p>
          </div>
          <div className="third " id="other">
            <p className="TxtLinkHeading">Others</p>
            <p className="TxtLink">
              <a className="anchor" href="/user-agreement">
                User Agreement
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
