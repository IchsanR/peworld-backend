const db = require("../config/db");

const userModel = {
	// Get all user
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			SELECT * FROM users`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Select user by id
	selectDetail: (id_user) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users where id_user = '${id_user}'`)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Search by skill
	selectSkill: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM users where skill ilike '%${data.skill}%' ORDER by skill ${data.sortOrd} LIMIT ${data.limit} OFFSET ${data.offset}`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Search names
	selectName: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM users where names ilike '%${data.names}%' ORDER by names ${data.sortOrd} LIMIT ${data.limit} OFFSET ${data.offset}`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// register user
	registerUser: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO users (id_user, names, email, password, phone, profile_pic)
      VALUES
      ($1, $2, $3, $4, $5, $6)`,
				[
					data.id_user,
					data.names,
					data.email,
					data.password,
					data.phone,
					data.profile_pic,
				]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// check email
	checkEmail: (email) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        SELECT * FROM users WHERE email = '${email}'
        `
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// update user
	updateUser: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        UPDATE users SET
        names = COALESCE ($1, names),
        jobdesk = COALESCE ($2, jobdesk),
        domisili = COALESCE ($3, domisili),
        tempatkerja = COALESCE ($4, tempatkerja),
        bio = COALESCE ($5, bio),
				skill = COALESCE ($6, skill)
        WHERE id_user = $7
        `,
				[
					data.names,
					data.jobdesk,
					data.domisili,
					data.tempatkerja,
					data.bio,
					data.skill,
					data.id_user,
				]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// update password user
	updatePasswordUser: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      UPDATE users SET password = '${data.password}' WHERE email = '${data.email}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// update user image
	updateProfileImage: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			UPDATE users SET 
			profile_pic = '${data.profile_pic}' 
			WHERE id_user = '${data.id_user}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete user
	destroy: (id_user) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      DELETE FROM users WHERE id_user = '${id_user}'
      `
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = userModel;
