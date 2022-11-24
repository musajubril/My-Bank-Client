

const API_URL = process.env.NODE_ENV==="production" ? "https://my-new-bank-api.herokuapp.com" : "http://localhost:4000";
export const TRANSACTIONS = `${API_URL}/transactions`
export const DEPOSIT = `${API_URL}/deposit`
export const WITHDRAWAL = `${API_URL}/withdrawal`
export const TRANSFER = `${API_URL}/transfer`
export const REGISTER = `${API_URL}/register`
export const LOGIN = `${API_URL}/login`
export const USERACCOUNT =(user)=> `${API_URL}/user/${user}` 
export const MYACCOUNT = `${API_URL}/user`
