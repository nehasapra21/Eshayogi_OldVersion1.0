import React, { Component } from 'react'

import importLogo from '../../utils/images/ImportLogo.png'

import Header from '../header/Header'

import './ManageConstituency.css'

import Zila from './Constituency/Zila'
import VidhanSabha from './Constituency/VidhanSabha'
import PSLevel from './Constituency/PSLevel'
import Mandal from './Constituency/Mandal'
import ShaktiKendra from './Constituency/ShaktiKendra'
import GramPanchayat from './Constituency/GramPanchayat'
import RevenueVillage from './Constituency/RevenueVillages'
import BoothLevel from './Constituency/BoothLevel'

import Footer from '../footer/Footer'
import CopyRightFooter from '../footer/CopyrightFooter'

import api from '../../utils/api'
import EventModal from '../EventModal/EventModalMain'
import Search from '../../utils/images/search.svg'
import { toast } from 'react-toastify'
import PollingStation from './Constituency/PollingStation'

export default class ManageConstituencyMain extends Component {
  constructor(props) {
    super(props)

    if (this.props.location.state) {
      this.state = {
        constituencyType: this.props.location.state.constituencyType,
        constituencyTypes: [
          'Zila Level',
          'Vidhan Sabha',
          'PS Level',
          'Mandal Level',
          'Shakti Kendra',
          'Gram Panchayat',
          'Revenue Villages',
          'Booth Level',
        ],
        mountComponent: false,
        isLoading: true,
        searchInput: '',
      }
    } else {
      this.state = {
        constituencyType: 'Zila Level',
        constituencyTypes: [
          'Zila Level',
          'Vidhan Sabha',
          'PS Level',
          'Mandal Level',
          'Shakti Kendra',
          'Gram Panchayat',
          'Revenue Villages',
          'Polling Station',
        ],
        constituencyData: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        mountComponent: true,
        isLoading: true,
        searchInput: '',
      }
    }
  }

  filteredData = {
    rows: [],
  }

  componentDidMount = () => {
    this.fetchContituency()
  }

  fetchContituency = async () => {
    this.state.constituencyTypes.map((obj, index) => {
      return api
        .manageConstituency({
          type: this.state.constituencyTypes[index],
          limit: '10000',
          offset: '0',
          status: true,
        })
        .then((response) => {
          if (response.ok) {
            console.log('Succesfully fetch constituency', response.data)
            localStorage.setItem(
              `${obj}`,
              JSON.stringify(response?.data?.data || [])
            )
            // if (Object.keys(this.state.constituencyData[0]).length !== 0) {
            //     this.setState({ mountComponent: true });
            //   }
          } else {
            console.log('Response is not ok', response)
          }
        })
    })
    setTimeout(() => this.setState({ isLoading: false }), 1000)
  }

  captureSearchInput = (event) => {
    this.setState({ searchInput: event.target.value })
    this.filterDataAccToSearch(event.target.value, this.state.constituencyType)
  }

  filterDataAccToSearch = (inputValue, constituencyType) => {
    console.log('filter chla ?', this.state.constituencyData)

    let index

    for (let i = 0; i < this.state.constituencyData.length; i++) {
      console.log('I ki value ke sath', this.state.constituencyData[i])
      if (this.state.constituencyData[i].rows[0].type === constituencyType) {
        index = i
      }
    }

    this.filteredData.rows = this.state.constituencyData[index].rows.filter(
      (data) => {
        return (
          data.meta.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        )
      }
    )
  }

  switchStatement = (constituency) => {
    switch (constituency) {
      case 'Zila Level':
        return (
          <Zila
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'Vidhan Sabha':
        return (
          <VidhanSabha
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'PS Level':
        return (
          <PSLevel
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'Mandal Level':
        return (
          <Mandal
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'Shakti Kendra':
        return (
          <ShaktiKendra
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'Gram Panchayat':
        return (
          <GramPanchayat
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'Revenue Villages':
        return (
          <RevenueVillage
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      case 'Polling Station':
        return (
          <PollingStation
            constituencyType={this.state.constituencyType}
            history={this.props.history}
            isLoading={this.state.isLoading}
            deleteConstituency={this.deleteConstituency}
          />
        )

      default:
        return 'hello this is default'
    }
  }

  deleteConstituency = async (id) => {
    api
      .deleteConstituency({
        id: id,
      })
      .then((res) => {
        this.setState({ isLoading: true }, () => this.fetchContituency())
      })
      .catch((err) => {
        toast.error('Unable to delete.')
      })
  }

  render() {
    return (
      <div className="BackgroundHomeframe">
        <Header isLoading={this.state.isLoading} />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading" style={{ justifyContent: 'center' }}>
              <p className="ConstituencyHead">Manage Constituency</p>
              {/*<a href='/' className='import' style={{ left : '30%' }}>
                  <p>Export</p>
                  <img src={importLogo} alt=''></img>
                </a>*/}
            </div>
            <div className="constituencyTabs">
              <ul>
                {this.state.constituencyTypes.map((myVar, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        this.state.constituencyType === myVar ? 'active' : null
                      }
                      onClick={() => {
                        this.setState({
                          constituencyType: myVar,
                          searchInput: '',
                        })
                      }}
                    >
                      {myVar}
                    </li>
                  )
                })}
              </ul>
              {/* <div className='SearchDivLayout'>
                  <input
                    type='text'
                    placeholder='Search Requests (Name,Mobile Number)'
                    className='SearchInput'
                    value={this.state.searchInput}
                    onChange={(e) => {
                      this.captureSearchInput(e);
                    }}
                  />
                  <img src={Search} alt='' className='SearchIcon' />
                </div> */}
            </div>
            <div className="FormFrame">
              {this.state.mountComponent
                ? this.switchStatement(this.state.constituencyType)
                : null}
            </div>
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyRightFooter />
          </div>
        </div>
        <div className="emptyDiv"></div>
      </div>
    )
  }
}
