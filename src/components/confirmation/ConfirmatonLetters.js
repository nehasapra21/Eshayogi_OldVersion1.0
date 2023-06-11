import React, { Component } from 'react'
import './Confirmation.css'
import Esahiyogi from '../../utils/images/esahyogiblue.svg'
import Header from '../header/Header'
import { Container, Row, Col } from 'reactstrap'
import ExampleLetters from './PrintLetters'
import { convertISOToDate, convertISOToDateTime } from '../../utils/dateTime'
import Alert from '../hoc/Alert/Alert'


class ConfirmationLetters extends Component{
    constructor (props) {
        super(props)

        const {  firstName } = JSON.parse(localStorage.getItem('eSahyogiUser')).data; 
        const {h1}=JSON.parse(localStorage.getItem('eSahyogiUser')).data.org;

        const { state: historyState } = props.location

        const { Letters } = {...historyState}
        console.log("Clicked",Letters.request)

    
        const { to, from, date, subject, digitalSignature } = {...Letters.request}
        
            const {ref}= {...Letters}
        console.log('this is my props', this.props)

        this.state = {
            history:this.props.history,
            client: h1,
            data:Letters,
            ref, to, from, subject, date, digitalSignature
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
       
        

        let message = this.props.location.search === '?updated-Letter' ? 'Letter Updated' : 'Your Complaint Number'
        console.log(this.state.data,"yyy")
        let printComponent = (
            
            <ExampleLetters 
                client={this.state.client}
                ref={this.state.ref}
                from={this.state.from}
                to={this.state.to}
                subject={this.state.subject}
                date={this.state.date}
                data= {this.state.data}
                digitalSignature={this.state.digitalSignature}
                history={this.state.history} />
        )


        return(
            <div className="NewClientForm">
                <Header />
                {
                    this.props.location.search === '?show-Letter' ? printComponent : 
                        printComponent
                }
                

            </div>
        )
        /*}
        return (
            <div>Loading</div>
        )*/
        
    }
}
export default ConfirmationLetters
