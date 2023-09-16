import {useState} from "react";
import {VStack, Button, Heading, HStack} from "@chakra-ui/react";
import {Form, useLoaderData, Link, useActionData} from "react-router-dom";
import {User} from "../../../types";
import ControlledInputField from "../../../components/ControlledInputField";

const Buyer = () => {
	const [isUpdate, setIsUpdate] = useState(false);
	const actionData = useActionData() as {status: number; message: string} | undefined;
	if (actionData && actionData.status === 200 && isUpdate) setIsUpdate(false);

	const {user} = useLoaderData() as {user: User | undefined};

	return (
		<VStack w={{base: "90%", lg: "40%"}} mx="auto">
			<Heading>Profile</Heading>
			<Form style={{width: "100%"}} method="post" autoComplete="off">
				<VStack>
					<ControlledInputField
						name="email"
						isUpdate={isUpdate}
						value={user?.email}
						label="Email"
						type="email"
					/>
					<ControlledInputField
						name="password"
						isUpdate={isUpdate}
						value={user?.password}
						label="Password"
						type="password"
					/>
					{isUpdate ? (
						<HStack>
							<Button colorScheme="pink" variant="outline" onClick={() => setIsUpdate(false)}>
								Cancel
							</Button>
							<Button colorScheme="pink" type="submit">
								Update
							</Button>
						</HStack>
					) : (
						<Button colorScheme="pink" onClick={() => setIsUpdate(true)} w="100%" h="36px">
							Edit
						</Button>
					)}
					{user && (
						<>
							<Link to="/cart" style={{textDecoration: "underline", fontWeight: "bold"}}>
								Go to Cart
							</Link>
							<Link to={`/seller/${user.id}`} style={{textDecoration: "underline", fontWeight: "bold"}}>
								{user.seller
									? "Go to seller page"
									: `You didn't have a seller account yet! Create one!`}
							</Link>
						</>
					)}
				</VStack>
			</Form>
		</VStack>
	);
};

export default Buyer;
