import React, { Component, Fragment } from 'react'
import api from '../../../utils/api'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import { Dropdown } from 'react-bootstrap'

export default class VidhanSabha extends Component {

  constructor (props) {
    super (props) 
    this.state = {
      vidhanSabha : '',
      designation : '',
      sabhas : [],
      isLoading : true
    }
  }

  //vars to manipulate data
  vidhanSabha = []
  designation = [ 'Vidhan Sabha Coordinator', 'Vidhan Sabha Co-Coordinator', 'Vidhan Sabha Karyakarini' ]

  componentDidMount() {
    api.getConstituency({
      type : 'Vidhan Sabha',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        console.log('Successfully fetching constituency', response)
        response.data.data.rows.map( data => {
          return (
            this.vidhanSabha.push(data.meta.name)
          )
        } )
        this.setState({ sabhas : this.vidhanSabha })
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
                  <p className='areaValue'>{ this.state.vidhanSabha }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ vidhanSabha : '' })
                    this.props.fetchKaryakarta('Vidhan Sabha','', this.state.designation)
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.state.sabhas.map( vidhanSabha => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ vidhanSabha : vidhanSabha })
                          this.props.fetchKaryakarta('Vidhan Sabha', vidhanSabha, this.state.designation)
                        } }>{ vidhanSabha }</p>
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
                    this.props.fetchKaryakarta('Vidhan Sabha', this.state.vidhanSabha, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Vidhan Sabha', this.state.vidhanSabha, designation)
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