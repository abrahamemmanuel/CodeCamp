const express = require('express');
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../app/Http/Controllers/Api/V1/CourseController');

const router = express.Router({ mergeParams: true });
const Course = require('../app/Models/Course');
const advancedResults = require('../app/Http/Middleware/advancedResults');

router.route('/')
      .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
      }), getCourses)
      .post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
