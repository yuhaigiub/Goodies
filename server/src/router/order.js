const express = require("express");
const {authenticateMiddleware, checkSellerRoleMiddleware} = require("../utils/middleware");
const {
	getOrderBelongToBuyer,
	getOrderBelongToSeller,
	getOrder,
	createOrder,
	updateOrderStatus,
} = require("../utils/order");
const router = express.Router();

router.get("/", authenticateMiddleware, (req, res) => {
	const {role} = req.body;
	const id = req.user.id;
	if (!role) return res.sendStatus(404);

	let orders;
	if (role === "seller") {
		if (req.user.seller === false) return res.sendStatus(403);
		orders = getOrderBelongToSeller(id);
	}
	if (role === "buyer") {
		orders = getOrderBelongToBuyer(id);
	}

	return res.status(200).json({
		orders,
	});
});

router.get("/seller", authenticateMiddleware, checkSellerRoleMiddleware, (req, res) => {
	const id = req.user.id;
	const orders = getOrderBelongToSeller(id);
	return res.status(200).json({
		orders,
	});
});

router.get("/:id", authenticateMiddleware, (req, res) => {
	const id = req.params.id;
	const order = getOrder(id);
	if (order === null) return res.sendStatus(404);
	if (order.buyerId !== req.user.id && order.sellerId !== req.user.id) return res.sendStatus(403);
	return res.status(200).json({
		order,
	});
});

router.post("/", authenticateMiddleware, (req, res) => {
	const id = req.user.id;
	const {order} = req.body;
	if (!order) return res.sendStatus(404);

	const payload = createOrder(id, order);
	return res.status(200).json(payload);
});

router.put("/status/:id", authenticateMiddleware, (req, res) => {
	const id = req.params.id;
	const {status} = req.body;
	if (!status) return res.sendStatus(404);

	const payload = updateOrderStatus(id, status);
	if (payload === null) return res.sendStatus(404);
	return res.status(200).json(payload);
});

router.delete("/:id", authenticateMiddleware, (req, res) => {
	// TODO: if status === shipping then cannot cancel
});

module.exports = router;
