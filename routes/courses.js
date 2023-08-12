const express = require('express');

const {getCourses , 
        getCourse , 
     createCourse , 
     updateCourse ,
    deleteCourse} = require('../controllers/courses');


const Course = require('../models/Course');

const { protect ,authorize} = require('../middleware/auth');



// Advancedrasults

const advancedrasults = require('../middleware/advancedResults');



const router = express.Router({mergeParams : true});


router.route('/:id')
        .get(getCourse)
        .put(protect , authorize('publisher','admin'), updateCourse)
        .delete(protect , authorize('publisher','admin'), deleteCourse);

router.route('/')
        .get(advancedrasults(Course,{path:'bootcamp',select : 'name description'}),getCourses)
        .post(protect , authorize('publisher','admin'), createCourse);



module.exports = router;