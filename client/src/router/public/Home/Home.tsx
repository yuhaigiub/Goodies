import {useLoaderData} from "react-router-dom";
import {Product} from "../../../types";
import {Wrap, WrapItem, Heading, Flex} from "@chakra-ui/react";
import ProductCard from "./utils/ProductCard";
import {useQuery} from "@tanstack/react-query";
import {productsQuery} from "../../../api/react-queries/products";

const productsPerFetch = 9;

const templateProduct: Product = {
	id: "",
	sellerId: "",
	name: "",
	unitPrice: 0,
	amount: 1,
	bought: 0,
};

const Home = () => {
	const initialData = useLoaderData() as {products: Product[]} | undefined;

	const {isFetching, data} = useQuery({
		...productsQuery(),
		initialData,
	});

	return (
		<Flex w="100%" flexDirection="column" alignItems="center" gap="24px">
			<Heading>Products</Heading>
			<Wrap w="100%" spacing="30px" justify="center">
				{isFetching && (
					<>
						{[...Array(productsPerFetch).keys()].map((index) => {
							return (
								<WrapItem key={index}>
									<ProductCard success={false} product={templateProduct} />
								</WrapItem>
							);
						})}
					</>
				)}
				{data && (
					<>
						{data.products.map((product) => {
							return (
								<WrapItem key={product.id}>
									<ProductCard success product={product} />
								</WrapItem>
							);
						})}
					</>
				)}
			</Wrap>
		</Flex>
	);
};

export default Home;
