import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container,Row,Col } from 'reactstrap'
import ExampleEvent from '../confirmation/PrintEvent'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'

import Alert from '../hoc/Alert/Alert'

class ConfirmationEvent extends Component{
    constructor (props) {
        super(props)
        const {  firstName, lastName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data; 
        const {h1}=JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;
        const { state: historyState } = props.location

        const { event } = {...historyState}

        console.log('props from the confiramtion page', event)
    
        const { _id, citizenPhone, citizenName, citizenAddress, citizenPincode, recommendedName, recommendedNumber, inviteeName, eventTitle, eventType, subType, location, city, eventDate, time, duration, invitation, isImportant, pressIntimation, status, comments, createdBy, createdOn } = { ...event.request }
        const { ref } = { ...event }

        this.state = {
            data:event,
            history:this.props.history,
            client: h1 ,
            event: ref,
            date:  convertISOToDateTime(createdOn),
            username:`${firstName}`,
            inviteedetail:`${citizenName}, +91${citizenPhone}, ${citizenPincode}`,
            recommendedName : recommendedName,
            eventdate: convertISOToDate(eventDate),
            eventtime: time,
            eventtitle: eventTitle,
            eventtype: eventType,
            location: location,
            city: city,
            duration: duration,
            invitation:invitation,
            important: isImportant ? 'Yes': 'No',
            status: status,
            press: pressIntimation,
            comments: comments
        }

        console.log('here is the state from ', this.state)

      }
    render(){

        let printEvent = (
            <ExampleEvent 
                client={this.state.client}
                event= {this.state.event}
                date= {this.state.date}
                username= {this.state.username}
                inviteedetail= {this.state.inviteedetail}
                recommendedName={this.state.recommendedName}
                eventtime={this.state.eventtime}
                eventdate={this.state.eventdate}
                eventtitle={this.state.eventtitle}
                eventtype={this.state.eventtype}
                duration={this.state.duration}
                city={this.state.city}
                location={this.state.location}
                status= {this.state.status}
                invitation= {this.state.invitation}
                important= {this.state.important}
                press={this.state.press}
                comments= {this.state.comments}
                data= {this.state.data}
                history={this.state.history}/>
        )

        console.log('event props' ,this.props.location.search)

        let message = this.props.location.search === '?event-updated' ? 'Event Updated' : 'Your Event Request Number'

        return(
            <div className="NewClientForm">
                <Header />
                {
                    this.props.location.search === '?show-event' ? printEvent :
                    <Alert alertMsg={ message } referenceNumber={this.state.event} buttonName='View'>
                        { printEvent }
                    </Alert>
                }
            </div>
        )
    }
}
export default ConfirmationEvent
