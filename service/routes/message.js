const router = require('express').Router();
const trimmer = require('../utils/functions');
const axios = require("axios");
const { messageValidator } = require('../utils/validationMiddleware');
const Message = require('../models/Message');
const Credit = require('../models/Credit');
const { saveMessage, findAllMessages, updateEventState } = require('../clients/findAllMessages');
const getMessages = require('../controllers/getMessages');

const hostname = process.env.URL || 'localhost';
const sendPort = process.env.SENDPORT || 3000;

const appRedirect = axios.create({
	baseURL: `http://${hostname}:${sendPort}`
});

const messagePrice = 2.1

router.post("/", messageValidator, (req, res, next) => {

	let { destination, body } = req.body;

	//saves message before operations
	let messageId;
	saveMessage(destination, body)
		.then(msg => {
			messageId = msg._id;
		})
		.then(() => {
			Credit.find()
				.then(credit => {
					const { amount, _id } = credit[0];
					let { eventState } = credit[0];
					if (eventState) {
						eventState = false;
						updateEventState(eventState)
							.then(() => {
								if (amount >= messagePrice) {
									const newAmount = amount - messagePrice;
									Credit.findByIdAndUpdate(_id, { amount: newAmount }, { new: true })
										.then(() => {
											appRedirect.post("/message", { destination, body })
												.then(response => {
													res.status(200).send(response.data);
													Message.findOneAndUpdate({ _id: messageId }, { wasSent: true, isConfirmed: true }, { new: true })
														.then(msg => console.log(`Message sent and confirmed. Credit left: ${newAmount}€`))
														.catch(err => console.log('Error updating msg in db', err));
												})
												.catch(error => {
													res.status(500).send(`${error}`);
													Message.findOneAndUpdate({ _id: messageId }, { wasSent: true, isConfirmed: false }, { new: true })
														.then(msg => console.log(`Message sent but not confirmed. Credit left: ${newAmount}€`))
														.catch(err => console.log('Error updating msg in db', err));
												});
										})
										.then(() => {
											eventState = true;
											updateEventState(eventState)
										})
								} else {
									res.status(400).send('No credit left');
								};
							})
					};
				})
				.catch(err => console.log('Error fetching credit', err));
		});
});

router.get("/", (req, res, next) => {
	getMessages(req, res);
});

module.exports = router;