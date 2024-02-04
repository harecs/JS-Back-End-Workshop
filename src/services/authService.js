const User = require('../models/User');

exports.register = (reqBody) => {
    if (!reqBody['email'] || !reqBody['password'] || !reqBody['rePassword']) {
        throw new Error('Invalid register data!');
    }

    if (reqBody['password'] !== reqBody['rePassword']) {
        throw new Error('Invalid register data!');
    }

    return User.create({ email: reqBody.email, password: reqBody.password });
}