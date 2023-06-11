import React, { Component, Fragment } from 'react'
import './PoliticalEvent.css'
import '../job/Job.css'
import Header from '../../header/Header'
import '../newclient/NewClient.css'
import Attach from '../../../utils/images/attach.svg'
import '../complaint/Complaint.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import api from '../../../utils/api'
import Trash from '../../../utils/images/trash.svg'
import { toast } from 'react-toastify'
import TimePicker from 'react-time-picker'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import '../appointment/Appointment.css'
import { getYear } from '../../../utils/validations'
import backIcon from '../../../utils/images/icons-lelt-open-arrow.svg'
import ReactDOM from 'react-dom'
import { Prompt } from 'react-router-dom'
class PoliticalEvent extends Component {
  state = {
    isBlocking: false,
  }
  constructor(props) {
    super(props)
    document.title = 'Political Event Registraion'
    const { _id, clientDisplayName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    )

    const { state: historyState } = props.location

    const { citizen, event } = { ...historyState }
    console.log(citizen, 'citizen data', event, 'event data')

    if (event) {
      const {
        recommendedName,
        recommendedNumber,
        citizenPhone,
        citizenName,
        citizenAddress,
        citizenPincode,
        referenceFirstName,
        referenceLastName,
        city,
        time,
        eventTitle,
        inviteeName,
        eventType,
        other,
        location,
        important,
        invitation,
        speech,
        organisation,
        marriageof,
        pressIntimation,
        subType,
        comments,
        createdOn,
        duration,
        assignedAddresse,
        eventDate,
        attendeddate,
        delegatedTo,
        delegates,
        discussWith,
        scheduledTo,
        vidhanSabha,
        gramPanchayat,
        block,
      } = { ...event.request }
      const { ref, status } = { ...event }
      var localSelectedDate = new Date(attendeddate)
      var localEventDate = new Date(eventDate)

      this.state = {
        ref,
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        clientDisplayName,
        citizenName: citizenName,
        citizenMobileNumber: citizenPhone,
        citizenPincode: citizenPincode,
        citizenAddress: citizenAddress,
        referencefirstname: referenceFirstName,
        referencelastname: referenceLastName,
        inviteename: inviteeName,
        eventTitle: eventTitle,
        eventType: eventType,
        eventDate:
          'SCHEDULED' ||
          status == 'REJECTED' ||
          status == 'ATTENDED' ||
          status == 'DELEGATED' ||
          status == 'DISCUSS'
            ? localEventDate
            : eventDate,
        other: other,
        marriageof: subType,
        location: location,
        city: city,
        selectedtime: time,
        important,
        speech,
        scheduledTo,
        discussWith,
        organisation,
        previousStatus: status,
        status: status,
        duration: duration,
        selectedfile: invitation,
        selectedFilesFormData: new FormData(),
        pressIntimation,
        comments: comments,
        delegatedTo:
          /*status==="DELEGATED" || status==="SCHEDULED" || status==="PENDING"?delegatedTo:[delegatedTo]*/ delegatedTo,
        //delegatedto: status==="DELEGATED" ?delegatedTo:"",
        previousDelegatedTo:
          /*status==="DELEGATED" || status==="SCHEDULED"?[delegatedTo]:*/ delegatedTo,
        localAttendedDate: localSelectedDate,
        attendeddate: attendeddate,
        previousCreatedOn: createdOn,
        //delegatesLoaded: false,
        //delegates: [],
        isUpdateRequest: true,
        showLoader: false,
        gramPanchayat,
        vidhanSabha,
        block,
        isLoading: false,
        errors: {
          comments: '',
        },
        doNewFileUpload: false,
        doFileChanged: false,
      }
    } else {
      const { citizen } = { ...historyState }

      console.log('props from the complaint form', citizen)

      const {
        firstName,
        lastName,
        callingNumber,
        pincode,
        address,
        recommendedName,
        recommendedNumber,
      } = citizen
      this.state = {
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        clientDisplayName,
        citizenName: `${firstName} ${lastName}`,
        citizenMobileNumber: callingNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        referencefirstname: '',
        referencelastname: '',
        inviteename: '',
        eventTitle: '',
        eventType: 'constituency',
        other: '',
        marriageof: 'bride',
        location: '',
        city: '',
        organisation: '',
        speech: 'yes',
        eventDate: '',
        selectedtime: '12:00',
        important: 'yes',
        status: 'SCHEDULED',
        duration: 'medium',
        selectedfile: [],
        selectedFilesFormData: new FormData(),
        pressIntimation: 'yes',
        comments: '',
        delegatedTo: /*[]*/ '',
        attendeddate: '',
        //delegatesLoaded: false,
        //delegates: [],
        editable: '',
        discussWith: '',
        scheduledTo: '',
        isUpdateRequest: false,
        showLoader: false,
        gramPanchayat: '',
        vidhanSabha: '',
        block: '',
        isLoading: false,
        errors: {
          comments: '',
        },
        doNewFileUpload: false,
        doFileChanged: false,
      }
    }
    this.toastID = React.createRef(null)
    this.ref = React.createRef()
  }

  onFileChange = (event) => {
    var array = [...this.state.selectedfile]
    var fileArray = []
    let x = array.length
    let y = event.target.files.length
    if (x >= 0 && y + x <= 5) {
      Array.from(event.target.files).forEach((file) => {
        console.log(file.name.toString().endsWith('.pdf'), 'lovish', file)
        if (file.size <= 2097152) {
          if (file.name.toString().endsWith('.pdf')) {
            array.push(file)
            fileArray.push(file)
          } else {
            toast.error('File Should be PDF', {
              autoClose: 1250,
              closeButton: false,
            })
          }
        } else {
          toast.error('File size should less than 2MB', {
            autoClose: 1250,
            closeButton: false,
          })
        }
        console.log(fileArray, 'array')
      })
      this.setState({
        selectedfile: array,
        files: fileArray,
        doNewFileUpload: true,
      })
    } else {
      toast.error('More than 5 Files not Allowed', {
        autoClose: 1250,
        closeButton: false,
      })
    }
    event.target.value = ''
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
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={() => {
              var array = [...this.state.selectedfile]
              array.splice(index, 1)
              this.setState({ selectedfile: array, doFileChanged: true })
            }}
          />
          <p className="TxtBrowse">{file.name}</p>
        </div>
      ))
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { citizenName, citizenMobileNumber } = this.state

    if (!citizenName || !citizenMobileNumber) {
      this.props.history.push('/citizen-registration')
      return
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'comments':
        errors.comments = value.length === 0 ? 'This is a required field.' : ''
        break
      default:
        break
    }

    this.setState({ errors }, () => {
      console.log(errors)
    })
  }
  returnToManage = () => {
    const { state: historyState } = this.props.location

    const { event } = { ...historyState }
    this.props.history.push({
      pathname: '/confirmation/event',
      state: {
        event: event,
      },
    })
  }
  sayHello() {
    let isBlocking = false
  }
  render() {
    var { isBlocking } = this.state
    let uploadedFileDetails = []
    const {
      ref,
      recommendedName,
      recommendedNumber,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      referencefirstname,
      referencelastname,
      inviteename,
      eventTitle,
      eventType,
      location,
      city,
      speech,
      organisation,
      eventDate,
      selectedtime,
      important,
      status,
      previousStatus,
      duration,
      selectedfile,
      selectedFilesFormData,
      pressIntimation,
      comments,
      delegatedTo,
      attendeddate,
      scheduledTo,
      discussWith,
      gramPanchayat,
      vidhanSabha,
      block,
      //delegatesLoaded,
    } = this.state
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    const { history } = this.props
    const { state: historyState } = this.props.location
    const { citizen, event } = { ...historyState }
    let citizendata = citizen
    if (event) {
      citizendata = event.citizen
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...event }
    const requestData = {
      recommendedName: recommendedName,
      recommendedNumber: recommendedNumber,
      citizenName,
      citizenPhone: citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      referenceFirstName: referencefirstname,
      referenceLastName: referencelastname,
      inviteeName: inviteename,
      eventTitle: eventTitle,
      eventType: eventType,
      location: location,
      city: city,
      eventDate: eventDate,
      time: selectedtime,
      duration: duration,
      important,
      speech,
      organisation,
      discussWith,
      scheduledTo,
      pressIntimation,
      status: status,
      comments: comments,
      invitation: uploadedFileDetails,
      createdOn: new Date(),
      delegatedTo: delegatedTo,
      gramPanchayat: gramPanchayat,
      vidhanSabha: vidhanSabha,
      block: block,
    }

    const handleSubmit = async (event) => {
      this.setState({
        isBlocking: false,
      })
      event.preventDefault()

      if (status === 'SCHEDULED' || status === 'DELEGATED') {
        let uploadedFileDetails = []

        if (this.state.selectedfile !== 0) {
          for (let i = 0; i < selectedfile.length; i++) {
            selectedFilesFormData.append('files', selectedfile[i])
          }

          console.log(selectedfile, 'hey there!')

          let toastID = this.toastID

          await api.uploadFiles({ selectedFilesFormData, toastID }).then(
            (response) => {
              toast.done(this.toastID.current)
              if (response.ok) {
                this.toastID.current = null
                toast.success('File Uploaded Successfully!', {
                  autoClose: 1250,
                  closeButton: false,
                })
                console.log('sdf', response.data.data)
                response.data.data.map((file, index) =>
                  uploadedFileDetails.push({
                    url: `${file}`,
                    name: file.substring(file.lastIndexOf('/') + 1),
                  })
                )

                console.log(uploadedFileDetails, 'i am here')
              } else {
                toast.error('File Upload Failed!', {
                  autoClose: 1250,
                  closeButton: false,
                })
                console.log(response)
              }
            },
            (err) => {
              toast.error('File Upload Failed!', {
                autoClose: 1250,
                closeButton: false,
              })
              console.log('err', err)
            }
          )
        }

        /////BULK IMPORT CODE//////
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
                  meta:{orgName:organisation},
                  typeOfRequest: "POLITICALEVENT",
                  status: "PENDING",
                  request: tempRequest[i],
                  addressee: null,
                  citizen: citizen.data,
                })
                .then(
                  (response) => {
                    if (response.ok) {
                      console.log('event response', response.data)
                    } else {
                      toast.error("Error occured");
                      console.log('event response', response.data);
                    }
                  },
                  (err) => {
                    console.log("err ", err);
                  }
                )
              ), 2000 + i*500
            )
          }*/
        await api
          .createRequest({
            dd: `${date}`,
            mm: `${month}`,
            yy: `${year}`,
            meta: { orgName: organisation },
            typeOfRequest: 'POLITICALEVENT',
            status: status,
            request: {
              ...requestData,
              invitation: uploadedFileDetails,
            },
            addressee: null,
            citizen: citizen,
          })
          .then(
            (response) => {
              if (response.ok) {
                console.log('event response', response.data)
                toast.success('Request Created', {
                  autoClose: 1250,
                  closeButton: false,
                })
                history.push({
                  pathname: '/confirmation/politicalevent',
                  state: { event: response.data.data },
                })
              } else {
                toast.error('Error occured', {
                  autoClose: 1250,
                  closeButton: false,
                })
                console.log('event response', response.data)
              }
            },
            (err) => {
              console.log('err ', err)
            }
          )
      } else {
        toast.error("The status must be 'Pending' in order to submit")
      }
    }

    const handlePoliticalEventUpdate = async () => {
      console.log('Update request with following state', this.state)
      if (
        (previousStatus === 'ATTENDED' || previousStatus === 'REJECTED') &&
        previousStatus !== status
      ) {
        toast.error('Request already Processed')
        return
      }
      let allSelectedFiles = this.state.selectedfile
      let attachmentData = []
      let needToUploadFiles = []

      if (this.state.selectedfile !== 0) {
        if (this.state.doNewFileUpload) {
          Object.keys(allSelectedFiles).forEach((value) => {
            if (allSelectedFiles[value].hasOwnProperty('url')) {
              attachmentData.push({ ...allSelectedFiles[value] })
            } else {
              needToUploadFiles.push(allSelectedFiles[value])
            }
          })
          if (needToUploadFiles) {
            console.log('files six')
            for (let i = 0; i < needToUploadFiles.length; i++) {
              selectedFilesFormData.append('files', needToUploadFiles[i])
            }

            let toastID = this.toastID

            console.log(needToUploadFiles, 'lovish')
            await api.uploadFiles({ selectedFilesFormData, toastID }).then(
              (response) => {
                toast.done(this.toastID.current)
                if (response.ok) {
                  this.toastID.current = null
                  toast.success('File Uploaded Successfully!', {
                    autoClose: 1250,
                    closeButton: false,
                  })
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
        } else if (this.state.doFileChanged) {
          attachmentData = this.state.selectedfile
        } else {
          attachmentData = this.state.selectedfile
        }
      }

      if (
        previousStatus === 'SCHEDULED' ||
        previousStatus === 'DELEGATED' ||
        previousStatus === 'DISCUSS' ||
        previousStatus === status
      ) {
        if (
          ((!delegatedTo && status === 'DELEGATED') ||
            (!scheduledTo && status === 'SCHEDULED')) &&
          previousStatus !== status
        ) {
          toast.error('Please Add Delegate or Scheduled To')
          return
        } else {
          this.setState({ showLoader: true })
        }

        if (status != 'ATTENDED' || status != 'REJECTED') {
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
              meta: { orgName: organisation },
              request: {
                ...requestData,
                invitation: attachmentData,
              },
              addressee: { delegateName: delegatedTo },
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('updated event', response)
                  toast.success('Request Updated')
                  history.push({
                    pathname: '/confirmation/event',
                    state: { event: response.data.data },
                    search: 'event-updated',
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
          if (
            previousStatus === 'SCHEDULED' ||
            previousStatus === 'DELEGATED' ||
            previousStatus === 'DISCUSS'
          ) {
            if (status === 'ATTENDED' || status === 'REJECTED') {
              toast.error(
                `You can't change from ${previousStatus} to ${status}`
              )
              return
            }
            console.log('test1')

            if (
              (status === 'SCHEDULED' ||
                status === 'DELEGATED' ||
                status === 'ATTENDED') &&
              !delegatedTo &&
              !attendeddate
            ) {
              toast.error('Please choose Delegate or Attended Date')
              return
            } else {
            }

            console.log('test2')

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
                meta: { orgName: organisation },
                request: {
                  ...requestData,
                  invitation: attachmentData,
                },
                addressee: { delegateName: delegatedTo },
              })
              .then(
                (response) => {
                  if (response.ok) {
                    console.log('event updated', response)
                    toast.success('Request Updated')
                    history.push({
                      pathname: '/confirmation/event',
                      state: { event: response.data.data },
                      search: 'event-updated',
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
    }
    if (this.state.isUpdateRequest === true) {
      isBlocking = false
    }
    if (
      citizenName &&
      citizenMobileNumber &&
      citizenPincode /*&&
      delegatesLoaded*/
    ) {
      return (
        <div className="NewClientForm">
          <Header isLoading={this.state.isLoading} />
          <Prompt
            when={isBlocking}
            message={(location) => 'Are you sure want to go?'}
          />
          <div className="frame">
            <div className="FormOuterFrame">
              <div className="DivHeading">
                {this.state.isUpdateRequest ? (
                  <img
                    src={backIcon}
                    alt=""
                    style={{
                      marginLeft: '-4%',
                      width: '20px',
                      marginRight: '10px',
                    }}
                    onClick={() => this.returnToManage()}
                  />
                ) : (
                  <div />
                )}
                <p className="TxtHeading">Political Event</p>
                <div className="DivHeadUserInfo">
                  <p className="TxtName">{citizenName}</p>
                  <p className="TxtName">{`+91-${citizenMobileNumber}`}</p>
                  <p className="TxtName">{citizenPincode}</p>
                </div>
              </div>
              <form className="FormFrame" onSubmit={handleSubmit}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Event Title</p>
                </div>
                <input
                  type="text"
                  id="recommendedname"
                  className="InputFrame"
                  placeholder="Please enter recommended name"
                  value={this.state.eventTitle}
                  onChange={(e) =>
                    this.setState({ eventTitle: e.target.value })
                  }
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
                        this.setState({ eventType: 'constituency' })
                      }
                    >
                      <span
                        className={
                          this.state.eventType === 'constituency'
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
                      onClick={() => this.setState({ eventType: 'other' })}
                    >
                      <span
                        className={
                          this.state.eventType === 'other'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Other</p>
                  </div>
                </div>

                {this.state.eventType === 'constituency' ? (
                  <Fragment>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">Vidhan Sabha</p>
                    </div>
                    <input
                      type="text"
                      id="recommendedname"
                      className="InputFrame"
                      value={this.state.vidhanSabha}
                      onChange={(e) =>
                        this.setState({ vidhanSabha: e.target.value })
                      }
                      placeholder="Please enter Vidha Sabha"
                    />

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Block</p>
                    </div>
                    <input
                      type="text"
                      id="recommendedname"
                      className="InputFrame"
                      value={this.state.block}
                      onChange={(e) => this.setState({ block: e.target.value })}
                      placeholder="Please enter Block"
                    />

                    <div className="TxtInputFrame">
                      <p className="TxtInput">Gram Panchayat</p>
                    </div>
                    <input
                      type="text"
                      id="recommendedname"
                      className="InputFrame"
                      value={this.state.gramPanchayat}
                      onChange={(e) =>
                        this.setState({ gramPanchayat: e.target.value })
                      }
                      placeholder="Please enter Gram Panchayat"
                    />
                  </Fragment>
                ) : null}

                <div className="TxtInputFrame">
                  <p className="TxtInput">Place</p>
                </div>
                <input
                  type="text"
                  id="recommendedname"
                  className="InputFrame"
                  placeholder="Please enter recommended name"
                  value={this.state.location}
                  onChange={(e) => this.setState({ location: e.target.value })}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Date</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    placeholder="Pick from calendar view"
                    className="InputFrame"
                    required
                    selected={this.state.eventDate}
                    onChange={(date) => {
                      this.setState({ eventDate: date })
                    }}
                  />
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Time</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <TimePicker
                    disableClock="true"
                    className="InputFrame"
                    required
                    onChange={(time) => {
                      this.setState({ selectedtime: time })
                    }}
                    value={this.state.selectedtime}
                  />
                </div>

                <p className="TxtInput">
                  Invitation (Max File Size 2MB &amp; PDF format only)
                </p>
                {this.fileData()}
                <input
                  type="file"
                  multiple
                  onChange={this.onFileChange}
                  ref={this.ref}
                  className="FileInput"
                  accept="application/pdf"
                />
                <div
                  className="SelectFile"
                  onClick={() => this.ref.current.click()}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Status</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'SCHEDULED' })}
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
                </div>
                <div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'DELEGATED' })}
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
                </div>
                <div>
                  <div
                    className="SelectRadio"
                    style={
                      this.state.isUpdateRequest
                        ? null
                        : { filter: 'contrast(0.5)' }
                    }
                  >
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'ATTENDED' })}
                      style={
                        this.state.isUpdateRequest
                          ? null
                          : { pointerEvents: 'none' }
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
                </div>

                <div>
                  <div
                    className="SelectRadio"
                    style={
                      this.state.isUpdateRequest
                        ? null
                        : { filter: 'contrast(0.5)' }
                    }
                  >
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'DISCUSS' })}
                      style={
                        this.state.isUpdateRequest
                          ? null
                          : { pointerEvents: 'none' }
                      }
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
                <div>
                  <div
                    className="SelectRadio"
                    style={
                      this.state.isUpdateRequest
                        ? null
                        : { filter: 'contrast(0.5)' }
                    }
                  >
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'REJECTED' })}
                      style={
                        this.state.isUpdateRequest
                          ? null
                          : { pointerEvents: 'none' }
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
                {/* this.state.status === "SCHEDULED" ?
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
                  onChange={(e) => this.setState({ scheduledTo: e.target.value })}
                    />
              </div> : <div />
                  */}
                {this.state.status === 'DELEGATED' ? (
                  <div>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">
                        Delegated to (in case of delegated)
                      </p>
                      <p className="TxtStar">*</p>
                    </div>
                    <input
                      type="text"
                      className="InputFrame"
                      placeholder="Delegated to"
                      value={this.state.delegatedTo}
                      required
                      onChange={(e) =>
                        this.setState({ delegatedTo: e.target.value })
                      }
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
                        dateFormat="dd/MM/yyyy"
                        placeholder="Pick from calendar view"
                        className="InputFrame"
                        selected={this.state.attendeddate}
                        onChange={(date) =>
                          this.setState({ attendeddate: date })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                <div className="TxtInputFrame" style={{ marginTop: '30px' }}>
                  <p className="TxtInput">Remarks</p>
                  <p className="TxtStar">*</p>
                </div>
                <textarea
                  type="text"
                  id="comments"
                  name="comments"
                  className="TextareaLayout"
                  placeholder="Please enter remarks ( 250 characters )"
                  rows="5"
                  cols="100"
                  value={this.state.comments}
                  required
                  onChange={(e) => {
                    if (e.target.value.length <= 250) {
                      this.handleChange(e)
                      this.setState({ comments: e.target.value })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.comments}
                </span>

                {this.state.isUpdateRequest === false ? (
                  <input
                    type="submit"
                    value="Submit"
                    className="BtnSubmit"
                    onClick={this.sayHello}
                  />
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
                      onClick={() => handlePoliticalEventUpdate()}
                    >
                      Update
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="NewClientForm">
          <Header isLoading={this.state.isLoading} />
        </div>
      )
    }
  }
}

export default PoliticalEvent
