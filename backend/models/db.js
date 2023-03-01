const { json } = require('body-parser')

require('dotenv').config({ path: '../.env' })


const Sequelize = require('sequelize')
const sequelize = new Sequelize('Users', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql"
})

// sequelize.authenticate()


const Usuario = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        unique: true
    },
    senha: {
        type: Sequelize.STRING
    },
    profilePicture: {
        type: Sequelize.STRING
    }
})

Usuario.sync()



const CadastrarUsuario = async (nome, senha, fileName) => {
   try {
    await Usuario.create({nome: nome,  senha: senha, profilePicture: fileName})
   }
    catch (err) {
        throw "valores duplicados para a coluna 'nome'"
   }
}


const getUser = async (nome) => {

    const nomeUsuario = await Usuario.findAll({
      attributes: ['id', 'nome', 'senha',],
      where : {
        nome: nome
      }
      })
        return nomeUsuario[0]
    }


const getProfile = async (id) => {
    const profile = await Usuario.findOne({
        attributes: ['id', 'nome', 'profilePicture'],
        where: {
            id: id
        }
    })
    return profile
}



module.exports = {
    CadastrarUsuario,
    getUser,
    getProfile
}