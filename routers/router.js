const express = require("express");
const router = express.Router();
const models = require("./router-models.js");

router.get("/", (req, res, next) => {
	res.send("We Did it");
});

router.post("/", (req,res,next) => {

})

module.exports = router