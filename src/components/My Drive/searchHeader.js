import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { checked } from '../../utils/svg/index'

const SearchHeader = (props) => {
  const { driveFiles, switchFiles } = { ...props }
  return (
    <div className='myDrive-head'>
      <Dropdown className='myDrive-dropdown'>
        <Dropdown.Toggle id='dropdown-basic'>My Drive</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              e.preventDefault()
              switchFiles('All')
            }}
          >
            <div
              id='drive-dropdown-item'
              className={driveFiles === 'All' ? 'active' : ''}
            >
              All <span className='checked-icon'>{checked}</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              e.preventDefault()
              switchFiles('Shared')
            }}
          >
            <div
              id='drive-dropdown-item'
              className={driveFiles === 'Shared' ? 'active' : ''}
            >
              Shared <span className='checked-icon'>{checked}</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default SearchHeader
