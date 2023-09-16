import {LoaderFunction} from "react-router-dom";
import {QueryClient} from "@tanstack/react-query";
import {productsQuery} from "../../../api/react-queries/products";

export const homeLoader: (queryClient: QueryClient) => LoaderFunction = (queryClient: QueryClient) => async () => {
	const query = productsQuery();
	return queryClient.getQueryData(query.queryKey) || null;
};
