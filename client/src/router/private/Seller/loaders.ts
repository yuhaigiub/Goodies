import {ActionFunction, LoaderFunction, redirect} from "react-router-dom";
import {createSellerAccount} from "../../../api/users";
import {setCookie} from "../../../api/cookies";
import {userQuery} from "../../../api/react-queries/user";
import {QueryClient} from "@tanstack/react-query";
import {sellerProductsQuery} from "../../../api/react-queries/seller-products";
import {Order, Product, User} from "../../../types";
import {sellerOrdersQuery} from "../../../api/react-queries/seller-orders";

export interface SellerLoaderReturnType {
	user: User | undefined;
	products: Product[] | undefined;
	orders: Order[] | undefined;
}

export const sellerLoader: (queryClient: QueryClient) => LoaderFunction =
	(queryClient: QueryClient) =>
	async ({request}) => {
		const url = new URL(request.url);
		const intent = url.searchParams.get("intent") || "";
		const result = {} as SellerLoaderReturnType;

		const userQ = userQuery();
		result.user = queryClient.getQueryData(userQ.queryKey);

		if (intent === "product") {
			const productsQ = sellerProductsQuery();
			result.products = queryClient.getQueryData(productsQ.queryKey);
		}

		if (intent === "order") {
			const ordersQ = sellerOrdersQuery();
			result.orders = queryClient.getQueryData(ordersQ.queryKey);
		}

		return result;
	};

export const sellerAction: ActionFunction = async ({request}) => {
	const response = await createSellerAccount();
	if (!response.ok) {
		if (response.status === 401) return redirect("/login");
		return {
			status: "404",
			message: "Cannot create Seller Account",
		};
	}
	const json = await response.json();
	setCookie("accessToken", json.accessToken);
	setCookie("refreshToken", json.refreshToken);

	const url = new URL(request.url);
	return redirect(url.pathname);
};
