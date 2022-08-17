const router = require('express').Router();
const { 
    createUser,
    getAllUser,
    getOneUser, 
    deleteUser,
    updateUser,
} = require('../../controller/user-controller.js');

router
    .route('/')
    .post(createUser)
    .get(getAllUser);

router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser);

router
  .route('/:id')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);


    
    
module.exports = router;