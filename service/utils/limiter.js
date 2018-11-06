const rateLimit = require('express-rate-limit');

//limits to 1 petition per 2 seconds from the same IP
module.exports = rateLimit({
    windowMs: 2 * 1000,
    max: 20,
    message: 'Too many messages sent by same IP'
});