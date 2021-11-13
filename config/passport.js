const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')

const User = mongoose.model('users')

// env variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

// call serializeUser with the user to generate the identifying piece of info a.k.a token
passport.serializeUser((user, done)=>{
    done(null, user.id)
});

// take identifying piece of info a.k.a token from cookie, pass into deserializeUser to turn it into a user
passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user=> done(null, user))
        .catch(err=> done(err))
});

// passport configuration middleware to use google-oauth
passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async(accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})
        if(existingUser){
            // user alreadys exists in DB
            return done(null, existingUser) // => proceed with authentication with existing user record
        }
         //user does not exist in DB    
        const newUser = new User({
        googleId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value
        })
        await newUser.save()
        done(null, newUser) // => proceed with authentication with new user record
    })
);
