const express = require('express')
const app = express()

// configurando cors
const cors = require("cors")
app.use(cors())


const path = require("path")
app.use('/files', express.static(path.resolve(__dirname, "../uploads")))

// usando rotas
const router = require('./rotas')
app.use(router)


app.listen(3333, () => {
    console.log("servidor rodando...")
})