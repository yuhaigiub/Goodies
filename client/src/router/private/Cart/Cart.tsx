import {Box, Card, CardBody, Heading} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";
import {User} from "../../../types";
import {useQuery} from "@tanstack/react-query";
import {userQuery} from "../../../api/react-queries/user";

const Cart = () => {
	const initialData = useLoaderData() as {user: User} | undefined;
	const query = useQuery({
		...userQuery(),
		initialData,
	});
	const cart = query.data?.user.cart;

	return (
		<Box>
			<Heading>Cart</Heading>
			<Card bg="white">
				<CardBody></CardBody>
			</Card>
		</Box>
	);
};

export default Cart;
