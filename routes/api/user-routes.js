const router = require('express').Router();
const { createUser } = require('../../controller/user-controller.js');

router
    .route('/')
    .post(createUser);
    
module.exports = router;