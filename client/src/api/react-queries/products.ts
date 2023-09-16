import {Product} from "../../types";
import {getProducts} from "../products";
// import {timeOut} from "../utils";

export const productsQuery = () => ({
	queryKey: ["product"],
	queryFn: async () => {
		const response = await getProducts();
		if (!response.ok) {
			throw new Error("Something went wrong when getting product data");
		}
		// const [json] = await Promise.all([response.json(), timeOut(3000)]);
		const json = await response.json();

		return json as {
			products: Product[];
		};
	},
});
