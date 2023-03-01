import axios from "axios"

const Api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  })


const setToken = (token) => {
  localStorage.setItem('token', token) 
}

// verificar se existe um token armazenado
const checkToken = () => {
  return localStorage.getItem('token')
}

const setIdUser = (id_user) => {
  localStorage.setItem('id_user', id_user)
}

const getIdUser = () => {
  return localStorage.getItem('id_user')
}


const validateToken = async (token) => {
  const bearerToken = 'Bearer ' + token
  const check = await Api.get('token/validation', {
    headers: {
      Authorization: bearerToken
    }
  })
  return check
}

export {
  setToken,
  checkToken, 
  setIdUser,
  getIdUser,
  validateToken
}