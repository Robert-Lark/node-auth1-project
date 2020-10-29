const db = require("../data/config");

function find() {
	return db("db");
}

function findById(id) {
	return db("db").where("id", id).first();
}

async function add(user) {
	const [id] = await db("db").insert(user);
	return findById(id);
}

module.exports = {
	add,
	find,
	findById,
};