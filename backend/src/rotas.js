const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller')

const upload = require('../controllers/controllerUpload')


// ler dados json
const bodyParse = require('body-parser')
const jsonParser = bodyParse.json()


router.get('/', (req, res) => {
    res.status(200).send("rota raiz")
})

router.post('/usuario/validar', jsonParser, controller.UserExists)

// mandar para o fronte se o token é valido
router.get('/token/validation', jsonParser, controller.validateToken)

// cadastra o usuario e salvar a foto que sera usada no perfil
router.post('/cadastrar', jsonParser, upload.single('image'), controller.Cadastrarusuario)

// rota privada
router.get('/usuario/dados/:id', jsonParser, controller.checkToken, controller.getDados)

module.exports = router