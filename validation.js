class Validate {

    validateString(text) {
        return typeof text !== 'string';
    };

    validateStringLength(text) {
        return text.length < 100;
    };

}

module.exports = Validate;