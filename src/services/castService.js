const Cast = require('../models/Cast');

exports.addCast = (castInfo) => Cast.create(castInfo);

exports.getAllAvailableCasts = () => Cast.find({ movie: { $exists: false } });