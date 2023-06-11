import React, { Component } from 'react'

import importLogo from '../../utils/images/ImportLogo.png' //some image import

import Zila from './ConstituencyForms/Zila' //components import
import VidhanSabha from './ConstituencyForms/VidhanSabha'
import PSLevel from './ConstituencyForms/PSLevel'
import Mandal from './ConstituencyForms/Mandal'
import ShaktiKendra from './ConstituencyForms/ShaktiKendra'
import GramPanchayat from './ConstituencyForms/GramPanchayat'
import RevenueVillage from './ConstituencyForms/RevenueVillage'
import BoothLevel from './ConstituencyForms/BoothLevel'

import Footer from '../footer/Footer' //other components import
import CopyrightFooter from '../footer/CopyrightFooter'
import Header from '../header/Header'
import { toast } from 'react-toastify'
import './Constituency.css' //css import

import api from '../../utils/api' //api import
import { Link } from 'react-router-dom'
import PollingStation from './ConstituencyForms/PollingStation'

export default class ConstituencyMain extends Component {
  constructor(props) {
    super(props)

    if (this.props.history.location.state !== undefined) {
      let constituencyType = this.props.history.location.state.constituencyType

      this.state = {
        constituencyType: constituencyType,
        updateConstData: this.props.history.location.state.updateConstData,
      }
    } else {
      this.state = {
        constituencyType: 'Zila Level',
        updateConstData: false,
      }
    }
  }

  switchStatement = (constituency) => {
    switch (constituency) {
      case 'Zila Level':
        return (
          <Zila
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Vidhan Sabha':
        return (
          <VidhanSabha
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
            getDesiredConstituency={this.getDesiredConstituency}
          />
        )

      case 'PS Level':
        return (
          <PSLevel
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Mandal Level':
        return (
          <Mandal
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Shakti Kendra':
        return (
          <ShaktiKendra
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Gram Panchayat':
        return (
          <GramPanchayat
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Revenue Villages':
        return (
          <RevenueVillage
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Booth Level':
        return (
          <BoothLevel
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      case 'Polling Station':
        return (
          <PollingStation
            getConstituencyData={
              this.state.updateConstData
                ? this.updateConstituencyData
                : this.getConstituencyData
            }
            data={this.props.location.state}
          />
        )

      default:
        return 'hello this is default'
    }
  }

  //Function to recieve constituency data
  getConstituencyData = (e, constituencyData) => {
    e.preventDefault()

    api
      .addConstituency({
        type: this.state.constituencyType,
        meta: {
          ...constituencyData,
        },
      })
      .then((response) => {
        if (response.ok) {
          window.location.reload(true)
          toast.success('Constituency Created')
          this.props.history.push({
            pathname: '/add-constituency',
          })
        } else {
          alert('Some error occured')
        }
      })
  }

  updateConstituencyData = (e, constituencyData) => {
    e.preventDefault()

    api
      .updateConstituency({
        status: true,
        id: this.props.location.state.data.id,
        type: this.state.constituencyType,
        meta: {
          ...constituencyData,
        },
      })
      .then((response) => {
        if (response.ok) {
          toast.success('Constituency Updated')
          this.props.history.push({
            pathname: '/manage-constituency',
          })
        } else {
          alert('Some error occured')
        }
      })
  }

  render() {
    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading" style={{ justifyContent: 'center' }}>
              <p className="ConstituencyHead">
                {this.state.updateConstData
                  ? 'Update Constituency'
                  : 'Add Constituency'}
              </p>
              <Link
                style={{ display: 'block', position: 'absolute', right: '4%' }}
                to={'/manage-constituency'}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p className="UpperTabTxt" style={{ marginRight: '10px' }}>
                    Manage
                  </p>
                </div>
              </Link>
              {/*<a href='/' className='import' style={{ left : '32%' }}>
                <p>Import</p>
                <img src={importLogo} alt=''></img>
                </a>*/}
            </div>
            <div className="constituencyTabs">
              <ul>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Zila Level'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Zila Level'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Zila Level' })
                  }
                >
                  Zila Level
                </li>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Vidhan Sabha'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Vidhan Sabha'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Vidhan Sabha' })
                  }
                >
                  Vidhan Sabha
                </li>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'PS Level'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'PS Level'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'PS Level' })
                  }
                >
                  PS Level
                </li>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Mandal Level'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Mandal Level'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Mandal Level' })
                  }
                >
                  Mandal Level
                </li>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Shakti Kendra'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Shakti Kendra'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Shakti Kendra' })
                  }
                >
                  Shakti Kendra
                </li>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Gram Panchayat'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Gram Panchayat'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Gram Panchayat' })
                  }
                >
                  Gram Panchayat
                </li>
                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Revenue Villages'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Revenue Villages'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Revenue Villages' })
                  }
                >
                  Revenue Villages
                </li>

                <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Polling Station'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Polling Station'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Polling Station' })
                  }
                >
                  Polling Station
                </li>
                {/* <li
                  className={
                    this.state.updateConstData
                      ? this.state.constituencyType === 'Booth Level'
                        ? 'active'
                        : 'disabled'
                      : this.state.constituencyType === 'Booth Level'
                      ? 'active'
                      : null
                  }
                  onClick={() =>
                    this.setState({ constituencyType: 'Booth Level' })
                  }
                >
                  Booth Level
                </li> */}
              </ul>
            </div>
            <div className="FormFrame">
              {this.switchStatement(this.state.constituencyType)}
            </div>
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className="emptyDiv"></div>
      </div>
    )
  }
}
