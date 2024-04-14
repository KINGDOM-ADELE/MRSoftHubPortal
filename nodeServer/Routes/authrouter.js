const express = require('express')
const authController = require('../Controllers/authcontroller')

const router = express.Router()

// // PUBLIC ROUTES
 router.route('/signup').post(authController.signup)
 router.route('/login').post(authController.login)
 router.route('/forgotpassword').post(authController.forgotpassword)
//  router.route('/verifyemail').post(authController.verifyEmail)
//  router.route('/resetpassword/:Token').patch(authController.resetpassword)


//  // PROTECTED ROUTES
//  router.route('/setusercourse/:_id')
//     .patch(authController.protect,authController.setUserCourse)
//  router.route('/adminsetusercourse/:_id')
//     .patch(authController.protect,authController.restrict('admin'),authController.adminSetUserCourse)
// //  router.route('/removeusercourse/:_id').patch(authController.protect,authController.removeusercourse)
// //  router.route('/updateusercoursestatus/:_id').patch(authController.protect,authController.updateusercoursestatus)
//  router.route('/approve/:_id').patch(authController.protect,authController.restrict('admin'),authController.approveUser)
//  router.route('/setuserstatus/:_id').patch(authController.protect,authController.restrict('admin'),authController.setUserStatus)

//  router.route('/myprofile')
//     .get(authController.protect,authController.getMyProfile)
//  router.route('/searchuser')
//     .get(authController.protect,authController.searchUsers)

// router.route('/changePassword')
//     .put(authController.protect,authController.changePassword)
//     .patch(authController.protect,authController.changePassword)

// router.route('/logoutall')
//     .put(authController.protect,authController.logOutAll)
//     .patch(authController.protect,authController.logOutAll)

// router.route('/addcourse/:_id')
//     .put(authController.protect,authController.addUserCourse)
//     .patch(authController.protect,authController.addUserCourse)

// router.route('/enrollcourse/:_id')
//     .put(authController.protect,authController.enrollUserToCourse)
//     .patch(authController.protect,authController.enrollUserToCourse)

// router.route('/removecourse/:_id')
//     .put(authController.protect,authController.removeUserCourse)
//     .patch(authController.protect,authController.removeUserCourse)

// router.route('/:_id')
//     .get(authController.protect,authController.getAuser)
//     .put(authController.protect,authController.restrict('admin'),authController.adminUpdateUser)
//     .patch(authController.protect,authController.restrict('admin'),authController.adminUpdateUser)
//     .delete(authController.protect,authController.restrict('admin'),authController.deleteUser)// for multiple roles


// router.route('/')
//     .get(authController.protect,authController.getUsers)
//     .put(authController.protect,authController.updateUser)
//     .patch(authController.protect,authController.updateUser)


 module.exports = router     