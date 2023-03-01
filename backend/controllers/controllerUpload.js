const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads')
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const extensao = ['image/png', 'image/jpg', 'image/jpeg'].find
    (formatoAceito => formatoAceito == file.mimetype)

    if (extensao) {
        return cb(null, true)
    }

    return cb(null, false)
}

const upload = multer({storage: storage, fileFilter: fileFilter})

module.exports = upload