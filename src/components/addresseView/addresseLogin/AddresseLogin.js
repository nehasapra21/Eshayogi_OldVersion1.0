import React, { Component } from 'react'
import '../login/Login.css'
import Footer from '../footer/Footer'
import Esahyogi from '../../utils/images/esahyogiwhite.svg'
import IconFooter from '../footer/IconFooter'
import CopyrightFooter from '../footer/CopyrightFooter'
import api from '../../../utils/addresse_api'
import { Helmet } from 'react-helmet'
import  Alert  from '../Alert'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneno: "",
            password: ""
        };
    }
    

    loginRequest(credentials) {
        const { phoneno, password } = credentials;
        api.postLogin({ mobileNumber: phoneno, password: password }).then(
            (response) => {
                console.log(response,"mom")
                if (response.ok) {
                    const { role, emailId, token } = response.data.data;
                    console.log(role,"hello")
                    if (role==='ADMIN'  || role==='USER') {
                       
                        api.setTokenHeader(token)
                        localStorage.setItem('eSahyogiUser', JSON.stringify(response.data))
                        localStorage.setItem('HomePage', JSON.stringify(response.data.data.org))
                        
                        this.props.history.push({
                            pathname: '/home',
                            state: { data: response.data.data.org }})
                        return(<Alert />)
                }
                else {
                    alert('Wrong Credentials')
                }

            }
        }
        )
    }


    

    render() {

        const login = (event) => {
            event.preventDefault();
            this.loginRequest(this.state);
        }

        return (
            window.innerWidth > 480
                ?
                <>
                    <div className="Backgroundframe">
                        <div className="frame">
                            <div className="LoginframeBackground">
                                <div className="Loginframe">

                                    <div className="Leftframe" >
                                        <div className="LeftFrameData">
                                        <p className="TxtWelcomeLogin">Welcome to</p>
                                        <img src={Esahyogi} alt="" className="ImgEsahyogi" />
                                        </div>
                                    </div>


                                    <div className="Rightframe">
                                        <form onSubmit={login} className="RightFrameForm">
                                           
                                            <p className="TxtPhoneno">Phone No.</p>
                                            <input
                                                type="tel"
                                                className="InputPhoneno"
                                                pattern="[0-9]{10}"
                                                value={this.state.phoneno}
                                                maxLength="10"
                                                minLength="10"
                                                onChange={(e) => { this.setState({ phoneno: e.target.value }) }}
                                                required />
                                            <p className="TxtPhoneno">Password</p>
                                            <input
                                                type="password"
                                                className="InputPhoneno"
                                                value={this.state.password}
                                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                                required />
                                            <button type="submit" className="BtnLogin">Login</button>

                                            <p className="TxtHelp"><a className="anchor" href="www.esahyogi.theideazfactory.com/help" >Facing trouble?Contact Help</a></p>

                                        </form>
                                    </div>

                                </div>

                            </div>
                            <div className='DashboardFooter'>
                                <IconFooter />
                                <Footer />
                                <CopyrightFooter />
                            </div>
                            
                        </div>
                        <div className="emptyDiv"/>
                    </div>
                </>
                :
                <>
                    <div className="Backgroundframe">
                        <div className="Loginframe">

                            <div className="Leftframe" >
                                <img src={Esahyogi} alt="" className="ImgEsahyogi" />
                            </div>


                            <div className="Rightframe" >
                                <p className="TxtWelcomeMobile">Welcome to eSahyogi</p>
                                <p className="TxtPhoneno">Phone No.</p>
                                <input
                                    type="tel"
                                    className="InputPhoneno"
                                    pattern="[0-9]{10}"
                                    value={this.state.phoneno}
                                    maxLength="10"
                                    minLength="10"
                                    onChange={(e) => { this.setState({ phoneno: e.target.value }) }}
                                    required />
                                <p className="TxtPhoneno">Password</p>
                                <input
                                    type="password"
                                    className="InputPhoneno"
                                    value={this.state.password}
                                    onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                <button type="button" onClick={login} className="BtnLogin">Login</button>

                            </div>
                            <p className="TxtHelp"><a className="anchor" href="www.esahyogi.theideazfactory.com/help" >Facing trouble?Contact Help</a></p>


                        </div>
                    </div>
                </>
        )
    }
}
export default Login;
