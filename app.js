const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const body = require('body-parser')
const passport = require('passport')
const app = express()

const authRouter = require('./routes/auth')
const table = require('./routes/table')

mongoose.connect("mongodb+srv://mgoncar251:JpbfNUI2DW794yQA@cluster0.nr1trru.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("connect mongo"))
.catch((error) => console.log(error))

app.use(passport.initialize())
require('./midleware/passport')(passport)

app.use(morgan('dev'))
app.use(require('cors')())
app.use(body.urlencoded({extended:true}));
app.use(body.json());

app.use('/api/auth', authRouter)
app.use('/api/table', table)


module.exports = app