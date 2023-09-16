import {baseURL} from "../constants/URL";
import {User} from "../types";

export async function getUser() {
	const response = await fetch(baseURL + "/user", {
		method: "get",
		credentials: "include",
	});

	return response;
}

export async function updateUser(data: Partial<User>) {
	const response = await fetch(baseURL + "/user", {
		method: "put",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			newUser: data,
		}),
	});

	return response;
}

export async function createSellerAccount() {
	const response = await fetch(baseURL + "/user/seller", {
		method: "post",
		credentials: "include",
	});
	
	return response;
}
