const express = require('express')
const router = express.Router()


const fileUploadsController = require('../Controllers/fileUploadsController')
const authController = require('../Controllers/authcontroller')
const upload = require('../Utils/filehandler')
 
// ROUTES CHAINING
router.route('/linkprofileimage')
    .put(authController.protect,authController.fileToProfileImgPath,upload.single('file'),fileUploadsController.linkProfileImage)
    .patch(authController.protect,authController.fileToProfileImgPath,upload.single('file'),fileUploadsController.linkProfileImage)



router.route('/unlinkprofileimage')
    .put(authController.protect,fileUploadsController.unlinkProfileImage)// for single role
    .patch(authController.protect,fileUploadsController.unlinkProfileImage)// for single role

router.route('/multipleimage')
    .post(authController.protect,upload.array('files'),fileUploadsController.multipleFilesUpload)


router.route('/unlinkmultiplefiles/:_id')
    .put(authController.protect,fileUploadsController.unlinkProfileImage)// for multiple role
    .patch(authController.protect,fileUploadsController.unlinkProfileImage)// for multiple role

module.exports = router