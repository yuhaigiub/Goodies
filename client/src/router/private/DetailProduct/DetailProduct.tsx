import {Form, useLoaderData, useNavigate, useParams} from "react-router-dom";
import {Product} from "../../../types";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {productQuery} from "../../../api/react-queries/product";
import {Card, CardBody, Text, Skeleton, Heading, Flex, Divider, Button, Spacer, HStack} from "@chakra-ui/react";
import {formatCurrency} from "../../../api/utils";
import {useState} from "react";
import ControlledInputField from "../../../components/ControlledInputField";
import {deleteProduct} from "../../../api/products";

const DetailProduct = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {id} = useParams() as {id: string};
	const initialData = useLoaderData() as {product: Product} | undefined;
	const {data, isFetching} = useQuery({
		...productQuery(id),
		initialData,
	});
	const [isUpdate, setIsUpdate] = useState(false);

	return (
		<Card bg="white">
			<Form method="put">
				<CardBody>
					<Flex flexDir="column" gap="12px">
						<Skeleton isLoaded={!isFetching}>
							<Flex h="40px" alignItems="center">
								<Text>Id: {data?.product.id}</Text>
								<Spacer />
								<HStack>
									{isUpdate ? (
										<>
											<Button
												onClick={() => {
													setIsUpdate(false);
												}}
											>
												Cancel
											</Button>
											<Button colorScheme="pink" type="submit" name="intent" value="update">
												<div
													style={{
														width: "100%",
														height: "100%",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
													}}
													onClick={(e) => {
														e.preventDefault();
														setIsUpdate(false);
													}}
												>
													Update
												</div>
											</Button>
										</>
									) : (
										<>
											<Button
												colorScheme="pink"
												onClick={() => {
													setIsUpdate(true);
												}}
											>
												Edit
											</Button>
											<Button
												colorScheme="pink"
												variant="outline"
												onClick={async () => {
													if (!data) return;
													const response = await deleteProduct(data.product.id);
													if (!response.ok) throw new Error("cannot delete product");
													queryClient.setQueryData<Array<Product>>(
														["seller", "products"],
														(oldData) => {
															if (!oldData) return undefined;
															return oldData.filter(
																(product) => product.id !== data.product.id
															);
														}
													);
													queryClient.setQueryData<Array<Product>>(
														["products"],
														(oldData) => {
															if (!oldData) return undefined;
															return oldData.filter(
																(product) => product.id !== data.product.id
															);
														}
													);
													navigate(`/seller/${id}?intent=product`);
												}}
											>
												Delete
											</Button>
										</>
									)}
								</HStack>
							</Flex>
						</Skeleton>
						<Skeleton isLoaded={!isFetching}>
							{isUpdate ? (
								<ControlledInputField
									isUpdate={isUpdate}
									label="Name"
									name="name"
									initialValue={data?.product.name || ""}
								/>
							) : (
								<Heading as="p" h="40px">
									{data?.product.name}
								</Heading>
							)}
						</Skeleton>
						<Divider borderColor="pink.500" />
						<Skeleton isLoaded={!isFetching} w="fit-content">
							{isUpdate ? (
								<ControlledInputField
									isUpdate={isUpdate}
									label="Price"
									name="unitPrice"
									initialValue={data?.product.unitPrice.toString() || ""}
								/>
							) : (
								<Text w="320px">Price: {formatCurrency(data?.product.unitPrice || 0)}</Text>
							)}
						</Skeleton>
						<Skeleton isLoaded={!isFetching} w="fit-content">
							{isUpdate ? (
								<ControlledInputField
									isUpdate={isUpdate}
									label="Amount"
									name="amount"
									initialValue={data?.product.amount.toString() || ""}
								/>
							) : (
								<Text w="320px">Amount: {data?.product.amount}</Text>
							)}
						</Skeleton>
						<Skeleton isLoaded={!isFetching} w="fit-content">
							<Text w="320px">Bought: {data?.product.bought}</Text>
						</Skeleton>
					</Flex>
				</CardBody>
			</Form>
		</Card>
	);
};

export default DetailProduct;
