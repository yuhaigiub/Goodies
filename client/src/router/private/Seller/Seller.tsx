import {Form, useLoaderData, useLocation, useParams} from "react-router-dom";
import {Box, Button, Card, Center} from "@chakra-ui/react";
import Orders from "./utils/Orders";
import Products from "./utils/Products";
import Nav from "./utils/Nav";
import Empty from "./utils/Empty";
import {useQuery} from "@tanstack/react-query";
import {userQuery} from "../../../api/react-queries/user";
import {SellerLoaderReturnType} from "./loaders";
import {sellerOrdersQuery} from "../../../api/react-queries/seller-orders";
import {sellerProductsQuery} from "../../../api/react-queries/seller-products";

const Seller = () => {
	const {id} = useParams() as {id: string};
	const loaderData = useLoaderData() as SellerLoaderReturnType;

	const userQueryResult = useQuery({
		...userQuery(),
		initialData: {user: loaderData.user},
	});
	const productsQueryResult = useQuery({
		...sellerProductsQuery(),
		initialData: {products: loaderData.products},
	});
	const ordersQueryResult = useQuery({
		...sellerOrdersQuery(),
		initialData: {orders: loaderData.orders},
	});

	const user = userQueryResult.data?.user;
	const products = productsQueryResult.data?.products;
	const orders = ordersQueryResult.data?.orders;

	const isSeller = user?.seller;
	const location = useLocation();
	const tab = (new URLSearchParams(location.search).get("intent") || "") as "product" | "order" | "";

	return (
		<Box>
			{isSeller ? (
				<Box display="flex" flexDirection="column" gap="12px">
					<Nav />
					<Card w="100%" h="45vh" overflow="auto" bg="white">
						{tab === "" && <Empty />}
						{tab === "product" && <Products id={id} products={products} />}
						{tab === "order" && <Orders orders={orders} />}
					</Card>
				</Box>
			) : (
				<Center>
					<Form method="post">
						<Button type="submit" name="intent" value="createAccount" colorScheme="pink">
							Create your seller account
						</Button>
					</Form>
				</Center>
			)}
		</Box>
	);
};

export default Seller;
