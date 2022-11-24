/* eslint-disable no-param-reassign */
import axios from 'axios'

const apiToken = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL
})

apiToken.interceptors.request.use(
  (config) => {
    // Add authorization key to config object if it exist
    const my_bank_token = localStorage.getItem('my_bank_token')
    if (my_bank_token) {
      config.headers.Authorization = `Bearer ${my_bank_token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default apiToken
