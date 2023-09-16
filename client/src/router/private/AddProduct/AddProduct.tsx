import {Card, CardBody, CardHeader, Heading, VStack, Button} from "@chakra-ui/react";
import {Form} from "react-router-dom";
import InputField from "../../../components/InputField";

const AddProduct = () => {
	return (
		<Card w={{base: "99%", lg: "40%"}} mx="auto">
			<CardHeader>
				<Heading textAlign="center">Add Product</Heading>
			</CardHeader>
			<CardBody>
				<Form method="post">
					<VStack>
						<InputField name="name" placeholder="Item Name" label="Name" isRequired />
						<InputField name="unitPrice" placeholder="Item Price" label="Price" isRequired />
						<InputField name="amount" placeholder="Sold Amount" label="Amount" isRequired />
						<Button colorScheme="pink" type="submit">
							Confirm
						</Button>
					</VStack>
				</Form>
			</CardBody>
		</Card>
	);
};

export default AddProduct;
