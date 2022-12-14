const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const studentRoute = require('./routes/route')
const port = 8080
const app = express()


// -------------DATABASE------------------------
mongoose.connect('mongodb://localhost/School', () => {
    console.log('connected to database')
})

// --------------MIDDLEWARES--------------------
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.use('/api', studentRoute)


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   