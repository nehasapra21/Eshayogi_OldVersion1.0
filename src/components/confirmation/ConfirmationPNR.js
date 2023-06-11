import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExamplePNR from './PrintPNR'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'


class ConfirmationPNR extends Component{
    constructor (props) {
        super(props)

        const {  firstName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data; 
        const {h1}=JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;

        const { state: historyState } = props.location

        const { PNR } = {...historyState}
        console.log("Clicked",PNR.request)

    
        const { location, to, category, dateOfJourney, date, trainNumber, pnr, passengerName,
            sectorFrom, sectorTo, ticketClass, signedBy, mobileNumber, digitalSignature  } = {...PNR.request}
        
            const {ref}= {...PNR}
        console.log('this is my props', this.props)

        this.state = {
            history:this.props.history,
            client: h1,
            data:PNR,
            ref, location, to, category, dateOfJourney, date, trainNumber, pnr, passengerName,
            sectorFrom, sectorTo, ticketClass, signedBy, mobileNumber, digitalSignature
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
        console.log(this.state,"yyy")

        let message = this.props.location.search === '?updated-PNR' ? 'PNR Updated' : 'Your Complaint Number'
        
        let printComponent = (
            <ExamplePNR 
                client= {this.state.client}
                location= {this.state.location}
                to= {this.state.to}
                category= {this.state.category}
                dateOfJourney= {this.state.dateOfJourney}
                date= {this.state.date}
                trainNumber= {this.state.trainNumber}
                passengerName= {this.state.passengerName}
                pnr= {this.state.pnr}
                sectorFrom= {this.state.sectorFrom}
                sectorTo= {this.state.sectorTo}
                mobileNumber= {this.state.mobileNumber}
                data= {this.state.data}
                history={this.state.history} />
        )


        return(
            <div className="NewClientForm">
                <Header />
                {
                    this.props.location.search === '?show-PNR' ? printComponent : <Alert alertMsg = { message }  buttonName='View'>
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
export default ConfirmationPNR
