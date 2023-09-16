const express = require("express");
const {authenticateMiddleware} = require("../utils/middleware");
const {getUser, updateUser, deleteUser, setSellerRole} = require("../utils/user");
const {createAccessToken, createRefreshToken, removeRefreshToken} = require("../utils/auth");
const router = express.Router();

router.use(authenticateMiddleware);

router.get("/", (req, res) => {
	const id = req.user.id;
	const user = getUser(id);
	if (user === null) return res.sendStatus(404);
	return res.status(200).json({
		user,
	});
});

router.post("/seller", (req, res) => {
	if (!req.cookies) return res.sendStatus(401);
	const {refreshToken} = req.cookies;

	const id = req.user.id;
	setSellerRole(id, true);
	const payload = {
		id: req.user.id,
		email: req.user.email,
		seller: true,
	};
	removeRefreshToken(refreshToken);

	return res.status(200).json({
		accessToken: createAccessToken(payload),
		refreshToken: createRefreshToken(payload),
	});
});

router.put("/", (req, res) => {
	const id = req.user.id;
	const {newUser} = req.body;
	if (!newUser) return res.sendStatus(404);

	const user = updateUser(id, newUser);
	if (user === null) return res.sendStatus(404);

	if (!req.cookies) return res.sendStatus(401);
	const {refreshToken} = req.cookies;
	removeRefreshToken(refreshToken);
	const payload = {
		id: user.id,
		email: user.email,
		seller: user.seller,
	};

	return res.status(200).json({
		accessToken: createAccessToken(payload),
		refreshToken: createRefreshToken(payload),
	});
});

router.delete("/", (req, res) => {
	const id = req.user.id;
	deleteUser(id);
	return res.sendStatus(200);
});

module.exports = router;
