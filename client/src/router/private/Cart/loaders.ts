import {QueryClient} from "@tanstack/react-query";
import {LoaderFunction} from "react-router-dom";
import { userQuery } from "../../../api/react-queries/user";

export const cartLoader: (queryClient: QueryClient) => LoaderFunction = (queryClient) => () => {
    const query = userQuery();
    return queryClient.getQueryData(query.queryKey) || null;
};
