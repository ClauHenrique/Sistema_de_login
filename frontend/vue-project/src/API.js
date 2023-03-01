import axios from "axios"

const Api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  })


const getUser = async (nome, senha) => {
    const userExists = await Api.post('usuario/validar', {
        nome: nome,
        senha: senha
    })
    return userExists
}

const cadastrarUsuario = async (FormData) => {
  
    const cadastro = await Api.post('cadastrar', FormData)
    return cadastro
}

// rota privada
const getDados = async (id_user, token) => {
    const bearerToken = 'Bearer ' + token
    const data = await Api.get(`usuario/dados/${id_user}`, {
        headers: {
            Authorization: bearerToken
          }
    })
    return data
}

export {
    getUser,
    cadastrarUsuario,
    getDados
}