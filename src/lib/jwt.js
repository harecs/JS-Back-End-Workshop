const util = require('util');

const jwt = require('jsonwebtoken');

exports.decode = util.promisify(jwt.decode);
exports.sign = util.promisify(jwt.sign);
exports.verify = util.promisify(jwt.verify);