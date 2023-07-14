import axios from "axios"

export const executeQuery = async (query) =>
  await axios.get(import.meta.env.VITE_SERVER_URL+`/query`, { params: {data: query}})
  .catch(function (error) {
    if (error.response) {
      return error.response.data
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  })