import apisauce from 'apisauce';


const BASE_URL = 'https://node-test.fdpay.in/api/';

export function getError(problem) {
  switch (problem) {
    case apisauce.NETWORK_ERROR:
      return { message: 'Network not available' };
    case apisauce.TIMEOUT_ERROR:
      return { message: 'Server timeout' };
    case apisauce.CONNECTION_ERROR:
      return { message: 'Server not available' };
    default:
      return { message: 'An unknown error has occurred' };
  }
}

const create = (baseURL = BASE_URL) => {

  let tokenValue;
  if (localStorage.getItem('eSahyogiUser')) {
    console.log(JSON.parse(localStorage.getItem('eSahyogiUser')),"lovish Here");
    const {token} = JSON.parse(localStorage.getItem('eSahyogiUser')).data
    console.log('token from api, ', token)
    tokenValue = token
  }
  const api = apisauce.create({
    baseURL,
    headers: { Authorization: `Bearer ${tokenValue && tokenValue}`,
              "x-token": tokenValue && tokenValue },
    timeout: 10000,
  });

  const setTokenHeader = accessToken =>{
    api.setHeader('Authorization', `Bearer ${accessToken}`);
    api.setHeader('x-token', `${accessToken}`)
  }
    
  const clearTokenHeader = () => {
    api.deleteHeader('Authorization');
    api.deleteHeader('token')
  }

  // Login 
  const postLogin = body => {
    clearTokenHeader();
    return api.post('account/login', body);
  };

  // get logged in user
  const getLoggedInUser = () => api.get(`users/me`);
  
  const findCitizen = body => {
    return api.post('/citizen/search' , body);
  }
  // Addressee Ednpoints
  const getAddressees = (body) => {
    return api.post('/addressee',body);
  }

  // Location Endpoints
  const getLocations = (body) => {
    return api.post('/location',body);
  }

  // Delegate Endpoints
  const getDelegates = (body) => {
    return api.post('/delegate',body);
  }

  // Complaint Endpoints
  const createRequest = body => {
    return api.post('/request/add', body);
  }
  const getRequests = (body) => {
    return api.post('/request/search', body);
  }
  const getDashboardData = () =>{
    return api.post("/app/dashboard")
  }
  // Other AdminUsers endpoints
  return {
    // Exporting the list of api functions for use in other modules
    setTokenHeader,
    clearTokenHeader,
    postLogin,
    getLoggedInUser,
    findCitizen,
    getAddressees,
    getLocations,
    getDelegates,   
    createRequest,
    getRequests,
    getDashboardData,
  };
};

export default create();
