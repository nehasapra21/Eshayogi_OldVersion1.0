import React, { Component, Fragment } from 'react'

import { Typeahead } from 'react-bootstrap-typeahead'
import api from '../../../utils/api'

export default class BoothLevel extends Component {

  constructor(props) {
    super(props)

    if (this.props.history.location.state) {
      let karyakartaData = this.props.history.location.state.karyakartaData

      this.state = {
        district : karyakartaData.district,
        designation : karyakartaData.designation,
        isUpdate : true
      }
    } else {
      this.state = {
        district : '',              //only for api convinience mandal => district
        designation : '',
        isUpdate : false
      }
    }
  }

  booth = []

  componentDidMount() {
    api.getConstituencyData({
      type : this.props.constituencyType,
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        if(response.ok) {
          console.log('Successfully fetch constituency', response)
          response.data.data.rows.map( wonderer => (
            this.booth.push(wonderer.meta.name)
          ))
        }
      }
    )
  }

  render() {

    let designation = [ 'Booth Adhyaksh', 'Booth Up-Adhyaksh', 'Booth Karyakarni', 'Booth Prabhari', 'Booth Coordinator', 'Booth Co-Coordinator' ]

    return (
      <Fragment>
        <div>
          <p className="TxtInput">Select Booth</p>
          <Typeahead
              id = 'booth'
              labelKey = 'booth'
              placeholder = 'Select a booth'
              onChange = { (booth) => this.setState({ district : booth[0] }) }
              options = { this.booth }
              defaultInputValue = { this.state.district }
            />
        </div>
        <div>
          <p className="TxtInput">Designation</p>
          <Typeahead
              id = 'designation'
              labelKey = 'designation'
              placeholder = 'Select Designation'
              onChange = { (designation) => this.setState({ designation : designation[0] }) }
              options = { designation }
              defaultInputValue = { this.state.designation }
            />
        </div>
        {
          this.state.isUpdate ? 
          <input type="submit" value="Update" className="BtnSubmit" onClick={ (e) => this.props.updateKaryakarta(e, this.state) } /> : 
          <input type="submit" value="Submit" className="BtnSubmit" onClick={ (e) => this.props.getConstituency(e, this.state) } />
        }
      </Fragment>
    )
  }
}
