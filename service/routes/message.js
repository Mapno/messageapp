const router = require('express').Router();
const { messageValidator } = require('../utils/validationMiddleware');
const getMessages = require('../controllers/getMessages');
const newMessage = require('../controllers/newMessage');
const { databases } = require('../index');

router.post("/", messageValidator, (req, res, next) => {
	let { destination, body } = req.body;
	newMessage(req, res, destination, body, databases);
});

router.get("/", (req, res, next) => {
	getMessages(req, res, databases);
});

module.exports = router;