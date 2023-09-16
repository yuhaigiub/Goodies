import {Order} from "../../types";
import {getSellerOrders} from "../orders";

export const sellerOrdersQuery = () => ({
	queryKey: ["seller", "orders"],
	queryFn: async () => {
		const response = await getSellerOrders();
		if (!response.ok) throw new Error("Error on seller order");
		const json = await response.json();
		return json as {
			orders: Order[];
		};
	},
});
