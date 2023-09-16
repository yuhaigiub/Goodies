import {baseURL} from "../constants/URL";
import {CreateProductBody, Product} from "../types";

export async function getProducts() {
	const response = await fetch(baseURL + "/product", {
		method: "get",
	});

	return response;
}

export async function getProduct(id: string) {
	const response = await fetch(baseURL + `/product/${id}`);

	return response;
}

export async function getSellerProducts() {
	const response = await fetch(baseURL + `/product/seller`, {
		method: "get",
		credentials: "include",
	});

	return response;
}

export async function createProduct(data: CreateProductBody) {
	const response = await fetch(baseURL + `/product`, {
		method: "post",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({product: data}),
	});

	return response;
}

export async function updateProduct(id: string, data: Partial<Product>) {
	const response = await fetch(baseURL + `/product/${id}`, {
		method: "put",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			product: data,
		}),
	});
	return response;
}

export async function deleteProduct(id: string) {
	const response = await fetch(baseURL + `/product/${id}`, {
		method: "delete",
		credentials: "include",
	});

	return response;
}
