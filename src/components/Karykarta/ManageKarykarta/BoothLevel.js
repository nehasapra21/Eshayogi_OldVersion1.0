import React, { Component, Fragment } from 'react'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import api from '../../../utils/api'
import { Dropdown } from 'react-bootstrap'

export default class GramPanchayat extends Component {

  constructor (props) {
    super (props) 
    this.state = {
      booth : '',
      designation : '',
      booths : []
    }
  }

  booth = []

  designation = [ 'Booth Adhyaksh', 'Booth Up-Adhyaksh', 'Booth Karyakarni', 'Booth Prabhari', 'Booth Coordinator', 'Booth Co-Coordinator' ]

  componentDidMount() {
    api.getConstituency({
      type : 'Booth Level',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        console.log('Successfully fetching constituency', response)
        response.data.data.rows.map( data => {
          return (
            this.booth.push(data.meta.name)
          )
        } )
        this.setState({ booths : this.booth })
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
                  <p className='areaValue'>{ this.state.booth }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ booth : '' })
                    this.props.fetchKaryakarta('Booth', '', this.state.designation)
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.state.booths.map( booth => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ booth : booth })
                          this.props.fetchKaryakarta('Booth', booth, this.state.designation)
                        } }>{ booth }</p>
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
                    this.props.fetchKaryakarta('Booth', this.state.booth, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Booth', this.state.booth, designation)
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
