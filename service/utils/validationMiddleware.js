const Validator = require('jsonschema').Validator;
const v = new Validator();
const messageSchema = require('../validation-schemas/messageSchema');
const creditSchema = require('../validation-schemas/creditSchema');

const messageValidator = (req, res, next) => {

    const validation = v.validate(req.body, messageSchema);

    if (validation.errors.length > 0) {
        let errorMessage = '';
        validation.errors.forEach(error => errorMessage += `${error.stack}. `);
        res.status(400).send(errorMessage);
        return;
    } else {
        next();
    }
}

const creditValidator = (req, res, next) => {

    const validation = v.validate(req.body, creditSchema);

    if (validation.errors.length > 0) {
        let errorMessage = '';
        validation.errors.forEach(error => errorMessage += `${error.stack}. `);
        res.status(400).send(errorMessage);
        return;
    } else {
        next();
    }

}



module.exports = { messageValidator, creditValidator };