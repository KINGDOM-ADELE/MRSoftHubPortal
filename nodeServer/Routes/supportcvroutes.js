const express = require('express')
const router = express.Router()

 const supportcvController = require('../Controllers/supportcvController')
 const authController = require('../Controllers/authcontroller')
 const upload = require('../Utils/filehandler')

// ROUTES CHAINING for supportcv

router.route('/')
    .get(supportcvController.getSupportcvs)
    .post(authController.filesTosupportcvsPath,upload.array('files'),supportcvController.postSupportcv) //allows multiple files uploads
    // .post(supportcvController.postSupportcv) //allows multiple files uploads

// router.route('/:_id')
//     .get(supportcvController.getsupportcv)
//     .patch(supportcvController.patchsupportcv)
//     .put(supportcvController.putsupportcv)
//     .delete(authController.protect,authController.restrict('admin'),supportcvController.deletesupportcv)// for single role

module.exports = router