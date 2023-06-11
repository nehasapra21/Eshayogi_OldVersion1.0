import React, { Component } from 'react'
import '../forms/event/Event.css'
import '../forms/job/Job.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import CopyrightFooter from '../footer/CopyrightFooter'
import '../forms/newclient/NewClient.css'
import '../forms/complaint/Complaint.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import api from '../../utils/api'
import { Typeahead } from 'react-bootstrap-typeahead'
import ImgLogo from '../../utils/images/port.png'
import Attach from '../../utils/images/attach.svg'
import Trash from '../../utils/images/trash.svg'
import letterHeadTop from '../../utils/images/letterHeadTop.jpg'
import letterHeadBottom from '../../utils/images/letterHeadBottom.jpg'
import Loader from '../hoc/Loader/Loader'
import confirmLetter from '../confirmation/confirmLetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import Pdf from 'react-to-pdf'
import signature from '../../utils/images/sign.png'
import { Container, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'

class Letters extends Component {
  constructor(props) {
    super(props)
    const { state: historyState } = props.location
    const { Letters } = { ...historyState }
    console.log(Letters, 'citizen')

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
        date,
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
      }
      console.log(this.state.previousStatus, 'ashu')
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
        date: `${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`,
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
      }
    }
    this.ref = React.createRef()
    this.ref1 = React.createRef()
    this.referal = React.createRef()
  }

  componentDidMount() {
    const values = {
      limit: '100',
      offset: '0',
    }
    api
      .getAddressees({
        limit: '100',
        offset: '0',
      })
      .then(
        (response) => {
          if (response.ok) {
            this.setState({
              AddresseOptions: response.data.data.rows,
              addresseesLoaded: true,
            })
            console.log(response.data.data.rows, 'Addressee')
          } else {
            console.log('something error occured ', response)
            this.props.history.push('/citizen-registration')
          }
        },
        (err) => {
          console.log('err is', err)
          this.props.history.push('/citizen-registration')
        }
      )
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
    var array = [...this.state.selectedfile]
    Array.from(event.target.files).forEach((file) => {
      if (file.size <= 1048576) {
        array.push(file)
      } else {
        alert('File Exceeds Size Limit')
      }
    })
    this.setState({ selectedfile: array })
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
  onLetterChange = (event) => {
    var array = [...this.state.selectedLetter]
    Array.from(event.target.files).forEach((file) => {
      if (file.size <= 1048576) {
        array.push(file)
      } else {
        alert('File Size Exceeds')
      }
    })
    this.setState({ selectedLetter: array })
  }
  letterData = () => {
    if (this.state.selectedLetter.length > 0) {
      return this.state.selectedLetter.map((file, index) => (
        <div className="SelectedItemFrame" key={index}>
          <img
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={() => {
              var array = [...this.state.selectedLetter]
              array.splice(index, 1)
              this.setState({ selectedLetter: array }, () => {
                console.log(this.state.selectedLetter)
              })
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
      state: {
        manage: 'LETTERS',
      },
    })
  }
  render() {
    let uploadedFileDetails = []
    let uploadedLetterDetails = []

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
      this.setState(
        {
          ref: value,
        },
        () => {
          console.log(this.state.ref)
        }
      )
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...Letters }
    const handleSubmit = () => {
      // event.preventDefault()
      // this.setState({ showLoader: true })
      console.log('trying to submit with ', this.state)

      async function Main() {
        if (selectedfile.length > 0) {
          for (let i = 0; i < selectedfile.length; i++) {
            selectedFilesFormData.append('files', selectedfile[i])
          }
          await api.uploadFiles(selectedFilesFormData).then(
            (response) => {
              if (response.ok) {
                console.log('sdf', response.data.data)
                response.data.data.map((file, index) =>
                  uploadedFileDetails.push({
                    url: `${file}`,
                    name: file.substring(file.lastIndexOf('/') + 1),
                  })
                )
                toast.success('File Uploaded Successfully!')
              } else {
                toast.error('File Upload Failed!')
                console.log(response)
              }
            },
            (err) => {
              toast.error('File Upload Failed!')
            }
          )
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

        api
          .createRequest({
            dd: `${currentdate}`,
            mm: `${month}`,
            yy: `${year}`,

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
                setRef(response.data.data.ref)
                toast.success('letter added Successfully!')
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
      Main()
    }

    const handleLettersUpdate = async () => {
      console.log('Update request with following state', this.state)

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
      if (files.length > 0) {
        console.log('11111111111111111', files)
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
              toast.success('Letter updated Successfully!')
              history.push({
                path: '/manage-request',
                state: {
                  manage: 'LETTERS',
                },
              })

              // history.push({
              //   pathname: '/confirmation/letter',
              //   state: { Letters: response.data.data },
              //   search: '?updated-letter',
              // })
            } else {
              console.log('Some Error occured', response)
            }
          },
          (err) => {
            console.log('Rejected Error', err)
          }
        )
    }

    // const options = {
    //   orientation: 'protrait',
    //   unit: 'in',
    //   format: [8, 11],
    // }

    return (
      <div className="NewClientForm">
        <Header isLoading={this.state.isLoading} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div className="Letterframe">
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
                <p className="TxtHeading">Letter</p>
                <div className="DivHeadUserInfo">
                  <p className="TxtNameLetter">{citizenName}</p>
                  <p className="TxtNameLetter">{`+91-${citizenMobileNumber}`}</p>
                  <p className="TxtNameLetter">{citizenPincode}</p>
                </div>
              </div>
              <form
                className="FormFrame"
                onSubmit={handleSubmit}
                style={{ height: '74vh', overflowY: 'scroll' }}
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
                      onClick={() => this.setState({ letterType: 'doletter' })}
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
                  <p className="TxtInput">Date</p>
                  <p className="TxtStar">*</p>
                </div>
                <div className="InputFrame">
                  <p className="TxtInput" style={{ margin: '0px' }}>
                    {this.state.date}
                  </p>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">From</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="subject"
                  className="InputFrame"
                  placeholder="25 Characters"
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
                  id="subject"
                  className="InputFrame"
                  placeholder="25 Characters"
                  value={this.state.to}
                  required
                  onChange={(e) => {
                    this.setState({ to: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
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
                  onChange={(e) => {
                    this.setState({ subject: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Content</p>
                </div>
                <textarea
                  type="text"
                  id="comments"
                  className="TextareaLayout"
                  placeholder="500 Characters"
                  maxLength="500"
                  rows="10"
                  cols="100"
                  value={this.state.content}
                  onChange={(e) => {
                    this.setState({ content: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Digital Signature</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ digitalSignature: 'yes' })}
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
                      onClick={() => this.setState({ digitalSignature: 'no' })}
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
                      onClick={() => this.setState({ envelopeType: 'bypost' })}
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
                      onClick={() => this.setState({ envelopeType: 'byhand' })}
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
                    Attachment (Max File Size 1MB &amp; PDF/JPG/JPEG format
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
                  <p className="TxtInput">Status</p>
                  <p className="TxtStar">*</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'VERYIMPORTANT' })}
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
                  onChange={(e) => {
                    this.setState({ comments: e.target.value })
                  }}
                />
              </form>
            </div>

            <div className="emptyDiv" />
            {this.state.showLoader ? (
              <Loader />
            ) : (
              console.log('show loader', this.state.showLoader)
            )}
          </div>
          <div className="previewFrame">
            <div
              className="FormOuterFrame"
              style={{ background: '#fff' }}
              ref={this.referal}
            >
              <img src={letterHeadTop} alt="" style={{ width: '100%' }} />
              <div>
                <div style={{ padding: '0 27px', marginTop: '10px' }}>
                  {console.log(this.state.ref, 'hey there')}
                  <p className="TxtConfirmationLettersRight">No. {ref} </p>
                  <p className="TxtConfirmationLettersRight">
                    {this.state.language == 'hindi'
                      ? `दिनांक ${this.state.date}`
                      : `Date ${this.state.date}`}
                  </p>
                </div>
                <div style={{ padding: '10px 10px 10px 20px' }}>
                  <div>
                    <Row className="TxtConfirmationLetter">
                      <p
                        style={{ padding: '0px 19px', fontFamily: 'SegoeBold' }}
                      >
                        {' '}
                        {this.state.subject}{' '}
                      </p>
                    </Row>
                    <Row>
                      <p
                        style={{
                          padding: '0px 29px 0px 20px',
                          fontFamily: 'Segoe UI',
                          fontWeight: '500',
                          fontSize: '12px',
                          height: '200px',
                          textAlign: 'justify',
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word',
                          overflow: 'auto',
                        }}
                      >
                        {this.state.content}
                      </p>
                    </Row>
                  </div>
                </div>
                <div style={{ padding: '0 27px', marginTop: '20px' }}>
                  {this.state.digitalSignature == 'yes' ? (
                    <div>
                      <img
                        src={signature}
                        style={{
                          marginLeft: '80%',
                          width: '100px',
                          marginBottom: '0px',
                          marginTop: '-10px',
                        }}
                        alt="Shri. Anurag Thakur"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {this.state.language == 'hindi' ? (
                    <div>
                      <p className="TxtConfirmationLettersRight">भवदीय</p>
                      <p className="TxtConfirmationLettersRight">
                        (कार्यालय श्री। अनुराग ठाकुर)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="TxtConfirmationLettersRight">
                        Your Sincerely
                      </p>
                      <p className="TxtConfirmationLettersRight">
                        (Anurag Thakur)
                      </p>
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px 10px 30px 30px' }}>
                  <div>
                    <Row>
                      <Col xs={10}>
                        <p
                          className="TxtConfirmationLetter"
                          style={{ width: '25%', marginLeft: '-6px' }}
                        >
                          {this.state.to}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <img src={letterHeadBottom} alt="" style={{ width: '100%' }} />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '1em',
              marginTop: '120px',
              display: 'grid',
            }}
          >
            <button
              type="button"
              className="PrintBtnLetter"
              onClick={() => {
                if (!ref) {
                  handleSubmit()
                } else {
                  handleLettersUpdate()
                }
              }}
            >
              Save
            </button>
            <Pdf
              x="8"
              scale="1.7"
              targetRef={this.referal}
              filename={this.state.ref}
              // options={options}
              onComplete={() => {
                // if (ref.length === 0) {
                //   handleSubmit()
                // } else {
                //   handleLettersUpdate()
                // }
                history.push({
                  path: '/manage-request',
                  state: {
                    manage: 'LETTERS',
                  },
                })
              }}
            >
              {({ toPdf }) => (
                <button
                  type="button"
                  className="PrintBtnLetter"
                  onClick={toPdf}
                  disabled={!this.state.ref}
                >
                  Print
                </button>
              )}
            </Pdf>
          </div>
        </div>
      </div>
    )
  }
}
export default Letters
