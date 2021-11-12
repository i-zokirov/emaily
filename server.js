require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express()

//services 
require('./modals/userModal')
require('./config/passport')

// env variables
const PORT = process.env.PORT || 5000
const MONGO_DB_URI = process.env.MONGO_DB_URI
const COOKIE_KEY = process.env.COOKIE_KEY

mongoose.connect(MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected successfully")
    })
    .catch(err => {
        console.log(`MongoDB connection failure:`)
        console.log(err)
    })


// cookie configuration
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [COOKIE_KEY]
    })
);

app.use(passport.initialize());
app.use(passport.session())

// routes
const authRoutes = require('./routes/authRoutes')
authRoutes(app)

app.listen(PORT, ()=> console.log(`Your server is running on ${PORT}`));