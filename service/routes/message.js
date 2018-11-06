const router = require('express').Router();
const { messageValidator } = require('../utils/validationMiddleware');
const getMessages = require('../controllers/getMessages');
const newMessage = require('../controllers/newMessage');
const { mongo1, mongo2 } = require('../index');

router.post("/", messageValidator, (req, res, next) => {

	let { destination, body } = req.body;

	newMessage(req, res, destination, body);
});

router.get("/", (req, res, next) => {
	getMessages(req, res, mongo1);
});

module.exports = router;