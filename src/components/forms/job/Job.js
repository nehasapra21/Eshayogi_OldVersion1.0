import React, { Component, Fragment } from 'react'
import '../event/Event.css'
import '../job/Job.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import '../newclient/NewClient.css'
import Trash from '../../../utils/images/trash.svg'
import Attach from '../../../utils/images/attach.svg'
import '../complaint/Complaint.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import api from '../../../utils/api'
import { toast } from 'react-toastify'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getYear } from '../../../utils/validations'
import Loader from '../../hoc/Loader/Loader'
import backIcon from '../../../utils/images/icons-lelt-open-arrow.svg'
import ReactDOM from 'react-dom'
import { Prompt } from 'react-router-dom'
import { validNumberRegex } from '../../../utils/validations'

class Job extends Component {
  state = {
    isBlocking: false,
  }
  constructor(props) {
    super(props)
    document.title = 'Job Registraion'
    console.log('Jobs props', this.props)

    const { _id, clientDisplayName } = JSON.parse(
      localStorage.getItem('eSahyogiUser')
    )

    const { state: historyState } = props.location

    const { citizen, job } = { ...historyState }
    console.log('citizen', job)

    if (job) {
      const {
        recommendedName,
        recommendedNumber,
        citizenName,
        citizenPhone,
        citizenPincode,
        citizenAddress,
        currentlyEmployed,
        lastMonthlySalary,
        experienceYears,
        experienceMonths,
        preferredSector,
        highestEduQualification,
        additionalEduQualification,
        isImportant,
        invitation,
        addresseAssigned,
        sharedToDesignation,
        sharedToName,
        sharedToOrganisation,
        sharedToNumber,
        comments,
        createdBy,
        createdOn,
        professionalQualification,
        resolutionDate,
      } = { ...job.request }
      const { ref, status } = { ...job }

      this.state = {
        ref,
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        clientDisplayName,
        citizenName,
        citizenMobileNumber: citizenPhone,
        citizenPincode,
        citizenAddress,
        popoverOpen1: false,
        popoverOpen2: false,
        employed: currentlyEmployed ? 'yes' : 'no',
        salary: lastMonthlySalary,
        experienceyear: experienceYears,
        experiencemonth: experienceMonths,
        sector: preferredSector,
        education: highestEduQualification,
        other: additionalEduQualification,
        resolutionDate:
          resolutionDate !== undefined ? new Date(resolutionDate) : '',
        previousAssignedAddressee: addresseAssigned,
        selectedaddresse: addresseAssigned.length ? addresseAssigned : [],
        Addresseoptions: [],
        sectorPreferences: [
          { name: 'Accountancy, banking and finance' },
          { name: 'Charity and voluntary work' },
          { name: 'Creative arts and design' },
          { name: 'Energy and utilities' },
          { name: 'Engineering and manufacturing' },
          { name: 'Environment and agriculture' },
          { name: 'Healthcare' },
          { name: 'Hospitality and events management' },
          { name: 'Information technology' },
          { name: 'Law' },
          { name: 'Law enforcement and security' },
          { name: 'Leisure, sport and tourism' },
          { name: 'Marketing, advertising and PR' },
          { name: 'Media and internet' },
          { name: 'Property and construction' },
          { name: 'Public services and administration' },
          { name: 'Social care' },
          { name: 'Recruitment and HR' },
          { name: 'Retail' },
          { name: 'Sales' },
          { name: 'Science and pharmaceuticals' },
          { name: 'Teacher training and education' },
          { name: 'Transport and logistics' },
        ],
        important: isImportant ? 'yes' : 'no',
        previousStatus: status,
        status: status,
        previousSelectedFile: invitation,
        selectedfile: invitation,
        selectedFilesFormData: new FormData(),
        comments: comments,
        previousCreatedBy: createdBy,
        previousCreatedOn: createdOn,
        addresseesLoaded: false,
        isUpdateRequest: true,
        sharedToDesignation: sharedToDesignation,
        sharedToName: sharedToName,
        sharedToOrganisation: sharedToOrganisation,
        sharedToNumber: sharedToNumber,
        professionalQualification: professionalQualification,
        showLoader: false,
        doFileChanged: false,
        doNewFileUpload: false,
      }
    } else {
      const { citizen } = { ...historyState }

      console.log('props from the complaint form', citizen)

      const {
        firstName,
        callingNumber,
        pincode,
        address,
        recommendedName,
        recommendedNumber,
      } = { ...citizen }

      console.log('first 2 fields', recommendedName, recommendedNumber)

      this.state = {
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        clientDisplayName,
        citizenName: firstName,
        citizenMobileNumber: callingNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        popoverOpen1: false,
        popoverOpen2: false,
        employed: 'yes',
        salary: '',
        experienceyear: '',
        experiencemonth: '',
        sector: '',
        sectorPreferences: [
          { name: 'Accountancy, banking and finance' },
          { name: 'Charity and voluntary work' },
          { name: 'Creative arts and design' },
          { name: 'Energy and utilities' },
          { name: 'Engineering and manufacturing' },
          { name: 'Environment and agriculture' },
          { name: 'Healthcare' },
          { name: 'Hospitality and events management' },
          { name: 'Information technology' },
          { name: 'Law' },
          { name: 'Law enforcement and security' },
          { name: 'Leisure, sport and tourism' },
          { name: 'Marketing, advertising and PR' },
          { name: 'Media and internet' },
          { name: 'Property and construction' },
          { name: 'Public services and administration' },
          { name: 'Social care' },
          { name: 'Recruitment and HR' },
          { name: 'Retail' },
          { name: 'Sales' },
          { name: 'Science and pharmaceuticals' },
          { name: 'Teacher training and education' },
          { name: 'Transport and logistics' },
        ],
        education: 'uneducated',
        other: '',
        resolutionDate: '',
        selectedaddresse: [],
        Addresseoptions: [],
        important: 'yes',
        status: 'SHARED',
        duration: 'medium',
        selectedfile: [],
        selectedFilesFormData: new FormData(),
        comments: '',
        addresseesLoaded: false,
        editable: '',
        professionalQualification: '',
        isUpdateRequest: false,
        sharedToDesignation: '',
        sharedToName: '',
        sharedToOrganisation: '',
        sharedToNumber: '',
        showLoader: false,
        doFileChanged: false,
        doNewFileUpload: false,
      }
    }
    this.toastID = React.createRef(null)
    this.ref = React.createRef()
    this.onSelect = this.onSelect.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  onFileChange = (event) => {
    var array = [...this.state.selectedfile]
    console.log(event.target.files.length, 'files attached', array.length)
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

  onSelect(selectedList, selectedItem) {
    console.log('selected adresse', selectedList)
    this.setState({ selectedaddresse: selectedList })
  }

  onRemove(selectedList, removedItem) {
    this.setState({ selectedaddresse: selectedList })
  }
  returnToManage = () => {
    const { state: historyState } = this.props.location

    const { job } = { ...historyState }
    this.props.history.push({
      pathname: '/confirmation/job',
      state: {
        job: job,
      },
    })
  }
  sayHello() {
    let isBlocking = false
  }

  checkForExperiance = () => {
    let years = parseInt(this.state.experienceyear)
    let month = parseInt(this.state.experiencemonth)

    if (month >= 12) {
      let qoutient = parseInt(month / 12)
      let remainder = month % 12

      years = years + qoutient
      month = remainder
      let stringYear = years.toString()
      let stringMonth = month.toString()
      this.setState({
        experienceyear: stringYear,
        experiencemonth: stringMonth,
      })
    }
  }

  render() {
    var { isBlocking } = this.state
    let uploadedFileDetails = []

    const {
      ref,
      clientDisplayName,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      userId,
      citizenAddress,
      recommendedName,
      recommendedNumber,
      employed,
      salary,
      experienceyear,
      experiencemonth,
      sector,
      education,
      other,
      date,
      previousAssignedAddressee,
      selectedaddresse,
      important,
      status,
      previousStatus,
      duration,
      selectedfile,
      previousSelectedFile,
      selectedFilesFormData,
      addresseesLoaded,
      resolutionDate,
      comments,
      sharedToDesignation,
      sharedToName,
      sharedToOrganisation,
      sharedToNumber,
      professionalQualification,
      previousCreatedBy,
      previousCreatedOn,
    } = this.state

    const requestData = {
      ref,
      recommendedName,
      recommendedNumber,
      citizenName,
      citizenPhone: citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      recommendedName,
      recommendedNumber,
      currentlyEmployed: employed === 'yes',
      lastMonthlySalary: salary,
      experienceYears: experienceyear,
      experienceMonths: experiencemonth,
      preferredSector: sector,
      highestEduQualification: education,
      additionalEduQualification: education === 'other' ? other : null,
      important,
      invitation: uploadedFileDetails,
      addresseAssigned: selectedaddresse,
      status,
      sharedToDesignation,
      sharedToName,
      sharedToOrganisation,
      sharedToNumber,
      professionalQualification,
      comments,
      createdOn: new Date(),
    }
    let newDate = new Date()
    let currentdate = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    const { history } = this.props
    const { state: historyState } = this.props.location
    const { citizen, job } = { ...historyState }
    let citizendata = citizen
    if (job) {
      citizendata = job.citizen
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...job }
    const handleSubmit = async (event) => {
      //this.checkForExperiance();
      this.setState({
        isBlocking: false,
      })
      event.preventDefault()
      if (this.state.selectedfile.length !== 0) {
        for (let i = 0; i < selectedfile.length; i++) {
          selectedFilesFormData.append('files', selectedfile[i])
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
                console.log('sdf', response.data.data)
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
            console.log('err', err)
          }
        )
      }

      ///////BULK IMPORT CODE////
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
              dd: `${currentdate}`,
              mm: `${month}`,
              yy: `${year}`,
 
              typeOfRequest: "JOB",
              status: status,
              request: tempRequest[i],
              addressee: null,
              citizen: citizen.data,
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('jobs response', response.data);
                } else {
                  toast.error("An Internal Error Occurred!");
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
          dd: `${currentdate}`,
          mm: `${month}`,
          yy: `${year}`,

          typeOfRequest: 'JOB',
          status: 'SHARED',
          request: requestData,
          addressee: null,
          citizen: citizen,
        })
        .then(
          (response) => {
            if (response.ok) {
              if (response.data.error) {
                toast.error('Request Failed', {
                  autoClose: 1250,
                  closeButton: false,
                })
                return
              } else {
                toast.success('Request Created', {
                  autoClose: 1250,
                  closeButton: false,
                })
                history.push({
                  pathname: '/confirmation/job',
                  state: { job: response.data.data },
                })
              }
            } else {
              toast.error('Request Failed!', {
                autoClose: 1250,
                closeButton: false,
              })
            }
          },
          (err) => {
            toast.error('Something Went Wrong. Please Refresh.!', {
              autoClose: 1250,
              closeButton: false,
            })
            console.log('err ', err)
          }
        )
    }

    const handleJobUpdate = async () => {
      //this.checkForExperiance()
      console.log('Update request with following state', this.state)
      if (previousStatus === 'PLACED' || previousStatus === 'REJECTED') {
        toast.error('Request already placed')
        return
      }
      if (previousStatus === 'SHARED') {
        if ((status === 'PLACED' || status === 'REJECTED') && !resolutionDate) {
          toast.error('Please enter resolution date')
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

              let toastID = this.toastID

              console.log(files, 'lovish', toastID)
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
                      console.log(
                        'sdf',
                        response.data.data,
                        uploadedFileDetails
                      )
                      response.data.data.map((file, index) =>
                        attachmentData.push({
                          url: `${file}`,
                          name: file.substring(file.lastIndexOf('/') + 1),
                        })
                      )
                    }
                    // handleSetstate(updatedUploadedFileDetails)
                  } else {
                    console.log(response)
                    toast.error('File Upload Failed!', {
                      autoClose: 1250,
                      closeButton: false,
                    })
                  }
                },
                (err) => {
                  toast.error('Something Went Wrong. Please Refresh.!', {
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
            request: {
              citizenName,
              citizenPhone: citizenMobileNumber,
              citizenPincode,
              citizenAddress,
              recommendedNumber,
              recommendedName,
              currentlyEmployed: employed === 'yes',
              lastMonthlySalary: salary,
              experienceYears: experienceyear,
              experienceMonths: experiencemonth,
              preferredSector: sector,
              highestEduQualification: education,
              additionalEduQualification: other,
              isImportant: important === 'yes',
              addresseAssigned: selectedaddresse,
              status: status,
              resolutionDate: resolutionDate,
              comments: comments,
              createdBy: previousCreatedBy,
              createdOn: previousCreatedOn,
              sharedToDesignation,
              sharedToName,
              sharedToOrganisation,
              sharedToNumber,
              professionalQualification,
              invitation: attachmentData,
            },
            addressee: selectedaddresse[0],
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
                  toast.success('Request Updated')
                  history.push({
                    pathname: '/confirmation/job',
                    state: { job: response.data.data },
                    search: 'application-updated',
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
              toast.error('Something Went Wrong. Please Refresh.!', {
                autoClose: 1250,
                closeButton: false,
              })
            }
          )
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
              <p className="TxtHeading">Jobs</p>
              <div className="DivHeadUserInfo">
                <p className="TxtName">{citizenName}</p>
                <p className="TxtName">{`+91-${citizenMobileNumber}`}</p>
                <p className="TxtName">{citizenPincode}</p>
              </div>
            </div>
            <form className="FormFrame" onSubmit={handleSubmit}>
              {/* <fieldset disabled={this.state.editable}> */}

              <div className="TxtInputFrame">
                <p className="TxtInput">Recommended by Name</p>
              </div>
              <input
                type="text"
                id="clientname"
                disabled={true}
                className="InputFrame"
                placeholder="Recommended by Name"
                value={this.state.recommendedName}
                required
                onChange={(e) => {
                  this.setState({ recommendedName: e.target.value })
                }}
              />

              <div className="TxtInputFrame">
                <p className="TxtInput">Recommended by Number</p>
              </div>
              <input
                type="text"
                disabled={true}
                className="InputFrame"
                placeholder="Recommended by Number"
                value={this.state.recommendedNumber}
                required
                onChange={(e) => {
                  this.setState({ recommendedNumber: e.target.value })
                }}
              />

              <div className="TxtInputFrame">
                <p className="TxtInput">Currently Employed?</p>
                <p className="TxtStar">*</p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ employed: 'yes' })}
                  >
                    <span
                      className={
                        this.state.employed === 'yes' ? 'checked' : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Yes</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ employed: 'no' })}
                  >
                    <span
                      className={
                        this.state.employed === 'no' ? 'checked' : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">No</p>
                </div>
              </div>

              <div className="TxtInputFrame">
                <p className="TxtInput">Monthly Salary from Last Job</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="number"
                pattern="[0-9]{0-6}"
                min="0"
                max="999999"
                maxLength="6"
                id="inviteename"
                className="InputFrame"
                placeholder="Please enter salary"
                value={this.state.salary}
                required
                onChange={(e) => {
                  this.setState({ salary: e.target.value })
                }}
              />

              <div className="Experience">
                <div className="InnerExperience">
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Experience - Years</p>
                    <p className="TxtStar">*</p>
                  </div>

                  <input
                    type="text"
                    className="InputFrame"
                    placeholder="Years"
                    value={this.state.experienceyear}
                    required
                    onChange={(e) => {
                      this.setState({ experienceyear: e.target.value })
                    }}
                  />
                </div>

                <div className="InnerExperience">
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Experience - Months</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    className="InputFrame"
                    placeholder="Months"
                    value={this.state.experiencemonth}
                    required
                    onChange={(e) => {
                      this.setState({ experiencemonth: e.target.value })
                    }}
                  />
                </div>
              </div>

              <div className="TxtInputFrame">
                <p className="TxtInput">Education Qualification</p>
                <p className="TxtStar">*</p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() =>
                      this.setState({ education: 'Higher Secondary' })
                    }
                  >
                    <span
                      className={
                        this.state.education === 'Higher Secondary'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Higher Secondary</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() =>
                      this.setState({ education: 'Senior Secondary' })
                    }
                  >
                    <span
                      className={
                        this.state.education === 'Senior Secondary'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Senior Secondary</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ education: 'Bachelors' })}
                  >
                    <span
                      className={
                        this.state.education === 'Bachelors'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Bachelors</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() =>
                      this.setState({ education: 'Masters or Higher' })
                    }
                  >
                    <span
                      className={
                        this.state.education === 'Masters or Higher'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Masters or Higher</p>
                </div>

                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ education: 'other' })}
                  >
                    <span
                      className={
                        this.state.education === 'other'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Other</p>
                </div>
              </div>
              {this.state.education === 'other' ? (
                <div>
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Other</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="other"
                    className="InputFrame"
                    placeholder="Please mention qualification"
                    value={this.state.other}
                    required
                    onChange={(e) => {
                      this.setState({ other: e.target.value })
                    }}
                  />
                </div>
              ) : (
                <div />
              )}

              <div className="TxtInputFrame">
                <p className="TxtInput">Professional Qualification</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="other"
                className="InputFrame"
                placeholder="Professional qualification"
                value={this.state.professionalQualification}
                required
                onChange={(e) => {
                  this.setState({ professionalQualification: e.target.value })
                }}
              />
              <p className="TxtInput">
                Attachment (Max File Size 2MB &amp; PDF format only)
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

              {/*<div className="TxtInputFrame">
                  <p className="TxtInput">Assigned to Addresse</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ display: "flex" }}>
                  {console.log("Adresse in job", this.state.Addresseoptions)}
                  <Multiselect
                    options={this.state.Addresseoptions} // Options to display in the dropdown
                    className="InputFrame"
                    placeholder=" "
                    required
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="firstName"
                    selectedValues={selectedaddresse}
                  />
                </div> */}

              <div className="TxtInputFrame">
                <p className="TxtInput">Status</p>
                <p className="TxtStar">*</p>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ status: 'SHARED' })}
                  >
                    <span
                      className={
                        this.state.status === 'SHARED' ? 'checked' : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Shared</p>
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
                      onClick={() => this.setState({ status: 'PLACED' })}
                      style={
                        this.state.isUpdateRequest
                          ? null
                          : { pointerEvents: 'none' }
                      }
                    >
                      <span
                        className={
                          this.state.status === 'PLACED'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Placed</p>
                  </div>
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
              </div>

              {this.state.status === 'PLACED' ||
              this.state.status === 'REJECTED' ? (
                <div style={{ marginBottom: '30px' }}>
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Resolution Date</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    placeholder="Pick from calendar view"
                    className="InputFrame"
                    selected={this.state.resolutionDate}
                    onChange={(date) => {
                      this.setState({ resolutionDate: date })
                    }}
                  />
                </div>
              ) : (
                <div />
              )}

              {this.state.status === 'SHARED' ? (
                <Fragment>
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Shared To Name</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="other"
                    className="InputFrame"
                    placeholder="Name"
                    value={this.state.sharedToName}
                    required
                    onChange={(e) => {
                      this.setState({ sharedToName: e.target.value })
                    }}
                  />
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Shared To Designation</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="other"
                    className="InputFrame"
                    placeholder="Designation"
                    value={this.state.sharedToDesignation}
                    required
                    onChange={(e) => {
                      this.setState({ sharedToDesignation: e.target.value })
                    }}
                  />
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Shared To Mobile Number</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="other"
                    className="InputFrame"
                    placeholder="Mobile Number"
                    value={this.state.sharedToNumber}
                    required
                    onChange={(e) => {
                      if (
                        (validNumberRegex.test(e.target.value) ||
                          e.target.value === '') &&
                        e.target.value.length <= 10
                      ) {
                        this.setState({ sharedToNumber: e.target.value })
                      }
                    }}
                  />
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Shared To Organisation</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="other"
                    className="InputFrame"
                    placeholder="Organisation Name"
                    value={this.state.sharedToOrganisation}
                    required
                    onChange={(e) => {
                      this.setState({ sharedToOrganisation: e.target.value })
                    }}
                  />
                </Fragment>
              ) : null}

              <div className="TxtInputFrame">
                <p className="TxtInput">Remarks</p>
                <p className="TxtStar">*</p>
              </div>
              <textarea
                type="text"
                id="comments"
                className="TextareaLayout"
                placeholder="Please enter remarks ( 250 characters )"
                rows="5"
                cols="100"
                value={this.state.comments}
                required
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    this.setState({ comments: e.target.value })
                  }
                }}
              />

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
              {/* </fieldset> */}
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
export default Job
