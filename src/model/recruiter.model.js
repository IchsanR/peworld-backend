const db = require("../config/db");

const recruiterModel = {
	// Get all recruiter
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			SELECT * FROM recruiter`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// select recruiter by id
	selectDetail: (id_recruiter) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recruiter where id_recruiter = '${id_recruiter}'`)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// register recruiter
	registerRecruiter: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO recruiter (id_recruiter, names, email, perusahaan, jabatan, phone, password, profile_pic)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[
					data.id_recruiter,
					data.names,
					data.email,
					data.perusahaan,
					data.jabatan,
					data.phone,
					data.password,
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
        SELECT * FROM recruiter WHERE email = '${email}'
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
	updateRecruiter: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        UPDATE recruiter SET
				perusahaan = COALESCE ($1, perusahaan),
				bidang = COALESCE ($2, bidang),
				kota = COALESCE ($3, kota),
				bio = COALESCE ($4, bio),
				email = COALESCE ($5, email),
				instagram = COALESCE ($6, instagram),
				phone = COALESCE ($7, phone),
				linkedin = COALESCE ($8, linkedin)
				WHERE id_recruiter = $9
        `,
				[
					data.perusahaan,
					data.bidang,
					data.kota,
					data.bio,
					data.email,
					data.instagram,
					data.phone,
					data.linkedin,
					data.id_recruiter,
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

	// update password recruiter
	updatePasswordRecruiter: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      UPDATE recruiter SET password = '${data.password}' WHERE email = '${data.email}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// update recruiter image
	updateRecruiterImage: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			UPDATE recruiter SET 
			profile_pic = '${data.profile_pic}' 
			WHERE id_recruiter = '${data.id_recruiter}'`
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
	destroy: (id_recruiter) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      DELETE FROM recruiter WHERE id_recruiter = '${id_recruiter}'
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

module.exports = recruiterModel;
