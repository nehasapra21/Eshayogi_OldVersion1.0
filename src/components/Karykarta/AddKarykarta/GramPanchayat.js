import React, { Component, Fragment } from 'react'

import { Typeahead } from 'react-bootstrap-typeahead'
import api from '../../../utils/api'

export default class GramPanchayat extends Component {

  constructor(props) {
    super(props)

    if (this.props.history.location.state) {
      let karyakartaData = this.props.history.location.state.karyakartaData

      this.state = {
        gramPanchayat : karyakartaData.gramPanchayat,
        designation : karyakartaData.designation,
        revenueVillage : karyakartaData.revenueVillage,
        category : karyakartaData.category,
        isUpdate : true
      }
    } else {
      this.state = {
        gramPanchayat : '',
        designation : '',
        category : '',
        revenueVillage : '',
        isUpdate : false
      }
    }
  }

  panchayat = []
  revenueVillages = []

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
            this.panchayat.push(wonderer.meta.name)
          ))
        }
      }
    )

    api.getConstituencyData({
      type : 'Revenue Villages',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        if(response.ok) {
          console.log('Successfully fetch constituency', response)
          response.data.data.rows.map( wonderer => (
            this.revenueVillages.push(wonderer.meta.name)
          ))
        }
      }
    )
  }

  render() {

    let designation = [ 'Sarpanch', 'Up Sarpanch', 'Ex. Sarpanch', 'Ward Panch', 'Gram Sevak', 'Gram Panchayat Coordinator', 'Gram Panchayat Co-Coordinator', 'Related ZP Member', 'Related PS Member', 'Gram Panchayat Karyakarta' ]

    let category = [ 'A', 'B', 'C' ]

    return (
      <Fragment>
        <div>
          <p className="TxtInput">Select Gram Panchayat</p>
          <Typeahead
              id = 'panchayat'
              labelKey = 'panchayat'
              placeholder = 'Select a panchayat'
              onChange = { (panchayat) => this.setState({ gramPanchayat : panchayat[0] }) }
              options = { this.panchayat }
              defaultInputValue = { this.state.gramPanchayat }
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
        <div>
          <p className="TxtInput">Category</p>
          <Typeahead
              id = 'category'
              labelKey = 'category'
              placeholder = 'Select category'
              onChange = { (category) => this.setState({ category : category[0] }) }
              options = { category }
              defaultInputValue = { this.state.category }
            />
        </div>
        <div>
          <p className="TxtInput">Revenue Villages</p>
          <Typeahead
              id = 'revenueVillage'
              labelKey = 'revenueVillage'
              placeholder = 'Select revenueVillage'
              onChange = { (revenueVillage) => this.setState({ revenueVillage : revenueVillage[0] }) }
              options = { this.revenueVillages }
              defaultInputValue = { this.state.revenueVillage }
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
