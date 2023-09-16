const data = require("../test/data");

function getProducts() {
	return data.products;
}

function getProduct(id) {
	const product = data.products.find((product) => product.id === id);
	return product || null;
}

function getProductsBelongToSeller(sellerId) {
	const products = data.products.filter((product) => product.sellerId === sellerId);
	return products;
}

function createProduct(sellerId, product) {
	const id = data.products.length;
	const newProduct = {
		...product,
		id,
		sellerId,
		bought: 0,
	};
	data.products.push(newProduct);
	return {
		product: newProduct,
	};
}

function updateProduct(id, sellerId, product) {
	const oldProduct = getProduct(id);
	if (oldProduct === null) return null;
	if (oldProduct.sellerId !== sellerId) return null;

	const newProduct = {
		...oldProduct,
		...product,
		id,
	};
	data.products = data.products.filter((product) => product.id !== id);
	data.products.push(newProduct);
	return {
		product: newProduct,
	};
}

function deleteProduct(sellerId, id) {
	data.products = data.products.filter((product) => {
		if (product.id !== id) return true;
		if (product.sellerId !== sellerId) return true;
		return false;
	});
}

module.exports = {
	getProducts,
	getProduct,
	getProductsBelongToSeller,
	createProduct,
	updateProduct,
	deleteProduct,
};
