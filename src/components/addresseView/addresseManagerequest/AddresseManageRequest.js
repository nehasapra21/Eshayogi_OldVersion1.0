import React, { Component } from 'react'
import Complaintb from '../../../utils/images/bmanagecomplaint.svg'
import Eventb from '../../../utils/images/manageeventB.svg'
import Appointmentb from '../../../utils/images/manageappointmentB.svg'
import Jobb from '../../../utils/images/managejobB.svg'
import Print from '../../../utils/images/print.svg'
import Header from '../addresseHeader/AddresseHeader'
import Search from '../../../utils/images/search.svg'
import ManageComplaint from '../../managerequest/ManageComplaint'
import ManageJob from '../../managerequest/ManageJob'
import ManageEvents from '../../managerequest/ManageEvents'
import ManageAppointments from '../../managerequest/ManageAppointments'
import '../../managerequest/ManageRequest.css'
import api from '../../../utils/addresse_api'
import CopyrightFooter from '../../footer/CopyrightFooter'
import BottomNavigation from '../../header/BottomNavigation'
import Footer from '../../footer/Footer'
import IconFooter from '../../footer/IconFooter'



class ManageRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            manage: "COMPLAINT",
            requestStatus: "",
            isLoading: true,
            search: "",
            allComplaints: [],
            COMPLAINT: [],
            allJobs:[],
            JOB: [],
            allAppointments:[],
            APPOINTMENT: [],
            allEvents:[],
            EVENT: [],
            page: "0"

        };

    }
    componentDidMount() {
        const { search, manage, requestStatus } = { ...this.state }

        api.getRequests({
            search: `${search}`,
            limit: "20",
            offset: "0",
            typeOfRequest: `${manage}`,
            dd: "20",
            mm: "09",
            yy: "2020",
            status: `${requestStatus}`
        }).then((response) => {
            if (response.ok) {
                this.setState({ COMPLAINT: response.data.data.rows, isLoading: false, allComplaints: response.data.data.rows });
                localStorage.setItem(`${manage}`, JSON.stringify(response.data))
            }
            else {
                console.log('something error occured ', response);
            }
        },
            (err) => {
                console.log('err is', err)
            })


    }

    handlePagination = page => {
        if(this.state.manage==="COMPLAINT")
        {
            console.log('Before Complaints ', this.state.COMPLAINT)

            let newArray = this.state.allComplaints.map(x => x)
            newArray = newArray.slice((page - 1) * 5, 5 * page)
            this.setState({ COMPLAINT: newArray })

            console.log('After Complaints ', this.state.COMPLAINT)

        }
        if(this.state.manage==="EVENT")
        {
        let newArray = this.state.allEvents.map(x => x)
        newArray = newArray.slice((page - 1) * 5, 5 * page)
        this.setState({ EVENT: newArray })
        }
        if(this.state.manage==="JOB")
        {
        let newArray = this.state.allJobs.map(x => x)
        newArray = newArray.slice((page - 1) * 5, 5 * page)
        this.setState({ JOB: newArray })
        }
        if(this.state.manage==="APPOINTMENT")
        {
        let newArray = this.state.allAppointments.map(x => x)
        newArray = newArray.slice((page - 1) * 5, 5 * page)
        this.setState({ APPOINTMENT: newArray })
        }
    }
    handleChange(event, manage) {

        // Get event value
        let searchValue = event.target.value;

        // Set the state to trigger a re-rendering
        this.setState({ search: searchValue });
        console.log(this.state.search, "value")
        if (manage === "COMPLAINT") {
            this.fetchComplaints(searchValue, this.state.requestStatus, this.state.manage)
        }
        if (manage === "JOB") {
            this.fetchJobs(searchValue, this.state.requestStatus, this.state.manage)
        }
        if (manage === "EVENT") {
            this.fetchEvents(searchValue, this.state.requestStatus, this.state.manage)
        }
        if (manage === "APPOINTMENT") {
            this.fetchAppointments(searchValue, this.state.requestStatus, this.state.manage)
        }
    }
    fetchComplaints(search, requestStatus, manage) {
        this.setState({ manage: "COMPLAINT" })
        api.getRequests({
            search: `${search}`,
            limit: "20",
            offset: "0",
            typeOfRequest: "COMPLAINT",
            dd: "20",
            mm: "09",
            yy: "2020",
            status: `${requestStatus}`
        }).then((response) => {
            if (response.ok) {
                this.setState({ COMPLAINT: response.data.data.rows, isLoading: false, allComplaints: response.data.data.rows }, () => { console.log(this.state.COMPLAINT) });

            }
            else {
                console.log('something error occured ', response);
            }
        },
            (err) => {
                console.log('err is', err)
            })
    }
    fetchJobs(search, requestStatus, manage) {
        this.setState({ manage: "JOB" })
        api.getRequests({
            search: `${search}`,
            limit: "20",
            offset: "0",
            typeOfRequest: "JOB",
            dd: "20",
            mm: "09",
            yy: "2020",
            status: `${requestStatus}`
        }).then((response) => {
            if (response.ok) {
                this.setState({ JOB: response.data.data.rows, isLoading: false,allJobs:response.data.data.rows }, () => { console.log(this.state.JOB) });
            }
            else {
                console.log('something error occured ', response);
            }
        },
            (err) => {
                console.log('err is', err)
            })
    }
    fetchEvents(search, requestStatus, manage) {
        this.setState({ manage: "EVENT" })
        api.getRequests({
            search: `${search}`,
            limit: "20",
            offset: "0",
            typeOfRequest: 'EVENT',
            dd: "20",
            mm: "09",
            yy: "2020",
            status: `${requestStatus}`
        }).then((response) => {
            if (response.ok) {
                console.log('Event Response', response)
                this.setState({ EVENT: response.data.data.rows, isLoading: false, allEvents:response.data.data.rows }, () => { console.log(this.state.EVENT) });

            }
            else {
                console.log('something error occured ', response);
            }
        },
            (err) => {
                console.log('err is', err)
            })
    }
    fetchAppointments(search, requestStatus, manage) {
        this.setState({ manage: "APPOINTMENT" })
        api.getRequests({
            search: `${search}`,
            limit: "20",
            offset: "0",
            typeOfRequest: "APPOINTMENT",
            dd: "22",
            mm: "09",
            yy: "2020",
            status: `${requestStatus}`
        }).then((response) => {
            if (response.ok) {
                this.setState({ APPOINTMENT: response.data.data.rows, isLoading: false, allAppointments: response.data.data.rows }, () => { console.log(this.state.APPOINTMENT) });

            }
            else {
                console.log('something error occured ', response);
            }
        },
            (err) => {
                console.log('err is', err)
            })
    }
    handleFilter(status) {
        console.log("Filter Working")
        if (this.state.manage === "COMPLAINT") {
            if(status==="")
            {
                this.setState({COMPLAINT:this.state.allComplaints})
            }
            else{
            let newArray = []
            {
                this.state.allComplaints.map((request, index) => (
                    request.status === status ? newArray.push(request) : newArray.push(),
                    console.log(request.status, status, "HEX")
                ))
            }
            console.log(newArray, "HEX")
            this.setState({ COMPLAINT: newArray,COMPLAINT:newArray }, () => { console.log(this.state.COMPLAINT) });
        }
        }
        if (this.state.manage === "JOB") {
            if(status==="")
            {
                this.setState({JOB:this.state.allJobs})
            }
            else
            {
            var newArray = []
            {
                this.state.allJobs.map((request, index) => (
                    request.status === status ? newArray.push(request) : newArray.push()
                ))
            }
            this.setState({ JOB: newArray })
        }


        }
        if (this.state.manage === "EVENT") {
            if(status==="")
            {
                this.setState({EVENT:this.state.allEvents})
            }
            else{
            var newArray = []

            {
                this.state.allEvents.map((request, index) => (
                    request.status === status ? newArray.push(request) : newArray.push()
                ))
            }
            this.setState({ EVENT: newArray })
        }


        }
        if (this.state.manage === "APPOINTMENT") {
            if(status==="")
            {
                this.setState({APPOINTMENT:this.state.allAppointments})
            }
            else{
            var newArray = []

            {
                this.state.allAppointments.map((request, index) => (
                    request.status === status ? newArray.push(request) : newArray.push()
                ))
            }
            this.setState({ APPOINTMENT: newArray,APPOINTMENT: newArray })
        }

        }
    
    }


    render() {
        var { isLoading, requestStatus, manage, search } = this.state






        if (!isLoading) {
            return (
                <div className="NewClientForm">
                    <Header />
                    <div className="frame2" style={{ paddingBottom : '150px' }}>
                        <div className="FormOuterFrame">
                            <div className="Manageupper">
                                <div className="ManageTabLayout">

                                    <div className="UpperTabLayout">
                                        <div className="UpperTabItem"
                                            onClick={
                                                () => { this.setState({ manage : 'COMPLAINT' }) },
                                                () => { this.fetchComplaints(search, requestStatus, manage) }}>
                                            <img src={Complaintb} alt="" className="UpperTabIcon" />
                                            <p className={manage === "COMPLAINT" ? "UpperTabTxt active" : "UpperTabTxt"}>Complaint</p>
                                        </div>
                                        <div className="UpperTabItem"
                                            onClick={
                                                () => { this.setState({ manage : 'JOB' }) },
                                                () => { this.fetchJobs(search, requestStatus, manage) }}>
                                            <img src={Jobb} alt="" className="UpperTabIcon" />
                                            <p className={manage === "JOB" ? "UpperTabTxt active" : "UpperTabTxt"}>Job</p>
                                        </div>
                                        <div className="UpperTabItem"
                                            onClick={
                                                () => { this.setState({ manage: "EVENT" }) },
                                                () => { this.fetchEvents(search, requestStatus, manage) }}>
                                            <img src={Eventb} alt="" className="UpperTabIcon" />
                                            <p className={manage === "EVENT" ? "UpperTabTxt active" : "UpperTabTxt"}>Events</p>

                                        </div>
                                        <div className="UpperTabItem"
                                            onClick={
                                                () => { this.setState({ manage: "APPOINTMENT" }) },
                                                () => { this.fetchAppointments(search, requestStatus, manage) }}>
                                            <img src={Appointmentb} alt="" className="UpperTabIcon" />
                                            <p className={manage === "APPOINTMENT" ? "UpperTabTxt active" : "UpperTabTxt"}>Appointment</p>

                                        </div>
                                    </div>
                                    <div className="PrintTabItem">
                                        <p className="PrintTabTxt">Print</p>
                                        <img src={Print} alt="" className="PrintTabIcon" />
                                    </div>

                                </div>
                                <div className="underline" />
                                <div className="UpperTabLayout">
                                    <div
                                        className={requestStatus === "" ? "StatusFilter statusAll" : "StatusFilter"}
                                        onClick={() => { this.setState({ requestStatus: "" }, this.handleFilter("")) }}>
                                        <p className={requestStatus === "" ? "StatusTxt whiteTxt" : "StatusTxt"}>All</p>
                                    </div>
                                    
                                    {this.state.manage === "COMPLAINT" ?
                                        <div
                                            className={requestStatus === "ASSIGNED" ? "StatusFilter statusAssigned" : "StatusFilter"}
                                            onClick={() => { this.setState({ requestStatus: "ASSIGNED" }, this.handleFilter("ASSIGNED")) }}>
                                            <p className={requestStatus === "ASSIGNED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Assigned</p>
                                        </div> : <div />}
                                    {this.state.manage === "COMPLAINT" ?
                                        <div
                                            className={requestStatus === "SOLVED" ? "StatusFilter statusSolved" : "StatusFilter"}
                                            onClick={() => { this.setState({ requestStatus: "SOLVED" }, this.handleFilter("SOLVED")) }}>
                                            <p className={requestStatus === "SOLVED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Solved</p>
                                        </div> : <div />}
                                    {this.state.manage === "COMPLAINT" ?
                                        <div
                                            className={requestStatus === "UNSUCCESSFUL" ? "StatusFilter statusUnsuccessful" : "StatusFilter"}
                                            onClick={() => { this.setState({ requestStatus: "UNSUCCESSFUL" }, this.handleFilter("UNSUCCESSFUL")) }}>
                                            <p className={requestStatus === "UNSUCCESSFUL" ? "StatusTxt whiteTxt" : "StatusTxt"}>Unsuccessful</p>
                                        </div> : <div />}
                                    {this.state.manage === "JOB" ?
                                        <div
                                            className={requestStatus === "SHARED" ? "StatusFilter statusShared" : "StatusFilter"}
                                            onClick={() => { this.setState({ requestStatus: "SHARED" }, this.handleFilter("SHARED")) }}>
                                            <p className={requestStatus === "SHARED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Shared</p>
                                        </div> : <div />}
                                    {this.state.manage === "JOB" ?
                                        <div
                                            className={requestStatus === "PLACED" ? "StatusFilter statusPlaced" : "StatusFilter"}
                                            onClick={() => { this.setState({ requestStatus: "PLACED" }, this.handleFilter("PLACED")) }}>
                                            <p className={requestStatus === "PLACED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Placed</p>
                                        </div> : <div />}
                                    {this.state.manage === "JOB" ?
                                        <div
                                            className={requestStatus === "REJECTED" ? "StatusFilter statusRejected" : "StatusFilter"}
                                            onClick={() => { this.setState({ requestStatus: "REJECTED" }, this.handleFilter("REJECTED")) }}>
                                            <p className={requestStatus === "REJECTED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Rejected</p>
                                        </div> : <div />}

                                    {this.state.manage === "EVENT" || this.state.manage === "APPOINTMENT" ?
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div
                                                className={requestStatus === "SCHEDULED" ? "StatusFilter statusScheduled" : "StatusFilter"}
                                                onClick={() => { this.setState({ requestStatus: "SCHEDULED" }, this.handleFilter("SCHEDULED")) }}>
                                                <p className={requestStatus === "SCHEDULED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Scheduled</p>
                                            </div>
                                            <div
                                                className={requestStatus === "ATTENDED" ? "StatusFilter statusAttended" : "StatusFilter"}
                                                onClick={() => { this.setState({ requestStatus: "ATTENDED" }, this.handleFilter("ATTENDED")) }}>
                                                <p className={requestStatus === "ATTENDED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Attended</p>
                                            </div>
                                            <div
                                                className={requestStatus === "REJECTED" ? "StatusFilter statusRejected" : "StatusFilter"}
                                                onClick={() => { this.setState({ requestStatus: "REJECTED" }, this.handleFilter("REJECTED")) }}>
                                                <p className={requestStatus === "REJECTED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Rejected</p>
                                            </div>
                                            <div
                                                className={requestStatus === "DELEGATED" ? "StatusFilter statusDelegated" : "StatusFilter"}
                                                onClick={() => { this.setState({ requestStatus: "DELEGATED" }, this.handleFilter("DELEGATED")) }}>
                                                <p className={requestStatus === "DELEGATED" ? "StatusTxt whiteTxt" : "StatusTxt"}>Delegated</p>
                                            </div>
                                            <div
                                                className={requestStatus === "DISCUSS" ? "StatusFilter statusDiscuss" : "StatusFilter"}
                                                onClick={() => { this.setState({ requestStatus: "DISCUSS" }, this.handleFilter("DISCUSS")) }}>
                                                <p className={requestStatus === "DISCUSS" ? "StatusTxt whiteTxt" : "StatusTxt"}>Discuss</p>
                                            </div>
                                        </div> : <div />}



                                </div>
                                <div className="SearchDivLayout">
                                    <input
                                        type="text"
                                        placeholder="Search Requests (Name,Mobile Number)"
                                        className="SearchInput"
                                        onChange={(e) => { this.handleChange(e, manage) }} />
                                    <img src={Search} alt="" className="SearchIcon" />

                                </div>

                            </div>

                            { console.log(this.state.COMPLAINT, "HEXXX") }

                            <div>
                                { console.log('History: ', this.props.history) }
                                {this.state.manage === "COMPLAINT" ? <ManageComplaint complaints={this.state.COMPLAINT.slice(0, 5)} statusFilter={this.state.requestStatus} history={this.props.history} handlePagination={this.handlePagination} count={
                                    (this.state.requestStatus === ''
                                        ? this.state.allComplaints
                                        : this.state.allComplaints.filter(
                                            x =>{
                                                console.log('this is x: ', x)
                                                return(
                                                    x.status === this.state.requestStatus
                                                )
                                            }
                                        )
                                    ).length
                                } /> : <div />}
                                {this.state.manage === "JOB" ? <ManageJob jobs={this.state.JOB.slice(0,5)} statusFilter={this.state.requestStatus} history={this.props.history} handlePagination={this.handlePagination} count={
                                    (this.state.requestStatus === ''
                                        ? this.state.allJobs
                                        : this.state.allJobs.filter(
                                            x => x.status === this.state.requestStatus
                                        )
                                    ).length
                                }/> : <div />}
                                {this.state.manage === "EVENT" ? <ManageEvents events={this.state.EVENT.slice(0,5)} statusFilter={this.state.requestStatus} history={this.props.history} handlePagination={this.handlePagination} count={
                                    (this.state.requestStatus === ''
                                        ? this.state.allEvents
                                        : this.state.allEvents.filter(
                                            x => x.status === this.state.requestStatus
                                        )
                                    ).length
                                }/> : <div />}
                                {this.state.manage === "APPOINTMENT" ? <ManageAppointments appointments={this.state.APPOINTMENT.slice(0,5)} statusFilter={this.state.requestStatus} history={this.props.history} handlePagination={this.handlePagination} count={
                                    (this.state.requestStatus === ''
                                        ? this.state.allAppointments
                                        : this.state.allAppointments.filter(
                                            x => x.status === this.state.requestStatus
                                        )
                                    ).length
                                }/> : <div />}
                            </div>
                        </div>
                        {
                            window.innerWidth < 480 ? 
                            <BottomNavigation/>
                            :
                            <div className='DashboardFooter'>
                                <IconFooter />
                                <Footer />
                                <CopyrightFooter />
                            </div>
                        }
                    </div>

                </div>
            )
        }
        return (
            <div>Loading</div>
        )
    }
}
export default ManageRequest
