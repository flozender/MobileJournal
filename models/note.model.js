// MONGOOSE SCHEMA
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contestSchema = new Schema({
    title: String,
    content: String,
    date: String,
    status: Boolean,
    author: String
},{timestamps: true});

module.exports = mongoose.model('Note', contestSchema);  
