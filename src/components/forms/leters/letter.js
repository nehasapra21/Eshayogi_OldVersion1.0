import React, { Component } from 'react'
import Header from '../../header/Header'
import 'react-datepicker/dist/react-datepicker.css'
import api from '../../../utils/api'
import { Typeahead } from 'react-bootstrap-typeahead'
import Attach from '../../../utils/images/attach.svg'
import Trash from '../../../utils/images/trash.svg'
import letterHeadTop from '../../../utils/images/letterHeadTop.jpg'
import letterHeadBottom from '../../../utils/images/letterHeadBottom.jpg'
import Loader from '../../hoc/Loader/Loader'
import backIcon from '../../../utils/images/icons-lelt-open-arrow.svg'
import Pdf from 'react-to-pdf'
import signature from '../../../utils/images/sign.png'
import { Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import '../../forms/newclient/NewClient.css'
import '../../forms/complaint/Complaint.css'
import '../../forms/event/Event.css'
import '../../forms/job/Job.css'
import './letter.css'
import ReactDOM from 'react-dom'
import { Prompt } from 'react-router-dom'
import DatePicker from 'react-datepicker'

class Letters extends Component {
  state = {
    isBlocking: false,
  }
  constructor(props) {
    super(props)
    document.title = 'Lettter'
    const { state: historyState } = props.location
    const { Letters } = { ...historyState }

    if (Letters) {
      const {
        citizenName,
        citizenMobileNumber,
        citizenPincode,
        citizenAddress,
        location,
        to,
        from,
        date,
        reference,
        envelopeType,
        letterType,
        subject,
        attachments,
        addressee,
        letter,
        email,
        language,
        recommendedNumber,
        recommendedName,
        content,
        digitalSignature,
      } = { ...Letters.request }
      const { ref, status } = { ...Letters }

      this.state = {
        ref,
        citizenName,
        citizenMobileNumber,
        recommendedName,
        recommendedNumber,
        citizenPincode,
        citizenAddress,
        location,
        to,
        from,
        date: new Date(date),
        reference,
        status,
        previousStatus: status,
        envelopeType,
        subject,
        letterType,
        attachments,
        officelocations: [],
        AddresseOptions: [],
        addressee,
        letter,
        email,
        addresseeLoaded: false,
        locationsLoaded: false,
        previousSelectedFile: attachments,
        selectedfile: attachments,
        selectedFilesFormData: new FormData(),
        selectedLetter: letter,
        selectedLetterFormData: new FormData(),
        isUpdateRequest: true,
        showLoader: false,
        isLoading: true,
        language,
        content,
        digitalSignature,
        isPrinting: false,
        doFileChanged: false,
        doNewfileUpload: false,
      }
    } else {
      const { citizen } = { ...historyState }
      const {
        firstName,
        callingNumber,
        pincode,
        address,
        recommendedName,
        recommendedNumber,
      } = { ...citizen }

      this.state = {
        recommendedName: recommendedName,
        recommendedNumber: recommendedNumber,
        citizenName: firstName,
        citizenMobileNumber: callingNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        contactNo: callingNumber,
        reference: '',
        letterType: 'doletter',
        subject: '',
        envelopeType: 'bypost',
        from: '',
        to: '',
        email: '',
        officelocations: [],
        AddresseOptions: [],
        addressee: [],
        location: '',
        date: new Date(),
        status: 'VERYIMPORTANT',
        addresseeLoaded: false,
        locationsLoaded: false,
        selectedfile: [],
        selectedFilesFormData: new FormData(),
        selectedLetter: [],
        selectedLetterFormData: new FormData(),
        isUpdateRequest: false,
        showLoader: false,
        isLoading: true,
        language: 'english',
        content: '',
        ref: '',
        digitalSignature: 'yes',
        isPrinting: false,
        doFileChanged: false,
        doNewfileUpload: false,
      }
    }
    this.toastID = React.createRef(null)
    this.fileInputRef = React.createRef()
    this.letterPreview = React.createRef()
  }

  componentDidMount() {
    const values = {
      limit: '100',
      offset: '0',
    }

    api.getLocations(values).then(
      (response) => {
        if (response.ok) {
          this.setState({
            officelocations: response.data.data.rows,
            locationsLoaded: true,
            isLoading: false,
          })
          console.log(response.data, 'hey there')
        } else {
          console.log('response not ok', response)
        }
      },
      (err) => {
        console.log('err', err)
      }
    )
  }

  onFileChange = (event) => {
    console.log(this.state.files, 'files attached')
    var array = [...this.state.selectedfile]
    var fileArray = []
    let x = array.length
    let y = event.target.files.length
    if (x >= 0 && y + x <= 10) {
      Array.from(event.target.files).forEach((file) => {
        console.log(file.name.toString().endsWith('.pdf'), 'lovish', file)
        if (file.size <= 2097152) {
          if (file.name.toString().endsWith('.pdf')) {
            array.push(file)
            fileArray.push(file)
          } else {
            toast.error('File Should PDF', {
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
        doNewfileUpload: true,
      })
    } else {
      toast.error('More than 10 Files not Allowed', {
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

  returnToManage = () => {
    this.props.history.push({
      pathname: '/manage-request',
      state: { manage: 'LETTERS' },
    })
  }

  render() {
    var { isBlocking } = this.state
    let uploadedFileDetails = []
    let uploadedLetterDetails = []
    document.title = 'red'
    const {
      ref,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      location,
      to,
      from,
      status,
      previousStatus,
      addressee,
      locationsLoaded,
      addresseeLoaded,
      date,
      reference,
      envelopeType,
      subject,
      attachments,
      letterType,
      selectedfile,
      selectedLetter,
      selectedFilesFormData,
      selectedLetterFormData,
      email,
      comments,
      recommendedName,
      recommendedNumber,
      language,
      content,
    } = this.state

    const requestData = {
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      citizenAddress,
      location,
      to,
      from,
      date,
      reference,
      envelopeType,
      letterType,
      subject,
      attachments: uploadedFileDetails,
      letter: uploadedLetterDetails,
      addressee,
      email,
      comments,
      recommendedName,
      recommendedNumber,
      language,
      content,
    }
    let newDate = new Date()
    let currentdate = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    const { history } = this.props
    const { state: historyState } = this.props.location
    const { citizen, Letters } = { ...historyState }
    let citizendata = citizen
    if (Letters) {
      citizendata = Letters.citizen
    }

    const setRef = (value) => {
      console.log('Set Ref', value)
      this.setState({ ref: value }, () => {
        console.log(this.state.ref)
      })
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...Letters }

    const handleSubmit = async () => {
      if (this.state.selectedfile.length !== 0) {
        for (let i = 0; i < selectedfile.length; i++) {
          selectedFilesFormData.append('files', selectedfile[i])

          let toastID = this.toastID

          await api.uploadFiles({ selectedFilesFormData, toastID }).then(
            (response) => {
              toast.done(this.toastID.current, {
                autoClose: 1250,
              })
              if (response.ok) {
                console.log('sdf', response.data.data)
                response.data.data.map((file, index) =>
                  uploadedFileDetails.push({
                    url: `${file}`,
                    name: file.substring(file.lastIndexOf('/') + 1),
                  })
                )
                toast.success('File Uploaded Successfully!', {
                  autoClose: 1250,
                  closeButton: false,
                })
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
            }
          )
        }
      }

      //////BULK IMPORT CODE/////
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
 
                  typeOfRequest: "LETTERS",
                  status: "PENDING",
                  request: tempRequest[i],
                  addressee: null,
                  citizen: citizen
 
              }).then(
                  (response) => {
                      if (response.ok) {
                          console.log('Letter responnse', response.data)
                          console.log(response.data, "xxx");
 
                      }
                      else {
                          alert('Error occured')
                          console.log(response.data)
                      }
                  },
                  (err) => {
                      console.log('err ', err)
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
          ref: ref,
          typeOfRequest: 'LETTERS',
          status: 'VERYIMPORTANT',
          request: requestData,
          addressee: null,
          citizen: citizendata,
        })
        .then(
          (response) => {
            if (response.ok) {
              console.log('Letter responnse', response.data)
              console.log(response.data, 'xxx')
              if (response.data.error) {
                toast.error('Request Failed', {
                  autoClose: 1250,
                  closeButton: false,
                })
              } else {
                //setRef(response.data.data.ref)
                toast.success('letter added Successfully!', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
              // history.push({
              //   pathname: '/confirmation/letter',
              //   state: { Letters: response.data.data },
              //   search: '?show-letter',
              // })
              // history.push({
              //   path: '/manage-request',
              //   state: {
              //     manage: 'LETTERS',
              //   },
              // })
            } else {
              alert('Error occured')
              console.log(response.data)
            }
          },
          (err) => {
            console.log('err ', err)
          }
        )
    }

    const handleLettersUpdate = async () => {
      console.log('Update request with following state', this.state)

      let allSelectedFiles = this.state.selectedfile
      let attachmentData = []
      let files = []

      if (this.state.selectedfile.length !== 0) {
        if (this.state.doNewfileUpload) {
          Object.keys(allSelectedFiles).forEach((value) => {
            if (allSelectedFiles[value].hasOwnProperty('url')) {
              attachmentData.push({ ...allSelectedFiles[value] })
            } else {
              files.push(allSelectedFiles[value])
            }
          })
          if (files.length > 0) {
            console.log('11111111111111111', files)
            console.log('files six')
            for (let i = 0; i < files.length; i++) {
              selectedFilesFormData.append('files', files[i])
            }

            let toastID = this.toastID

            console.log(files, 'lovish')
            await api.uploadFiles({ selectedFilesFormData, toastID }).then(
              (response) => {
                toast.done(this.toastID.current, {
                  autoClose: 1250,
                })
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
        } else if (this.state.doFileChanged) {
          attachmentData = this.state.selectedfile
        } else {
          attachmentData = this.state.selectedfile
        }
      }

      console.log('update initiated')
      await api
        .updateRequest({
          dd,
          mm,
          yy,
          typeOfRequest,
          status: `${this.state.status}`,
          byUser,
          ref,
          orgId,
          id,
          request: { ...requestData, attachments: attachmentData },
          addressee: null,
        })
        .then(
          (response) => {
            if (response.ok) {
              console.log('updated the Letter', response.data)
              toast.success('Letter updated Successfully!', {
                autoClose: 1250,
                closeButton: false,
              })
              history.push({
                path: '/manage-request',
                state: {
                  manage: 'LETTERS',
                },
              })
            } else {
              console.log('Some Error occured', response)
            }
          },
          (err) => {
            console.log('Rejected Error', err)
          }
        )
      document.title = 'ref'
    }
    if (this.state.isUpdateRequest === true) {
      isBlocking = false
    } else {
      console.log('locfalse')
    }
    return (
      <body>
        <div className=" NewClientForm">
          <Header isLoading={this.state.isLoading} />
          <Prompt
            when={isBlocking}
            message={(location) => 'Are you sure want to go?'}
          />
          <div className="row w-100 printable" style={{ marginTop: '5rem' }}>
            <div className="form-block col-5">
              <div className="FormOuterFrame">
                <div className="form-Heading non-printable">
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
                  <p className="TxtHeading">Letter</p>
                  <div className="DivHeadUserInfo">
                    <p className="TxtNameLetter">{citizenName}</p>
                    <p className="TxtNameLetter">{`+91-${citizenMobileNumber}`}</p>
                    <p className="TxtNameLetter">{citizenPincode}</p>
                  </div>
                </div>
                <form
                  className="FormFrame non-printable"
                  onSubmit={handleSubmit}
                  style={{ height: '27.7cm', overflowY: 'scroll' }}
                >
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Language</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ language: 'english' })}
                      >
                        <span
                          className={
                            this.state.language === 'english'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">English</p>
                    </div>

                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ language: 'hindi' })}
                      >
                        <span
                          className={
                            this.state.language === 'hindi'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Hindi</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Office Location</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    style={{ marginBottom: '30px' }}
                    onChange={(event) => {
                      this.setState({ location: event })
                    }}
                    options={this.state.officelocations}
                    selected={this.state.location}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Letter Type</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() =>
                          this.setState({ letterType: 'doletter' })
                        }
                      >
                        <span
                          className={
                            this.state.letterType === 'doletter'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Do Letter</p>
                    </div>

                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ letterType: 'letter' })}
                      >
                        <span
                          className={
                            this.state.letterType === 'letter'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Letter</p>
                    </div>

                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ letterType: 'message' })}
                      >
                        <span
                          className={
                            this.state.letterType === 'message'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Messages</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Reference Number</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="letterFrom"
                    className="InputFrame"
                    placeholder="25 Characters"
                    maxLength={25}
                    value={this.state.ref}
                    required
                    onChange={(e) => {
                      this.setState({ ref: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Date</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div>
                    <DatePicker
                      placeholder="Pick from calendar view"
                      className="InputFrame"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.date}
                      onChange={(date) => {
                        this.setState(
                          { date: date },
                          console.log('Date set', this.state.date)
                        )
                      }}
                    />
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">From</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="letterFrom"
                    className="InputFrame"
                    placeholder="25 Characters"
                    maxLength={25}
                    value={this.state.from}
                    required
                    onChange={(e) => {
                      this.setState({ from: e.target.value })
                    }}
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">To</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <input
                    type="text"
                    id="letterTo"
                    className="InputFrame"
                    placeholder="25 Characters"
                    maxLength={25}
                    value={this.state.to}
                    required
                    onChange={(e) => {
                      this.setState({ to: e.target.value })
                    }}
                  />

                  {/* <div className="TxtInputFrame">
                  <p className="TxtInput">Subject</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="subject"
                  className="InputFrame"
                  placeholder="25 Characters"
                  value={this.state.subject}
                  required
                  maxLength={25}
                  onChange={(e) => {
                    this.setState({ subject: e.target.value })
                  }}
                /> */}

                  {/* <div className="TxtInputFrame">
                  <p className="TxtInput">Content</p>
                </div>
                <textarea
                  type="text"
                  id="comments"
                  className="TextareaLayout"
                  placeholder="500 Characters"
                  // maxLength="500"
                  rows="10"
                  cols="100"
                  value={this.state.content}
                  onChange={(e) => {
                    this.setState({ content: e.target.value })
                  }}
                /> */}

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Digital Signature</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() =>
                          this.setState({ digitalSignature: 'yes' })
                        }
                      >
                        <span
                          className={
                            this.state.digitalSignature === 'yes'
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
                        onClick={() =>
                          this.setState({ digitalSignature: 'no' })
                        }
                      >
                        <span
                          className={
                            this.state.digitalSignature === 'no'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">No</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Recommended by Name</p>
                  </div>
                  <input
                    type="text"
                    id="recommendedName"
                    disabled={true}
                    className="InputFrame"
                    value={this.state.recommendedName}
                    placeholder="Recommended by Name"
                  />

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Recommended by Number</p>
                  </div>
                  <input
                    type="tel"
                    id="recommendedNumber"
                    disabled={true}
                    className="InputFrame"
                    value={this.state.recommendedNumber}
                    placeholder="Recommended by Number"
                  />
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Envelope type</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() =>
                          this.setState({ envelopeType: 'bypost' })
                        }
                      >
                        <span
                          className={
                            this.state.envelopeType === 'bypost'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">By Post</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() =>
                          this.setState({ envelopeType: 'byhand' })
                        }
                      >
                        <span
                          className={
                            this.state.envelopeType === 'byhand'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">By Hand</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">
                      Attachment (Max File Size 2MB &amp; PDF/JPG/JPEG format
                      only)
                    </p>
                    <p className="TxtStar">*</p>
                  </div>
                  {this.fileData()}
                  <input
                    required
                    type="file"
                    multiple
                    onChange={this.onFileChange}
                    ref={this.fileInputRef}
                    className="FileInput"
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                  />
                  <div
                    className="SelectFile"
                    onClick={() => this.fileInputRef.current.click()}
                  >
                    <img
                      src={Attach}
                      alt=""
                      className="AttachFile non-printable"
                    />
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
                        onClick={() =>
                          this.setState({ status: 'VERYIMPORTANT' })
                        }
                      >
                        <span
                          className={
                            this.state.status === 'VERYIMPORTANT'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Very Important</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ status: 'IMPORTANT' })}
                      >
                        <span
                          className={
                            this.state.status === 'IMPORTANT'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">Important</p>
                    </div>
                    <div className="SelectRadio">
                      <label
                        className="radiobutton"
                        onClick={() => this.setState({ status: 'GENERAL' })}
                      >
                        <span
                          className={
                            this.state.status === 'GENERAL'
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </label>
                      <p className="TxtRadioInput">General</p>
                    </div>
                  </div>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Remarks</p>
                  </div>
                  <textarea
                    type="text"
                    id="comments"
                    className="TextareaLayout"
                    placeholder="500 Characters"
                    maxLength="500"
                    rows="5"
                    cols="100"
                    value={this.state.comments}
                    onChange={(e) =>
                      this.setState({ comments: e.target.value })
                    }
                  />
                  <div className="TxtInputFrame">
                    {this.state.isUpdateRequest ? (
                      <div>
                        <Pdf
                          y={45}
                          targetRef={this.letterPreview}
                          filename={this.state.ref}
                          onComplete={() => {
                            this.setState({ isPrinting: false })
                            history.push({
                              path: '/manage-request',
                              state: { manage: 'LETTERS' },
                            })
                          }}
                        >
                          {({ toPdf }) => (
                            <button
                              type="button"
                              className="PrintBtn"
                              style={{ background: '#198a44' }}
                              onClick={
                                ((document.title = this.state.ref),
                                () => window.print())
                              }
                            >
                              Print
                            </button>
                          )}
                        </Pdf>
                        <button
                          type="button"
                          className="PrintBtn UpdateButton"
                          onClick={() => handleLettersUpdate()}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Pdf
                          y={45}
                          targetRef={this.letterPreview}
                          filename={this.state.ref}
                          onComplete={() => {
                            this.setState({ isPrinting: false })
                          }}
                        >
                          {({ toPdf }) => (
                            <button
                              type="button"
                              className="PrintBtn"
                              style={{ background: '#198a44' }}
                              onClick={
                                ((document.title = this.state.ref),
                                () => window.print())
                              }
                            >
                              Print
                            </button>
                          )}
                        </Pdf>
                        <button
                          type="button"
                          className="PrintBtn UpdateButton"
                          onClick={() => handleSubmit()}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <div className="emptyDiv" />
              {this.state.showLoader && <Loader />}
            </div>
            <div className="outerfram">
              <div className="letter-display">
                <img
                  src={letterHeadTop}
                  alt=""
                  className="w-100 non-printable"
                  style={{ borderRadius: '20px' }}
                />
                <div ref={this.letterPreview}>
                  <div className="datemove">
                    <p className="font-size-12 text-right">No. {ref} </p>
                    <p className="font-size-12 text-right">
                      {this.state.language == 'hindi'
                        ? `दिनांक ${new Date(this.state.date).getDate()}/${
                            new Date(this.state.date).getMonth() + 1
                          }/${new Date(this.state.date).getFullYear()}`
                        : `Date ${new Date(this.state.date).getDate()}/${
                            new Date(this.state.date).getMonth() + 1
                          }/${new Date(this.state.date).getFullYear()}`}
                    </p>
                  </div>
                  <div className="letter-content">
                    <Row
                      className="subject-row"
                      style={{ alignItems: 'baseline' }}
                    >
                      <div className="col-2">
                        {this.state.language == 'hindi' ? (
                          <p
                            className="subjecttxt"
                            style={{
                              paddingLeft: '23px',
                              fontWeight: 'bold',
                              fontSize: '12pt',
                            }}
                          >
                            विषय:
                          </p>
                        ) : (
                          <p
                            className="subjecttxt"
                            style={{ paddingLeft: '23px', fontWeight: 'bold' }}
                          >
                            Subject:
                          </p>
                        )}
                      </div>
                      {/* <p className="ml-1 text-justify">{this.state.subject}</p> */}
                      <div className=" subjectpdf col-10">
                        <input
                          type="text"
                          id="subject"
                          placeholder="Enter subject"
                          className="w-100"
                          style={{ border: 'none', fontSize: '12px' }}
                          maxLength={130}
                          value={this.state.subject}
                          required
                          onChange={(e) =>
                            this.setState({ subject: e.target.value })
                          }
                        />
                      </div>
                    </Row>
                    <Row>
                      {this.state.isPrinting ? (
                        <p className="letter-content-text">
                          {' '}
                          {this.state.content}
                        </p>
                      ) : (
                        <div className="col letter-text-col">
                          <textarea
                            type="text"
                            id="content1"
                            placeholder="Enter your content"
                            className="letter-content-input"
                            maxLength={20000}
                            value={this.state.content}
                            onChange={(e) =>
                              this.setState({ content: e.target.value })
                            }
                          />
                          <div className="contentDiv">{this.state.content}</div>
                        </div>
                      )}
                    </Row>
                  </div>

                  <div className="signature-block">
                    <div
                      className="row"
                      style={
                        this.state.digitalSignature == 'yes'
                          ? { visibility: 'visible' }
                          : { visibility: 'hidden' }
                      }
                    >
                      <div className="col text-right">
                        <img
                          src={signature}
                          className="digital-signature"
                          alt="Shri. Anurag Thakur"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-right sincerelyDiv">
                        {this.state.language == 'hindi' ? (
                          <span className="font-size-12 pr-5 mr-5">भवदीय,</span>
                        ) : (
                          <span className="font-size-12" id="DivID">
                            Your Sincerely,
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-right sincerelyDiv">
                        <span className="font-size-12">
                          {this.state.language == 'hindi' ? (
                            <>(कार्यालय श्री। अनुराग ठाकुर)</>
                          ) : (
                            <>(Anurag Thakur)</>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Row>
                    {' '}
                    <Col xs={12}>
                      <p className="letter-to">{this.state.to}</p>
                    </Col>
                  </Row>
                </div>
                <img
                  src={letterHeadBottom}
                  alt=""
                  style={{ borderRadius: '20px' }}
                  className="w-100 non-printable"
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    )
  }
}
export default Letters
