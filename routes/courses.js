const express = require('express');
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../app/Http/Controllers/Api/V1/CourseController');

const router = express.Router({ mergeParams: true });

router.get('/', getCourses);

module.exports = router;
