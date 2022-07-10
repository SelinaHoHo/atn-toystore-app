const express = require('express');
const { isLoggedIn, isSignedIn } = require('../middlewares/middlewares');
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/view-product', isSignedIn, userController.getProduct);
router.get('/details', isSignedIn, userController.getUserDetail);
router.get('/create-product', isSignedIn, userController.getUserCreateProduct);
router.post('/create-product', isLoggedIn, userController.userCreateProduct);
router.get('/edit-product', isSignedIn, userController.getEditProduct);
router.put('/edit-product', isLoggedIn, userController.editProduct);

module.exports = router;