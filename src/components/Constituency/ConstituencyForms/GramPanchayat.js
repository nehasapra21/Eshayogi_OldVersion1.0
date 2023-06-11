import React, { Component, Fragment } from 'react'
import api from '../../../utils/api'
import ConstituencyAlert from './constituencyAlert'
import { Typeahead } from 'react-bootstrap-typeahead'
import warningLogo from '../../../utils/images/warningLogo.png'

export default class GramPanchayat extends Component {
  constructor(props) {
    super(props)

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        pollingStation: this?.props?.data?.data?.meta?.pollingStation || '',
        district: this.props.data.data.meta.district,
        vidhanSabha: this.props.data.data.meta.vidhanSabha,
        updateConstData: this.props.data.updateConstData,
      }
    } else {
      this.state = {
        name: '',
        pollingStation: '',
        district: '',
        vidhanSabha: '',
        updateConstdistrict: false,
      }
    }
  }

  district = []
  vidhanSabha = []
  pollingStation = []
  showVidhanSabha = false
  showWarning = false

  componentDidMount() {
    //Fetch district

    this.fetchPollingStation()

    api
      .getConstituencyData({
        type: 'Zila Level',
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
              this.district.includes(wonderer.meta.name)
                ? null
                : this.district.push(wonderer.meta.name)
            )
          }
        }
      })
  }

  fetchVidhanSabha = (district) => {
    console.log('ab ye karke dikhao', district)
    this.vidhanSabha = []
    api
      .getConstituencyData({
        type: 'Vidhan Sabha',
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
              wonderer.meta.district === district
                ? this.vidhanSabha.includes(wonderer.meta.name)
                  ? null
                  : this.vidhanSabha.push(wonderer.meta.name)
                : null
            )
          }
          this.showVidhanSabha = true
        }
      })
  }

  fetchPollingStation = () => {
    api
      .getConstituencyData({
        type: 'Polling Station',
        limit: '1000',
        offset: '0',
        status: true,
      })
      .then((response) => {
        if (response.ok) {
          const { data } = response
          if (data?.data?.rows) {
            let polSta = [...data?.data?.rows]

            let temp = []
            polSta.map((obj) => {
              this.pollingStation.push(obj?.meta?.name)
            })
          }

          // if (response.data.data === undefined) {
          //   this.showWarning = true
          // } else {
          //   response.data.data.rows.map((wonderer) =>
          //     wonderer.meta.district === district
          //       ? this.vidhanSabha.includes(wonderer.meta.name)
          //         ? null
          //         : this.vidhanSabha.push(wonderer.meta.name)
          //       : null
          //   )
          // }
          this.showVidhanSabha = true
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
                <p className="TxtInput">Gram Panchayat</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                className="InputFrame"
                placeholder="Please enter Gram Panchayat"
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              <div className="TxtInputFrame">
                <p className="TxtInput">Polling Station</p>
                <p className="TxtStar">*</p>
              </div>
              <Typeahead
                id="pollingStation"
                labelKey="pollingStation"
                placeholder="Please select a Polling Station"
                onChange={(pollStation) => {
                  this.setState({ pollingStation: pollStation[0] })
                }}
                options={this.pollingStation}
                defaultInputValue={this.state.pollingStation}
              />

              <div className="TxtInputFrame" style={{ marginTop: '30px' }}>
                <p className="TxtInput">District</p>
                <p className="TxtStar">*</p>
              </div>
              <Typeahead
                id="district"
                labelKey="district"
                placeholder="Please select a District"
                onChange={(district) => {
                  this.setState({ district: district[0] })
                  this.fetchVidhanSabha(district[0])
                  this.showVidhanSabha = true
                }}
                options={this.district}
                defaultInputValue={this.state.district}
              />
              {this.showVidhanSabha ? (
                <Fragment>
                  <div className="TxtInputFrame" style={{ marginTop: '30px' }}>
                    <p className="TxtInput">Vidhan Sabha</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <Typeahead
                    id="vidhanSabha"
                    labelKey="vidhanSabha"
                    placeholder="Please select a Vidhan Sabha"
                    onChange={(vidhanSabha) => {
                      this.setState({ vidhanSabha: vidhanSabha[0] })
                    }}
                    options={this.vidhanSabha}
                    defaultInputValue={this.state.vidhanSabha}
                  />
                </Fragment>
              ) : null}

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
