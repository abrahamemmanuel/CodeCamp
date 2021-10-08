//require express
const express = require('express');
//import the bootcamp controller from app/Htpp/Controllers/Api/V1/BootcampsController.js
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp} = require('../app/Http/Controllers/Api/V1/BootcampController');

//initialize express router
const router = express.Router();

//mount the routes
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
