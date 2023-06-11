import React, { Component, Fragment } from 'react'

import { Typeahead } from 'react-bootstrap-typeahead'
import api from '../../../utils/api'

export default class Mandal extends Component {

  constructor(props) {
    super(props)
    console.log('karyakarta data recieved', this.props)
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

  mandal = []

  designation = [ 'Mandal Mantri', 'Mandal Mahamantri', 'Mandal Shakti Kendra Prabhari', 'Mandal Coordinator', 'Mandal Co-Coordinator', 'Mandal Adhyaksh', 'Mandal Up-Adhyaksh', 'Mandal Karyakarni', 'Treasurer', 'Media Incharge', 'Office Incharge', 'Spokesperson' ]

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
            this.mandal.push(wonderer.meta.name)
          ))
        }
      }
    )
  }

  render() {

    return (
      <Fragment>
        <div>
          <p className="TxtInput">Select Mandal</p>
          <Typeahead
              id = 'mandal'
              labelKey = 'mandal'
              placeholder = 'Select a mandal'
              onChange = { (mandal) => this.setState({ district : mandal[0] }) }
              options = { this.mandal }
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
              options = { this.designation }
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
