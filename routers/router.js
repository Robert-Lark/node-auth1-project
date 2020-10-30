const express = require("express");
const router = express.Router();
const models = require("./router-models.js");
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
	res.send("We Did it");
});

router.get("/getCredentials", async (req, res, next) => {
	try {
		const credentials = await models.find();
		res.status(200).json(credentials);
	} catch (err) {
		next(err);
	}
});

router.post("/setCredentials", async (req, res, next) => {
	try {
		const { name, password } = req.body;
		const credentials = await models.add({
			name,
			password: await bcrypt.hash(password, 14),
		});
		res.status(201).json(credentials);
	} catch (err) {
		next(err);
	}
});

router.post("/useCredentials", async (req, res, next) => {
	try {
		const { name, password } = req.body;
		const user = await models.findBy({ name }).first();
		const passwordValid = await bcrypt.compare(password, user.password);
		req.session.user = user;

		if (!req.session || !req.session.user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			});
		}
		res.status(201).json({ message: `Welcome ${user.name}` });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
