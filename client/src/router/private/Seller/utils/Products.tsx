import {
	CardBody,
	Grid,
	Flex,
	Heading,
	Text,
	Spacer,
	Button,
	TableContainer,
	Table,
	Thead,
	Tbody,
	Tr,
	HStack,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {Product} from "../../../../types";
import {Tdr, Thr} from "../../../../components/TableComponents";

const Products: React.FC<Props> = ({id, products}) => {
	return (
		<CardBody h="100%">
			<Grid templateRows="2fr 8fr" h="100%" gap="12px">
				<Flex alignItems="center" borderBottom="1px" borderColor="pink.500">
					<Heading>Products</Heading>
					<Spacer />
					<Button colorScheme="pink" p="0">
						<Link
							to={`/product/add/${id}`}
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								paddingInline: "12px",
							}}
						>
							Add Product
						</Link>
					</Button>
				</Flex>
				{products && products.length > 0 && (
					<TableContainer h="100%" overflowY="auto" className="customScrollbar">
						<Table variant="striped" colorScheme="pink" bg="pink.50" position="sticky" top="0">
							<Thead bg="pink.500">
								<Tr>
									<Thr>Id</Thr>
									<Thr>Name</Thr>
									<Thr isNumeric>Amount</Thr>
									<Thr isNumeric>Bought</Thr>
									<Thr isNumeric>Price</Thr>
									<Thr></Thr>
								</Tr>
							</Thead>
							<Tbody>
								{products?.map((product) => {
									return (
										<Tr key={product.id}>
											<Tdr>{product.id}</Tdr>
											<Tdr>{product.name}</Tdr>
											<Tdr isNumeric>{product.amount}</Tdr>
											<Tdr isNumeric>{product.bought}</Tdr>
											<Tdr isNumeric>{product.unitPrice}</Tdr>
											<Tdr>
												<HStack spacing="20px" justifyContent="center">
													<Button
														variant="link"
														textDecor="underline"
														color="black"
														_hover={{color: "pink.500"}}
													>
														<Link to={`/product/detail/${product.id}`}>Edit</Link>
													</Button>
												</HStack>
											</Tdr>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				)}
				{(!products || products.length === 0) && (
					<Text fontSize="2rem" fontWeight="bold" opacity={0.5}>
						Oops! Looks Like you don't have any product.
					</Text>
				)}
			</Grid>
		</CardBody>
	);
};

export default Products;

interface Props {
	id: string;
	products: Product[] | undefined;
}
