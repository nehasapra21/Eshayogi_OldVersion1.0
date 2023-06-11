import React, { Component, Fragment } from 'react'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import api from '../../../utils/api'
import { Dropdown } from 'react-bootstrap'
export default class PSLevel extends Component {

  constructor (props) {
    super (props)
    
    this.state = {
      mandal : '',
      designation : '',
      mandals : []
    }
  }

  mandal = []

  designation = [ 'Mandal Mantri', 'Mandal Mahamantri', 'Mandal Shakti Kendra Prabhari', 'Mandal Coordinator', 'Mandal Co-Coordinator', 'Mandal Adhyaksh', 'Mandal Up-Adhyaksh', 'Mandal Karyakarni', 'Treasurer', 'Media Incharge', 'Office Incharge', 'Spokesperson' ]

  componentDidMount() {
    api.getConstituency({
      type : 'Mandal Level',
      limit : '100',
      offset : '0',
      status : true
    }).then(
      response => {
        console.log('Successfully fetching constituency', response)
        response.data.data.rows.map( data => {
          return (
            this.mandal.push(data.meta.name)
          )
        } )
        this.setState({ mandals : this.mandal })
      }
    )
  }

  render() {
    return (
      <Fragment>
        { console.log('Karyakarta data recieved', this.props) }
        <div className='SearchBar'>
          <Dropdown className='areaDropdown'>
            <div className='karyakartaSearchBar'>
              <Dropdown.Toggle>
                <span>
                  <p className='areaValue'>{ this.state.mandal }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ mandal : '' })
                    this.props.fetchKaryakarta('Mandal', '', this.state.designation)
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.state.mandals.map( mandal => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ mandal : mandal })
                          this.props.fetchKaryakarta('Mandal', mandal, this.state.designation)
                        } }>{ mandal }</p>
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
                    this.props.fetchKaryakarta('Mandal', this.state.mandal, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Mandal', this.state.mandal, designation)
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
