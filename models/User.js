const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
});

// create user model
const User = mongoose.model('users', userSchema);

module.exports = User;