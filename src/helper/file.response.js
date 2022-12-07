module.exports = {
	success: (res, data, status, message) => {
		res.json({
			code: 200,
			data,
			status,
			message,
		});
	},
	failed: (res, error, status, message) => {
		res.json({
			code: 500,
			data: null,
			status,
			error,
			message,
		});
	},
	successWithToken: (res, token, status, message) => {
		res.json({
			status,
			token,
			message,
		});
	},
};
