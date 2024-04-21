const express = require('express')
const router = express.Router()

 const supportcvController = require('../Controllers/supportcvController')
 const authController = require('../Controllers/authcontroller')
 const upload = require('../Utils/filehandler')

// ROUTES CHAINING for supportcv

router.route('/')
    .get(authController.protect,supportcvController.getSupportcvs)
    .post(authController.protect,authController.filesTosupportcvsPath,upload.array('files'),supportcvController.postSupportcv) //allows multiple files uploads

router.route('/:_id')
    .get(authController.protect,supportcvController.getSupportcv)
    .patch(authController.protect,supportcvController.patchSupportcv)
    .put(authController.protect,supportcvController.putSupportcv)
    .delete(authController.protect,authController.restrict('admin'),supportcvController.deleteSupportcv)// for single role

module.exports = router