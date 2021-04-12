var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
    res.send({ status: 'testing testing one two one two' })
})

router.use('/photos')
router.use('/albums')

router.post('/register')

module.exports = router;