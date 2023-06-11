import React, { Component } from 'react'
import Header from '../addresseHeader/AddresseHeader'
import '../../dashboard/Dashboard.css'
import DownArrow from '../../../utils/images/down arrow.svg'
import UpArrow from '../../../utils/images/up arrow.svg'
import AllTile from '../../../utils/images/10.png'
import ComplaintTile from '../../../utils/images/11.png'
import JobTile from '../../../utils/images/12.png'
import EventTile from '../../../utils/images/13.png'
import AppointmentTile from '../../../utils/images/14.png'
import DonutChart from 'react-donut-chart';
import Footer from '../../footer/Footer'
import IconFooter from '../../footer/IconFooter'
import CopyrightFooter from '../../footer/CopyrightFooter'
import api from '../../../utils/addresse_api'

import commonImg from '../../../utils/images/commonCheckBoxImg.png'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insight: [{ heading: "500 Health Workers", txt: "All work is goin Well" }, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            complaint:"",
            jobs:"",
            events:"",
            appointments:"",
            isLoading: true,
            request:"all"
        }
    }
    componentDidMount() {
       
        api.getDashboardData().then((response) => {
            if (response.ok) {
                this.setState({
                     complaint: parseInt(response.data.data[1].count,10),
                     jobs: parseInt(response.data.data[3].count,10),
                     events: parseInt(response.data.data[2].count,10),
                     appointments: parseInt(response.data.data[0].count,10),
                      isLoading: false},  console.log(response.data,"xxx")) ;
            }
            else {
                console.log('something error occured ', response);
            }
        },
            (err) => {
                console.log('err is', err)
            })


        }

    render() {
       var all=this.state.complaint+this.state.events+this.state.jobs+this.state.appointments

       if (!this.state.isLoading) { 
       return (
        window.innerWidth > 480
        ?
            <div>
                <div className="NewClientForm">
                    <Header />
                    <div className="frame3">
                        <div className="DashBoardOuterFrame">
                            <div className="DashboardFrame">
                                <div className="DashboardLeftFrame">
                                    <div style={{ marginBottom: "50px", display: "flex" }}>
                                        <div style={{ width: "50%" }}>
                                            <p className="LeftFrameHeading">total requests</p>
        <p className="NoRequestTxt">{this.state.request==="all"?all
                                                    :this.state.request==="complaint"?this.state.complaint
                                                    :this.state.request==="jobs"?this.state.jobs:
                                                    this.state.request==="events"?this.state.events:this.state.appointments}</p>
                                            <p className="LeftFrameTxt">Till today</p>

                                            <p className="LeftHeading">Requests Monthly Trend</p>

                                            <div className="Flex">
                                                <img src={DownArrow} alt="" className="Arrow" />
                                                <p className="DataRequestTxt">
                                                    {this.state.request==="all"?all
                                                    :this.state.request==="complaint"?this.state.complaint
                                                    :this.state.request==="jobs"?this.state.jobs:
                                                    this.state.request==="events"?this.state.events:this.state.appointments}</p>
                                                <img src={UpArrow} alt="" className="Arrow" />
                                                <p className="DataRequestTxt">{this.state.request==="all"?(all/30*100).toFixed(2)
                                                    :this.state.request==="complaint"?(this.state.complaint/30.00*100).toFixed(2)
                                                    :this.state.request==="jobs"?(this.state.jobs/30.00*100).toFixed(2):
                                                    this.state.request==="events"?(this.state.events/30.00*100).toFixed(2):(this.state.appointments/30*100).toFixed(2)}%</p>
                                            </div>

                                            
                                        </div>
                                        <div className="ChartDiv">
                                            <DonutChart
                                            
                                                legend="false"
                                                colors={['#00B8EA', '#FDB71B', '#00D47D', '#B772F3']}
                                                innerRadius="0.5"
                                                data={[{
                                                    label: '',
                                                    value: this.state.complaint
                                                },
                                                {
                                                    label: '',
                                                    value: this.state.jobs
                                                }, {
                                                    label: '',
                                                    value: this.state.events
                                                },
                                                {
                                                    label: '',
                                                    value: this.state.appointments,
                                                }]} />

                                            <div className="IndicatorLayout">
                                                <div>
                                                    <p className="ChartTxt">Complaints</p>
                                                    <div className="ChartIndicator1" />
                                            <p className="ChartValue">{this.state.complaint}</p>
                                                </div>
                                                <div>
                                                    <p className="ChartTxt">Jobs</p>
                                                    <div className="ChartIndicator2" />
                                                    <p className="ChartValue">{this.state.jobs}</p>
                                                </div>
                                                <div>
                                                    <p className="ChartTxt">events</p>
                                                    <div className="ChartIndicator3" />
                                                    <p className="ChartValue">{this.state.events}</p>
                                                </div>
                                                <div>
                                                    <p className="ChartTxt">Appointments</p>
                                                    <div className="ChartIndicator4" />
                                                    <p className="ChartValue">{this.state.appointments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="LeftHeading">CATEGORY SELECT</p>
                                    <div style={{ display: "flex",marginTop:"15px",height:"300px" }}>
                                        <div style={{ position: "relative" }}>
                                            {
                                                this.state.request === 'all' ? <img src={AllTile} alt="" className="activityImg" /> : <img src={commonImg} alt="" className="activityImg" />
                                            }
                                            <div className="CheckboxContainer">
                                            <label class="container">
                                                <input type="radio" defaultChecked="true" name="radio" onChange={()=>this.setState({request:"all"})}/>
                                                <span class="checkmark"/>
                                            </label>
                                            </div>
                                            <p className="CardTextCategory">All</p>
                                            <p className="CardText">{all}</p>
                                        </div>
                                        <div >
                                        {
                                            this.state.request === 'complaint' ? <img src={ComplaintTile} alt="" className="activityImg" /> : <img src={commonImg} alt="" className="activityImg" />
                                        }
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"complaint"})} />
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Complaints</p>
                                            <p className="CardText">{this.state.complaint}</p>
                                        </div>
                                        <div>
                                        {
                                            this.state.request === 'jobs' ? <img src={JobTile} alt="" className="activityImg" /> : <img src={commonImg} alt="" className="activityImg" />
                                        }
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"jobs"})}/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Jobs</p>
                                            <p className="CardText">{this.state.jobs}</p>
                                        </div>
                                        <div>
                                        {
                                            this.state.request === 'events' ? <img src={EventTile} alt="" className="activityImg" /> : <img src={commonImg} alt="" className="activityImg" />
                                        }
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"events"})}/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Events</p>
                                            <p className="CardText">{this.state.events}</p>
                                        </div>
                                        <div>
                                        {
                                            this.state.request === 'appointments' ? <img src={AppointmentTile} alt="" className="activityImg" /> : <img src={commonImg} alt="" className="activityImg" />
                                        }
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"appointments"})}/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Appointments</p>
                                            <p className="CardText">{this.state.appointments}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="DashboardRightFrame">
                                    <p className="FrameHeading">insights</p>
                                    {this.state.insight.map((insight, index) => (
                                        <div className="InsightItemLayout">
                                            <div className="InsightItemTag">
                                                <p className="InsightItemTagTxt">{index}</p>
                                            </div>
                                            <div>
                                                <p className="InsightItemHeading">500 People were</p>
                                                <p className="InsightItemTxt">Placed at healthcare</p>
                                            </div>
                                        </div>
                                    ))}
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
            :
            <div>
                <div className="NewClientForm">
                    <Header />
                    <div className="frame3">
                        <div className="DashBoardOuterFrame">
                                    <div /*style={{ marginBottom: "50px", display: "flex" }}*/>
                                        
                                            

                                            
                                        </div>
                                        <div className="ChartDiv">
                                            <DonutChart
                                            
                                                legend="false"
                                                colors={['#00B8EA', '#FDB71B', '#00D47D', '#B772F3']}
                                                innerRadius="0.5"
                                                data={[{
                                                    label: '',
                                                    value: this.state.complaint
                                                },
                                                {
                                                    label: '',
                                                    value: this.state.jobs
                                                }, {
                                                    label: '',
                                                    value: this.state.events
                                                },
                                                {
                                                    label: '',
                                                    value: this.state.appointments,
                                                }]} />

                                            <div className="IndicatorLayout">
                                                <div>
                                                    <p className="ChartTxt">Complaints</p>
                                                    <div className="ChartIndicator1" />
                                            <p className="ChartValue">{this.state.complaint}</p>
                                                </div>
                                                <div>
                                                    <p className="ChartTxt">Jobs</p>
                                                    <div className="ChartIndicator2" />
                                                    <p className="ChartValue">{this.state.jobs}</p>
                                                </div>
                                                <div>
                                                    <p className="ChartTxt">events</p>
                                                    <div className="ChartIndicator3" />
                                                    <p className="ChartValue">{this.state.events}</p>
                                                </div>
                                                <div>
                                                    <p className="ChartTxt">Appointments</p>
                                                    <div className="ChartIndicator4" />
                                                    <p className="ChartValue">{this.state.appointments}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="LeftHeading">Requests Monthly Trend</p>

                                            <div className="Flex">
                                                <img src={DownArrow} alt="" className="Arrow" />
                                                <p className="DataRequestTxt">
                                                    {this.state.request==="all"?all
                                                    :this.state.request==="complaint"?this.state.complaint
                                                    :this.state.request==="jobs"?this.state.jobs:
                                                    this.state.request==="events"?this.state.events:this.state.appointments}</p>
                                                <img src={UpArrow} alt="" className="Arrow" />
                                                <p className="DataRequestTxt">{this.state.request==="all"?(all/30*100).toFixed(2)
                                                    :this.state.request==="complaint"?(this.state.complaint/30.00*100).toFixed(2)
                                                    :this.state.request==="jobs"?(this.state.jobs/30.00*100).toFixed(2):
                                                    this.state.request==="events"?(this.state.events/30.00*100).toFixed(2):(this.state.appointments/30*100).toFixed(2)}%</p>
                                            </div>
                                    </div>
                                    <p className="LeftHeading">CATEGORY SELECT</p>
                                    <div style={{ display: "flex",marginTop:"15px",height:"300px" }}>
                                        <div style={{ position: "relative" }}>
                                            <img src={AllTile} alt="" className="activityImg" />
                                            <div className="CheckboxContainer">
                                            <label class="container">
                                                <input type="radio" defaultChecked="true" name="radio" onChange={()=>this.setState({request:"all"})}/>
                                                <span class="checkmark"/>
                                            </label>
                                            </div>
                                            <p className="CardTextCategory">All</p>
                                            <p className="CardText">{all}</p>
                                        </div>
                                        <div >
                                            <img src={ComplaintTile} alt="" className="activityImg" />
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"complaint"})} />
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Complaints</p>
                                            <p className="CardText">{this.state.complaint}</p>
                                        </div>
                                        <div>
                                            <img src={JobTile} alt="" className="activityImg" />
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"jobs"})}/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Jobs</p>
                                            <p className="CardText">{this.state.jobs}</p>
                                        </div>
                                        <div>
                                            <img src={EventTile} alt="" className="activityImg" />
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"events"})}/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Events</p>
                                            <p className="CardText">{this.state.events}</p>
                                        </div>
                                        <div>
                                            <img src={AppointmentTile} alt="" className="activityImg" />
                                            <div className="CheckboxContainer">
                                                <label class="container">
                                                    <input type="radio" name="radio" onChange={()=>this.setState({request:"appointments"})}/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <p className="CardTextCategory">Appointments</p>
                                            <p className="CardText">{this.state.appointments}</p>
                                        </div>




                                    </div>
                                </div>
                                </div>
                                </div>
        )
    }

return (
    <div>Loading</div>
)
}
}
export default Dashboard