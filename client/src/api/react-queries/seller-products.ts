import {Product} from "../../types";
import {getSellerProducts} from "../products";

export const sellerProductsQuery = () => ({
	queryKey: ["seller, products"],
	queryFn: async () => {
		const response = await getSellerProducts();
		if (!response.ok) throw new Error("Error on seller product");
		const json = await response.json();
		return json as {
			products: Product[];
		};
	},
});
