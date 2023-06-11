import React, { Component, Fragment } from 'react'
import api from '../../../utils/api'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import { Dropdown } from 'react-bootstrap'

export default class Zila extends Component {

  constructor (props) {
    super (props) 
    this.state = {
      district : '',
      designation : '',
      districts : [],
      isLoading : true
    }
  }

  //vars to manipulate data
  district = []
  designation = [ 'Zila Pramukh', 'Zila Parishad', 'Zila Karyakarni' ]

  componentDidMount() {
    api.getConstituency({
      type : 'Zila Level',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        console.log('Successfully fetching constituency', response)
        response.data.data.rows.map( data => {
          return (
            this.district.push(data.meta.name)
          )
        } )
        this.setState({ districts : this.district })
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
                  <p className='areaValue'>{ this.state.district }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ district : '' })
                    this.props.fetchKaryakarta('Zila', '', '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.state.districts.map( district => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ district : district })
                          this.props.fetchKaryakarta('Zila', district, this.state.designation)
                        } }>{ district }</p>
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
                    this.props.fetchKaryakarta('Zila', this.state.district, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Zila', this.state.district, designation)
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


/*

pehle wale codes 

className = searchBar //parent class

<div className='karyakartaSearchBar'>
            <input className='SearchInput' placeholder='Select District' value = { this.state.district }></input>
            <img src={dropDownArrow} alt='' className='SearchIcon' />
          </div>

                    <div className='karyakartaSearchBar'>
            <input className='SearchInput' placeholder='Search Designation'></input>
            <img src={dropDownArrow} alt='' className='SearchIcon' />
          </div>
*/