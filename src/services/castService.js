const Cast = require('../models/Cast');

exports.addCast = (castInfo) => Cast.create(castInfo);