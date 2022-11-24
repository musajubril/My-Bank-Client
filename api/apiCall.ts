import apiToken from './apiToken'
import axios from 'axios'

export const postRequest = async ({ url, data } ) => {
  const response = await apiToken.post(url, data)
  return response.data
}

export const getRequest = async ({ url }) => {
  const response = await apiToken.get(url)
  return response.data
}

export const registration = async ({ url, data }) => {
  const response = await axios.post(url, data)
  // console.log(response)
  localStorage.setItem('my_bank_token', response.data.access_token)
  return response.data
}

export const login = async ({ url, data }) => {
  const response = await axios.post(url, data)
  console.log(response)
  localStorage.setItem('my_bank_token', response.data.access_token)
  return response.data
}
