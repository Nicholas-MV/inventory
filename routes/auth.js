const express = require('express')
const router = express.Router();
const passport = require('passport')
const auth = require('../controllers/auth')

// http://localhost:3000/api/auth/login
router.post('/login', auth.login)
// http://localhost:3000/api/auth/register
router.post('/register', auth.register)

module.exports = router