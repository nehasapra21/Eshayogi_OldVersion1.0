import React, { Component, createRef } from 'react'
import '../forms/event/Event.css'
import '../forms/job/Job.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import CopyrightFooter from '../footer/CopyrightFooter'
import '../forms/newclient/NewClient.css'
import Attach from '../../utils/images/attach.svg'
import '../forms/complaint/Complaint.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import api from '../../utils/api'
import { Typeahead } from 'react-bootstrap-typeahead'
import Trash from '../../utils/images/trash.svg'
import { toast } from 'react-toastify'
import { getYear } from '../../utils/validations'
import Loader from '../hoc/Loader/Loader'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import { Prompt } from 'react-router-dom'
import { TimerSharp } from '@material-ui/icons'

class MPLAD extends Component {
  state = {
    isBlocking: false,
  }
  constructor(props) {
    super(props)
    document.title = 'MPLAD Registraion'
    const { state: historyState } = props.location
    const { MPLAD } = { ...historyState }
    if (MPLAD) {
      const {
        citizenName,
        citizenMobileNumber,
        citizenPincode,
        citizenAddress,
        vidhanSabha,
        gramPanchayat,
        workName,
        recommendationAmount,
        financialSanctionAmount,
        utilizationAmount,
        doctrailAmount,
        doctrailScheme,
        totalProjectCost,
        sanctionDate,
        attachments,
        remarks,
        createdOn,
        block,
        financialYear,
        workCategory,
        workDescription,
        status,
        district,
        sanctionYear,
        village,
        pollingStation,
      } = { ...MPLAD.request }
      const { ref } = { ...MPLAD }

      this.state = {
        ref,
        citizenName,
        citizenMobileNumber,
        citizenPincode,
        citizenAddress,
        financialYear,
        block,
        vidhanSabha,
        gramPanchayat,
        workName,
        recommendationAmount,
        financialSanctionAmount,
        utilizationAmount,
        doctrailAmount,
        doctrailScheme,
        totalProjectCost,
        previousStatus: status,
        status: status,
        sanctionDate: status !== 'SANCTIONED' ? '' : new Date(sanctionDate),
        previousSelectedFile: attachments,
        selectedfile: attachments,
        selectedFilesFormData: new FormData(),
        remarks,
        createdOn,
        isUpdateRequest: true,
        showLoader: false,
        isLoading: true,
        workCategory: workCategory,
        workDescription: workDescription,
        pollingStation: pollingStation ?? '',
        district,
        sanctionYear,
        village,
        districtOption: [],
        vidhanSabhaOption: [],
        panchayatOption: [],
        pollingStationOption: [],
        sanctionYears: [],
        errors: {
          block: '',
          workName: '',
          workCategory: '',
          workDescription: '',
          financialSanctionAmount: '',
          financialYear: '',
          remarks: '',
          sanctionDate: '',
          vidhanSabha: '',
          gramPanchayat: '',
          district: '',
          sanctionYear: '',
          pollingStation: '',
        },
        doNewFileUpload: false,
        doFileChanged: false,
      }
    } else {
      const { citizen } = { ...historyState }

      const { firstName, pincode, address, callingNumber } = { ...citizen }

      this.state = {
        citizenName: firstName,
        citizenMobileNumber: callingNumber,
        citizenPincode: pincode,
        citizenAddress: address,
        financialYear: '',
        block: '',
        vidhanSabha: '',
        gramPanchayat: '',
        workName: '',
        workCategory: '',
        workDescription: '',
        financialSanctionAmount: '',
        sanctionDate: '',
        status: 'UNDERREVIEW',
        selectedfile: [],
        selectedFilesFormData: new FormData(),
        remarks: '',
        isUpdateRequest: false,
        createdOn: new Date(),
        showLoader: false,
        isLoading: true,
        constituency: '',
        district: '',
        sanctionYear: '',
        village: '',
        pollingStation: '',
        districtOption: [],
        vidhanSabhaOption: [],
        panchayatOption: [],
        pollingStationOption: [],
        sanctionYears: [],
        errors: {
          district: '',
          block: '',
          workName: '',
          workCategory: '',
          workDescription: '',
          financialSanctionAmount: '',
          financialYear: '',
          remarks: '',
          sanctionDate: '',
          vidhanSabha: '',
          gramPanchayat: '',
          sanctionYear: '',
          pollingStation: '',
        },
        doNewFileUpload: false,
        doFileChanged: false,
      }
    }
    this.toastID = React.createRef(null)
    this.ref = React.createRef()
    this.onSelect = this.onSelect.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({ isLoading: false })
    this.fetchConstituency()
    this.makeSanctionYears()
  }

  componentWillUnmount = () => {
    localStorage.removeItem('Vidha Sabha')
    localStorage.removeItem('District')
    localStorage.removeItem('Panchayat')
    localStorage.removeItem('Polling Station')
  }

  makeSanctionYears = () => {
    let temp = []
    for (let i = 0; i < 22; i++) {
      let beginYear = 2000
      let endYear = 2001
      temp.push(`${beginYear + i}-${endYear + i}`)
    }
    this.setState({ sanctionYears: [...temp] })
  }

  fetchConstituency = async () => {
    await api
      .getConstituency({
        type: 'Zila Level',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No Disrict found. Please make Disrict first.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem('District', JSON.stringify([]))
        } else {
          toast.success('District Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'District',
            JSON.stringify(response.data.data.rows)
          )
          this.makeDistrict()
        }
      })
      .catch((err) => {
        toast.error('Something wrong to fetch District.')
        localStorage.setItem('District', JSON.stringify([]))
      })
    await api
      .getConstituency({
        type: 'Vidhan Sabha',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(
            'No Vidhan Sabha found. Please make Vidhan Sabha first.',
            {
              autoClose: 1250,
              closeButton: false,
            }
          )
          localStorage.setItem('Vidhan Sabha', JSON.stringify([]))
        } else {
          toast.success('Vidhan Sabha Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'Vidhan Sabha',
            JSON.stringify(response.data.data.rows)
          )
        }
      })
      .catch((err) => {
        toast.error('Something wrong to fetch Vidhan Sabha.')
        localStorage.setItem('Vidhan Sabha', JSON.stringify([]))
      })
    await api
      .getConstituency({
        type: 'Gram Panchayat',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error('No Panchayat found. Please make Panchayat first.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem('Panchayat', JSON.stringify([]))
        } else {
          toast.success('Panchayat Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'Panchayat',
            JSON.stringify(response.data.data.rows)
          )
        }
      })
      .catch((err) => {
        toast.error('Something wrong to fetch Panchayat.')
        localStorage.setItem('Panchayat', JSON.stringify([]))
      })

    await api
      .getConstituency({
        type: 'Polling Station',
        limit: '10000',
        offset: '0',
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(
            'No Polling Station found. Please make Polling Station first.',
            {
              autoClose: 1250,
              closeButton: false,
            }
          )
          localStorage.setItem('Polling Station', JSON.stringify([]))
        } else {
          toast.success('Polling Station Fetched sucessfully.', {
            autoClose: 1250,
            closeButton: false,
          })
          localStorage.setItem(
            'Polling Station',
            JSON.stringify(response.data.data.rows)
          )
        }
      })
      .catch((err) => {
        toast.error('Something wrong to fetch Polling Station.')
        localStorage.setItem('Polling Station', JSON.stringify([]))
      })
  }

  makeDistrict = () => {
    const district = JSON.parse(localStorage.getItem('District'))
    let temp = []
    district &&
      district.length !== 0 &&
      district.forEach((data) => {
        temp.push(data.meta.name)
      })
    this.setState({
      districtOption: [...temp],
    })
  }

  makeVidhanSabha = () => {
    if (this.state.district === '' && this.state.vidhanSabha !== '') {
      this.setState({ vidhanSabha: '', gramPanchayat: '' })
      return false
    }

    const vidhanSabha = JSON.parse(localStorage.getItem('Vidhan Sabha'))
    let temp = []
    vidhanSabha &&
      vidhanSabha.length !== 0 &&
      vidhanSabha.forEach((data) => {
        if (
          data?.meta?.district.toLowerCase() ===
          this.state?.district?.toLowerCase()
        ) {
          temp.push(data.meta.name)
        }
      })
    if (temp.length === 0) {
      toast.error(
        'No Vidhan Sabha for this district. Please make Vidhan sabha.',
        {
          autoClose: 1500,
          closeButton: false,
        }
      )
    } else {
      this.setState({
        vidhanSabhaOption: [...temp],
      })
    }
  }

  makePanchayat = () => {
    if (this.state.vidhanSabha === '' && this.state.panchayat !== '') {
      this.setState({ gramPanchayat: '' })
      return false
    }
    const Panchayat = JSON.parse(localStorage.getItem('Panchayat'))
    let temp = []
    Panchayat &&
      Panchayat.length !== 0 &&
      Panchayat.forEach((data) => {
        if (
          data?.meta?.district.toLowerCase() ===
          this.state?.district?.toLowerCase()
        ) {
          temp.push(data.meta.name)
        }
      })
    if (temp.length === 0) {
      toast.error('No Panchayat for this District. Please make Panchayat.', {
        autoClose: 1500,
        closeButton: false,
      })
    } else {
      this.setState({
        panchayatOption: [...temp],
      })
    }
  }

  makePollingStation = () => {
    if (
      this.state.vidhanSabha === '' &&
      this.state.gramPanchayat === '' &&
      this.state.pollingStation !== ''
    ) {
      this.setState({ pollingStation: '' })

      return false
    }
    const PollingStation = JSON.parse(localStorage.getItem('Polling Station'))

    let temp = []
    PollingStation &&
      PollingStation.length !== 0 &&
      PollingStation.forEach((data) => {
        if (
          data?.meta?.district.toLowerCase() ===
            this.state?.district?.toLowerCase() &&
          data?.meta?.vidhanSabha.toLowerCase() ===
            this.state?.vidhanSabha?.toLowerCase()
        ) {
          temp.push(data.meta.name)
        }
      })
    if (temp.length === 0) {
      toast.error(
        'No Polling Station for this District or Vidhan Sabha. Please make Polling Station.',
        {
          autoClose: 1500,
          closeButton: false,
        }
      )
    } else {
      this.setState({
        pollingStationOption: [...temp],
      })
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    let errors = this.state.errors

    switch (name) {
      case 'constituency':
        errors.constituency =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'block':
        errors.block = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'workName':
        errors.workName = value.length === 0 ? 'This is a required field.' : ''
        break
      case 'workCategory':
        errors.workCategory =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'workDescription':
        errors.workDescription =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'financialSanctionAmount':
        errors.financialSanctionAmount =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'financialYear':
        errors.financialYear =
          value.length === 0 ? 'This is a required field.' : ''
        break
      case 'remarks':
        errors.remarks = value.length === 0 ? 'This is a required field.' : ''
        break

      default:
        break
    }

    this.setState({ errors }, () => {
      console.log(errors)
    })
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
    this.setState({ selectedaddresse: selectedList })
  }

  onRemove(selectedList, removedItem) {
    this.setState({ selectedaddresse: selectedList })
  }
  returnToManage = () => {
    const { state: historyState } = this.props.location

    const { MPLAD } = { ...historyState }
    this.props.history.push({
      pathname: '/confirmation/MPLAD',
      state: {
        MPLAD: MPLAD,
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
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      block,
      financialYear,
      vidhanSabha,
      gramPanchayat,
      workName,
      workCategory,
      workDescription,
      financialSanctionAmount,
      status,
      selectedfile,
      selectedFilesFormData,
      sanctionDate,
      remarks,
      createdOn,
      previousStatus,
      district,
      sanctionYear,
      village,
      pollingStation,
    } = this.state

    const requestData = {
      ref,
      citizenName,
      citizenMobileNumber,
      citizenPincode,
      vidhanSabha,
      gramPanchayat,
      workName,
      workCategory,
      workDescription,
      financialSanctionAmount,
      status,
      sanctionDate,
      attachments: uploadedFileDetails,
      remarks,
      createdOn,
      block,
      financialYear,
      district,
      sanctionYear,
      village,
      pollingStation,
    }
    let newDate = new Date()
    let currentdate = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    const { history } = this.props
    const { state: historyState } = this.props.location
    const { citizen, MPLAD } = { ...historyState }
    let citizendata = citizen
    if (MPLAD) {
      citizendata = MPLAD.citizen
    }
    const { dd, mm, yy, byUser, orgId, id, typeOfRequest } = { ...MPLAD }
    const handleSubmit = async (event) => {
      this.setState({
        isBlocking: false,
      })
      event.preventDefault()

      if (!requestData?.district || requestData?.district === '') {
        toast.error('District is required.')
        return false
      }

      if (!requestData?.vidhanSabha || requestData?.vidhanSabha === '') {
        toast.error('Vidhan Sabha is required.')
        return false
      }

      if (!requestData?.gramPanchayat || requestData?.gramPanchayat === '') {
        toast.error('Panchayat is required.')
        return false
      }

      if (status === 'UNDERREVIEW') {
        if (this.state.selectedfile !== 0) {
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
                console.log(response)
              }
            },
            (err) => {
              toast.error('Something went Wrong. Please Refresh', {
                autoClose: 1250,
                closeButton: false,
              })
            }
          )
        }
      }

      await api
        .createRequest({
          dd: `${currentdate}`,
          mm: `${month}`,
          yy: `${year}`,
          typeOfRequest: 'MPLAD',
          status: status,
          request: requestData,
          addressee: {},
          citizen: citizendata,
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
                  pathname: '/confirmation/MPLAD',
                  state: { MPLAD: response.data.data },
                })
              }
            } else {
              toast.error('Request Failed !', {
                autoClose: 1250,
                closeButton: false,
              })
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
    }

    const handleMPLADUpdate = async () => {
      if (previousStatus === 'INAUGURATED') {
        toast.error('Request already Inaugurated', {
          autoClose: 1250,
          closeButton: false,
        })
        return
      }

      if (!requestData?.district || requestData?.district === '') {
        toast.error('District is required.')
        return false
      }

      if (!requestData?.vidhanSabha || requestData?.vidhanSabha === '') {
        toast.error('Vidhan Sabha is required.')
        return false
      }

      if (!requestData?.gramPanchayat || requestData?.gramPanchayat === '') {
        toast.error('Panchayat is required.')
        return false
      }

      if (!requestData?.pollingStation || requestData?.pollingStation === '') {
        toast.error('Polling Station is required.')
        return false
      }

      let allSelectedFiles = this.state.selectedfile
      let attachmentData = []
      let files = []

      if (this.state.selectedfile !== 0) {
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

            console.log(files, 'lovish')
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
                  toast.error('File Upload Failed!', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something Went Wrong. Please Refresh.', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            )
          }
        } else if (this.state.doFileChanged) {
          attachmentData = this.state.selectedfile
        } else {
          attachmentData = this.state.selectedfile
        }
      }

      if (previousStatus === 'UNDERREVIEW') {
        if (status === 'SANCTIONED' && !sanctionDate) {
          toast.error('Please enter sanctioned date', {
            autoClose: 1250,
            closeButton: false,
          })
          return
        }
        if (status === 'SANCTIONED' || status === 'UNDERREVIEW') {
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
                  console.log('updated the MPLAD', response.data)
                  if (response.data.error) {
                    toast.error('Request failed to update', {
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
                      pathname: '/confirmation/MPLAD',
                      state: { MPLAD: response.data.data },
                      search: 'updated-MPLAD',
                    })
                  }
                } else {
                  toast.error('Something went wrong . PLease refresh.', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something went wrong . PLease refresh.', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            )
        } else {
          toast.error(
            `You can't change state from ${previousStatus} to ${status}`,
            {
              autoClose: 1250,
              closeButton: false,
            }
          )
        }
      } else {
        if (previousStatus === 'SANCTIONED') {
          if (status === 'UNDERREVIEW') {
            toast.error(
              `You can't change from ${previousStatus} to ${status}`,
              {
                autoClose: 1250,
                closeButton: false,
              }
            )
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
              request: { ...requestData, attachments: attachmentData },
              addressee: null,
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('updated the MPLAD', response.data)
                  if (response.data.error) {
                    toast.error('Request failed to update', {
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
                      pathname: '/confirmation/MPLAD',
                      state: { MPLAD: response.data.data },
                      search: 'updated-MPLAD',
                    })
                  }
                } else {
                  toast.error('Something went wrong . PLease refresh.', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something went wrong . PLease refresh.', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            )
        }
        if (previousStatus === 'WORK DONE') {
          if (status === 'UNDERREVIEW' || status === 'SANCTIONED') {
            toast.error(
              `You can't change from ${previousStatus} to ${status}`,
              {
                autoClose: 1250,
                closeButton: false,
              }
            )
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
              request: { ...requestData, attachments: attachmentData },
              addressee: null,
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('updated the MPLAD', response.data)
                  if (response.data.error) {
                    toast.error('Request failed to update', {
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
                      pathname: '/confirmation/MPLAD',
                      state: { MPLAD: response.data.data },
                      search: 'updated-MPLAD',
                    })
                  }
                } else {
                  toast.error('Something went wrong . PLease refresh.', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something went wrong . PLease refresh.', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            )
        }
        if (previousStatus === 'INAUGRATED') {
          if (
            status === 'UNDERREVIEW' ||
            status === 'SANCTIONED' ||
            status === 'WORK DONE'
          ) {
            toast.error(
              `You can't change from ${previousStatus} to ${status}`,
              {
                autoClose: 1250,
                closeButton: false,
              }
            )
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
              request: { ...requestData, attachments: attachmentData },
              addressee: null,
            })
            .then(
              (response) => {
                if (response.ok) {
                  console.log('updated the MPLAD', response.data)
                  if (response.data.error) {
                    toast.error('Request failed to update', {
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
                      pathname: '/confirmation/MPLAD',
                      state: { MPLAD: response.data.data },
                      search: 'updated-MPLAD',
                    })
                  }
                } else {
                  toast.error('Something went wrong . PLease refresh.', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                }
              },
              (err) => {
                toast.error('Something went wrong . PLease refresh.', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            )
        }
      }
    }
    if (this.state.isUpdateRequest === true) {
      isBlocking = false
    }
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
              <p className="TxtHeading">MPLADs</p>
              <div className="DivHeadUserInfo">
                <p className="TxtName">{citizenName}</p>
                <p className="TxtName">{`+91-${citizenMobileNumber}`}</p>
                <p className="TxtName">{citizenPincode}</p>
              </div>
            </div>
            <form className="FormFrame" onSubmit={handleSubmit}>
              <div className="TxtInputFrame">
                <p className="TxtInput">District</p>
                <p className="TxtStar">*</p>
              </div>
              <Typeahead
                id="district"
                labelKey="district"
                placeholder="Please select a District"
                required
                onChange={(district) => {
                  this.setState(
                    { district: district.length === 0 ? '' : district[0] },
                    () => this.makeVidhanSabha()
                  )
                }}
                options={this.state.districtOption}
                defaultInputValue={this.state.district}
                style={{ marginBottom: '20px' }}
              />
              <span className="validation-error-message">
                {this.state.errors.district}
              </span>
              <div
                className="TxtInputFrame"
                style={{ justifyContent: 'space-between' }}
              >
                <p className="TxtInput">
                  Vidhan Sabha <span className="TxtStar">*</span>
                </p>
              </div>
              <Typeahead
                id="vidhanSabha"
                labelKey="vidhanSabha"
                placeholder="Please select a Vidhan Sabha"
                required
                onChange={(vidhanSabha) => {
                  this.setState(
                    {
                      vidhanSabha:
                        vidhanSabha.length === 0 ? '' : vidhanSabha[0],
                    },
                    () => this.makePanchayat()
                  )
                }}
                options={this.state.vidhanSabhaOption}
                defaultInputValue={this.state.vidhanSabha}
                style={{ marginBottom: '20px' }}
              />

              <span className="validation-error-message">
                {this.state.errors.vidhanSabha}
              </span>

              <div
                className="TxtInputFrame"
                style={{ justifyContent: 'space-between' }}
              >
                <p className="TxtInput">
                  Gram Panchayat <span className="TxtStar">*</span>
                </p>
              </div>
              <Typeahead
                id="panchayat"
                labelKey="panchayat"
                placeholder="Please select a Panchayat"
                required
                onChange={(panchayat) => {
                  this.setState(
                    {
                      gramPanchayat: panchayat.length === 0 ? '' : panchayat[0],
                    },
                    () => {
                      this.makePollingStation()
                    }
                  )
                }}
                options={this.state.panchayatOption}
                defaultInputValue={this.state.gramPanchayat}
                style={{ marginBottom: '20px' }}
              />
              <span className="validation-error-message">
                {this.state.errors.gramPanchayat}
              </span>

              <div
                className="TxtInputFrame"
                style={{ justifyContent: 'space-between' }}
              >
                <p className="TxtInput">
                  Polling Station <span className="TxtStar">*</span>
                </p>
              </div>
              <Typeahead
                id="pollingStation"
                labelKey="pollingStation"
                placeholder="Please select a Polling Station"
                required
                onChange={(pollingStation) => {
                  this.setState({
                    pollingStation:
                      pollingStation.length === 0 ? '' : pollingStation[0],
                  })
                }}
                options={this.state.pollingStationOption}
                defaultInputValue={this.state.pollingStation}
                style={{ marginBottom: '20px' }}
              />
              <span className="validation-error-message">
                {this.state.errors.pollingStation}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Block</p>
              </div>

              <input
                type="text"
                id="workName"
                name="block"
                className="InputFrame"
                placeholder="Block"
                value={this.state.block}
                onChange={(e) => {
                  this.handleChange(e)
                  this.setState({ block: e.target.value })
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.block}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Village</p>
              </div>

              <input
                type="text"
                id="village"
                name="village"
                className="InputFrame"
                placeholder="Village Name"
                value={this.state.village}
                required
                onChange={(e) => {
                  this.handleChange(e)
                  this.setState({ village: e.target.value })
                }}
              />

              <div className="TxtInputFrame">
                <p className="TxtInput">Work Name</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="workName"
                name="workName"
                className="InputFrame"
                max={250}
                placeholder="250 Characters"
                value={this.state.workName}
                required
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    this.handleChange(e)
                    this.setState({ workName: e.target.value })
                  }
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.workName}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Work Category</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="workName"
                name="workCategory"
                className="InputFrame"
                placeholder="100 Characters"
                value={this.state.workCategory}
                required
                max={100}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    this.handleChange(e)
                    this.setState({ workCategory: e.target.value })
                  }
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.workCategory}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Work Description</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="workName"
                name="workDescription"
                className="InputFrame"
                placeholder="250 Characters"
                max={250}
                value={this.state.workDescription}
                required
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    this.handleChange(e)
                    this.setState({ workDescription: e.target.value })
                  }
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.workDescription}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Amount Sanctioned ( in INR )</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="financialSanctionAmount"
                name="financialSanctionAmount"
                placeholder="Amount Sanctioned"
                className="InputFrame"
                value={this.state.financialSanctionAmount}
                required
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^\d.]/g, '')
                  this.setState({ financialSanctionAmount: onlyNums })
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.financialSanctionAmount}
              </span>

              <div className="TxtInputFrame">
                <p className="TxtInput">Financial Year</p>
                <p className="TxtStar">*</p>
              </div>
              <input
                type="text"
                id="workName"
                name="financialYear"
                className="InputFrame"
                placeholder="Year"
                value={this.state.financialYear}
                required
                onChange={(e) => {
                  this.handleChange(e)
                  this.setState({ financialYear: e.target.value })
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.financialYear}
              </span>

              <p className="TxtInput">
                Request Letter (Max File Size 2MB &amp; PDF format only)
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
                    onClick={() => this.setState({ status: 'UNDERREVIEW' })}
                  >
                    <span
                      className={
                        this.state.status === 'UNDERREVIEW'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Under Review</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ status: 'SANCTIONED' })}
                  >
                    <span
                      className={
                        this.state.status === 'SANCTIONED'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Sanctioned</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ status: 'WORK DONE' })}
                  >
                    <span
                      className={
                        this.state.status === 'WORK DONE'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Work Done</p>
                </div>
                <div className="SelectRadio">
                  <label
                    className="radiobutton"
                    onClick={() => this.setState({ status: 'INAUGURATED' })}
                  >
                    <span
                      className={
                        this.state.status === 'INAUGURATED'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </label>
                  <p className="TxtRadioInput">Inaugurated</p>
                </div>
              </div>

              {this.state.status === 'SANCTIONED' ? (
                <>
                  <div className="TxtInputFrame">
                    <p className="TxtInput">Date of Sanction</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <div>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      required
                      placeholder="Pick from calendar view"
                      className="InputFrame"
                      selected={this.state.sanctionDate}
                      onChange={(date) => {
                        let errors = this.state.errors
                        if (getYear(date).toString().length == 4) {
                          errors.sanctionDate = ''
                          this.setState({ sanctionDate: date, errors })
                        } else {
                          errors.sanctionDate = 'Invalid Year'
                          this.setState({ errors })
                        }
                      }}
                    />
                  </div>
                  <span className="validation-error-message">
                    {this.state.errors.sanctionDate}
                  </span>

                  <div className="TxtInputFrame">
                    <p className="TxtInput">Sanction Year</p>
                    <p className="TxtStar">*</p>
                  </div>
                  <Typeahead
                    id="sanctionYear"
                    labelKey="Sancton Year"
                    placeholder="Sanction Year"
                    required
                    onChange={(year) => {
                      this.setState({ sanctionYear: year[0] })
                    }}
                    options={this.state.sanctionYears}
                    defaultInputValue={this.state.sanctionYear}
                    style={{ marginBottom: '20px' }}
                  />
                  <span className="validation-error-message">
                    {this.state.errors.sanctionYear}
                  </span>
                </>
              ) : (
                <div />
              )}

              <div className="TxtInputFrame">
                <p className="TxtInput">Remarks</p>
                <p className="TxtStar">*</p>
              </div>
              <textarea
                type="text"
                id="remarks"
                name="remarks"
                className="TextareaLayout"
                placeholder="Please Enter Remarks ( 250 Characters )"
                rows="5"
                cols="100"
                value={this.state.remarks}
                required
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    this.handleChange(e)
                    this.setState({ remarks: e.target.value })
                  }
                }}
              />
              <span className="validation-error-message">
                {this.state.errors.remarks}
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
                    onClick={() => handleMPLADUpdate()}
                  >
                    Update
                  </button>
                </div>
              )}
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
export default MPLAD
