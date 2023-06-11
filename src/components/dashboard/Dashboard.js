import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import './Dashboard.css'
import UpArrow from '../../utils/images/up arrow.svg'
import AllTile from '../../utils/images/ALL - BLUE.svg'
import ComplaintTile from '../../utils/images/RED COMPLAINTS.svg'
import JobTile from '../../utils/images/DARK GREEN JOBS.svg'
import EventTile from '../../utils/images/LIGHT GREEN EVENTS.svg'
import PoliticalEventTile from '../../utils/images/ORANGE APPOINT.svg'
import MPLADTile from '../../utils/images/MPLAD YELLOW.svg'
import PNRTile from '../../utils/images/SKY BLUE PNR.svg'
import LettersTile from '../../utils/images/BROWN LETTER.svg'
import Footer from '../footer/Footer'
import IconFooter from '../footer/IconFooter'
import CopyrightFooter from '../footer/CopyrightFooter'
import api from '../../utils/api'
import { PieChart } from 'react-minimal-pie-chart'

import commonImg from '../../utils/images/GREY.svg'

import Loader from '../hoc/Loader/Loader'
import Pizza from './Pizza'
import Chart from './Chart'

class Dashboard extends Component {
  constructor(props) {
    document.title = 'Dashboard'

    super(props)
    this.state = {
      complaint: '',
      complaintData: [],
      jobsData: [],
      jobs: '',
      events: '',
      eventsData: [],
      appointments: '',
      appointmentsData: [],
      mplad: '',
      mpladData: [],
      letters: '',
      lettersData: [],
      pnr: '',
      pnrData: [],
      isLoading: true,
      request: 'all',
      politicalevents: '',
      politicaleventsData: [],
      manage: '',
    }
  }
  componentDidMount = () => {
    this.getDashboard()
  }

  getDashboard = async () => {
    // await api
    //   .getDashboardData()
    //   .then((res) => {
    //     console.log('dashboard data', res)

    //     let Data = res?.data?.data?.requests
    //     this.setState({
    //       all: res?.data?.data?.totalCount || 0,
    //       complaint: Data?.complaint?.count || 0,
    //       complaintData: Data?.complaint?.request || [],
    //       jobs: Data?.job?.count || 0,
    //       jobsData: Data?.job?.request || [],
    //       events: Data?.event?.count || 0,
    //       eventsData: Data?.event?.request || [],
    //       appointments: Data?.appointment?.count || 0,
    //       appointmentsData: Data?.appointment.request || [],
    //       politicalevents: Data?.politicalevent?.count || 0,
    //       politicaleventsData: Data?.politicalevent?.request || [],
    //       mplad: Data?.mplad?.count || 0,
    //       mpladData: Data?.mplad?.request || [],
    //       pnr: Data?.pnr?.count || 0,
    //       pnrData: Data?.pnr?.request || [],
    //       letters: Data?.letters?.count || 0,
    //       lettersData: Data?.letters?.request || [],
    //       isLoading: false,
    //     })
    //   })
    //   .catch((err) => {
    //     console.log('dashboard err', err)
    //     this.setState({ isLoading: false })
    //   })

    try {
      const res = await api.getDashboardData()
      console.log('dashboard data', res)

      let Data = res?.data?.data?.requests
      this.setState({
        all: res?.data?.data?.totalCount || 0,
        complaint: Data?.complaint?.count || 0,
        complaintData: Data?.complaint?.request || [],
        jobs: Data?.job?.count || 0,
        jobsData: Data?.job?.request || [],
        events: Data?.event?.count || 0,
        eventsData: Data?.event?.request || [],
        appointments: Data?.appointment?.count || 0,
        appointmentsData: Data?.appointment.request || [],
        politicalevents: Data?.politicalevent?.count || 0,
        politicaleventsData: Data?.politicalevent?.request || [],
        mplad: Data?.mplad?.count || 0,
        mpladData: Data?.mplad?.request || [],
        pnr: Data?.pnr?.count || 0,
        pnrData: Data?.pnr?.request || [],
        letters: Data?.letters?.count || 0,
        lettersData: Data?.letters?.request || [],
        isLoading: false,
      })
    } catch (err) {
      console.log('dashboard err', err)
      this.setState({ isLoading: false })
    }
  }

  goToManageSection = (manage) => {
    let search = manage.toLowerCase()

    this.props.history.push({
      pathname: '/manage-request',
      state: { manage: manage },
      search: search,
    })
  }

  render() {
    console.log('dashboard states', this.state.mplad)
    if (!this.state.isLoading) {
      return (
        <div>
          <div className="NewClientForm">
            <Header isLoading={this.state.isLoading} />
            <div className="frame3">
              <div className="DashBoardOuterFrame">
                <div className="DashboardFrame">
                  <div className="DashboardLeftFrame">
                    <div
                      style={{
                        marginBottom: '50px',
                        display: 'flex',
                        position: 'relative',
                      }}
                    >
                      <div style={{ width: '30%' }}>
                        <p className="FrameHeading">total requests</p>
                        <p className="NoRequestTxt">
                          {this.state.request === 'all'
                            ? this.state.all
                            : this.state.request === 'complaint'
                            ? this.state.complaint
                            : this.state.request === 'jobs'
                            ? this.state.jobs
                            : this.state.request === 'events'
                            ? this.state.events
                            : // this.state.request === "appointments" ? this.state.appointments :
                            this.state.request === 'politicalevent'
                            ? this.state.politicalevents
                            : this.state.request === 'mplad'
                            ? this.state.mplad
                            : this.state.request === 'pnr'
                            ? this.state.pnr
                            : this.state.letters}
                        </p>
                        <p className="LeftFrameTxt">Till today</p>

                        <p className="FrameHeading">Requests Monthly Trend</p>

                        <div className="Flex">
                          <img src={UpArrow} alt="" className="Arrow" />
                          <p className="DataRequestTxt">
                            {this.state.request === 'all'
                              ? this.state.all
                              : this.state.request === 'complaint'
                              ? this.state.complaint
                              : this.state.request === 'jobs'
                              ? this.state.jobs
                              : this.state.request === 'events'
                              ? this.state.events
                              : // this.state.request === "appointments" ? this.state.appointments :
                              this.state.request === 'politicalevent'
                              ? this.state.politicalevents
                              : this.state.request === 'mplad'
                              ? this.state.mplad
                              : this.state.request === 'pnr'
                              ? this.state.pnr
                              : this.state.letters}
                          </p>
                          <img src={UpArrow} alt="" className="Arrow" />
                          <p className="DataRequestTxt">
                            {this.state.request === 'all'
                              ? ((this.state.all / 30) * 100).toFixed(2)
                              : this.state.request === 'complaint'
                              ? ((this.state.complaint / 30.0) * 100).toFixed(2)
                              : this.state.request === 'jobs'
                              ? ((this.state.jobs / 30.0) * 100).toFixed(2)
                              : this.state.request === 'events'
                              ? ((this.state.events / 30.0) * 100).toFixed(2)
                              : // this.state.request === "appointments" ? (this.state.appointments / 30.00 * 100).toFixed(2) :
                              this.state.request === 'politicalevent'
                              ? (
                                  (this.state.politicalevents / 30.0) *
                                  100
                                ).toFixed(2)
                              : this.state.request === 'mplad'
                              ? ((this.state.mplad / 30.0) * 100).toFixed(2)
                              : this.state.request === 'pnr'
                              ? ((this.state.pnr / 30.0) * 100).toFixed(2)
                              : ((this.state.letters / 30) * 100).toFixed(2)}
                            %
                          </p>
                        </div>

                        {console.log(this.state.eventsData, 'ashu')}
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div className="ChartDiv">
                          {this.state.request == 'all' ? (
                            <PieChart
                              paddingAngle="2"
                              data={[
                                {
                                  title: '',
                                  value: this.state.complaint,
                                  color: '#db1b1b',
                                },
                                {
                                  title: '',
                                  value: this.state.jobs,
                                  color: '#198a44',
                                },
                                {
                                  title: '',
                                  value: this.state.events,
                                  color: '#7ebd37',
                                },
                                // { title: '', value: this.state.appointments, color: '#f89939' },
                                {
                                  title: '',
                                  value: this.state.politicalevents,
                                  color: '#f89939',
                                },
                                {
                                  title: '',
                                  value: this.state.mplad,
                                  color: '#feb81c',
                                },
                                {
                                  title: '',
                                  value: this.state.pnr,
                                  color: '#25c7fb',
                                },
                                {
                                  title: '',
                                  value: this.state.letters,
                                  color: '#6e4208',
                                },
                              ]}
                            />
                          ) : this.state.request == 'complaint' ? (
                            <Pizza data={this.state.complaintData} />
                          ) : this.state.request == 'jobs' ? (
                            <Pizza data={this.state.jobsData} />
                          ) : this.state.request == 'events' ? (
                            <Pizza data={this.state.eventsData} />
                          ) : this.state.request == 'politicalevent' ? (
                            <Pizza data={this.state.politicaleventsData} />
                          ) : this.state.request == 'mplad' ? (
                            <Pizza data={this.state.mpladData} />
                          ) : this.state.request == 'pnr' ? (
                            <Pizza data={this.state.pnrData} />
                          ) : (
                            <Pizza data={this.state.lettersData} />
                          )}
                          {this.state.request == 'all' ? (
                            <div className="IndicatorLayout">
                              <div className="requestDiv">
                                <div className="ChartIndicator1" />
                                <p className="ChartTxt">Complaints</p>
                                <p className="ChartValue">
                                  {this.state.complaint}
                                </p>
                              </div>
                              <div className="requestDiv">
                                <div className="ChartIndicator2" />
                                <p className="ChartTxt">Jobs</p>
                                <p className="ChartValue">{this.state.jobs}</p>
                              </div>
                              <div className="requestDiv">
                                <div className="ChartIndicator3" />
                                <p className="ChartTxt">Events</p>
                                <p className="ChartValue">
                                  {this.state.events}
                                </p>
                              </div>
                              <div className="requestDiv">
                                <div className="ChartIndicator4" />
                                <p className="ChartTxt">Political Events</p>

                                <p className="ChartValue">
                                  {this.state.politicalevents}
                                </p>
                              </div>
                              <div className="requestDiv">
                                <div className="ChartIndicator5" />
                                <p className="ChartTxt">MPLAD</p>

                                <p className="ChartValue">{this.state.mplad}</p>
                              </div>
                              <div className="requestDiv">
                                <div className="ChartIndicator6" />
                                <p className="ChartTxt">PNR</p>

                                <p className="ChartValue">{this.state.pnr}</p>
                              </div>
                              <div className="requestDiv">
                                <div className="ChartIndicator7" />
                                <p className="ChartTxt">Letters</p>

                                <p className="ChartValue">
                                  {this.state.letters}
                                </p>
                              </div>
                            </div>
                          ) : this.state.request == 'complaint' ? (
                            <Chart data={this.state.complaintData} />
                          ) : this.state.request == 'jobs' ? (
                            <Chart data={this.state.jobsData} />
                          ) : this.state.request == 'events' ? (
                            <Chart data={this.state.eventsData} />
                          ) : this.state.request == 'politicalevent' ? (
                            <Chart data={this.state.politicaleventsData} />
                          ) : this.state.request == 'mplad' ? (
                            <Chart data={this.state.mpladData} />
                          ) : this.state.request == 'pnr' ? (
                            <Chart data={this.state.pnrData} />
                          ) : (
                            <Chart data={this.state.lettersData} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '15px',
                        height: '300px',
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img src={AllTile} alt="" className="activityImg" />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              defaultChecked="true"
                              name="radio"
                              onChange={() => this.setState({ request: 'all' })}
                            />
                            <span class="checkmark" />
                          </label>
                        </div>
                        <p className="CardTextCategory">All</p>
                        <p className="CardText">{this.state.all}</p>
                      </div>
                      <div>
                        <img
                          src={ComplaintTile}
                          alt=""
                          className="activityImg"
                        />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() =>
                                this.setState({ request: 'complaint' })
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() => this.goToManageSection('COMPLAINT')}
                          style={{ cursor: 'pointer' }}
                        >
                          Complaints
                        </p>
                        <p className="CardText">{this.state.complaint}</p>
                      </div>
                      <div>
                        <img src={JobTile} alt="" className="activityImg" />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() =>
                                this.setState({ request: 'jobs' })
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() => this.goToManageSection('JOB')}
                          style={{ cursor: 'pointer' }}
                        >
                          Jobs
                        </p>
                        <p className="CardText">{this.state.jobs}</p>
                      </div>
                      <div>
                        <img src={EventTile} alt="" className="activityImg" />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() =>
                                this.setState({ request: 'events' })
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() => this.goToManageSection('EVENT')}
                          style={{ cursor: 'pointer' }}
                        >
                          Events
                        </p>
                        <p className="CardText">{this.state.events}</p>
                      </div>
                      {/* <div>
                                                    <img src={politicaleventTile} alt="" className="activityImg" /> 
                                                    <div className="CheckboxContainer">
                                                        <label class="container">
                                                            <input type="radio" name="radio" onChange={() => this.setState({ request: "appointments" })} />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </div>
                                                    <p className="CardTextCategory">Appointments</p>
                                                    <p className="CardText">{this.state.appointments}</p>
                                                </div> */}
                      <div>
                        <img
                          src={PoliticalEventTile}
                          alt=""
                          className="activityImg"
                        />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() =>
                                this.setState({ request: 'politicalevent' })
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() =>
                            this.goToManageSection('POLITICALEVENT')
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          Political Events
                        </p>
                        <p className="CardText">{this.state.politicalevents}</p>
                      </div>
                      <div>
                        <img src={MPLADTile} alt="" className="activityImg" />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() =>
                                this.setState({ request: 'mplad' })
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() => this.goToManageSection('MPLAD')}
                          style={{ cursor: 'pointer' }}
                        >
                          MPLAD
                        </p>
                        <p className="CardText">{this.state.mplad}</p>
                      </div>
                      <div>
                        <img src={PNRTile} alt="" className="activityImg" />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() => this.setState({ request: 'pnr' })}
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() => this.goToManageSection('PNR')}
                          style={{ cursor: 'pointer' }}
                        >
                          PNR
                        </p>
                        <p className="CardText">{this.state.pnr}</p>
                      </div>
                      <div>
                        <img src={LettersTile} alt="" className="activityImg" />
                        <div className="CheckboxContainer">
                          <label class="container">
                            <input
                              type="radio"
                              name="radio"
                              onChange={() =>
                                this.setState({ request: 'letters' })
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <p
                          className="CardTextCategory"
                          onClick={() => this.goToManageSection('LETTERS')}
                          style={{ cursor: 'pointer' }}
                        >
                          Letters
                        </p>
                        <p className="CardText">{this.state.letters}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="DashboardFooter">
                <IconFooter />
                <Footer />
                <CopyrightFooter />
              </div>
            </div>
            <div className="emptyDiv" />
          </div>
        </div>
      )
    }

    return (
      <div className="NewClientForm">
        <Loader />
      </div>
    )
  }
}
export default Dashboard
