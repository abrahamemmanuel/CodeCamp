const express = require('express');
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../app/Http/Controllers/Api/V1/CourseController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
