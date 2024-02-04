const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (registerInfo) => {
    if (!registerInfo['email'] || !registerInfo['password'] || !registerInfo['rePassword']) {
        throw new Error('Invalid register data!');
    }

    if (await User.findOne({ email: registerInfo['email'].toLowerCase() })) {
        throw new Error('Invalid register data!');
    }

    if (registerInfo['password'] !== registerInfo['rePassword']) {
        throw new Error('Invalid register data!');
    }

    return User.create({ email: registerInfo.email, password: registerInfo.password });
}

exports.login = async (loginInfo) => {
    if (!loginInfo['email'] || !loginInfo['password']) {
        throw new Error('Invalid login data!');
    }

    const user = await User.findOne({ email: loginInfo['email'].toLowerCase() })

    if (!user) {
        throw new Error('Invalid login data!');
    }

    const isValidUser = await bcrypt.compare(loginInfo.password, user.password);

    if (!isValidUser) {
        throw new Error('Invalid login data!');
    }

    const payload = { _id: user._id, }
    const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});

    return token;
}