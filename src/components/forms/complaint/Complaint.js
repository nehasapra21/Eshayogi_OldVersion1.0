import React, { Component } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import '../newclient/NewClient.css'
import Trash from '../../../utils/images/trash.svg'
import Attach from '../../../utils/images/attachment.svg'
import '../complaint/Complaint.css'
import api from '../../../utils/api'
import DatePicker from 'react-datepicker'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Base64 } from 'js-base64'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import moment from 'moment'
import { toast } from 'react-toastify'
import { getYear } from '../../../utils/validations'
import backIcon from '../../../utils/images/icons-lelt-open-arrow.svg'
import Loader from '../../hoc/Loader/Loader'
import { Prompt } from 'react-router-dom'

class Complaint extends Component {
  state = {
    isBlocking: false,
  }
  constructor(props) {
    super(props)
    document.title = 'Compalint Registraion'
    const { _id, clientDisplayName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    )

    const { state: historyState } = props.location

    const { complaint } = { ...historyState }

    if (complaint) {
      const {
        recommendedName,
        recommendedNumber,
        citizenMobileNumber,
        citizenName,
        citizenAddress,
        citizenPincode,
        referencefirstname,
        referencelastname,
        description,
        location,
        important,
        attachments,
        resolutionDate,
        comments,
        assignedTo,
        department,
        followUp1,
        followUp2,
      } = { ...complaint.request }
      const { ref, status } = { ...complaint }

      this.state = {
        ref,
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        clientDisplayName,
        citizenName: citizenName,
        citizenMobileNumber: citizenMobileNumber,
        citizenPincode: citizenPincode,
        citizenAddress: citizenAddress,
        description: description,
        location: location,
        important: important,
        previousStatus: status,
        status: status,
        //addresseelist: [],
        perviousAddressee: assignedTo,
        pickedAddressee: assignedTo,
        department: department,
        previousSelectedFiles: attachments,
        selectedfile: attachments,
        selectedFilesFormData: new FormData(),
        comments: comments,
        resolutiondate:
          resolutionDate != undefined ? new Date(resolutionDate) : '',
        previousModifications: '',
        createdOn: '',
        //addresseeLoaded: false
        isUpdateRequest: true,
        showLoader: false,
        files: [],
        followUp1: followUp1 !== '' ? new Date(followUp1) : '',
        followUp2: followUp2 !== '' ? new Date(followUp2) : '',
        errors: {
          recommenededName: '',
          recommendedNumber: '',
          description: '',
          location: '',
          comments: '',
          resolutiondate: '',
          followUp1: '',
          followUp2: '',
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
        recommendedNumber,
        recommendedName,
      } = citizen

      this.state = {
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        clientDisplayName,
        citizenName: firstName + ' ' + lastName,
        citizenMobileNumber: callingNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        referencefirstname: '',
        referencelastname: '',
        description: '',
        location: '',
        important: 'yes',
        status: 'ASSIGNED',
        selectedaddressee: '',
        department: '',
        selectedfile: [],
        selectedFilesFormData: new FormData(),
        comments: '',
        resolutiondate: '',
        isUpdateRequest: false,
        showLoader: false,
        files: [],
        followUp1: '',
        followUp2: '',
        errors: {
          recommenededName: '',
          recommendedNumber: '',
          description: '',
          location: '',
          comments: '',
        },
        doFilesChanged: false,
        doNewFileUpload: false,
      }
    }
    this.toastID = React.createRef(null)
    this.ref = React.createRef()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    window.onbeforeunload = function (e) {
      return 'Your changes will be not saved'
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'recommenededName':
        errors.recommenededName =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'recommendedNumber':
        errors.recommendedNumber =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'description':
        errors.description =
          value.length === 0 ? 'This is a required field.' : ''
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

    this.setState({ errors }, () => {})
  }

  onFileChange = (event) => {
    var array = [...this.state.selectedfile]
    var fileArray = []
    let x = array.length
    let y = event.target.files.length

    if (x >= 0 && y + x <= 5) {
      Array.from(event.target.files).forEach((file) => {
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
      })
      this.setState({
        selectedfile: array,
        files: fileArray,
        doNewFileUpload: true,
      })
    } else {
      this.setState({ selectedfile: [] })
      toast.error('More than 5 Files are not Allowed', {
        autoClose: 1250,
        closeButton: false,
      })
    }
    event.target.value = ''
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

  returnToManage = () => {
    const { state: historyState } = this.props.location

    const { complaint } = { ...historyState }
    this.props.history.push({
      pathname: '/confirmation/complaint',
      state: {
        complaint: complaint,
      },
    })
  }

  sayHello() {
    let isBlocking = false
  }

  render(props) {
    var { isBlocking } = this.state
    let uploadedFileDetails = []
    let updatedUploadedFileDetails = []
    const {
      recommendedName,
      recommendedNumber,
      addresseeLoaded,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      previousStatus,
      ref,
      pickedAddressee,
      resolutiondate,
      previousModifications,
      previousSelectedFiles,
      createdOn,
      clientDisplayName,
      citizenAddress,
      status,
      description,
      location,
      important,
      department,
      comments,
      selectedfile,
      selectedFilesFormData,
      files,
      isWritable,
      followUp1,
      followUp2,
    } = this.state

    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    const { history } = this.props
    const { state: historyState } = this.props.location
    const { citizen, complaint } = { ...historyState }
    let citizendata = citizen
    if (complaint) {
      citizendata = complaint.citizen
    }

    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...complaint }

    const handleComplaintSubmit = async (event) => {
      this.setState({
        isBlocking: false,
      })
      console.log('loc' + isBlocking)
      event.preventDefault()
      if (status === 'ASSIGNED') {
        for (let i = 0; i < selectedfile.length; i++) {
          selectedFilesFormData.append('files', selectedfile[i])
        }
        let toastID = this.toastID

        if (this.state.selectedfile.length !== 0) {
          await api.uploadFiles({ selectedFilesFormData, toastID }).then(
            (response) => {
              toast.done(this.toastID.current)
              if (response.ok) {
                this.toastID.current = null
                if (response.data.error) {
                  toast.error('File Upload Error', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  return
                } else {
                  toast.success('File Uploaded Successfully!', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  response.data.data.map((file, index) =>
                    uploadedFileDetails.push({
                      url: `${file}`,
                      name: file.substring(file.lastIndexOf('/') + 1),
                    })
                  )
                }
              } else {
                toast.error('File Upload Failed!', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            },
            (err) => {
              toast.error('File Upload Failed!', {
                autoClose: 1250,
                closeButton: false,
              })
            }
          )
        }
        const requestData = {
          citizenName,
          citizenMobileNumber,
          citizenPincode,
          citizenAddress,
          recommendedName,
          recommendedNumber,
          description,
          location,
          important,
          attachments: uploadedFileDetails,
          status,
          comments,
          isWritable,
          followUp1,
          followUp2,
          assignedTo: pickedAddressee,
          department,
        }

        //BULK IMPORT CODE
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
    
                  typeOfRequest: "COMPLAINT",
                  status: status,
                  request: tempRequest[i],
                  addressee: {},
                  citizen: citizen.data,
                })
                .then(
                  (response) => {
                    if (response.ok) {
                      console.log("Complait response", response);
                    } else {
                      console.log("after after sdf");
                      toast.error("Error occured");
                      console.log(response.data);
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

            typeOfRequest: 'COMPLAINT',
            status: 'ASSIGNED',
            request: requestData,
            addressee: {},
            citizen: citizen,
          })
          .then(
            (response) => {
              if (response.ok) {
                if (response.data.error) {
                  toast.error('Request Creation Failed', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  return
                } else {
                  toast.success('Request Created Successfully', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  history.push({
                    pathname: '/confirmation/complaint',
                    state: {
                      complaint: response.data.data,
                    },
                  })
                }
              } else {
                toast.error('Request Creation Failed', {
                  autoClose: 1250,
                  closeButton: false,
                })
                history.goBack()
              }
            },
            (err) => {
              toast.error('Something Went Wrong. Please Refresh.', {
                autoClose: 1250,
                closeButton: false,
              })
            }
          )
      } else {
        toast.error("The status must be 'ASSIGNED' in order to submit", {
          autoClose: 1250,
          closeButton: false,
        })
      }
    }

    const handleComplaintUpdate = async () => {
      if (previousStatus === 'SOLVED') {
        toast.error('Complaint already processed')
        return
      }

      var x = this.state.selectedfile
      let attachmentData = []
      let files = []

      if (previousStatus === 'ASSIGNED') {
        if (status === 'SOLVED' || status === 'ASSIGNED') {
          if (status === 'SOLVED' && !resolutiondate) {
            toast.error('Please Add Resolution Date')
            return
          }

          if (this.state.selectedfile.length !== 0) {
            if (this.state.doNewFileUpload) {
              Object.keys(x).forEach((value) => {
                if (x[value].hasOwnProperty('url')) {
                  attachmentData.push({ ...x[value] })
                } else {
                  files.push(x[value])
                }
              })

              for (let i = 0; i < files.length; i++) {
                selectedFilesFormData.append('files', files[i])
              }
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
                      response.data.data.map((file, index) =>
                        attachmentData.push({
                          url: `${file}`,
                          name: file.substring(file.lastIndexOf('/') + 1),
                        })
                      )
                    }
                    // handleSetstate(updatedUploadedFileDetails)
                  } else {
                    toast.error('File Upload Failed!', {
                      autoClose: 1250,
                      closeButton: false,
                    })
                  }
                },
                (err) => {
                  toast.error('File Upload Failed!', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              )
            } else if (this.state.doFilesChanged) {
              attachmentData = this.state.selectedfile
            } else {
              attachmentData = this.state.selectedfile
            }
          }
        }

        if (!pickedAddressee && status === 'ASSIGNED') {
          toast.error('Please Add Addresee', {
            autoClose: 1250,
            closeButton: false,
          })
          return
        }
        if (status === 'SOLVED' && !resolutiondate) {
          toast.error('Please enter resolution date', {
            autoClose: 1250,
            closeButton: false,
          })
          return
        }

        await api
          .updateRequest({
            dd,
            mm,
            yy,
            typeOfRequest,
            status,
            byUser,
            ref,
            orgId,
            id,
            request: {
              recommendedName: recommendedName,
              recommendedNumber: recommendedNumber,
              citizenName,
              citizenMobileNumber,
              citizenPincode,
              citizenAddress,
              description,
              location,
              important,
              department,
              attachments: attachmentData,
              assignedTo: pickedAddressee,
              status,
              resolutionDate: status === 'SOLVED' ? resolutiondate : null,
              comments,
              modifications: previousModifications,
              isWritable,
              followUp1,
              followUp2,
            },
            addressee: { addresseName: pickedAddressee },
          })
          .then(
            (response) => {
              if (response.ok) {
                if (response.data.error) {
                  toast.error('Request Update Failed ', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  return
                } else {
                  toast.success('Request Updated Successfully', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  history.push({
                    pathname: '/confirmation/complaint',
                    state: {
                      complaint: response.data.data,
                    },
                    search: '?updated-complaint',
                  })
                }
              } else {
                toast.error('Request Update Failed ', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            },
            (err) => {
              toast.error('Something Went Wrong. Please Refresh. ', {
                autoClose: 1250,
                closeButton: false,
              })
            }
          )
      }
    }
    console.log('Chla kya', citizenName, citizenMobileNumber)

    console.log(addresseeLoaded, citizenMobileNumber, citizenName, 'Checkout')
    if (this.state.isUpdateRequest === true) {
      isBlocking = false
    } else {
      console.log('locfalse')
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
              <p className="TxtHeading">Complaint</p>
              <div className="DivHeadUserInfo">
                <p className="TxtName">{citizenName}</p>
                <p className="TxtName">+91-{citizenMobileNumber}</p>
                <p className="TxtName">{citizenPincode}</p>
              </div>
            </div>
            <div className="FormFrame">
              <form onSubmit={handleComplaintSubmit}>
                {/* <fieldset disabled={this.state.editLocked}> */}

                <div className="TxtInputFrame">
                  <p className="TxtInput">Recommended by Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="clientname"
                  name="recommenededName"
                  disabled={true}
                  className="InputFrame"
                  placeholder="Recommended by Name"
                  value={this.state.recommendedName}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ recommenededName: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.recommenededName}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Recommended by Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  name="recommendedNumber"
                  disabled={true}
                  className="InputFrame"
                  placeholder="Recommended by Number"
                  value={this.state.recommendedNumber}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ recommendedNumber: e.target.value })
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.recommendedNumber}
                </span>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Description</p>
                  <p className="TxtStar">*</p>
                </div>
                <textarea
                  name="description"
                  type="text"
                  id="discription"
                  className="TextareaLayout"
                  placeholder="Please enter description ( 250 characters )"
                  rows="3"
                  cols="100"
                  value={this.state.description}
                  required
                  onChange={(e) => {
                    if (e.target.value.length <= 250) {
                      this.handleChange(e)
                      this.setState({ description: e.target.value })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.description}
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

                <p
                  className="TxtInput"
                  title="(Max File Size 1MB &amp; PDF/JPG/JPEG format only)"
                >
                  Attachment (Max File Size 2MB &amp; PDF format only)
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
                    console.log('ref', this.ref)
                    this.ref.current.click()
                  }}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Status</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'ASSIGNED' })}
                    >
                      <span
                        className={
                          this.state.status === 'ASSIGNED'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Assigned</p>
                  </div>
                  <div
                    className="SelectRadio"
                    style={
                      !this.state.isUpdateRequest
                        ? { filter: 'contrast(0.5)' }
                        : null
                    }
                  >
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'SOLVED' })}
                      style={
                        !this.state.isUpdateRequest
                          ? { pointerEvents: 'none' }
                          : null
                      }
                    >
                      <span
                        className={
                          this.state.status === 'SOLVED'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Solved</p>
                  </div>
                </div>

                {this.state.status === 'ASSIGNED' ? (
                  <div>
                    <p className="TxtInput">Assign to</p>
                    <input
                      type="text"
                      className="InputFrame"
                      placeholder="Please enter Addresse Name"
                      value={this.state.pickedAddressee}
                      required
                      onChange={(e) => {
                        this.setState({ pickedAddressee: e.target.value })
                      }}
                    />

                    <p className="TxtInput">Department</p>
                    <input
                      type="text"
                      className="InputFrame"
                      placeholder="Please enter Department of Addresse"
                      value={this.state.department}
                      required
                      onChange={(e) => {
                        this.setState({ department: e.target.value })
                      }}
                    />
                  </div>
                ) : (
                  <div />
                )}

                {this.state.status === 'SOLVED' ? (
                  <div style={{ marginBottom: '30px' }}>
                    <p className="TxtInput">Resolution Date</p>
                    <div>
                      <DatePicker
                        placeholder="Pick from calendar view"
                        className="InputFrame"
                        minDate={moment().toDate()}
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.resolutiondate}
                        onChange={(date) => {
                          let errors = this.state.errors
                          if (getYear(date).toString().length == 4) {
                            errors.resolutiondate = ''
                            this.setState({ resolutiondate: date, errors })
                          } else {
                            errors.resolutiondate = 'Invalid Year'
                            this.setState({ errors })
                          }
                        }}
                      />
                    </div>
                    <span className="validation-error-message">
                      {this.state.errors.resolutiondate}
                    </span>
                  </div>
                ) : (
                  <div />
                )}

                <div className="TxtInputFrame">
                  <p className="TxtInput">FollowUp 1</p>
                </div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  placeholder="Pick from calendar view"
                  className="InputFrame"
                  minDate={moment().toDate()}
                  selected={this.state.followUp1}
                  onChange={(date) => {
                    let errors = this.state.errors
                    if (getYear(date).toString().length == 4) {
                      errors.followUp1 = ''
                      this.setState({ followUp1: date, errors })
                    } else {
                      errors.followUp1 = 'Invalid Year'
                      this.setState({ errors })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.followUp1}
                </span>
                <div className="TxtInputFrame">
                  <p className="TxtInput">FollowUp 2</p>
                </div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  placeholder="Pick from calendar view"
                  className="InputFrame"
                  minDate={moment().toDate()}
                  selected={this.state.followUp2}
                  onChange={(date) => {
                    let errors = this.state.errors
                    if (getYear(date).toString().length == 4) {
                      errors.followUp2 = ''
                      this.setState({ followUp2: date, errors })
                    } else {
                      errors.followUp2 = 'Invalid Year'
                      this.setState({ errors })
                    }
                  }}
                />
                <span className="validation-error-message">
                  {this.state.errors.followUp2}
                </span>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Remarks</p>
                  <p className="TxtStar">*</p>
                </div>
                <textarea
                  type="text"
                  id="comments"
                  name="comments"
                  className="TextareaLayout"
                  placeholder="Please enter comments"
                  rows="5"
                  cols="100"
                  value={this.state.comments}
                  required
                  onChange={(e) => {
                    this.handleChange(e)
                    this.setState({ comments: e.target.value })
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
                      type="button"
                      className="PrintBtn UpdateButton"
                      onClick={() => {
                        handleComplaintUpdate()
                      }}
                    >
                      Update
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyrightFooter />
          </div>
        </div>
        <div className="emptyDiv" />
        {this.state.showLoader ? <Loader /> : null}
      </div>
    )
  }
}
export default Complaint
