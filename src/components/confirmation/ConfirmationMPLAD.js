import React, { Component } from 'react'
import './Confirmation.css'
import Header from '../header/Header'
import ExampleMPLAD from '../confirmation/PrintMPLAD'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'


class ConfirmationMPLAD extends Component{
    constructor (props) {
        super(props)

        const {  firstName, lastName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data; 
        const {h1}=JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;

        const { state: historyState } = props.location

        const { MPLAD } = {...historyState}
        console.log("Clicked",MPLAD)

    
        const {  citizenName, citizenMobileNumber, citizenPincode, attachments, vidhanSabha, gramPanchayat, workName, recommendationAmount, financialSanctionAmount, utilizationAmount, doctrailAmount, doctrailScheme, totalProjectCost, status,sanctionDate, selected, remarks, createdOn
        } = {...MPLAD.request}
        const {ref}={...MPLAD}
        console.log(ref,"number")
        
        console.log('this is my props', this.props)

        this.state = {
            data:MPLAD,
            history:this.props.history,
            client: h1,
            MPLAD: ref,
            date: convertISOToDateTime(createdOn),
            username: `${firstName}`,
            complainant: `${citizenName}, +91${citizenMobileNumber}, ${citizenPincode}`,
            vidhanSabha,
            gramPanchayat,
            workName,
            sanctionDate: convertISOToDateTime(sanctionDate),
            recommendationAmount,
            financialSanctionAmount,utilizationAmount,doctrailAmount,doctrailScheme,totalProjectCost,
            status: status,
            attachment: attachments,
            remarks

        }

        console.log('here is the state from ', this.state)

      }


    componentDidMount() {
        const { client} = this.state;

        
            console.log('Here is the confiramtion page state', this.state)
            //alert(this.state)
            //this.props.history.push('/home')
        
    }
 
    render(props){

        const { client } = this.state;

        let message = this.props.location.search === '?updated-MPLAD' ? 'MPLAD Updated' : 'Your MPLAD Number'
        
        let printComponent = (
            <ExampleMPLAD 
                client={this.state.client}
                MPLAD= {this.state.MPLAD}
                date= {this.state.date}
                username= {this.state.username}
                complainant= {this.state.complainant}
                vidhanSabha={this.state.vidhanSabha}
                gramPanchayat={this.state.gramPanchayat}
                workName={this.state.workName}
                sanctionDate={this.state.sanctionDate}
                recommendationAmount={this.state.recommendationAmount}
                utilizationAmount={this.state.utilizationAmount}
                financialSanctionAmount={this.state.financialSanctionAmount}
                doctrailScheme={this.state.doctrailScheme}
                doctrailAmount={this.state.doctrailAmount}
                totalProjectCost={this.state.totalProjectCost}
                status= {this.state.status}
                attachment= {this.state.attachment}
                remarks= {this.state.remarks}
                data= {this.state.data}
                history={this.state.history} />
        )


        return(
            <div className="NewClientForm">
                <Header />
                {
                    this.props.location.search === '?show-MPLAD' ? printComponent : <Alert alertMsg = { message } referenceNumber={this.state.MPLAD} buttonName='View'>
                        { printComponent }
                    </Alert>
                }
                

            </div>
        )
        /*}
        return (
            <div>Loading</div>
        )*/
        
    }
}
export default ConfirmationMPLAD
