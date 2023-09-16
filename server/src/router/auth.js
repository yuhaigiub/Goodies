const {
	createAccessToken,
	createRefreshToken,
	renewAccessToken,
	isRefreshTokenExist,
	removeRefreshToken,
} = require("../utils/auth");
const {authenticateMiddleware} = require("../utils/middleware");
const {getUserWithEmail, createUser} = require("../utils/user");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
	const {email, password} = req.body;
	const user = getUserWithEmail(email, password);
	if (user === null) {
		return res.status(404).json({
			field: "email",
			message: "Email not found",
		});
	}
	if (user.password !== password) {
		return res.status(404).json({
			field: "password",
			message: "Incorrect password",
		});
	}

	const payload = {
		id: user.id,
		email: user.email,
		seller: user.seller,
	};
	const accessToken = createAccessToken(payload);
	const refreshToken = createRefreshToken(payload);

	return res.status(200).json({
		accessToken,
		refreshToken,
	});
});

router.post("/register", (req, res) => {
	const {userWithoutId} = req.body;
	createUser(userWithoutId);
	req.sendStatus(204);
});

router.post("/refresh", (req, res) => {
	const {refreshToken} = req.body;
	if (!refreshToken) return res.sendStatus(401);
	if (!isRefreshTokenExist(refreshToken)) res.sendStatus(401);
	return renewAccessToken();
});

router.get("/validate", authenticateMiddleware, (req, res) => {
	return res.sendStatus(200);
});

router.delete("/logout", (req, res) => {
	const {refreshToken} = req.body;
	removeRefreshToken(refreshToken);
	res.sendStatus(204);
});

module.exports = router;
