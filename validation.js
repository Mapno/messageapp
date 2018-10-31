class Validate {

    validateString(text) {
        return typeof text !== 'string';
    };

    validateStringLength(text) {
        return text.length > 100;
    };

    validateBlankInput(text) {
        return text.length < 1;
    };

    

}

module.exports = Validate;