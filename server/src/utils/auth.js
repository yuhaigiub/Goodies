const data = require("../test/data");
const jwt = require("jsonwebtoken");

function createAccessToken(payload) {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "10m",
	});
}

function createRefreshToken(payload) {
	const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
	data.refreshTokens.push(token);
	return token;
}

function renewAccessToken(refreshToken, res) {
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
		if (err) return res.sendStatus(401);
		const accessToken = createAccessToken(payload);
		return res.status(200).json({
			accessToken,
		});
	});
}

function isRefreshTokenExist(refreshToken) {
	return data.refreshTokens.findIndex((token) => token === refreshToken) !== -1;
}

function removeRefreshToken(refreshToken) {
	data.refreshTokens.filter((token) => token !== refreshToken);
}

module.exports = {
	createAccessToken,
	createRefreshToken,
	renewAccessToken,
	isRefreshTokenExist,
	removeRefreshToken,
};
