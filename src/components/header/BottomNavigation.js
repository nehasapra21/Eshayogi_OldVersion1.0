import React, { Component } from 'react'
import Home from '../../utils/images/home.svg'
import Dashboard from '../../utils/images/dashboard.svg'
import Request from '../../utils/images/request.svg'
import Account from '../../utils/images/account.svg'
import HomeGrey from '../../utils/images/homeGrey.svg'
import DashboardGrey from '../../utils/images/dashboardGrey.svg'
import RequestGrey from '../../utils/images/requestGrey.svg'
import AccountGrey from '../../utils/images/accountGrey.svg'
import { Link } from 'react-router-dom'

class BottomNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            section:''
        }
    }
    render()
    {
        return(
        <div>
            <div className="DivTabframe2">
                <Link to={'/home'} className="home-link">
                <div className="DivTabitem" onMouseOver={()=>{this.setState({section:'home'})}}
                onMouseOut={()=>{this.setState({section:''})}}>
                <img src={this.state.section === 'home'|| window.location.pathname === '/home' ? Home : HomeGrey} alt="" className="ImgTabIcon"/>
                <p className={this.state.section === 'home'|| window.location.pathname === '/home' ? 'TxtGreenTabIcon' : 'TxtNonSelectedIcon'}>HOME</p>
                </div>
                </Link>
                
                <Link to={'/dashboard'} className="home-link">
                <div className="DivTabitem" onMouseOver={()=>{this.setState({section:'dashboard'})}}
                onMouseOut={()=>{this.setState({section:''})}}>
                <img src={this.state.section === 'dashboard'|| window.location.pathname === '/dashboard' ? Dashboard : DashboardGrey} alt="" className="ImgTabIcon"/>
                <p className={this.state.section === 'dashboard'|| window.location.pathname === '/dashboard' ? 'TxtGreenTabIcon' : 'TxtNonSelectedIcon'}>DASHBOARD</p>
                </div>
                </Link>
                <div className="DivTabframe2">
                <Link to={''} className="home-link">
                <div className="DivTabitem" onMouseOver={()=>{this.setState({section:'request'})}}
                onMouseOut={()=>{this.setState({section:''})}}>
                <img src={this.state.section === 'request'|| window.location.pathname === '/request' ? Request : RequestGrey} alt="" className="ImgTabIcon"/>
                <p className={this.state.section === 'request'|| window.location.pathname === '/request' ? 'TxtGreenTabIcon' : 'TxtNonSelectedIcon'}>REQUESTS</p>
                </div>
                </Link>
                
                <Link to={''} className="home-link">
                <div className="DivTabitem" onMouseOver={()=>{this.setState({section:'account'})}}
                onMouseOut={()=>{this.setState({section:''})}}>
                <img src={this.state.section === 'account'|| window.location.pathname === '/account' ? Account : AccountGrey} alt="" className="ImgTabIcon"/>
                <p className={this.state.section === 'account'|| window.location.pathname === '/account' ? 'TxtGreenTabIcon' : 'TxtNonSelectedIcon'}>Account</p>
                </div>
                </Link>
                </div>
        </div>
        </div>
        )
    }
}
export default BottomNavigation;