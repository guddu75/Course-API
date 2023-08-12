const express = require('express');

const {
    getUser , getUsers , createUser , updateUser , deleteUser
} = require('../controllers/users');


const User = require('../models/User');


const router = express.Router({mergeParams : true});


// Advancedrasults

const { protect ,authorize} = require('../middleware/auth');
const advancedrasults = require('../middleware/advancedResults');


router.use(protect);
router.use(authorize('admin'));


router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
        
        

router.route('/')
    .get(advancedrasults(User),getUsers)
    .post(createUser);
        



module.exports = router;