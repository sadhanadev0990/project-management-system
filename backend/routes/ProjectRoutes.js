const express = require('express');

const projectController = require('../controllers/ProjectController');
const authController = require('../controllers/AuthController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, projectController.getAllProjects)
  .post(
    authController.protect,
    projectController.checkBody,
    projectController.createProject
  );

router
  .route('/:id')
  .get(authController.protect, projectController.getProject)
  .patch(authController.protect, projectController.updateProject)
  .delete(
    authController.protect,
    // authController.restrictTo('admin', 'lead'),
    projectController.deleteProject
  );

module.exports = router;
