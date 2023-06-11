import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container,Row,Col } from 'reactstrap'
import ExampleEvent from './PrintPoliticalEvent'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'

import Alert from '../hoc/Alert/Alert'

class ConfirmationPoliticalEvent extends Component{
    constructor (props) {
        super(props)
        const {  firstName, lastName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data; 
        const {h1}=JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;
        const { state: historyState } = props.location

        const { event } = {...historyState}

        console.log('props from the confiramtion page', event)
    
        const { _id, citizenPhone, citizenName, citizenAddress, citizenPincode,
            referenceFirstName,referenceLastName,
            inviteeName, eventTitle, eventType, subType, location, city, eventDate, time, duration, invitation, isImportant, pressIntimation, status, comments, createdBy, createdOn,block,gramPanchayat,vidhanSabha   } = {...event.request}
            const {ref}={...event}

        this.state = {
            data:event,
            history:this.props.history,
        client: h1 ,
            event: ref,
          date:  convertISOToDateTime(createdOn),
          username:`${firstName}`,
          inviteedetail:`${citizenName}, +91${citizenPhone}, ${citizenPincode}`,
          referenceof:`${referenceFirstName} ${referenceLastName}`,
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
          comments: comments,
          block:block,
          gramPanchayat:gramPanchayat,
          vidhanSabha:vidhanSabha
        }

        console.log('here is the state from ', this.state)

      }
    render(){

        let printPoliticalEvent = (
            <ExampleEvent 
                client={this.state.client}
                event= {this.state.event}
                date= {this.state.date}
                username= {this.state.username}
                inviteedetail= {this.state.inviteedetail}
                referenceof={this.state.referenceof}
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
                block= {this.state.block}
                vidhanSabha= {this.state.vidhanSabha}
                gramPanchayat= {this.state.gramPanchayat}
                history={this.state.history}/>
        )

        console.log('event props' ,this.props.location.search)

        let message = this.props.location.search === 'politicalevent-updated' ? 'Political Event Updated' : 'Your Political Event Request Number'

        return(
            <div className="NewClientForm">
                <Header />
                {
                    this.props.location.search === '?show-politicalevent' ? printPoliticalEvent :
                    <Alert alertMsg={ message } referenceNumber={this.state.event} buttonName='View'>
                        { printPoliticalEvent }
                    </Alert>
                }
            </div>
        )
    }
}
export default ConfirmationPoliticalEvent
