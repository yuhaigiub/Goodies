import {useLoaderData, useParams} from "react-router-dom";
import {Product} from "../../../types";
import {
	Card,
	CardBody,
	Grid,
	GridItem,
	Image,
	VStack,
	HStack,
	Text,
	Heading,
	Spacer,
	Flex,
	useNumberInput,
	Button,
	Input,
	CardFooter,
	Divider,
	Skeleton,
} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {useQuery} from "@tanstack/react-query";
import {productQuery} from "../../../api/react-queries/product";

const Product = () => {
	const {id} = useParams() as {id: string};
	const initialData = useLoaderData() as {product: Product} | undefined;
	const {data, isFetching} = useQuery({
		...productQuery(id),
		initialData,
	});

	const {getInputProps, getIncrementButtonProps, getDecrementButtonProps} = useNumberInput({
		step: 1,
		defaultValue: 0,
		min: 0,
		max: (data?.product.amount || 0) - (data?.product.bought || 0),
	});
	const increment = getIncrementButtonProps();
	const decrement = getDecrementButtonProps();
	const input = getInputProps();

	return (
		<VStack spacing="12px" w="1200px" mx="auto">
			<Grid w="100%" gap={4} h="400px" templateColumns="repeat(10, 1fr)">
				<GridItem colSpan={3}>
					<Image w="100%" h="100%" src="unknown" bg="gray.300" alt="Image not implemented" />
				</GridItem>
				<GridItem colSpan={7} bg="white">
					<Card h="100%">
						<CardBody display="flex" flexDirection="column" gap="12px">
							<Skeleton isLoaded={!isFetching}>
								<Heading fontSize="2.5rem" h="40px" fontWeight="semibold">
									{data?.product.name}
								</Heading>
							</Skeleton>
							<Divider borderColor="pink.500" mt="4px" />
							<Flex className="priceContainer" alignItems="center" py="4px">
								<Skeleton isLoaded={!isFetching} minW="260px">
									<Text fontSize="1.75rem" fontWeight="semibold">
										{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
											data?.product.unitPrice || 0
										)}
									</Text>
								</Skeleton>
								<Spacer />
								<Skeleton isLoaded={!isFetching}>
									<Text fontSize="1.25rem">
										Bought:{" "}
										<Text as="span" fontWeight="bold">
											{data?.product.bought}
										</Text>
									</Text>
								</Skeleton>
							</Flex>
							<Skeleton isLoaded={!isFetching} w="fit-content">
								<HStack className="amountSelect">
									<Text fontSize="1.25rem">Amount: </Text>
									<Button {...decrement} colorScheme="pink" h="30px">
										<MinusIcon />
									</Button>
									<Input
										{...input}
										textAlign="center"
										w="64px"
										h="30px"
										borderColor="pink.400"
										focusBorderColor="pink.600"
										type="number"
									/>
									<Button {...increment} colorScheme="pink" h="30px">
										<AddIcon />
									</Button>
								</HStack>
							</Skeleton>
						</CardBody>
						<Divider w="95%" mx="auto" borderColor="pink.400" />
						<CardFooter>
							<Skeleton isLoaded={!isFetching}>
								<HStack>
									<Button colorScheme="pink" variant="outline">
										Buy now
									</Button>
									<Button colorScheme="pink">Add to cart</Button>
								</HStack>
							</Skeleton>
						</CardFooter>
					</Card>
				</GridItem>
			</Grid>
			<Card w="100%" p="12px" h="200px"></Card>
		</VStack>
	);
};

export default Product;
