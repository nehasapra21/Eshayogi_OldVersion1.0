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
import api from '../../../utils/api'
import { toast } from 'react-toastify'
import { getYear } from '../../../utils/validations'
import backIcon from '../../../utils/images/icons-lelt-open-arrow.svg'
import Loader from '../../hoc/Loader/Loader'
import { Prompt } from 'react-router-dom'
import { responsiveFontSizes } from '@material-ui/core'

class Event extends Component {
  state = {
    isBlocking: false,
  }
  constructor(props) {
    super(props)
    document.title = 'Event Registraion'
    console.log('Event form props', this.props)

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
      } = { ...event.request }
      const { ref, status } = { ...event }
      if (status == 'PENDING') console.log(attendeddate, 'YYY')

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
        eventDate: localEventDate,
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
        errors: {
          eventTitle: '',
          organisation: '',
          location: '',
          city: '',
          comments: '',
          attendeddate: '',
          eventDate: '',
        },
        doFilesChanged: false,
        doNewFileUpload: false,
      }
    } else {
      const { citizen } = { ...historyState }

      const {
        firstName,
        lastName,
        callingNumber,
        pincode,
        address,
        recommendedName,
        recommendedNumber,
      } = {
        ...citizen,
      }
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
        eventType: 'official',
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
        errors: {
          eventTitle: '',
          organisation: '',
          location: '',
          city: '',
          comments: '',
          attendeddate: '',
          eventDate: '',
        },
        doFilesChanged: false,
        doNewFileUpload: false,
      }
    }
    this.toastID = React.createRef(null)
    this.ref = React.createRef()
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
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
              this.setState({ selectedfile: array, doFilesChanged: true })
            }}
          />
          <p className="TxtBrowse">{file.name}</p>
        </div>
      ))
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'eventTitle':
        errors.eventTitle =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'organisation':
        errors.organisation =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'city':
        errors.city = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'location':
        errors.location = value.length === 0 ? 'This is a required field.' : ''
        break
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
  render(props) {
    var { isBlocking } = this.state
    let uploadedFileDetails = []
    const {
      ref,
      recommendedName,
      recommendedNumber,
      clientDisplayName,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      inviteename,
      eventTitle,
      eventType,
      other,
      marriageof,
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
      //delegatedto,
      previousDelegatedTo,
      attendeddate,
      delegates,
      scheduledTo,
      discussWith,
      previousCreatedOn,
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
      createdOn: new Date(),
      delegatedTo: delegatedTo,
      scheduledTo: scheduledTo,
      discussWith: discussWith,
      attendeddate: attendeddate,
    }

    const handleSubmit = async (event) => {
      this.setState({
        isBlocking: false,
      })
      event.preventDefault()
      console.log('trying to submit with ', this.state)
      console.log('Show loader state is undefined', this.state.showLoader)
      if (status === 'SCHEDULED' || status === 'DELEGATED') {
        let uploadedFileDetails = []

        if (this.state.selectedfile.length !== 0) {
          if (selectedfile) {
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
                  if (response.data.error) {
                    toast.error('File Upload Failed!', {
                      autoClose: 1250,
                      closeButton: false,
                    })
                    return
                  } else {
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
                  }
                  this.setState({ invitation: [...uploadedFileDetails] })
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
                  typeOfRequest: "EVENT",
                  status: "PENDING",
                  request: tempRequest[i],
                  addressee: null,
                  citizen: citizen,
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
            typeOfRequest: 'EVENT',
            status: status,
            request: {
              ...requestData,
              invitation: [...uploadedFileDetails],
            },
            addressee: null,
            citizen: citizen,
          })
          .then(
            (response) => {
              if (response.ok) {
                if (response.data.error) {
                  toast.error('Request Failed !', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  return
                } else {
                  toast.success('Request Created Successfully !', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  history.push({
                    pathname: '/confirmation/event',
                    state: { event: response.data.data },
                  })
                }
              } else {
                toast.error('Request Failed !', {
                  autoClose: 1250,
                  closeButton: false,
                })
                console.log('event response', response.data)
              }
            },
            (err) => {
              toast.error('Request Failed !', {
                autoClose: 1250,
                closeButton: false,
              })
              console.log('err ', err)
            }
          )
      } else {
        toast.error("The status must be 'Pending' in order to submit")
      }
    }

    const handleJobUpdate = async () => {
      console.log('Update request with following state', this.state)
      if (previousStatus === 'ATTENDED' || previousStatus === 'REJECTED') {
        toast.error('Request already Processed')
        return
      }

      let allSelectedFiles = this.state.selectedfile
      let attachmentData = []
      let files = []

      if (this.state.selectedfile.length !== 0) {
        if (this.state.doNewFileUpload) {
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

            let toastID = this.toastID
            console.log('Toast ki id', toastID)
            await api.uploadFiles({ selectedFilesFormData, toastID }).then(
              (response) => {
                toast.done(this.toastID.current)
                if (response.ok) {
                  this.toastID.current = null
                  if (response.data.error) {
                    toast.error('File Upload Failed!', {
                      autoClose: 1250,
                      closeButton: false,
                    })
                    return
                  } else {
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
                  }
                } else {
                  console.log(response)
                  toast.error('File Upload Failed!', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something Went Wrong.Please Refresh!', {
                  autoClose: 1250,
                  closeButton: false,
                })
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
        previousStatus === 'DISCUSS'
      ) {
        if (!delegatedTo && status === 'DELEGATED') {
          toast.error('Please Add Delegate', {
            autoClose: 1250,
            closeButton: false,
          })
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
              request: { ...requestData, invitation: attachmentData },
              addressee: { delegateName: delegatedTo },
            })
            .then(
              (response) => {
                if (response.ok) {
                  if (response.data.error) {
                    toast.error('Request Update Failed!', {
                      autoClose: 1250,
                      closeButton: false,
                    })
                    return
                  } else {
                    toast.success('Request Updated Successful', {
                      autoClose: 1250,
                      closeButton: false,
                    })
                    history.push({
                      pathname: '/confirmation/event',
                      state: { event: response.data.data },
                      search: 'event-updated',
                    })
                  }
                } else {
                  toast.error('Request Update Failed!', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something Went Wrong.Please Refresh!', {
                  autoClose: 1250,
                  closeButton: false,
                })
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
                request: { ...requestData, invitation: attachmentData },
                addressee: { delegateName: delegatedTo },
              })
              .then(
                (response) => {
                  if (response.ok) {
                    if (response.data.error) {
                      toast.error('Request Update Failed!', {
                        autoClose: 1250,
                        closeButton: false,
                      })
                      return
                    } else {
                      toast.success('Request Updated Successful', {
                        autoClose: 1250,
                        closeButton: false,
                      })
                      history.push({
                        pathname: '/confirmation/event',
                        state: { event: response.data.data },
                        search: 'event-updated',
                      })
                    }
                  } else {
                    toast.error('Request Update Failed!', {
                      autoClose: 1250,
                      closeButton: false,
                    })
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
    return (
      <div className="NewClientForm">
        <Header />
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
              <p className="TxtHeading">Event</p>
              <div className="DivHeadUserInfo">
                <p className="TxtName">{citizenName}</p>
                <p className="TxtName">{`+91-${citizenMobileNumber}`}</p>
                <p className="TxtName">{citizenPincode}</p>
              </div>
            </div>
            <form className="FormFrame" onSubmit={handleSubmit}>
              <fieldset disabled={this.state.editable}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Recommended By Name</p>
                </div>
                <input
                  type="text"
                  id="clientname"
                  className="InputFrame"
                  disabled={true}
                  placeholder="Please enter recommended name"
                  value={this.state.recommendedName}
                  required
                  onChange={(e) => {
                    this.setState({ recommendedName: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Recommended By Number</p>
                </div>
                <input
                  type="tel"
                  id="recommendedNumber"
                  className="InputFrame"
                  placeholder="Please enter recommended number"
                  disabled={true}
                  value={this.state.recommendedNumber}
                  required
                  onChange={(e) => {
                    this.setState({ recommendedNumber: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Event Title</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  className="InputFrame"
                  placeholder="Please enter event title"
                  value={this.state.eventTitle}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ eventTitle: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.eventTitle}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Type</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ eventType: 'official' })}
                    >
                      <span
                        className={
                          this.state.eventType === 'official'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Official</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ eventType: 'corporate' })}
                    >
                      <span
                        className={
                          this.state.eventType === 'corporate'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Corporate</p>
                  </div>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ eventType: 'unofficial' })}
                    >
                      <span
                        className={
                          this.state.eventType === 'unofficial'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Unofficial</p>
                  </div>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Organisation Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="location"
                  name="organisation"
                  className="InputFrame"
                  placeholder="Please enter organisation"
                  value={this.state.organisation}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ organisation: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.organisation}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Location</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="InputFrame"
                  placeholder="Please enter location"
                  value={this.state.location}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ location: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.location}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">City</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="InputFrame"
                  placeholder="Please enter city"
                  value={this.state.city}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ city: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.city}
                </span>

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
                    minDate={new Date()}
                    selected={this.state.eventDate}
                    onChange={(date) => {
                      let errors = this.state.errors
                      if (getYear(date).toString().length == 4) {
                        errors.eventDate = ''
                        this.setState({ eventDate: date, errors })
                      } else {
                        errors.eventDate = 'Invalid Year'
                        this.setState({ errors })
                      }
                    }}
                  />
                </div>
                <span className="validation-error-message">
                  {this.state.errors.eventDate}
                </span>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Time</p>
                  <p className="TxtStar">*</p>
                </div>
                <div>
                  <TimePicker
                    disableClock={true}
                    className="InputFrame"
                    required
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
                    <p className="TxtRadioInput">Short 0-15 mins</p>
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
                    <p className="TxtRadioInput">Medium 15-30 mins</p>
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
                    <p className="TxtRadioInput">Long 30-60 mins</p>
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
                    <p className="TxtRadioInput">Very long {'>'}60 mins</p>
                  </div>
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
                  onClick={() => {
                    this.ref.current.click()
                  }}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Press intimation</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ pressIntimation: 'yes' })}
                    >
                      <span
                        className={
                          this.state.pressIntimation === 'yes'
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
                      onClick={() => this.setState({ pressIntimation: 'no' })}
                    >
                      <span
                        className={
                          this.state.pressIntimation === 'no'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">No</p>
                  </div>
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
                {/* this.state.status === "SCHEDULED" ? (
                    <div>
                      <div className="TxtInputFrame">
                        <p className="TxtInput">
                          Scheduled To
                        </p>
                      </div>
                      <input
                    type="text"
                    className="InputFrame"
                    placeholder="Scheduled To"
                    value={this.state.scheduledTo}
                    required
                    onChange={(e) => {
                      this.setState({ scheduledTo: e.target.value });
                    }}
                  />
                    </div>
                  ) : (
                    <div />
                  )*/}

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
                      onChange={(e) => {
                        this.setState({ delegatedTo: e.target.value })
                      }}
                    />
                  </div>
                ) : (
                  <div />
                )}
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
                {this.state.status === 'ATTENDED' ? (
                  <div>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">Attended Date</p>
                    </div>
                    <div>
                      {console.log(
                        'Event fuck up',
                        this.state.eventDate,
                        this.state.attendeddate
                      )}
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        placeholder="Pick from calendar view"
                        className="InputFrame"
                        minDate={this.state.eventDate}
                        selected={
                          this.state.previousStatus === 'ATTENDED'
                            ? new Date(this.state.attendeddate)
                            : this.state.attendeddate
                        }
                        onChange={(date) => {
                          let errors = this.state.errors
                          if (getYear(date).toString().length == 4) {
                            errors.attendeddate = ''
                            this.setState({ attendeddate: date, errors })
                          } else {
                            errors.attendeddate = 'Invalid Year'
                            this.setState({ errors })
                          }
                        }}
                      />
                    </div>
                    <span className="validation-error-message">
                      {this.state.errors.attendeddate}
                    </span>
                  </div>
                ) : (
                  <div />
                )}

                <div className="TxtInputFrame">
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
}
export default Event
