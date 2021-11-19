const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 3
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema)