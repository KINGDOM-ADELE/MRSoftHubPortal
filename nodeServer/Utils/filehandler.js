'use strict'
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
    req.body.targetFilepath 
        // cb(null, 'uploads')
        cb(null, req.headers.targetFilepath) // using the file path set by authcontroller
    },
    filename: (req, file, cb) => {

        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
        // cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || 'image/png' || 'image/jpg' || 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }

}

const upload = multer({storage: storage, fileFilter: filefilter})

// module.exports = {upload}
module.exports = upload