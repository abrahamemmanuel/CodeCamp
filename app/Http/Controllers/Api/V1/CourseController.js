const Course = require('../../../../Models/Course');
const Bootcamp = require('../../../../Models/Bootcamp');
const ErrorResponse = require('../../../../Utils/errorResponse');
const asyncHandler = require('../../../Middleware/async');

//@desc Get all courses
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses
//@access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  }else{
    res.status(200).json(res.advancedResults);
  }
});

//@desc Get a single course
//@route GET /api/v1/courses/:id
//@access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });
  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: course
  });
});

//@desc Add course
//@route POST /api/v1/bootcamps/:bootcampId/courses
//@access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.bootcampId} not found`, 404)
    );
  }
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: course
  });
});

//@desc Update course
//@route POST /api/v1/courses/:id
//@access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} not found`, 404)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,
    data: course
  });
});

//@desc Delete course
//@route DELETE /api/v1/courses/:id
//@access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} not found`, 404)
    );
  }
  await course.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});
