const trimInputs = (...inputs) => {
    inputs.forEach((text, index, arr) => arr[index] = text.trim());
    return inputs
};

module.exports = trimInputs;