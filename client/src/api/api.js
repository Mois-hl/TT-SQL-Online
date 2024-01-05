import axios from "axios"

const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:4000"

export const resetApp = async (query) =>
  await axios.get(baseUrl+`/reset`, { params: {data: query}})
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
        return error.response.data
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })

export const executeQuery = async (query) =>
  await axios.get(baseUrl+`/query`, { params: {data: query}})
    .catch(function (error) {
      if (error.response) {
        return error.response.data
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })

export const initializeApp = async (query) =>
  await axios.get(baseUrl + `/init`, { params: {data: query}})
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
        return error.response.data
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })