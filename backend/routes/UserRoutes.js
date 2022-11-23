const express = require('express');

const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route("/logout").get(authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.post('/resetPassword', authController.resetPassword);

router.route('/').get(authController.protect, userController.getAllUsers);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
