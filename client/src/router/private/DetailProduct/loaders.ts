import {ActionFunction, LoaderFunction} from "react-router-dom";
import {productQuery} from "../../../api/react-queries/product";
import {QueryClient} from "@tanstack/react-query";
import {updateProduct} from "../../../api/products";

export const detailProductLoader: (queryClient: QueryClient) => LoaderFunction =
	(queryClient) =>
	async ({params}) => {
		const id = params.id as string;
		const query = productQuery(id);
		return queryClient.getQueryData(query.queryKey) || null;
	};

export const detailProductAction: (queryClient: QueryClient) => ActionFunction =
	(queryClient) =>
	async ({params, request}) => {
		console.log("detailProductAction()");
		const id = params.id as string;
		const formData = await request.formData();
		const data = {
			name: formData.get("name") as string,
			unitPrice: parseInt(formData.get("unitPrice") as string),
			amount: parseInt(formData.get("amount") as string),
		};
		const response = await updateProduct(id, data);
		if (!response.ok) {
			throw new Error("Cannot update product");
		}

		queryClient.invalidateQueries({
			queryKey: ["product", id],
		});

		return null;
	};
