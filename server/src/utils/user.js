const data = require("../test/data");
const {createAccessToken} = require("./auth");

function getUserWithEmail(email) {
	const user = data.users.find((user) => user.email === email);
	return user || null;
}

function getUserWithEmailAndPassword(email, password) {
	const user = data.users.find((user) => user.email === email && user.password === password);
	return user || null;
}

function getUser(id) {
	const user = data.users.find((user) => user.id === id);
	return user || null;
}

function createUser(user) {
	const id = data.users.length;
	const newUser = {
		...user,
		id,
		seller: false,
	};
	data.users.push(newUser);
	return {
		user: newUser,
	};
}

function updateUser(id, user) {
	const oldUser = getUser(id);
	if (oldUser === null) return null;

	const newUser = {
		...oldUser,
		...user,
		id,
	};
	data.users = data.users.filter((user) => user.id !== id);
	data.users.push(newUser);

	const newPayload = {
		id,
		email: newUser.email,
		seller: newUser.seller,
	};
	const newAccessToken = createAccessToken(newPayload);
	return newUser;
}

function deleteUser(id) {
	data.users = data.users.filter((user) => user.id !== id);
}

function setSellerRole(id, seller) {
	data.users = data.users.map((user) => {
		if (user.id !== id) return user;
		return {
			...user,
			seller,
		};
	});
}



module.exports = {
	getUserWithEmail,
	getUserWithEmailAndPassword,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	setSellerRole,
};
