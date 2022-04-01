//require express
const express = require('express');
//import the bootcamp controller from app/Htpp/Controllers/Api/V1/BootcampsController.js
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload} = require('../app/Http/Controllers/Api/V1/BootcampController');

//include the other resource routers
const courseRouter = require('./courses');

//initialize express router
const router = express.Router();

//mount the course router on the bootcamp router
router.use('/:bootcampId/courses', courseRouter);

//mount the routes
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
