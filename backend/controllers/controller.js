const conexao = require('../models/db')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

require('dotenv').config({ path: '../.env' })

const secret = process.env.SECRET

const Cadastrarusuario = async (req, res) => {
    try {

        const dados = await req.body

        // verificar se houve o upload da imagem
        if (!req.file) {
            return res.status(400).json({
                erroExtençãoImg: true,
                msg: "falha ao carregar imagem. Mande apenas imagens nos formatos png, jpg e jpeg"})
        }
        if (!dados.nome || !dados.senha) {
            return res.status(400).json({msg: "valores nulos"})
        }

        const fileName = await req.file.filename
       
        const senhaEncrypt = await bcrypt.hash(dados.senha, 8)
        
        conexao.CadastrarUsuario(dados.nome, senhaEncrypt, fileName).then(() => {
            return res.status(201).json({msg: "casdastrado!"})
        }).catch((err) => {
            return res.status(400).json({
                userExists: true,
                msg: "erro em cadastrar usuario: " + err})
        })
    }

    catch (err) {
        return res.status(400).json({msg: "falha na requisição: " + err})
    }
}


// validar se a conta existe
const UserExists = async (req, res) => {
    try {
        const dados = await req.body

        const dadosUsuarioBanco = await conexao.getUser(dados.nome)

        if (dadosUsuarioBanco == undefined) {
            return res.status(404).json({msg: "usuario nao encontrado!"})
        }

        else {
            const validar = await bcrypt.compare(dados.senha, dadosUsuarioBanco.senha)

            if (validar == true) {
                // criar token para esse usuario
                const token = jwt.sign({id: dadosUsuarioBanco.id}, secret, {
                    expiresIn: 600
                })

                return res.status(200).json({msg: "usuario logado!", token: token, id_user: dadosUsuarioBanco.id})
            }
            else {
                return res.status(401).json({msg: "usuario invalido!"})
            }
        }
    }

    catch (erro) {
        return res.status(400).json({msg: "falha na requisição " + erro})
    }
}


const getDados = async (req, res) => {
   try {
        const id_user = await req.params.id

        if (!id_user) {
            return res.status(400).json({msg: "passar o id do usuario"})
        }

        const dadosUsuarioBanco = await conexao.getProfile(id_user)
        
        return res.status(200).json({
            msg: "dados do usuario!",
            id: dadosUsuarioBanco.id,
            nome: dadosUsuarioBanco.nome,
            profilePicture: dadosUsuarioBanco.profilePicture})
   }

   catch (erro) {
        return res.status(400).json({msg: "falha na requisição " + erro})
   }
}

const checkToken = async (req, res, next) => {

    const validar = await req.headers.authorization

    if (!validar) {
        return res.status(401).json({msg: "usuario nao esta logado"})
    }

    const token = validar.split(" ")[1]

    if (!token) {
        return res.status(401).json({msg: "usuario nao esta logado"})
    }
   
    try {
        // validar o token
        jwt.verify(token, secret)
        next()
    }

    catch (err) {
        return res.status(401).json({msg: "token invalido", tokenValido: false})
       }
}

// retornar para o front se o token dele é valido
const validateToken = async (req, res) => {

    const validar = await req.headers.authorization

    if (!validar) {
        return res.status(401).json({msg: "usuario nao esta logado"})
    }

    const token = validar.split(" ")[1]

    if (!token) {
        return res.status(401).json({msg: "usuario nao esta logado"})
    }
   
    try {
        // validar o token
        jwt.verify(token, secret)
        return res.json({msg: "token valido", tokenValido: true})
    }

    catch (err) {
        return res.json({msg: "token invalido", tokenValido: false})
       }
}


module.exports = {
    Cadastrarusuario,
    UserExists,
    getDados,
    checkToken,
    validateToken
}