import {CardBody, Grid, Heading, HStack, Text, Button, TableContainer, Table, Thead, Tbody, Tr} from "@chakra-ui/react";
import {Order} from "../../../../types";
import {Tdr, Thr} from "../../../../components/TableComponents";

const clampString = (str: string, maxLength = 20) => {
	if (str.length <= maxLength) return str;
	return str.substring(0, maxLength - 3) + "...";
};

const Orders: React.FC<Props> = ({orders}) => {
	return (
		<CardBody>
			<Grid templateRows="2fr 8fr" h="100%" gap="12px">
				<Heading borderBottom="1px" borderColor="pink.500">
					Orders
				</Heading>
				{orders && orders.length > 0 && (
					<TableContainer h="100%" overflowY="auto" className="customScrollbar">
						<Table variant="striped" colorScheme="pink" bg="pink.50" position="sticky" top="0">
							<Thead bg="pink.500">
								<Tr>
									<Thr>Id</Thr>
									<Thr>Status</Thr>
									<Thr isNumeric>Amount</Thr>
									<Thr>Buyer Id</Thr>
									<Thr>Address</Thr>
									<Thr></Thr>
								</Tr>
							</Thead>
							<Tbody>
								{orders?.map((order) => {
									return (
										<Tr key={order.id}>
											<Tdr>{order.id}</Tdr>
											<Tdr>{order.status}</Tdr>
											<Tdr isNumeric>{order.amount}</Tdr>
											<Tdr>{order.buyerId}</Tdr>
											<Tdr>{clampString(order.address)}</Tdr>
											<Tdr>
												<HStack spacing="20px" justifyContent="center">
													<Button
														variant="link"
														textDecor="underline"
														color="black"
														_hover={{ color: "pink.500" }}
														onClick={() => {
															
														}}
													>
														Confirm
													</Button>
													<Button
														variant="link"
														textDecor="underline"
														color="black"
														_hover={{color: "pink.500"}}
													>
														Delete
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

				{(!orders || orders.length === 0) && (
					<Text fontSize="2rem" fontWeight="bold" opacity={0.5}>
						Oops! Looks Like you don't have any orders.
					</Text>
				)}
			</Grid>
		</CardBody>
	);
};

export default Orders;

interface Props {
	orders: Order[] | undefined;
}
