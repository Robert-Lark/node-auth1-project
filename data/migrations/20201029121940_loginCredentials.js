exports.up =  async function (knex) {
	return knex.schema.createTable("credentials", (tbl) => {
		tbl.increments();
		tbl.text("name", 128).unique().notNullable();
		tbl.text("password").notNullable();
	});
};

exports.down = async function (knex) {
	return knex.schema.dropTableIfExists("accounts");
};
