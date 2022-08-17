const router = require('express').Router();

const {
    getAllThought,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controller/thought-controller');
  

  router
    .route('/')
    .get(getAllThought)
    .post(createThought);
  
 
  router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);
  
 
  router
    .route('/:thoughtId/reactions')
    .post(createReaction);
  
    router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
  
  module.exports = router;