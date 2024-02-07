const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (registerInfo) => {
    const user = await User.findOne({ email: registerInfo['email'].toLowerCase() });

    if (!registerInfo.email) {
        throw new Error('Email is required');
    }

    if (user) {
        throw new Error('The email is already registered');
    }

    if (registerInfo['password'] !== registerInfo['rePassword']) {
        throw new Error('Passwords mismatch');
    }

    return User.create({ email: registerInfo.email, password: registerInfo.password });
}

exports.login = async (loginInfo) => {
    if (!loginInfo['email'] || !loginInfo['password']) {
        throw new Error('Invalid email or password');
    }

    const user = await User.findOne({ email: loginInfo['email'].toLowerCase() })

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValidUser = await bcrypt.compare(loginInfo.password, user.password);

    if (!isValidUser) {
        throw new Error('Invalid email or password');
    }

    const payload = { _id: user._id, }

    let token = '';
    try {
        token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
    } catch (err) {
        throw new Error('There was an error on our behalf. Sorry for the inconvenience.');
    }

    return token;
}