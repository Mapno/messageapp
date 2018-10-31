const Client = require('./client')
const client = new Client('localhost', 9001)

client.send('cabify', 'prueba')
    .then(res => console.log(res))