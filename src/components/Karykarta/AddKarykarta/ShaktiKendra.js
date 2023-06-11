import React, { Component, Fragment } from 'react'

import { Typeahead } from 'react-bootstrap-typeahead'

export default class ShaktiKendra extends Component {

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

  render() {

    let kendra = [ 'A', 'B', 'C' ]

    let designation = [ 'Shakti Kendra Prabhari', 'Shakti Kendra Sanjoyak', 'Shakti Kendra Karyakarni' ]

    return (
      <Fragment>
        <div>
          <p className="TxtInput">Select Shakti Kendra</p>
          <Typeahead
            id = 'shaktiKendra'
            labelKey = 'shaktiKendra'
            placeholder = 'Select a shaktiKendra'
            onChange = { (shaktiKendra) => this.setState({ district : shaktiKendra[0] }) }
            options = { kendra }
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
