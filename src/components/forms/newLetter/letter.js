import React, { Component, Fragment } from 'react'
import Header from '../../header/Header'
import DatePicker from 'react-datepicker'
import backIcon from '../../../utils/images/icons-lelt-open-arrow.svg'
import { Typeahead } from 'react-bootstrap-typeahead'
import api from '../../../utils/api'
import { toast } from 'react-toastify'
import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import moment from 'moment'
import { getYear } from '../../../utils/validations'
import Attach from '../../../utils/images/attachment.svg'
import Trash from '../../../utils/images/trash.svg'
import { validNumberRegex } from '../../../utils/validations'

class NewLetter extends Component {
  constructor(props) {
    super(props)
    const { state: historyState } = props.location
    const { Letters } = { ...historyState }
    if (Letters) {
      const {
        citizenName,
        citizenMobileNumber,
        citizenPincode,
        citizenAddress,
        date,
        ref,
        recommendedNumber,
        recommendedName,
        content,
        followUp1,
        followUp2,
        attachments,
        acknowlegement,
      } = { ...Letters.request }

      const { name, number } = { ...Letters.meta }

      const { status, byUser, orgId, id, dd, mm, yy } = { ...Letters }

      this.state = {
        citizenName,
        citizenMobileNumber,
        recommendedName,
        recommendedNumber,
        citizenPincode,
        citizenAddress,
        date: new Date(date),
        status,
        ref,
        isUpdate: true,
        content,
        byUser,
        orgId,
        id,
        dd,
        mm,
        yy,
        folderName: name,
        folderNumber: number,
        foldersData: [],
        followUp1: followUp1 ? new Date(followUp1) : '',
        followUp2: followUp2 ? new Date(followUp2) : '',
        doFilesChanged: false,
        doNewFileUpload: false,
        selectedfile: attachments ? attachments : [],
        attachments: attachments ? attachments : [],
        acknowlegement: acknowlegement ? acknowlegement : '',
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
        ref: '',
        date: new Date(),
        status: 'VERYIMPORTANT',
        isUpdate: false,
        content: '',
        folderNumber: '',
        folderName: '',
        foldersData: [],
        followUp1: '',
        followUp2: '',
        doFilesChanged: false,
        doNewFileUpload: false,
        selectedfile: [],
        attachments: [],
        acknowlegement: '',
      }
    }
    this.toastID = React.createRef(null)
    this.ref = React.createRef()
  }

  foldersArray = []

  componentDidMount = () => {
    api
      .getFolders({
        limit: '100',
        offset: '0',
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('No folders Found. Make Folders First.', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.success('Folders Fetch Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState(
              {
                foldersData: [...response.data.data.rows],
              },
              () => {
                for (let i = 0; i < this.state.foldersData.length; i++) {
                  this.foldersArray.push(this.state.foldersData[i].number)
                }
              }
            )
          }
        }
      })
      .catch((err) => {
        toast.error('Something Wrong Happens. Please Refresh', {
          autoClose: 1250,
          closeButton: false,
        })
      })
  }

  uploadFiles = (e) => {
    e.preventDefault()
    let selectedFilesFormData = new FormData()
    let x = this.state.selectedfile
    let attachmentData = []
    let files = []

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

        api.uploadFiles({ selectedFilesFormData, toastID }).then(
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
                this.setState({ attachments: attachmentData }, () => {
                  this.moveToEditor()
                })
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
        this.setState({ attachments: attachmentData }, () => {
          this.moveToEditor()
        })
      } else {
        attachmentData = this.state.selectedfile
        this.setState({ attachments: attachmentData }, () => {
          this.moveToEditor()
        })
      }
    } else {
      this.moveToEditor()
    }
  }

  moveToEditor = () => {
    if (this.state.folderName === '') {
      if (this.state.foldersData.length === 0) {
        toast.error('Please make Some Folders First', {
          autoClose: 1250,
          closeButton: false,
        })
      } else {
        toast.error('Please Select a Folder First', {
          autoClose: 1250,
          closeButton: false,
        })
      }
      return
    } else {
      this.props.history.push({
        pathname: '/letter/editor',
        state: {
          letterFormData: {
            ...this.state,
          },
        },
      })
    }
  }

  setFolderName = () => {
    for (let i = 0; i < this.state.foldersData.length; i++) {
      if (this.state.folderNumber === this.state.foldersData[i].number) {
        let name = this.state.foldersData[i].name
        this.setState({ folderName: name })
        break
      }
    }
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
        doNewFileUpload: true,
      })
    } else {
      this.setState({ selectedfile: [] })
      toast.error('More than 5 Files are not Allowed', {
        autoClose: 1250,
        closeButton: false,
      })
    }
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

  render() {
    return (
      <div className="NewClientForm">
        <Header />
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
              ) : null}
              <p className="TxtHeading">Letter</p>
              <div className="DivHeadUserInfo">
                <p className="TxtNameLetter">{this.state.citizenName}</p>
                <p className="TxtNameLetter">{`+91-${this.state.citizenMobileNumber}`}</p>
                <p className="TxtNameLetter">{this.state.citizenPincode}</p>
              </div>
            </div>
            <div className="FormFrame">
              <form>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Folder Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <Typeahead
                  id="district"
                  labelKey="district"
                  style={{ marginBottom: '30px' }}
                  placeholder="Please select a Folder"
                  onChange={(folder) => {
                    this.setState({ folderNumber: folder[0] }, () =>
                      this.setFolderName()
                    )
                  }}
                  options={this.foldersArray}
                  defaultInputValue={this.state.folderNumber}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Folder Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="letterFrom"
                  className="InputFrame"
                  placeholder="25 Characters"
                  disabled
                  value={this.state.folderName}
                  required
                  onChange={(e) => {
                    this.setState({ folderName: e.target.value })
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
                    required
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
                  <p className="TxtInput">DO Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="letterFrom"
                  className="InputFrame"
                  placeholder="Plese Enter Your Reference Number"
                  required
                  value={this.state.ref}
                  required
                  onChange={(e) => {
                    this.setState({ ref: e.target.value })
                  }}
                />

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
                    this.setState({ followUp1: date })
                  }}
                />

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
                    this.setState({ followUp2: date })
                  }}
                />

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
                  <div className="SelectRadio">
                    <label
                      className="radiobutton"
                      onClick={() => this.setState({ status: 'ACKNOWLEDGED' })}
                    >
                      <span
                        className={
                          this.state.status === 'ACKNOWLEDGED'
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </label>
                    <p className="TxtRadioInput">Acknowleged</p>
                  </div>
                </div>
                {this.state.status === 'ACKNOWLEDGED' ? (
                  <Fragment>
                    <div className="TxtInputFrame">
                      <p className="TxtInput">Acknowlegment ( Comments )</p>
                      <p className="TxtStar">*</p>
                    </div>
                    <textarea
                      type="text"
                      id="acknowlegement"
                      name="acknowlegement"
                      className="TextareaLayout"
                      placeholder="Please enter acknowlegement ( 250 characters )"
                      rows="5"
                      cols="100"
                      value={this.state.acknowlegement}
                      onChange={(e) => {
                        if (e.target.value.length <= 250) {
                          this.setState({ acknowlegement: e.target.value })
                        }
                      }}
                    />
                  </Fragment>
                ) : null}
                <input
                  type="submit"
                  value="Next"
                  className="BtnSubmit"
                  onClick={(e) => this.uploadFiles(e)}
                  style={
                    this.foldersArray.length === 0
                      ? { pointerEvents: 'null' }
                      : { pointerEvents: 'auto' }
                  }
                />
              </form>
            </div>
            <div className="DashboardFooter">
              <Footer />
              <CopyrightFooter />
            </div>
          </div>
        </div>
        <div className="emptyDiv"></div>
      </div>
    )
  }
}

export default NewLetter
