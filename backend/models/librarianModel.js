const db = require("../config/db");
const Sequelize = require("sequelize");
// create model for librarian
const Librarian = db.define("librarian", {
	employee_id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	employee_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	status: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	updatedAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
});

module.exports = Librarian;
