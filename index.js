const express = require('express');
const app = express();

app.listen(9001, () => console.log('Hola, mundo'));

// app.post('/message', (req, res, next) => {
//     const { destination, message } = req.body;
//     res.send(message, destination);
// });