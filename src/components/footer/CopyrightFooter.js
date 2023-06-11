import React, { Component } from "react";
import "../footer/Footer.css";

class CopyrightFooter extends Component {
  render() {
    return (
      <div className="Copyrightframe">
        <p className="TxtCopyrights">
          2020 Copyright The Ideaz Factory. All rights reserved.
        </p>
        <p className="TxtCopyrights">Version 1.0</p>
      </div>
    );
  }
}
export default CopyrightFooter;
