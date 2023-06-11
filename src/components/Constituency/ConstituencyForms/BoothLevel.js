import React, { Component, Fragment } from 'react'
import api from '../../../utils/api'
import ConstituencyAlert from './constituencyAlert'
import { Typeahead } from 'react-bootstrap-typeahead'
import warningLogo from '../../../utils/images/warningLogo.png'

export default class BoothLevel extends Component {
  constructor(props) {
    super(props)

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        number: this.props.data.data.meta.number,
        gramPanchayat: this.props.data.data.meta.gramPanchayat,
        updateConstData: this.props.data.updateConstData,
      }
    } else {
      this.state = {
        name: '',
        number: '',
        gramPanchayat: '',
        updateConstdistrict: false,
      }
    }
  }

  gramPanchayat = []
  showWarning = false

  componentDidMount() {
    api
      .getConstituencyData({
        type: 'Mandal Level',
        limit: '1000',
        offset: '0',
        status: true,
      })
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetch constituency', response)
          if (response.data.data === undefined) {
            this.showWarning = true
          } else {
            response.data.data.rows.map((wonderer) =>
              this.gramPanchayat.includes(wonderer.meta.name)
                ? null
                : this.gramPanchayat.push(wonderer.meta.name)
            )
          }
        }
      })
  }

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
            <p className="warningTxt">Please Make atleast one Gram Panchayat</p>
          </div>
        ) : (
          <Fragment>
            <form
              onSubmit={(e) => {
                this.props.getConstituencyData(e, this.state)
              }}
            >
              <div className="TxtInputFrame">
                <p className="TxtInput">Name</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                className="InputFrame"
                placeholder="Please enter booth name"
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              <div className="TxtInputFrame">
                <p className="TxtInput">Number</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="number"
                className="InputFrame"
                placeholder="Please enter Booth Number"
                onChange={(e) => this.setState({ number: e.target.value })}
                value={this.state.number}
                required
              />

              <div className="TxtInputFrame">
                <p className="TxtInput">Mandal</p>
                <p className="TxtStar">*</p>
              </div>
              <Typeahead
                id="gramPanchayat"
                labelKey="gramPanchayat"
                placeholder="Please select a Gram Panchayat"
                onChange={(gramPanchayat) =>
                  this.setState({ gramPanchayat: gramPanchayat[0] })
                }
                options={this.gramPanchayat}
                defaultInputValue={this.state.gramPanchayat}
              />

              {this.state.updateConstData ? (
                <input
                  type="submit"
                  value="Update"
                  className="BtnSubmit"
                  onClick={() => {
                    console.log('Enters Function')
                    this.showConfirmBox = true
                  }}
                />
              ) : (
                <input
                  type="submit"
                  value="Submit"
                  className="BtnSubmit"
                  onClick={() => {
                    console.log('Enters Function')
                    this.showConfirmBox = true
                  }}
                />
              )}
            </form>
            {this.showConfirmBox ? (
              this.state.updateConstData ? (
                <ConstituencyAlert
                  msg="Booth Level Updated"
                  showConfirmBox={this.showConfirmBox}
                  location={'/manage-constituency'}
                />
              ) : (
                <ConstituencyAlert
                  msg="Booth Level Created"
                  showConfirmBox={this.showConfirmBox}
                  location={'/add-constituency'}
                />
              )
            ) : null}
          </Fragment>
        )}
      </Fragment>
    )
  }
}
