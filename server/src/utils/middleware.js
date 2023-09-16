const jwt = require("jsonwebtoken");

function authenticateMiddleware(req, res, next) {
	if (!req.cookies) return res.sendStatus(401);
	const {accessToken} = req.cookies;
	if (!accessToken) return res.sendStatus(401);
	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(401);
		req.user = user;
		next();
	});
}

function checkSellerRoleMiddleware(req, res, next) {
	if (req.user.seller === false) return res.sendStatus(403);
	next();
}

module.exports = {
	authenticateMiddleware,
	checkSellerRoleMiddleware,
};
