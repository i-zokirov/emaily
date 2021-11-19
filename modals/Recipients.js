const mongoose = require('mongoose');
const {Schema} = mongoose;

const RecipientSchema = new Schema({
    email: {type: String, required: true},
    responded: {type: Boolean, default: false}
});


module.exports = RecipientSchema
