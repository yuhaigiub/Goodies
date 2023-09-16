const express = require("express");
const {authenticateMiddleware, checkSellerRoleMiddleware} = require("../utils/middleware");
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductsBelongToSeller,
} = require("../utils/product");
const router = express.Router();

router.get("/", (req, res) => {
	const products = getProducts();
	res.status(200).json({
		products,
	});
});

router.get("/seller", authenticateMiddleware, checkSellerRoleMiddleware, (req, res) => {
	const id = req.user.id;
	const products = getProductsBelongToSeller(id);
	return res.status(200).json({
		products,
	});
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const product = getProduct(id);
	if (product === null) {
		return res.sendStatus(404);
	}
	return res.status(200).json({
		product,
	});
});

router.post("/", authenticateMiddleware, checkSellerRoleMiddleware, (req, res) => {
	const {product} = req.body;
	const sellerId = req.user.id;
	if (!product) return res.sendStatus(404);

	const payload = createProduct(sellerId, product);
	return res.status(200).json(payload);
});

router.put("/:id", authenticateMiddleware, checkSellerRoleMiddleware, (req, res) => {
	const id = req.params.id;
	const sellerId = req.user.id;
	const {product} = req.body;
	if (!product) return res.sendStatus(404);

	const payload = updateProduct(id, sellerId, product);
	if (payload === null) return res.sendStatus(404);
	return res.status(200).json(payload);
});

router.delete("/:id", authenticateMiddleware, checkSellerRoleMiddleware, (req, res) => {
	const id = req.params.id;
	const sellerId = req.user.id;
	deleteProduct(sellerId, id);
	return res.sendStatus(204);
});

module.exports = router;
