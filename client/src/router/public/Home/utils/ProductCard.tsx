import {
	Card,
	CardBody,
	Image,
	Stack,
	Heading,
	Text,
	Flex,
	CardFooter,
	Button,
	Divider,
	HStack,
	Skeleton,
	Box,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {Product} from "../../../../types";
import {formatCurrency} from "../../../../api/utils";

const ProductCard: React.FC<Props> = ({product, success}) => {
	const navigate = useNavigate();
	const disabled = product.amount <= 0;

	return (
		<Card
			as={motion.div}
			w="300px"
			aspectRatio="300/320"
			borderBottom="8px"
			borderColor="pink.400"
			bg="white"
			overflow="hidden"
			onClick={() => {
				if (disabled) return;
				navigate(`/product/view/${product.id}`);
			}}
			whileHover={{
				scale: 1.05,
			}}
			cursor={disabled ? "not-allowed" : "pointer"}
		>
			<CardBody pb="12px">
				<Skeleton isLoaded={success}>
					<Image src="unknown" bg="gray.100" w="280px" h="120px" mx="auto" />
				</Skeleton>
				<Stack gap="4px" mt="12px">
					<Flex alignItems="center" my="0" justify="space-between" gap="20px">
						<Skeleton isLoaded={success}>
							<Heading fontSize="2xl" my="0">
								{product.name}
							</Heading>
						</Skeleton>
						<Skeleton isLoaded={success}>
							<Text>Bought: {product.bought}</Text>
						</Skeleton>
					</Flex>

					<Skeleton isLoaded={success}>
						<Text fontSize="1.5rem" lineHeight="22px" color="blue.500" fontWeight="bold" my="0">
							{formatCurrency(product.unitPrice)}
						</Text>
					</Skeleton>
					<Skeleton isLoaded={success}>
						<Text>{product.amount} left in stock</Text>
					</Skeleton>
				</Stack>
			</CardBody>
			<Divider w="90%" mx="auto" />
			<CardFooter pt="16px">
				<Skeleton isLoaded={success}>
					<HStack>
						<Button
							colorScheme="pink"
							variant="outline"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							Buy now
						</Button>
						<Button
							colorScheme="pink"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							Add to cart
						</Button>
					</HStack>
				</Skeleton>
			</CardFooter>
			{disabled && <Box w="100%" h="100%" bg="blackAlpha.500" position="absolute"></Box>}
		</Card>
	);
};

export default ProductCard;

interface Props {
	product: Product;
	success: boolean;
}
