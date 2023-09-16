import {baseURL} from "../constants/URL";
import {getCookie} from "./cookies";

export async function validate() {
	const response = await fetch(baseURL + "/auth/validate", {
		method: "get",
		credentials: "include",
	});
	if (response.ok) return true;
	return false;
}

export async function login({email, password}: {email: string; password: string}) {
	const response = await fetch(baseURL + "/auth/login", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	return response;
}

export async function logOut() {
	const response = await fetch(baseURL + "/auth/logout", {
		method: "delete",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refreshToken: getCookie("refreshToken") || "",
		}),
	});

	return response;
}
