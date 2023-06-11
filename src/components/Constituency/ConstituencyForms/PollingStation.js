import React, { Component, Fragment } from 'react'
import api from '../../../utils/api'
import { Typeahead } from 'react-bootstrap-typeahead'
import warningLogo from '../../../utils/images/warningLogo.png'

export default class PollingStation extends Component {
  constructor(props) {
    super(props)

    if (this.props.data !== undefined) {
      this.state = {
        name: this?.props?.data?.data?.meta?.name || '',
      }
    } else {
      this.state = {
        name: '',
        updateConstData: false,
      }
    }
  }

  showWarning = false

  showConfirmBox = false

  render() {
    return (
      <Fragment>
        {this.showWarning ? (
          <div className="warningMsg">
            <div className="warningHead">
              <img className="warningLogo" src={warningLogo} alt=""></img>
              <p>Warning</p>
            </div>
            <p className="warningTxt">
              Please Make atleast one District / Vidhan Sabha / Mandal /
              Panchayat Samiti
            </p>
          </div>
        ) : (
          <Fragment>
            <form
              onSubmit={(e) => {
                this.props.getConstituencyData(e, this.state)
              }}
            >
              <div className="TxtInputFrame">
                <p className="TxtInput">Polling Station</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                className="InputFrame"
                placeholder="Please enter Polling Station"
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              {this.state.updateConstData ? (
                <input
                  type="submit"
                  value="Update"
                  className="BtnSubmit"
                  onClick={() => {
                    this.showConfirmBox = true
                  }}
                />
              ) : (
                <input
                  type="submit"
                  value="Submit"
                  className="BtnSubmit"
                  onClick={() => {
                    this.showConfirmBox = true
                  }}
                />
              )}
            </form>
            {/* {
              this.showConfirmBox ? this.state.updateConstData ?
              <ConstituencyAlert msg = 'Gram Panchayat Updated' showConfirmBox = { this.showConfirmBox } location = {'/manage-constituency'} /> : 
              <ConstituencyAlert msg = 'Gram Panchayat Created' showConfirmBox = { this.showConfirmBox } location = {'/add-constituency'} /> :
              null
            } */}
          </Fragment>
        )}
      </Fragment>
    )
  }
}
