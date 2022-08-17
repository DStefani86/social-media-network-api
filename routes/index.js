const router = require('express').Router();

router.use('/api',require('./api'));
router.use((req,res) => res.send('<h1>wrong route!</h1>'))

module.exports = router;