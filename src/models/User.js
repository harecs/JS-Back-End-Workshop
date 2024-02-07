const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/, 'Invalid email address format'],
        minLength: [10, 'The email should be at least 10 characters long'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: [/[a-zA-Z0-9]+/, 'The password should consist only of English letters and digits'],
        minLength: [6, 'The password should be at least 6 characters long']
    }
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;