/**
 * Index routes
 */

const express = require('express');
const router = express.Router();

const { createRules } = require('../validation/user_validation')
const userController = require('../controllers/user_controller')
const auth = require('../controllers/middleware/auth')

/* GET home page */
router.get('/', (req, res) => {
    res.send({ status: 'testing testing one two one two' })
})

router.post('/register', [createRules], userController.register)

router.use(auth.basic)
router.use('/photos', require('./photos_routes'))
router.use('/albums', require('./albums_routes'))

module.exports = router;