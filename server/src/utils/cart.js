const {getUser} = require("./user");

function addProductToCart(userId, cartItem) {
	const user = getUser(userId);
	if (user === null) return null;
	const itemId = user.cart.length;
	const newCartItem = {
		...cartItem,
		id: itemId,
	};
	user.cart.push(newCartItem);
	return {
		item: newCartItem,
	};
}

function updateCartItem(userId, updateData) {
	const user = getUser(userId);
	if (user === null) return null;
	const newCartItem = {
		...updateData,
	};
	user.cart = user.cart.map((item) => {
		if (item.id === newCartItem.id) return newCartItem;
		return item;
	});
	return {
		item: newCartItem,
	};
}

function deleteCartItem(userId, itemId) {
	const user = getUser(userId);
	if (user === null) return false;
    user.cart = user.filter((item) => item.id !== itemId);
    return true;
}

module.exports = {
	addProductToCart,
	updateCartItem,
	deleteCartItem,
};
