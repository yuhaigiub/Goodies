const data = require("../test/data");

function getOrderBelongToBuyer(buyerId) {
	const orders = data.orders.filter((order) => order.buyerId === buyerId);
	return orders;
}

function getOrderBelongToSeller(sellerId) {
	const orders = data.orders.filter((order) => order.sellerId === sellerId);
	return orders;
}

function getOrder(id) {
	const order = data.orders.find((order) => order.id === id);
	return order || null;
}

function createOrder(buyerId, order) {
	const id = data.orders.length;
	const newOrder = {...order, id, buyerId, status: "pending"};
	data.orders.push(newOrder);
	return {
		order: newOrder,
	};
}

function updateOrderStatus(id, status) {
	const order = data.orders.find((order) => order.id === id) || null;
	if (order === null) return null;
	order.status = status;
	data.orders = data.orders.filter((order) => order.id !== id);
	data.orders.push(order);
	return {
		order,
	};
}

function deleteOrder(id) {
	data.orders = data.orders.filter((order) => order.id !== id);
}

module.exports = {
	getOrderBelongToBuyer,
	getOrderBelongToSeller,
	createOrder,
	updateOrderStatus,
	deleteOrder,
	getOrder,
};
