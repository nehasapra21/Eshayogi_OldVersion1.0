import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container,Row,Col } from 'reactstrap'
import ExampleJob from '../confirmation/PrintJob'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'

import Alert from '../hoc/Alert/Alert'
import { PrintContextConsumer } from 'react-to-print'

class ConfirmationJob extends Component{
    constructor (props) {
        super(props)

        const {  firstName, lastName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data; 
        const {h1}=JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;const { state: historyState } = props.location
        const { job } = {...historyState}
        console.log(job,"hey")
        const {  citizenPhone, citizenName, citizenAddress, citizenPincode, recommendedName, recommendedNumber, currentlyEmployed, lastMonthlySalary, experienceYears, experienceMonths, highestEduQualification, isImportant, invitation, professionalQualification, sharedToName, sharedToDesignation, sharedToNumber, sharedToOrganisation, status, comments, createdOn,   } = {...job.request}
        const {ref}= {...job}

        //currentlyEmployed: true
        this.state = {
            data:job,
            history:this.props.history,
        client:h1,
        jobreferalno: ref,
          date:  convertISOToDateTime(createdOn),
          username: `${firstName}`,
          complainant:`${citizenName}, +91${citizenPhone}, ${citizenPincode}`,
          recommendedName : recommendedName,
          employed: currentlyEmployed ? 'Yes': 'No',
          salary: lastMonthlySalary,
          education: highestEduQualification,
          resume: invitation,
          experience: `${experienceYears? experienceYears: '0 Years'} ${experienceMonths? experienceMonths: '0 Months'}`,
          important: isImportant ? 'Yes': 'No',
          status: status,
          comments: comments,
          highestEduQualification : highestEduQualification,
          professionalQualification : professionalQualification,
          sharedToDesignation : sharedToDesignation,
          sharedToName : sharedToName,
          sharedToNumber : sharedToNumber,
          sharedToOrganisation : sharedToOrganisation
        }

        console.log('here is the state from ', this.state)

      }

    componentDidMount() {
        const { client} = this.state;

        //if (!client) {
            console.log('Here is the confiramtion page state', this.state)
            //alert(this.state)
            //this.props.history.push('/home')
        //}
    }
    render(){
        const { client } = this.state;
        
        let printApplication = (
            <ExampleJob 
                client={this.state.client}
                job= {this.state.jobreferalno}
                date= {this.state.date}
                username= {this.state.username}
                complainant= {this.state.complainant}
                recommendedName={this.state.recommendedName}
                employment={this.state.employed}
                salary={this.state.salary}
                education={this.state.education}
                important={this.state.important}
                status={this.state.status}
                experience={this.state.experience}
                resume={this.state.resume}
                comments={this.state.comments}
                data= {this.state.data}
                history={this.state.history}
                highestEduQualification = { this.state.highestEduQualification }
                professionalQualification = { this.state.professionalQualification }
                sharedToDesignation = { this.state.sharedToDesignation }
                sharedToName = { this.state.sharedToName }
                sharedToNumber = { this.state.sharedToNumber }
                sharedToOrganisation = { this.state.sharedToOrganisation } />
        )

        let message = this.props.location.search === '?application-updated' ? 'Application Updated' : 'Your Job Application Number'

        return(
            <div className="NewClientForm">
                <Header />
                {
                    this.props.location.search === '?show-application' ? printApplication :
                    <Alert alertMsg={ message } referenceNumber={this.state.jobreferalno} buttonName='View'>
                        { printApplication }
                    </Alert>
                }

            </div>
        )
        }
        /*return (
            <div>Loading</div>
        )
    }*/
}
export default ConfirmationJob
