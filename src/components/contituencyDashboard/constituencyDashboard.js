import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import CopyrightFooter from '../footer/CopyrightFooter'

import viewMore from '../../utils/images/viewMore.png'

import api from '../../utils/api'

import './constituencyDashboard.css'

export default class ConstituencyDashboard extends Component {

  constructor(props) {
    super(props)
    document.title="constituency-map"
    this.state = {
      constituencyData : [],
      isLoading : true
    }
  }

  componentDidMount() {
    api.fetchConstituencyDashboard().then(
      response => {
        if(response.ok) {
          console.log('Dashboard Data fetch', response)
          this.setState({ constituencyData : response.data.data, isLoading : false })
        } else {
          console.log('Something is wrong', response)
        }
      }
    )
  }

  clickHandler = (constituencyType) => {
    this.props.history.push({
      pathname : '/manage-constituency',
      state : {
        constituencyType : constituencyType
      }
    })
  }

  render() {

    if (!this.state.isLoading) {
      console.log('Dashboard states', this.state)
      return (
        <div className='NewClientForm'>
          <Header isLoading={this.state.isLoading} />
          <div className='container aggrementContainer'>
            <div className='FormOuterFrame'>
              <div className='DivHeading' style={{ justifyContent : 'center' }}>
                <p className='ConstituencyHead'>Constituency Dashboard</p>
              </div>
              <div className='FormFrame'>
                <Row>
                  {
                    this.state.constituencyData.map( data => {
                      return (
                        <Col md={3}>
                          <div className={ data.type === 'Vidhan Sabha' ? 'constituencyCard vidhan' : data.type === 'PS Level' ? 'constituencyCard samiti' : data.type === 'Mandal Level' ? 'constituencyCard mandal' : data.type === 'Shakti Kendra' ? 'constituencyCard shakti' : data.type === 'Gram Panchayat' ? 'constituencyCard panchayat' : data.type === 'Revenue Villages' ? 'constituencyCard villages' : data.type === 'Booth Level' ? 'constituencyCard booth' : 'constituencyCard zila' }>
                            <div className='constituencyCount'>
                              <p className='count'>{ data.count }</p>
                              <p className='constituencyType'>{ data.type }</p>
                            </div>
                            <hr className='constDivider' />
                            <a onClick={ () => this.clickHandler(data.type) }>
                              <div  className='viewMore'>
                                <p>View Details</p>
                                <img src={viewMore} alt=''></img>
                              </div>
                            </a>
                          </div>
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </div>
            <div className="DashboardFooter">
              <Footer />
              <CopyrightFooter />
            </div>
            <div className='emptyDiv'></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='NewClientForm'>
          <Header isLoading={this.state.isLoading} />
        </div>
      )
    }

    
  }
}
