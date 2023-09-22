

const jwt = require("jsonwebtoken");

const secret = "CourseBookingAPI";


module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
};



module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token !== "undefined") {
		console.log(token);
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				return res.send({auth:"failed"});
			} else {
				// allows the application to process with the next middleware function/callback function in the route
				next()
			};
		});
	} else {
		return res.send({auth: "failed"});
	};
};

module.exports.decode = (token) => {
	if(typeof token !== "undefined") {
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				return null;
			} else {
				return jwt.decode(token, {complete: true}).payload;
			};
		});
	} else {
		return null;
	};
};

