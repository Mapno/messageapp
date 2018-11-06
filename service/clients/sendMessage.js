const axios = require('axios');

const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

module.exports = (destination, body) => {
    return axios.post(`http://${hostname}:${sendPort}/message`, { destination, body });
};

