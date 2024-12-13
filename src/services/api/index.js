/* eslint-disable import/no-cycle */
import axios from 'axios';

// // axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

export const apiGet = (url) => {
  const headers = {
    // Authorization: `Bearer null`,
  };
  console.log(process.env);
  
  return axios.get(`${process.env.REACT_APP_API_BASEURL}${process.env.REACT_APP_API_VERSION}${url}`, { withCredentials: true, headers })
    .then((resdata) => resdata.data)
    .catch((err) => {
      let errResponse = err.response ? err.response : {};
      if (err.code === 'ERR_NETWORK') errResponse = { data: { message: err.message } };
      return Promise.reject(errResponse);
    });
};

export const apiPost = (url, data) => {
  const postData = { ...data };
  const headers = {
    // Authorization: `Bearer null`,
  };
  return axios.post(`${process.env.REACT_APP_API_BASEURL}${process.env.REACT_APP_API_VERSION}${url}`, postData, { withCredentials: true, headers })
    .then((resdata) => resdata.data)
    .catch((err) => {
      let errResponse = err.response ? err.response : {};
      if (err.code === 'ERR_NETWORK') errResponse = { data: { message: err.message } };
      return Promise.reject(errResponse);
    });
};

export const apiFileUpload = (url, data) => {
  const headers = {
    // Authorization: `Bearer null`,
  };
  return axios.post(`${process.env.REACT_APP_API_BASEURL}${process.env.REACT_APP_API_VERSION}${url}`, data, { headers })
    .catch((err) => {
      let errResponse = err.response ? err.response : {};
      if (err.code === 'ERR_NETWORK') errResponse = { data: { message: err.message } };
      return Promise.reject(errResponse);
    });
};

// api post call before signin
export const apiPostOpen = (url, data) => axios.post(`${process.env.REACT_APP_API_BASEURL}${process.env.REACT_APP_API_VERSION}${url}`, data)
.then((response) => response.data)
.catch((err) => {
    let errResponse = err.response ? err.response : {};
    if (err.code === 'ERR_NETWORK') errResponse = { data: { message: err.message } };
    return Promise.reject(errResponse);
  });

  // api post call before signin
export const apiGetOpen = (url) => axios.get(`${process.env.REACT_APP_API_BASEURL}${process.env.REACT_APP_API_VERSION}${url}`)
.then((response) => response.data)
.catch((err) => {
    let errResponse = err.response ? err.response : {};
    if (err.code === 'ERR_NETWORK') errResponse = { data: { message: err.message } };
    return Promise.reject(errResponse);
  });

export const apiGetBlob = (url) => {
  const headers = {
    Authorization: `Bearer null`,
    'Content-Type': 'application/json',
  };
  return axios.get(`${process.env.REACT_APP_API_BASEURL}${process.env.REACT_APP_API_VERSION}${url}`, { withCredentials: true, responseType: 'arraybuffer', headers })
    .then((data) => data)
    .catch((err) => {
      let errResponse = err.response ? err.response : {};
      if (err.code === 'ERR_NETWORK') errResponse = { data: { message: err.message } };
      return Promise.reject(errResponse);
    });
};
