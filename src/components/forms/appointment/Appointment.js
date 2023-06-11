import React, { Component } from 'react'
import '../event/Event.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import '../newclient/NewClient.css'
import Trash from '../../../utils/images/trash.svg'
import Attach from '../../../utils/images/attach.svg'
import '../complaint/Complaint.css'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-datepicker'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import './Appointment.css'
import Autocomplete from '../AutoComplete'
import ReactAutocomplete from 'react-autocomplete'
import api from '../.././../utils/api'
import { getYear } from '../../../utils/validations'

import ImgLogo from '../../../utils/images/port.png'
import { toast } from 'react-toastify'

import Loader from '../../hoc/Loader/Loader'

class Appointment extends Component {
  constructor(props) {
    super(props)

    const { _id, clientDisplayName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    )

    const { state: historyState } = props.location

    const { citizen, appointment } = { ...historyState }

    console.log(citizen, 'citizen data', appointment, 'appointment data')

    if (appointment) {
      const {
        _id,
        citizenPhone,
        citizenName,
        citizenAddress,
        citizenPincode,
        referenceFirstName,
        referenceLastName,
        preferredDate,
        preferredTime,
        inviteeName,
        type,
        officeLocation,
        city,
        purpose,
        organisation,
        isImportant,
        invitation,
        attendeddate,
        comments,
        createdOn,
        duration,
        scheduledTo,
        discussWith,
        delegatedto,
      } = { ...appointment.request }
      const { ref, status } = { ...appointment }
      var localSelectedDate = new Date(attendeddate)
      var localPreferredDate = new Date(preferredDate)

      this.state = {
        ref,
        clientDisplayName,
        citizenName: citizenName,
        citizenMobileNumber: citizenPhone,
        citizenPincode: citizenPincode,
        citizenAddress: citizenAddress,
        referencefirstname: referenceFirstName,
        referencelastname: referenceLastName,
        inviteename: inviteeName,
        eventtype: type,
        officelocations: [],
        officeLocationsLoaded: false,
        delegates: [],
        delegatesLoaded: false,
        officeLocation: /*status=="PENDING"?officeLocation:*/ officeLocation, //[0],
        city: city,
        selecteddate:
          status == 'PENDING' ||
          status == 'REJECTED' ||
          status == 'SCHEDULED' ||
          status == 'DELEGATED' ||
          status == 'ATTENDED' ||
          status == 'DISCUSS'
            ? localPreferredDate
            : preferredDate,
        selectedtime: preferredTime,
        important: isImportant ? 'yes' : 'no',
        previousStatus: status,
        status: status,
        duration: duration,
        selectedfile: invitation,
        selectedFilesFormData: new FormData(),
        comments: comments,
        delegatedto: delegatedto,
        attendeddate: status == 'PENDING' ? attendeddate : localSelectedDate,
        purpose: purpose,
        organisation,
        isUpdateRequest: true,
        scheduledTo,
        discussWith,
        showLoader: false,
      }
    } else {
      const { citizen } = { ...historyState }

      console.log('props from the complaint form', citizen.data)

      const { firstName, lastName, mobileNumber, pincode, address } = {
        ...citizen.data,
      }
      this.state = {
        clientDisplayName,
        citizenName: `${firstName} ${lastName}`,
        citizenMobileNumber: mobileNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        referencefirstname: '',
        referencelastname: '',
        inviteename: '',
        eventtype: 'constituency',
        officelocations: [],
        officeLocationsLoaded: false,
        delegates: [],
        delegatesLoaded: false,
        officeLocation: [],
        city: '',
        selecteddate: '',
        selectedtime: '12:00',
        important: 'yes',
        status: 'PENDING',
        duration: 'medium',
        selectedfile: [],
        selectedFilesFormData: new FormData(),
        comments: '',
        delegatedto: /*[]*/ '',
        attendeddate: '',
        purpose: '',
        editable: '',
        organisation: '',
        scheduledTo: '',
        discussWith: '',
        isUpdateRequest: false,
        showLoader: false,
      }
    }
    this.ref = React.createRef()
  }
  onFileChange = (event) => {
    var array = [...this.state.selectedfile]
    Array.from(event.target.files).forEach((file) => {
      if (file.size <= 1048576) {
        array.push(file)
      } else {
        toast.error('File Size Exceeds')
      }
    })
    this.setState({ selectedfile: array }, () => {
      console.log(this.state.selectedfile)
    })
  }

  onFileUpload = (event) => {
    const formData = new FormData()

    formData.append(
      'myFile',
      this.state.selectedfile,
      this.state.selectedfile.name
    )
  }

  fileData = () => {
    if (this.state.selectedfile.length > 0) {
      return this.state.selectedfile.map((file, index) => (
        <div className="SelectedItemFrame" key={index}>
          <img
            src={ImgLogo}
            alt=""
            className="AttachFile"
            onClick={() => {
              var array = [...this.state.selectedfile]
              array.splice(index, 1)
              this.setState({ selectedfile: array }, () => {
                console.log(this.state.selectedfile)
              })
            }}
          />
          <p className="TxtBrowse">{file.name}</p>
        </div>
      ))
    }
  }

  componentDidMount() {
    const { citizenName, citizenMobileNumber } = this.state

    if (!citizenName || !citizenMobileNumber) {
      this.props.history.push('/citizen-registration')
      return
    }

    /*api
      .getDelegates({
        limit: "100",
        offset: "0",
      })
      .then(
        (response) => {
          if (response.ok) {
            this.setState({
              delegates: response.data.data.rows,
              delegatesLoaded: true,
            });
            console.log(response.data.data.rows, "Delegates");
          } else {
            this.props.history.push("/citizen-registration");
          }
        },
        (err) => {
          this.props.history.push("/citizen-registration");
        }
      );*/

    api
      .getLocations({
        limit: '100',
        offset: '0',
      })
      .then(
        (response) => {
          if (response.ok) {
            this.setState({
              officelocations: response.data.data.rows,
              officeLocationsLoaded: true,
            })
            console.log(response.data.data.rows, 'Locations')
          } else {
            this.props.history.push('/citizen-registration')
          }
        },
        (err) => {
          this.props.history.push('/citizen-registration')
        }
      )
  }

  render() {
    let uploadedFileDetails = []

    const {
      clientDisplayName,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      referencefirstname,
      referencelastname,
      inviteename,
      eventtype,
      officeLocation,
      city,
      selecteddate,
      selectedtime,
      important,
      status,
      duration,
      selectedfile,
      organisation,
      selectedFilesFormData,
      comments,
      delegatedto,
      attendeddate,
      purpose,
      officeLocationsLoaded,
      delegatesLoaded,
      previousStatus,
      ref,
      scheduledTo,
      discussWith,
    } = this.state

    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    const { history } = this.props
    const { state: historyState } = this.props.location
    const { citizen, appointment } = { ...historyState }
    let citizendata = citizen
    if (appointment) {
      citizendata = appointment.citizen
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...appointment }
    const requestData = {
      citizenName,
      citizenPhone: citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      referenceFirstName: referencefirstname,
      referenceLastName: referencelastname,
      inviteeName: inviteename,
      type: eventtype,
      purpose: purpose,
      city: city,
      preferredDate: selecteddate,
      preferredTime: selectedtime,
      duration: duration,
      invitation: uploadedFileDetails,
      important,
      officeLocation: officeLocation,
      status: status,
      comments: comments,
      createdOn: new Date(),
      delegatedto,
      attendeddate,
      organisation,
      scheduledTo,
      discussWith,
    }
    console.log(officeLocation, delegatedto, 'Hello')

    const handleSubmit = (event) => {
      event.preventDefault()

      console.log('trying to submit with ', this.state)

      if (status === 'PENDING') {
        async function Main() {
          let uploadedFileDetails = []
          if (selectedfile) {
            for (let i = 0; i < selectedfile.length; i++) {
              selectedFilesFormData.append('files', selectedfile[i])
            }
            console.log(selectedfile, 'hey there!')

            await api.uploadFiles(selectedFilesFormData).then(
              (response) => {
                if (response.ok) {
                  toast.success('File Uploaded Successfully!')
                  console.log('sdf', response.data.data)
                  response.data.data.map((file, index) =>
                    uploadedFileDetails.push({
                      url: `${file}`,
                      name: file.substring(file.lastIndexOf('/') + 1),
                    })
                  )

                  console.log(uploadedFileDetails, 'i am here')
                } else {
                  toast.error('File Upload Failed!')
                  console.log(response)
                }
              },
              (err) => {
                toast.error('File Upload Failed!')
                console.log('err', err)
              }
            )
          }

          ////////BULK IMPORT CODE //////
          /*let tempRequest = []
          let comt = requestData.comments
          let count = 1

          for( let i = 0; i <= 2000; i++ ) {
            console.log('request comment', requestData.comments)
            requestData.comments = `${comt}_${count}`
            console.log('comt', comt)

            tempRequest.push({ ...requestData })

            console.log('Rocket ban raha hai', tempRequest)
            count += 1
          }

          for( let i=0; i<tempRequest.length; i++) {
            setTimeout(
              () => (
                api.createRequest({
                  dd: `${date}`,
                  mm: `${month}`,
                  yy: `${year}`,
    
                  typeOfRequest: "APPOINTMENT",
                  status: "PENDING",
                  request: tempRequest[i],
                  addressee: null,
                  citizen: citizen.data,
                })
                .then(
                  (response) => {
                    if (response.ok) {
                      console.log(response.data);
                    } else {
                      toast.error("Error occured");
                      console.log('appointment response', response.data);
                    }
                  },
                  (err) => {
                    console.log("err ", err);
                  }
                )
              ), 2000 + i*500
            )
          }*/

          api
            .createRequest({
              dd: `${date}`,
              mm: `${month}`,
              yy: `${year}`,

              typeOfRequest: 'APPOINTMENT',
              status: 'PENDING',
              request: requestData,
              addressee: null,
              citizen: citizen.data,
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log(response.data)
                  toast.success('Request Created')
                } else {
                  toast.error('Error occured')
                  console.log('appointment response', response.data)
                  history.push({
                    pathname: '/confirmation/appointment',
                    state: { appointment: response.data.data },
                  })
                }
              },
              (err) => {
                console.log('err ', err)
              }
            )
        }

        Main()
      } else {
        toast.error("The status must be 'Pending' in order to submit")
      }
    }
    console.log(delegatedto, 'HeyThere!')

    const handleJobUpdate = async () => {
      console.log('Update request with following state', this.state)
      if (previousStatus === 'ATTENDED' || previousStatus === 'REJECTED') {
        toast.error('Request already Attended')
        return
      }

      const allSelectedFiles = this.state.selectedfile
      const attachmentData = []
      const files = []
      Object.keys(allSelectedFiles).forEach((value) => {
        if (allSelectedFiles[value].hasOwnProperty('url')) {
          attachmentData.push({ ...allSelectedFiles[value] })
        } else {
          files.push(allSelectedFiles[value])
        }
      })
      if (files) {
        console.log('files six')
        for (let i = 0; i < files.length; i++) {
          selectedFilesFormData.append('files', files[i])
        }
        console.log(files, 'lovish')
        await api.uploadFiles(selectedFilesFormData).then(
          (response) => {
            if (response.ok) {
              toast.success('File Uploaded Successfully!')
              console.log('sdf', response.data.data, uploadedFileDetails)
              response.data.data.map((file, index) =>
                attachmentData.push({
                  url: `${file}`,
                  name: file.substring(file.lastIndexOf('/') + 1),
                })
              )
              // handleSetstate(updatedUploadedFileDetails)
            } else {
              console.log(response)
              toast.error('File Upload Failed!')
            }
          },
          (err) => {
            toast.error('File Upload Failed!')
            console.log('err', err)
          }
        )
      }

      if (previousStatus === 'PENDING') {
        if (
          status === 'PENDING' ||
          status === 'SCHEDULED' ||
          status === 'DELEGATED'
        ) {
          /*
          if (
            !delegatedto &&
            (status === "SCHEDULED" || status === "DELEGATED") &&
            !attendeddate
          ) {
            toast.error("Please choose Delegate or Attended Date");
            return;
          }*/

          await api
            .updateRequest({
              dd,
              mm,
              yy,
              typeOfRequest,
              status: status,
              byUser,
              ref,
              orgId,
              id,
              request: { ...requestData, invitation: attachmentData },
              addressee: { delegateName: delegatedto },
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('updated the complaint', response.data)
                  toast.success('Request Updated')
                  this.setState({ showLoader: true })
                  history.push({
                    pathname: '/confirmation/appointment',
                    state: { appointment: response.data.data },
                    search: 'appintment-updated',
                  })
                } else {
                  console.log('Some Error occured', response)
                }
              },
              (err) => {
                console.log('Rejected Error', err)
              }
            )
        } else {
          toast.error(
            `You can't change state from ${previousStatus} to ${status}`
          )
        }
      } else {
        if (
          previousStatus === 'SCHEDULED' ||
          previousStatus === 'DELEGATED' ||
          previousStatus === 'DISCUSS'
        ) {
          if (status === 'PENDING') {
            toast.error(`You can't change from ${previousStatus} to ${status}`)
            return
          }

          if (
            !delegatedto &&
            (status === 'SCHEDULED' || status === 'DELEGATED') &&
            !attendeddate
          ) {
            toast.error('Please choose Delegate or Attended Date')
            return
          }

          await api
            .updateRequest({
              dd,
              mm,
              yy,
              typeOfRequest,
              status: status,
              byUser,
              ref,
              orgId,
              id,
              request: { ...requestData, invitation: attachmentData },
              addressee: { delegateName: delegatedto },
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('updated the complaint')
                  toast.success('Request Updated')
                  this.setState({ showLoader: true })
                  history.push({
                    pathname: '/confirmation/appointment',
                    state: { appointment: response.data.data },
                    search: 'appointment-updated',
                  })
                } else {
                  console.log('API error', response)
                }
              },
              (err) => {
                console.log('Error Rejected', err)
              }
            )
        }
      }
    }

    if (
      citizenName &&
      citizenMobileNumber &&
      citizenPincode &&
      officeLocationsLoaded /* &&
      delegatesLoaded*/
    ) {
      return (
        <div className="NewClientForm">
          <Header />
          <div className="frame">
            <div className="FormOuterFrame">
              <div className="DivHeading">
                <p className="TxtHeading">Appointment</p>
                <div className="DivHeadUserInfo">
                  <p className="TxtName">{citizenName}</p>
                  <p className="TxtName">{`+91-${citizenMobileNumber}`}</p>
                  <p className="TxtName">{citizenPincode}</p>
                </div>
              </div>
              <form className="FormFrame" onSubmit={handleSubmit}>
                <fieldset disabled={this.state.editable}>
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Reference First Name</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="clientname"
                    className="InputFrame"
                    placeholder="Please enter first name"
                    value={this.state.referencefirstname}
                    required
                    onChange={(e) => {
                      this.setState({ referencefirstname: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Reference Last Name</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="referencelastname"
                    className="InputFrame"
                    placeholder="Please enter last name"
                    value={this.state.referencelastname}
                    required
                    onChange={(e) => {
                      this.setState({ referencelastname: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Invitee Name</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="inviteename"
                    className="InputFrame"
                    placeholder="Please enter invitee name"
                    value={this.state.inviteename}
                    required
                    onChange={(e) => {
                      this.setState({ inviteename: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Type</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() =>
                          this.setState({ eventtype: 'constituency' })
                        }
                      >
                        <span
                          className={
                            this.state.eventtype === 'constituency'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Constituency</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ eventtype: 'personal' })}
                      >
                        <span
                          className={
                            this.state.eventtype === 'personal'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Personal</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ eventtype: 'business' })}
                      >
                        <span
                          className={
                            this.state.eventtype === 'business'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Business</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ eventtype: 'ministry' })}
                      >
                        <span
                          className={
                            this.state.eventtype === 'ministry'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Ministry</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Purpose</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <textarea
                    type="text"
                    id="purpose"
                    className="TextareaLayout"
                    placeholder="Please enter purpose"
                    rows="3"
                    cols="100"
                    value={this.state.purpose}
                    required
                    onChange={(e) => {
                      this.setState({ purpose: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Organisation Name</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="location"
                    className="InputFrame"
                    placeholder="Please enter organisation"
                    value={this.state.organisation}
                    required
                    onChange={(e) => {
                      this.setState({ organisation: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">City</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="city"
                    className="InputFrame"
                    placeholder="Please enter city"
                    value={this.state.city}
                    required
                    onChange={(e) => {
                      this.setState({ city: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Preferred Date</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div>
                    <DatePicker
                      placeholder="Pick from calendar view"
                      className="InputFrame"
                      selected={this.state.selecteddate}
                      onChange={(date) => {
                        this.setState({ selecteddate: date })
                      }}
                    />
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Preferred Time</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div>
                    <TimePicker
                      disableClock="true"
                      className="InputFrame"
                      onChange={(time) => {
                        this.setState({ selectedtime: time })
                      }}
                      value={this.state.selectedtime}
                    />
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Duration</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ duration: 'short' })}
                      >
                        <span
                          className={
                            this.state.duration === 'short'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Short 0-30mins</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ duration: 'medium' })}
                      >
                        <span
                          className={
                            this.state.duration === 'medium'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Medium 30-60mins</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ duration: 'long' })}
                      >
                        <span
                          className={
                            this.state.duration === 'long'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Long 60-90mins</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ duration: 'verylong' })}
                      >
                        <span
                          className={
                            this.state.duration === 'verylong'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Very long {'>'}90mins</p>
                    </div>
                  </div>

                  <p className="TxtInput">
                    Attachment (Max File Size 1MB &amp; PDF/JPG/JPEG format
                    only)
                  </p>
                  {this.fileData()}
                  <input
                    type="file"
                    multiple
                    onChange={this.onFileChange}
                    ref={this.ref}
                    className="FileInput"
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                  />
                  <div
                    className="SelectFile"
                    onClick={() => {
                      this.ref.current.click()
                    }}
                  >
                    <img src={Attach} alt="" className="AttachFile" />
                    <p className="TxtBrowse">Browse Files</p>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Important</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ important: 'yes' })}
                      >
                        <span
                          className={
                            this.state.important === 'yes'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Yes</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ important: 'no' })}
                      >
                        <span
                          className={
                            this.state.important === 'no'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">No</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Office Location</p>
                    <p className="TxtStar">*</p>
                  </div>

                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={(event) => {
                      this.setState({ officeLocation: event })
                    }}
                    options={this.state.officelocations}
                    selected={this.state.officeLocation}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Status</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ status: 'PENDING' })}
                      >
                        <span
                          className={
                            this.state.status === 'PENDING'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Pending</p>
                    </div>
                    {this.state.isUpdateRequest == true ? (
                      <div>
                        <div className="SelectRadio">
                          <label
                            className="radiobutton"
                            onClick={() =>
                              this.setState({ status: 'SCHEDULED' })
                            }
                          >
                            <span
                              className={
                                this.state.status === 'SCHEDULED'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          </label>
                          <p className="TxtRadioInput">Scheduled</p>
                        </div>
                        <div className="SelectRadio">
                          <label
                            className="radiobutton"
                            onClick={() =>
                              this.setState({ status: 'ATTENDED' })
                            }
                          >
                            <span
                              className={
                                this.state.status === 'ATTENDED'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          </label>
                          <p className="TxtRadioInput">Attended</p>
                        </div>
                        <div className="SelectRadio">
                          <label
                            className="radiobutton"
                            onClick={() =>
                              this.setState({ status: 'REJECTED' })
                            }
                          >
                            <span
                              className={
                                this.state.status === 'REJECTED'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          </label>
                          <p className="TxtRadioInput">Rejected</p>
                        </div>
                        <div className="SelectRadio">
                          <label
                            className="radiobutton"
                            onClick={() =>
                              this.setState({ status: 'DELEGATED' })
                            }
                          >
                            <span
                              className={
                                this.state.status === 'DELEGATED'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          </label>
                          <p className="TxtRadioInput">Delegated</p>
                        </div>
                        <div className="SelectRadio">
                          <label
                            className="radiobutton"
                            onClick={() => this.setState({ status: 'DISCUSS' })}
                          >
                            <span
                              className={
                                this.state.status === 'DISCUSS'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          </label>
                          <p className="TxtRadioInput">Discuss</p>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  {this.state.status === 'DISCUSS' ? (
                    <div>
                      <div className="TxtInputFrame">
                        <p className="TxtInput">Discuss With</p>
                      </div>
                      <input
                        type="text"
                        className="InputFrame"
                        placeholder="Discuss with"
                        value={this.state.discussWith}
                        required
                        onChange={(e) => {
                          this.setState({ discussWith: e.target.value })
                        }}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {this.state.status === 'SCHEDULED' ? (
                    <div>
                      <div className="TxtInputFrame">
                        <p className="TxtInput">Scheduled To</p>
                      </div>
                      <input
                        type="text"
                        className="InputFrame"
                        placeholder="Scheduled To"
                        value={this.state.scheduledTo}
                        required
                        onChange={(e) => {
                          this.setState({ scheduledTo: e.target.value })
                        }}
                      />
                    </div>
                  ) : (
                    <div />
                  )}

                  {this.state.status === 'DELEGATED' ? (
                    <div>
                      <div className="TxtInputFrame">
                        <p className="TxtInput">
                          Delegated to (in case of delegated)
                        </p>
                      </div>
                      <input
                        type="text"
                        className="InputFrame"
                        placeholder="Delegated To"
                        value={this.state.delegatedto}
                        required
                        onChange={(e) => {
                          this.setState({ delegatedto: e.target.value })
                        }}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {this.state.status === 'ATTENDED' ? (
                    <div>
                      <div className="TxtInputFrame">
                        <p className="TxtInput">Attended Date</p>
                      </div>
                      <div>
                        <DatePicker
                          placeholder="Pick from calendar view"
                          className="InputFrame"
                          selected={this.state.attendeddate}
                          onChange={(date) => {
                            this.setState({ attendeddate: date })
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Comments</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <textarea
                    type="text"
                    id="comments"
                    className="TextareaLayout"
                    placeholder="Please enter comments"
                    rows="5"
                    cols="100"
                    value={this.state.comments}
                    required
                    onChange={(e) => {
                      this.setState({ comments: e.target.value })
                    }}
                  />

                  {this.state.isUpdateRequest === false ? (
                    <input type="submit" value="Submit" className="BtnSubmit" />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '40px',
                      }}
                    >
                      <button
                        className="PrintBtn UpdateButton"
                        type="button"
                        onClick={() => handleJobUpdate()}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </fieldset>
              </form>
            </div>
            <div className="DashboardFooter">
              <Footer />
              <CopyrightFooter />
            </div>
          </div>
          <div className="emptyDiv" />
          {this.state.showLoader ? (
            <Loader />
          ) : (
            console.log('show loader', this.state.showLoader)
          )}
        </div>
      )
    }
    return (
      <div className="NewClientForm">
        <Header isLoading={this.state.isLoading} />
      </div>
    )
  }
}
export default Appointment
