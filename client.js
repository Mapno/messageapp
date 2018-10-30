const axios = require('axios');

class Client {
    constructor(hostname, port) {
        this.hostname = hostname;
        this.port = port;
        this.service = axios.create({
            baseURL: `http://${this.hostname}:${this.port}`
        });
    };

    send(destination, message) {
        return this.service.post('/message', { destination, body: message })
            .then(response => response.data)
            .catch(error => error)
    };
};

module.exports = Client;