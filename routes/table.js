const express = require('express')
const router = express.Router();
const passport = require('passport')
const table = require('../controllers/table')

// http://localhost:4000/api/table/withdraw
router.get('/withdraw', passport.authenticate('jwt', { session: false }), table.withdraw)
// http://localhost:4000/api/table/new
router.post('/new', passport.authenticate('jwt', { session: false }), table.newDevice)
// http://localhost:4000/api/table/history
router.get('/history', passport.authenticate('jwt', { session: false }), table.history)
// http://localhost:4000/api/table/change
router.patch('/change', passport.authenticate('jwt',     { session: false }), table.changeDevice)
// http://localhost:4000/api/table/delete
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), table.deleteDevice)

module.exports = router