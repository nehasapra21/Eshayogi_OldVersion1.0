import React, { Fragment } from 'react'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'

const DefaultBars = () => {
  return (
    <Fragment>
      <div className='SearchBar'>
        <div className='karyakartaSearchBar areaDropdown'>
          <span>
            <p className='defaultValue'>Please select Area</p>
            <img src={dropDownArrow} alt='' className='SearchIcon' />
          </span>
        </div>
      </div>
      <div className='SearchBar'>
        <div className='karyakartaSearchBar areaDropdown'>
          <span>
            <p className='defaultValue'>Please select Area</p>
            <img src={dropDownArrow} alt='' className='SearchIcon' />
          </span>
        </div>
      </div>
    </Fragment>
  )
}

export default DefaultBars