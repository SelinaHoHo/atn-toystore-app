const express = require('express');
const { isLoggedIn, isSignedIn } = require('../middlewares/middlewares');
const adminController = require('../controllers/adminController')

const router = express.Router();

router.get('/dashboard',isSignedIn, adminController.getDashboard)
router.get('/user-list', isSignedIn, adminController.getUserList)
router.get('/create-user', adminController.getCreateUser)
router.post('/create-user', adminController.createUser)
router.get('/user-list/:user_id', adminController.userDetail)
router.get('/edit-user', isSignedIn, adminController.getEditUser)
router.put('/user-list', isLoggedIn, adminController.EditUser)
router.get('/product',isSignedIn, adminController.getProductList)
router.get('/user-list/:user_id', isLoggedIn, adminController.removeUser);

module.exports = router;
