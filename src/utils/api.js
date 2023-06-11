import apisauce from 'apisauce'
import { toast } from 'react-toastify'

import { values } from 'lodash'

//const BASE_URL = 'https://node-test.fdpay.in/api/'

//const BASE_URL_1 = 'https://prod-eshayogi.fdpay.in/api'

//const BASE_URL_1 = 'http://193.34.145.233:5001/api/'

//const BASE_URL_1 = 'https://prod-eshayogi.fdpay.in/api'

const BASE_URL_1 = 'https://ev2.fdpay.in/api'

const BASE_URL_DRIVE = 'https://ev2.fdpay.in/'

//const BASE_URL = 'http://193.34.145.233:5002/api/';

const fileBaseUrl = 'https://prod-eshayogi.fdpay.in/'

export function getError(problem) {
  switch (problem) {
    case apisauce.NETWORK_ERROR:
      return { message: 'Network not available' }
    case apisauce.TIMEOUT_ERROR:
      return { message: 'Server timeout' }
    case apisauce.CONNECTION_ERROR:
      return { message: 'Server not available' }
    default:
      return { message: 'An unknown error has occurred' }
  }
}

const create = (baseURL = BASE_URL_1) => {
  let tokenValue
  if (localStorage.getItem('eSahyogiUser')) {
    // console.log(JSON.parse(localStorage.getItem('eSahyogiUser')),"lovish Here");
    const { token } = JSON.parse(localStorage.getItem('eSahyogiUser')).data
    tokenValue = token
  }
  const api = apisauce.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${tokenValue && tokenValue}`,
      'x-token': tokenValue && tokenValue,
    },
    timeout: 100000,
  })

  const setTokenHeader = (accessToken) => {
    api.setHeader('Authorization', `Bearer ${accessToken}`)
    api.setHeader('x-token', `${accessToken}`)
  }

  api.addRequestTransform((request) => {
    let tokenValue = ''

    if (localStorage.getItem('eSahyogiUser')) {
      const { token } = JSON.parse(localStorage.getItem('eSahyogiUser')).data
      tokenValue = token
    }

    request.headers['x-token'] = tokenValue
    request.headers.Authorization = `Bearer ${tokenValue && tokenValue}`
  })

  const clearTokenHeader = () => {
    api.deleteHeader('Authorization')
    api.deleteHeader('token')
  }

  // Login
  const postLogin = (body) => {
    clearTokenHeader()
    return api.post('account/login', body)
  }

  // get logged in user
  const getLoggedInUser = () => api.get(`users/me`)

  // Create a new client
  const createClient = (body) => {
    return api.post('/organization/add', body)
  }

  // Create a new user for any organisation
  const createUser = (body) => {
    return api.post('account/add', body)
  }

  // Endpoints for mobile number verifications
  const generateSmsOtp = (body) => {
    console.log('OTP genration data', body)
    return api.post('/citizen/manage', body)
  }
  const verifySmsOtp = (body) => {
    return api.post('/app/verifyOTP', body)
  }
  const generateLoginOtp = (body) => {
    return api.post('/account/sendotp', body)
  }
  const createCitizen = (body) => {
    return api.post('/citizen/add', body)
  }

  const findCitizen = (body) => {
    return api.post('/citizen/manage', body)
  }
  // Addressee Ednpoints
  const createAddressee = (body) => {
    return api.post('/addressee/add', body)
  }
  const getAddressees = (body) => {
    return api.post('/addressee', body)
  }

  // Location Endpoints
  const createLocation = (body) => {
    return api.post('/location/add', body)
  }
  const getLocations = (body) => {
    return api.post('/location', body)
  }
  //fetching all accounts
  const getUsers = (body) => {
    return api.post('/account', body)
  }

  // Delegate Endpoints
  const createDelegate = (body) => {
    return api.post('delegate/add', body)
  }
  const getDelegates = (body) => {
    return api.post('/delegate', body)
  }

  // Complaint Endpoints
  const createRequest = (body) => {
    return api.post('/request/add', body)
  }
  const getRequests = (body) => {
    console.log('Manage request body', body)
    return api.post('/request/search', body)
  }

  const updateRequest = (body) => {
    console.log('Request update body', body)
    return api.post('/request/update', body)
  }

  const getDashboardData = () => {
    return api.post('/app/dashboard', {})
  }

  // upload files
  const uploadFiles = (body) => {
    const uploader = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let progress = loaded / total

        if (body.toastID.current === null) {
          console.log('Toast if', body.toastID)
          body.toastID.current = toast('Upload in Progress', {
            progress: progress,
            className: 'uploadToast',
            closeButton: true,
          })
        } else {
          console.log('Toast else', body.toastID)
          toast.update(body.toastID.current, {
            progress: progress,
            className: 'uploadToast',
            closeButton: true,
          })
        }
      },
    }

    return api.post(
      '/app/uploadMultipleFiles',
      body.selectedFilesFormData,
      uploader
    )
  }
  // upload file

  const uploadFile = (body) => {
    console.log('Upload file body', body)
    const uploader = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let progress = loaded / total
        if (body.toastID.current === null) {
          body.toastID.current = toast('Upload in Progress', {
            progress: progress,
            className: 'uploadToast',
          })
        } else {
          toast.update(body.toastID.current, {
            progress: progress,
            className: 'uploadToast',
          })
        }
      },
    }

    return api.post('/app/uploadFile', body.selectedPhotos, uploader)
  }

  // Get All Gallery by UID
  const getAllGalleryImages = (body) => {
    return api.post('/gallery/get', body)
  }

  // Gallery
  const addGallery = (body) => {
    console.log('Add gallery body', body)
    return api.post('/gallery/add', body)
  }

  //create a constituency api

  const addConstituency = (body) => {
    return api.post('/constituency/add', body)
  }

  const getConstituency = (body) => {
    return api.post('/constituency', body)
  }

  //manage constituency api

  const manageConstituency = (body) => {
    return api.post('/constituency', body)
  }

  //update constituency api

  const updateConstituency = (body) => {
    return api.post('/constituency/update', body)
  }

  //api to add karyakarta

  const addKaryakarta = (body) => {
    console.log('Add karyakarta data', body)
    return api.post('/karyakarta/add', body)
  }

  const updateKaryakarta = (body) => {
    console.log('Update karyakarta body recieved', body)
    return api.post('/karyakarta/update', body)
  }

  //ai to get all constituency Data

  const getConstituencyData = (body) => {
    return api.post('/constituency', body)
  }

  //fetch constituency dashboard data

  const fetchConstituencyDashboard = () => {
    return api.post('/constituency/dashboard')
  }

  const deleteConstituency = (body) => {
    return api.post('/constituency/delete', body)
  }

  //add occassion

  const addOccassion = (body) => {
    console.log('Occasion data coming', body)
    return api.post('/occasion/add', body)
  }
  const updateOccassion = (body) => {
    return api.post('/occasion/update', body)
  }

  //fetch all occassions

  const manageOccassion = (body) => {
    console.log('Get occasion api called', body)
    return api.post('/occasion/get', body)
  }

  //fetch karyakarta data

  const fetchKaryakartaData = (body) => {
    console.log('Befor deleting body', body)
    if (body.area === '') {
      delete body.area
    }
    if (body.district === '') {
      delete body.district
    }
    if (body.designation === '') {
      delete body.designation
    }
    console.log('Karyakarta search data after deleting', body)
    return api.post('/karyakarta/search', body)
  }

  //BULK IMPORT

  const bulkImport = (body) => {
    console.log('Bulk import body', body)
    return api.post('/constituency/bulk', body)
  }

  // CallingDirectory
  // add caller
  const addCallingDirectory = (body) => {
    return api.post('/callingdirectory/add', body)
  }
  // update caller
  const updateCallingDirectory = (body) => {
    return api.post('/callingdirectory/update', body)
  }
  //fetch all caller

  const manageCallingDirectory = (body) => {
    return api.post('/callingdirectory/search', body)
  }
  const iAgree = (body) => {
    return api.post('/account/agree', {})
  }

  const searchByDate = (body) => {
    console.log('Search by date body', body)
    return api.post('/request/search/date', body)
  }

  const deleteUser = (body) => {
    return api.post('/account/delete', body)
  }

  const deleteLocation = (body) => {
    return api.post('/location/delete', body)
  }

  const deleteDirectory = (body) => {
    return api.post('/callingdirectory/delete', body)
  }

  const addBoothDetails = (body) => {
    return api.post('/booth/add', body)
  }

  const updateBoothDetails = (body) => {
    return api.post('/booth/update', body)
  }

  const getBoothDetails = (body) => {
    return api.post('/booth', body)
  }

  const deleteOccasion = (body) => {
    return api.post('/occasion/delete', body)
  }

  const addFolder = (body) => {
    return api.post('/folder/add', body)
  }

  const getFolders = (body) => {
    return api.post('/folder', body)
  }

  const updateFolder = (body) => {
    return api.post('/folder/update', body)
  }

  const deleteFolder = (body) => {
    return api.post('/folder/delete', body)
  }

  const bulkImportCalling = (body) => {
    return api.post('/callingdirectory/bulk', body)
  }

  const addVisitor = (body) => {
    return api.post('/visitor/add', body)
  }

  const getVisitors = (body) => {
    return api.post('/visitor', body)
  }

  const deleteVisitor = (body) => {
    return api.post('/visitor/delete', body)
  }

  const updateVisitor = (body) => {
    return api.post('/visitor/update', body)
  }

  const filterVisitor = (body) => {
    if (body.search === '') {
      delete body.search
    }
    if (body.district === '') {
      delete body.district
    }
    if (body.vidhanSabha === '') {
      delete body.vidhanSabha
    }
    if (body.panchayat === '') {
      delete body.panchayat
    }

    if (body.from === '') {
      delete body.from
      delete body.to
    }

    return api.post('/visitor/filter', body)
  }

  const uniqueVisitorAPI = (body) => {
    return api.post('/visitor/unique', body)
  }

  const addCaller = (body) => {
    return api.post('/callingdirectory/add', body)
  }

  const getCallers = (body) => {
    return api.post('/callingDirectory', body)
  }

  const deleteCaller = (body) => {
    return api.post('/callingdirectory/delete', body)
  }

  const updateCaller = (body) => {
    return api.post('/callingdirectory/update', body)
  }

  const filterCaller = (body) => {
    if (body.search === '') {
      delete body.search
    }
    if (body.district === '') {
      delete body.district
    }
    if (body.vidhanSabha === '') {
      delete body.vidhanSabha
    }
    if (body.panchayat === '') {
      delete body.panchayat
    }

    if (body.from === '') {
      delete body.from
      delete body.to
    }

    return api.post('/callingdirectory/filter', body)
  }

  const uniqueCallerAPI = (body) => {
    return api.post('/callingdirectory/unique', body)
  }

  //Drive apis

  const getFolder = async (status) => {
    let response = null
    if (status === 'All') {
      response = await api.post('/drive/folder/all')
      if (response.data.code === 'SUCCESS') {
        const data = { ...response.data.data }
        const result = values(data)
        return result
      }
    } else if (status === 'Shared') {
      response = await api.post('/drive/folder/shared')
      if (response.data.code === 'SUCCESS') {
        const data = { ...response.data.data }
        const result = values(data)
        return result
      }
    }
    return []
  }

  const getAlbum = async (status) => {
    let response = null
    if (status === 'All') {
      response = await api.post('/drive/album/all')
      if (response.data.code === 'SUCCESS') {
        const data = { ...response.data.data }
        const result = values(data)
        return result
      }
    } else if (status === 'Shared') {
      response = await api.post('/drive/album/shared')
      if (response.data.code === 'SUCCESS') {
        const data = { ...response.data.data }
        const result = values(data)
        return result
      }
    }
    return []
  }

  const getFolderData = async (body) => {
    const response = await api.post('/gallery/get', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('Files fetched successfully')
      const { data } = { ...response.data }
      return data
    }
    return []
  }

  const getAlbumData = async (body) => {
    const response = await api.post('/gallery/get', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('Files fetched successfully')
      const { data } = { ...response.data }
      return data
    }
    return []
  }

  const shareFolder = async (body, controlAPICall) => {
    try {
      const response = await api.post('/drive/folder/share', body)
      controlAPICall(response)
    } catch {
      toast.error('Something went wrong.')
    }
  }

  const shareAlbum = async (body, controlAPICall) => {
    try {
      const response = await api.post('/drive/album/share', body)
      controlAPICall(response)
    } catch {
      toast.error('Something went wrong.')
    }
  }

  const removeFolderAccess = async (body, controlAPICall) => {
    try {
      const response = await api.post('/drive/folder/remove-access', body)
      controlAPICall(response)
    } catch {
      toast.error('Something went wrong.')
    }
  }

  const removeAlbumAccess = async (body, controlAPICall) => {
    try {
      const response = await api.post('/drive/album/remove-access', body)
      controlAPICall(response)
    } catch {
      toast.error('Something went wrong.')
    }
  }

  const addDriveFolder = async (body) => {
    const response = await api.post('/drive/folder', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('Folder Created Successfully', {
        autoClose: 1250,
        closeButton: false,
      })
    }
    return response
  }

  const addAlbum = async (body) => {
    const response = await api.post('/drive/album', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('Album Created Successfully', {
        autoClose: 1250,
        closeButton: false,
      })
    }
    return response
  }

  const addFile = async (body) => {
    const response = await api.post('/gallery/add', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('File Added successfully', {
        autoClose: 1250,
        closeButton: false,
      })
      return response.data.data
    }
    return null
  }

  const addImage = async (body) => {
    const response = await api.post('/drive/album/insert', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('File Added successfully', {
        autoClose: 1250,
        closeButton: false,
      })
      return response.data.data
    }
    return null
  }

  const addMultipleFilesToSingleFolder = async (body) => {
    const response = await api.post('/drive/multiFilesToSingleFolder', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('File Added successfully', {
        autoClose: 1250,
        closeButton: false,
      })
      return response.data.data
    }
    return null
  }

  const addMultipleFilesToSingleAlbum = async (body) => {
    const response = await api.post('/drive/multiImagesToSingleAlbum', body)
    if (response.data.code === 'SUCCESS') {
      toast.success('File Added successfully', {
        autoClose: 1250,
        closeButton: false,
      })
      return response.data.data
    }
    return null
  }

  // Other AdminUsers endpoints
  return {
    // Exporting the list of api functions for use in other modules
    setTokenHeader,
    clearTokenHeader,
    postLogin,
    getLoggedInUser,
    createClient,
    createUser,
    generateSmsOtp,
    generateLoginOtp,
    verifySmsOtp,
    createCitizen,
    findCitizen,
    createAddressee,
    createLocation,
    createDelegate,
    getAddressees,
    getLocations,
    getUsers,
    getDelegates,
    createRequest,
    getRequests,
    updateRequest,
    uploadFiles,
    uploadFile,
    getDashboardData,
    addConstituency,
    getConstituency,
    manageConstituency,
    updateConstituency,
    addKaryakarta,
    updateKaryakarta,
    getConstituencyData,
    fetchConstituencyDashboard,
    addOccassion,
    updateOccassion,
    manageOccassion,
    fetchKaryakartaData,
    bulkImport,
    addCallingDirectory,
    manageCallingDirectory,
    updateCallingDirectory,
    getAllGalleryImages,
    searchByDate,
    addGallery,
    iAgree,
    deleteUser,
    deleteLocation,
    deleteDirectory,
    addBoothDetails,
    updateBoothDetails,
    getBoothDetails,
    deleteOccasion,
    addFolder,
    getFolders,
    updateFolder,
    deleteFolder,
    bulkImportCalling,
    addVisitor,
    getVisitors,
    deleteVisitor,
    updateVisitor,
    filterVisitor,
    uniqueVisitorAPI,
    addCaller,
    updateCaller,
    getCallers,
    deleteCaller,
    uniqueCallerAPI,
    filterCaller,
    deleteConstituency,
    BASE_URL_1,
    fileBaseUrl,
    shareAlbum,
    shareFolder,
    removeAlbumAccess,
    removeFolderAccess,
    getFolder,
    getAlbum,
    getFolderData,
    getAlbumData,
    addDriveFolder,
    addAlbum,
    addFile,
    addImage,
    addMultipleFilesToSingleAlbum,
    addMultipleFilesToSingleFolder,
    BASE_URL_DRIVE,
  }
}

export default create()
