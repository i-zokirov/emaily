if(!process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const app = express()

//services 
require('./modals/userModal')
require('./modals/surveyModal')
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

// ***** Middleware section ***** //
// cookie configuration
app.use(bodyParser.json())
app.use(
    cookieSession({
        name: "emaily-beckenf-auth-session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session())
// ***** Middleware section end ***** //

// routes
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

// deployment configuration
if(process.env.NODE_ENV === 'production'){
    // ensuring express serves production assets
    app.use(express.static('client/build'));
    // if route requested is not configured in express, it serves index.html
    const path = require('path')
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, ()=> console.log(`Your server is running on ${PORT}`));