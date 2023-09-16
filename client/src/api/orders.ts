import {baseURL} from "../constants/URL";

export async function getSellerOrders() {
	const response = await fetch(baseURL + `/order/seller`, {
		method: "get",
		credentials: "include",
	});

	return response;
}
