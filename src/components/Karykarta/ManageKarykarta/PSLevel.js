import React, { Component, Fragment } from 'react'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import { Dropdown } from 'react-bootstrap'
import api from '../../../utils/api'

export default class PSLevel extends Component {

  constructor (props) {
    super (props)
    this.state = {
      samiti : '',
      designation : '',
      samitis : []
    }
  }

  samiti = []

  designation = [ 'Panchayat Samiti Member', 'Pardhan' ]

  componentDidMount() {
    api.getConstituency({
      type : 'PS Level',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        console.log('Successfully fetching constituency', response)
        response.data.data.rows.map( data => {
          return (
            this.samiti.push(data.meta.name)
          )
        } )
        this.setState({ samitis : this.samiti })
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
                  <p className='areaValue'>{ this.state.samiti }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ samiti : '' })
                    this.props.fetchKaryakarta('Panchayat Samiti', '', this.state.designation)
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.state.samitis.map( samiti => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ samiti : samiti })
                          this.props.fetchKaryakarta('Panchayat Samiti', samiti, this.state.designation)
                        } }>{ samiti }</p>
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
                    this.props.fetchKaryakarta('Panchayat Samiti', this.state.samiti, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Panchayat Samiti', this.state.samiti, designation)
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
