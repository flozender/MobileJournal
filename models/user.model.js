// MONGOOSE SCHEMA
const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
// mongoose.set('useCreateIndex', true);


var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
});

// userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', userSchema);  
