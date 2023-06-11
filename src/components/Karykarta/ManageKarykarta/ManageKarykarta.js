import React, { Component, Fragment } from 'react'
import Header from '../../header/Header'
import SearchIcon from '../../../utils/images/search.svg'
import dropDownArrow from '../../../utils/images/dropdownArrow.svg'
import Zila from './Zila'
import VidhanSabha from './VidhanSabha'
import Mandal from './Mandal'
import PSLevel from './PSLevel'
import GramPanchayat from './GramPanchayat'
import BoothLevel from './BoothLevel'
import ShaktiKendra from './ShaktiKendra'
import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import '../Karykarta.css'
import api from '../../../utils/api'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Dropdown } from 'react-bootstrap'
import DataTable from './DataTable'
import DefaultBars from './DefaultBars'

export default class ManageKarykarta extends Component {

  constructor(props) {
    super(props)

    this.state = {
      area : '',
      karyakartaData : '',
      isLoading : true,
      searchInput : ''
    }
  }

  areas = [ 'Zila', 'Vidhan Sabha', 'Panchayat Samiti', 'Mandal', 'Gram Panchayat', 'Shakti Kendra', 'Booth' ]

  filteredData = {
    data : {
      row : []
    }
  }

  componentDidMount() {
    this.fetchKaryakarta('', '', '')
  }

  fetchKaryakarta = (area, district, designation) => {
    this.setState({ isLoading : true })
    api.fetchKaryakartaData({
      area : area,
      district : district,
      designation : designation,
      limit : '100',
      offset : '0'
    }).then(
      response => {
        if (response.ok) {
          console.log('Karyakarta data fetch successfully', response)
          this.setState({ karyakartaData : response.data, isLoading : false })
          console.log('Karyakarta data mil gya', this.state.karyakartaData)
        }
      }
    )
  }

  captureSearchInput = (event) => {
    this.setState({ searchInput : event.target.value })
    this.filterDataAccToSearch(event.target.value)
  }

  filterDataAccToSearch = (inputValue) => {
    console.log('filter function executes')
    console.log('filtered data', this.state.occassionData)

    this.filteredData.data.rows = this.state.karyakartaData.data.rows.filter( data => {
        return data.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
      } )

      console.log('Oyee hoyee', this.filteredData)
  }

  switchStatement = (area) => {

    console.log('Switch statement area', area)

    switch (area) {
      case 'Zila': return <Zila fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />

      case 'Vidhan Sabha' : return <VidhanSabha fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />

      case 'Panchayat Samiti' : return <PSLevel fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />

      case 'Mandal' : return <Mandal fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />

      case 'Shakti Kendra' : return <ShaktiKendra fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />

      case 'Gram Panchayat' : return <GramPanchayat fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />

      case 'Booth' : return <BoothLevel fetchKaryakarta = { this.fetchKaryakarta } dataStateSetFunc ={ this.dataStateSetFunc } />
    
      default: return <DefaultBars />
    }
  }

  render() {
    return (
      <div className='NewClientForm'>
        <Header isLoading = { this.state.isLoading } />
        <div className='frame'>
          <div className='FormOuterFrame'>
            <div className='DivHeading'>
              <p className='TxtHeading'>Karyakarta</p>
              <div className='searchBar'>
                <input 
                  className='SearchInput' 
                  type='text' 
                  placeholder='Search'
                  value = { this.state.searchInput }
                  onChange = { (e) => this.captureSearchInput(e) }  />
                <img className='SearchIcon' src={SearchIcon} alt=''></img>
              </div>
            </div>
            <div className='SearchBars'>
              <div className='SearchBar'>
                <Dropdown className='areaDropdown'>
                      <div className='karyakartaSearchBar'>
                        <Dropdown.Toggle>
                          <span>
                            <p className='areaValue'>{ this.state.area }</p>
                            <img src={dropDownArrow} alt='' className='SearchIcon' />
                          </span>
                        </Dropdown.Toggle>
                      </div>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <p className='area' onClick={ () => {
                        this.setState({ area : '', searchInput : '' })
                        this.fetchKaryakarta('', '', '')
                        } }>All</p>
                      </Dropdown.Item>
                    {
                      this.areas.map( area => {
                        return (
                          <Dropdown.Item>
                            <p className='area' onClick={ () => {
                              this.setState({ area : area, searchInput : '' })
                              this.fetchKaryakarta(area, '', '')
                            } }>{ area }</p>
                          </Dropdown.Item>
                        )
                      } )
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              { //code to render search bars after area selected

                this.state.constituencyType === '' ? 
                <Fragment>
                  <div className='SearchBar'>
                    <div className='karyakartaSearchBar'>
                      <input className='SearchInput' placeholder='Please select Area' />
                      <img className='SearchIcon' src={dropDownArrow} alt='' />
                    </div>
                  </div>
                  <div className='SearchBar'>
                    <div className='karyakartaSearchBar'>
                      <input className='SearchInput' placeholder='Please select Area' />
                      <img className='SearchIcon' src={dropDownArrow} alt='' />
                    </div>
                  </div>
                </Fragment>
                : this.switchStatement(this.state.area)
              }
            </div>
            <div className='FormFrame'>
              {
                this.state.karyakartaData !== '' ? <DataTable karyakartaData = { this.state.searchInput === '' ? this.state.karyakartaData : this.filteredData } history={ this.props.history } /> : null
              }
            </div>
          </div>
          <div className='DashboardFooter'>
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className='emptyDiv' />
      </div>
    )
  }
}

/* PREVIOUS CODE CAN BE REUSED LATER
 
                
                <ul className='sahyogiDropdown'>
                  {
                    areas.map((data, index) => {
                      return (
                        <li key={index} onClick={ () => this.setState({ constituencyType : data.areaState, value : data.area }) }>{data.area}</li>
                      )
                    })
                  }
                </ul>
 */
