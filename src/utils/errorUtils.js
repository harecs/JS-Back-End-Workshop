const { MongooseError } = require("mongoose");

exports.getErrorMessage = (err) => {
    if (err instanceof MongooseError) {
        return Object.values(err.errors).at(0);
    }

    return err.message;
}