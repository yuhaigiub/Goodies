import {Product} from "../../types";
import {getProduct} from "../products";
// import {timeOut} from "../utils";

export const productQuery = (id: string) => ({
	queryKey: ["product", id],
	queryFn: async () => {
		console.log("productQuery()");
		const response = await getProduct(id);
		if (!response.ok) throw new Error("Error happen when trying to get product data");
		// const [json] = await Promise.all([response.json(), timeOut(3000)]);
		const json = await response.json();
		return json as {
			product: Product;
		};
	},
});
