const router = require('express').Router()
const { login,getUser,verify,logout, register } = require('../controllers/api.controller')

router.post('/login', login)
router.post('/register', register)
router.get('/user', getUser)
router.get('/verify', verify)
router.get('/logout', logout)
module.exports = router