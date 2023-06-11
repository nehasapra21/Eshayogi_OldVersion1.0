import React, { Component, Fragment } from 'react'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import api from '../../../utils/api'
import { Dropdown } from 'react-bootstrap'

export default class GramPanchayat extends Component {

  constructor (props) {
    super (props)
    this.state = {
      panchayat : '',
      desigantion : '',
      panchayats : []
    }
  }

  panchayat = [ 'Gram_Panchayat_0016E0bd', 'Gram_Panchayat_0016E0bd', 'Gram_Panchayat_0016E0bd' ]

  designation = [ 'Sarpanch', 'Up Sarpanch', 'Ex. Sarpanch', 'Ward Panch', 'Gram Sevak', 'Gram Panchayat Coordinator', 'Gram Panchayat Co-Coordinator', 'Related ZP Member', 'Related PS Member', 'Gram Panchayat Karyakarta' ]

  componentDidMount() {
    api.getConstituency({
      type : 'Gram Panchayat',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        console.log('Successfully fetching constituency', response)
        response.data.data.rows.map( data => {
          return (
            this.panchayat.push(data.meta.name)
          )
        } )
        this.setState({ panchayats : this.panchayat })
      }
    )
  }

  render() {
    return (
      <Fragment>
        <div className='SearchBar'>
          <Dropdown className='areaDropdown'>
            <div className='karyakartaSearchBar'>
              <Dropdown.Toggle>
                <span>
                  <p className='areaValue'>{ this.state.panchayat }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ panchayat : '' })
                    this.props.fetchKaryakarta('Gram Panchayat', '', this.state.designation)
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.state.panchayats.map( panchayat => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ panchayat : panchayat })
                          this.props.fetchKaryakarta('Gram Panchayat', panchayat, this.state.designation)
                        } }>{ panchayat }</p>
                      </Dropdown.Item>
                    )
                  } )
                }
              </Dropdown.Menu>
            </div>
          </Dropdown>
        </div>
        <div className='SearchBar'>
          <Dropdown className='areaDropdown'>
            <div className='karyakartaSearchBar'>
              <Dropdown.Toggle>
                <span>
                  <p className='areaValue'>{ this.state.designation }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ designation : '' })
                    this.props.fetchKaryakarta('Gram Panchayat', this.state.panchayat, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Gram Panchayat', this.state.panchayat, designation)
                        } }>{ designation }</p>
                      </Dropdown.Item>
                    )
                  } )
                }
              </Dropdown.Menu>
            </div>
          </Dropdown>
        </div>
      </Fragment>
    )
  }
}
