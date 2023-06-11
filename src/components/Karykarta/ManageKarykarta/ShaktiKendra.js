import React, { Component, Fragment } from 'react'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import { Dropdown } from 'react-bootstrap'

export default class ShaktiKendra extends Component {

  constructor (props) {
    super (props)
    this.state = {
      shaktiKendra : '',
      designation : ''
    }
  }

  kendra = [ 'A', 'B', 'C' ]

  designation = [ 'Shakti Kendra Prabhari', 'Shakti Kendra Sanjoyak', 'Shakti Kendra Karyakarni' ]

  render() {
    return (
      <Fragment>
        <div className='SearchBar'>
          <Dropdown className='areaDropdown'>
            <div className='karyakartaSearchBar'>
              <Dropdown.Toggle>
                <span>
                  <p className='areaValue'>{ this.state.shaktiKendra }</p>
                  <img src={dropDownArrow} alt='' className='SearchIcon' />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p className='area' onClick={ () => {
                    this.setState({ shaktiKendra : '' })
                    this.props.fetchKaryakarta('Shakti Kendra', '', this.state.designation)
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.kendra.map( shaktiKendra => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ shaktiKendra : shaktiKendra })
                          this.props.fetchKaryakarta('Shakti Kendra', shaktiKendra, this.state.designation)
                        } }>{ shaktiKendra }</p>
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
                    this.props.fetchKaryakarta('Shakti Kendra', this.state.shaktiKendra, '')
                  } }>All</p>
                </Dropdown.Item>
                {
                  this.designation.map( designation => {
                    return (
                      <Dropdown.Item>
                        <p className='area' onClick={ () => {
                          this.setState({ designation : designation })
                          this.props.fetchKaryakarta('Shakti Kendra', this.state.shaktiKendra, designation)
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
