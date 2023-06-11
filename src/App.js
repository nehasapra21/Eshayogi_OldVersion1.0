import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import LoginPage from './components/login/Login'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import NewClient from './components/forms/newclient/NewClient'
import CitizenRegistration from './components/forms/citizenregistration/CitizenRegistration'
import PNR from './components/forms/PNR'
import MPLAD from './components/forms/MPLAD'
// eslint-disable-next-line no-unused-vars
import Letters from './components/forms/leters/letter'
import Complaint from './components/forms/complaint/Complaint'
import Home from './components/home/Home'
import Event from './components/forms/event/Event'
import NewUser from './components/forms/userform/UserForm'
import Appointment from './components/forms/appointment/Appointment'
import Job from './components/forms/job/Job'
import ConfirmationPNR from './components/confirmation/confirmPNR'
import ConfirmationLetters from './components/confirmation/confirmLetter'
import ConfirmationMPLAD from './components/confirmation/confirmMPLAD'
import ConfirmationComplaint from './components/confirmation/confirmComplaint'
import ConfirmationJob from './components/confirmation/confirmJob'
import ConfirmationAppointment from './components/confirmation/ConfirmationAppointment'
import ConfirmationEvent from './components/confirmation/confirmEvent'
import ConfirmationPoliticalEvent from './components/confirmation/confirmPoliticalEvent'
import Addressee from './components/forms/newaddressee/NewAddressee'
import Delegate from './components/forms/newdelegates/NewDelegates'
import Location from './components/forms/newlocation/NewLocation'
import ManageRequest from './components/managerequest/ManageRequest'
import ManageDatabase from './components/database/ManageDatabase'
import Dashboard from './components/dashboard/Dashboard'
import Policy from './components/PrivacyPolicy/PrivacyPolicy'

import UserAgreement from './components/UserAgreement/UserAgreement'

import Error404 from './components/Error/Error404'

import HelpCenter from './components/HelpCenter/HelpCenter'

import ConstituencyMain from './components/Constituency/ConstituencyMain'

import ManageConstituencyMain from './components/ManageConstituency/ManageConstituencyMain'

import AddKaryakarta from './components/Karykarta/AddKarykarta/AddKarykarta'

import ManageKaryakarta from './components/Karykarta/ManageKarykarta/ManageKarykarta'

import ConstituencyDashboard from './components/contituencyDashboard/constituencyDashboard'

import Birthday from './components/forms/Birthday'
import Condolence from './components/forms/Condolence'
import Anniversary from './components/forms/Anniversary'

import PrintBirthday from './components/confirmation/PrintOccasions/PrintBirthday'
import PrintWedding from './components/confirmation/PrintOccasions/PrintWedding'
import PrintCondolence from './components/confirmation/PrintOccasions/PrintCondolence'

import ManageOccassionMain from './components/ManageOccassions/ManageOccassionMain'
// import ManageCallingDirectory from './components/CallingDirectory.js/ManageDirectory'
// import AddCallingDirectory from './components/CallingDirectory.js/DirectoryForm'
import PoliticalEvent from './components/forms/politicalevent/PoliticalEvent'
import Map from './components/map/map'
import ManageBoothDetails from './components/boothDetails/BoothDetails'
import BoothDetailsForm from './components/boothDetails/BoothDetailsForm'
import Gallery from './components/gallery/Gallery'
import ProtectedRoute from './components/Protected'

import NewLetter from './components/forms/newLetter/letter'
import Editor from './components/forms/newLetter/letterEditor'
import AddFolder from './components/forms/addFolder/addFolder'
import ManageFolders from './components/manageFolders/manageFolders'
import VisitorForm from './components/Visitor/Visitor'
import ManageVisitor from './components/Visitor/ManageVisitor'

import CallerForm from './components/NewCallingDireactory/DirectoryForm'
import ManageDirectory from './components/NewCallingDireactory/ManageDirectory'

import MyDrive from './containers/My Drive/index'

class App extends Component {
  constructor() {
    super()
    document.addEventListener('DOMContentLoaded', function (event) {
      document.getElementById('firstloader').style.display = 'none'
    })
  }

  // componentDidMount = () => {
  //   document.addEventListener("DOMContentLoaded", function (event) {
  //     document.getElementById("firstloader").style.display = "none";
  //   });
  // };

  render() {
    // if (this.state.loading) {
    //   return null; //app is not ready (fake request is in process)
    // }
    if (
      window.location.pathname ===
      ('event' || 'job' || 'complaint' || 'dashboard')
    ) {
      var datalinks = '/dashboard'
    }

    return (
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose="1250"
          closeButton="false"
        />
        <Router>
          {/* IF you want to revert back to unauthorized system do following steps */}
          {/* First remove Protected.js libarary from this page
           *  Second REwrite ProtectedRoute as Route */}
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <ProtectedRoute
              exact
              path="/superadmin-section"
              component={NewClient}
            />
            <ProtectedRoute
              exact
              path="/citizen-registration"
              component={CitizenRegistration}
            />
            <ProtectedRoute exact path="/complaint" component={Complaint} />
            <ProtectedRoute exact path="/mplad" component={MPLAD} />
            <ProtectedRoute exact path="/letter" component={NewLetter} />
            <ProtectedRoute exact path="/PNR" component={PNR} />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/event" component={Event} />
            <ProtectedRoute
              exact
              path="/politicalevent"
              component={PoliticalEvent}
            />
            <ProtectedRoute exact path="/users/add-new" component={NewUser} />
            <ProtectedRoute
              exact
              path="/officelocation/add-new"
              component={Location}
            />
            <ProtectedRoute
              exact
              path="/addressee/add-new"
              component={Addressee}
            />
            <ProtectedRoute
              exact
              path="/delegate/add-new"
              component={Delegate}
            />
            <ProtectedRoute exact path="/job" component={Job} />
            <ProtectedRoute exact path="/appointment" component={Appointment} />
            <ProtectedRoute
              exact
              path="/confirmation/PNR"
              component={ConfirmationPNR}
            />
            <ProtectedRoute
              exact
              path="/confirmation/letter"
              component={ConfirmationLetters}
            />
            <ProtectedRoute
              exact
              path="/confirmation/mplad"
              component={ConfirmationMPLAD}
            />
            <ProtectedRoute
              exact
              path="/confirmation/complaint"
              component={ConfirmationComplaint}
            />
            <ProtectedRoute
              exact
              path="/confirmation/job"
              component={ConfirmationJob}
            />
            <ProtectedRoute
              exact
              path="/confirmation/appointment"
              component={ConfirmationAppointment}
            />
            <ProtectedRoute
              exact
              path="/confirmation/event"
              component={ConfirmationEvent}
            />
            <ProtectedRoute
              exact
              path="/confirmation/politicalevent"
              component={ConfirmationPoliticalEvent}
            />
            <ProtectedRoute
              exact
              path="/manage-request"
              component={ManageRequest}
            />
            <ProtectedRoute
              exact
              path="/search-database"
              component={ManageDatabase}
            />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/privacy-policy" component={Policy} />
            <ProtectedRoute
              exact
              path="/user-agreement"
              component={UserAgreement}
            />
            <ProtectedRoute exact path="/help-center" component={HelpCenter} />
            <ProtectedRoute
              exact
              path="/add-constituency"
              component={ConstituencyMain}
            />
            <ProtectedRoute
              exact
              path="/manage-constituency"
              component={ManageConstituencyMain}
            />
            <ProtectedRoute
              exact
              path="/add-karyakarta"
              component={AddKaryakarta}
            />
            <ProtectedRoute
              exact
              path="/manage-karyakarta"
              component={ManageKaryakarta}
            />
            <ProtectedRoute
              exact
              path="/constituency-dashboard"
              component={ConstituencyDashboard}
            />
            <ProtectedRoute
              exact
              path="/occasion/birthday"
              component={Birthday}
            />
            <ProtectedRoute
              exact
              path="/occasion/condolence"
              component={Condolence}
            />
            <ProtectedRoute
              exact
              path="/occasion/anniversary"
              component={Anniversary}
            />
            <ProtectedRoute
              exact
              path="/confirm/birthday"
              component={PrintBirthday}
            />
            <ProtectedRoute
              exact
              path="/confirm/wedding"
              component={PrintWedding}
            />
            <ProtectedRoute
              exact
              path="/confirm/condolence"
              component={PrintCondolence}
            />
            <ProtectedRoute
              exact
              path="/manage-occasion"
              component={ManageOccassionMain}
            />
            <ProtectedRoute
              exact
              path="/manage-calling-directory"
              component={ManageDirectory}
            />
            <ProtectedRoute
              exact
              path="/add-calling-directory"
              component={CallerForm}
            />
            <ProtectedRoute exact path="/constituency-map" component={Map} />
            <ProtectedRoute
              exact
              path="/constituency/manage-booth-details/:mandalName"
              component={ManageBoothDetails}
            />
            <ProtectedRoute
              exact
              path="/add-booth-details"
              component={BoothDetailsForm}
            />
            <ProtectedRoute
              exact
              path="/update-booth-details"
              component={BoothDetailsForm}
            />
            <ProtectedRoute exact path="/gallery" component={Gallery} />
            <ProtectedRoute exact path="/letter/editor" component={Editor} />
            <ProtectedRoute exact path="/add-folder" component={AddFolder} />
            <ProtectedRoute exact path="/add-visitor" component={VisitorForm} />
            <ProtectedRoute
              exact
              path="/manage-folders"
              component={ManageFolders}
            />
            <ProtectedRoute
              exact
              path="/manage-visitor"
              component={ManageVisitor}
            />
            <ProtectedRoute path="/my-drive" component={MyDrive} />
            <ProtectedRoute component={Error404} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
