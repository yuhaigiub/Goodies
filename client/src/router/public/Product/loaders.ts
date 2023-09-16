import {LoaderFunction} from "react-router-dom";
import {QueryClient} from "@tanstack/react-query";
import { productQuery } from "../../../api/react-queries/product";

export const productLoader: (queryClient: QueryClient) => LoaderFunction =
	(queryClient: QueryClient) =>
	async ({params}) => {
		const id = params.id as string;
		const query = productQuery(id);
		return queryClient.getQueryData(query.queryKey) || null;
	};
