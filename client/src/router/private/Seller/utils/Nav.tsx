import {HStack, Button} from "@chakra-ui/react";
import {Form} from "react-router-dom";

const Nav = () => {
	return (
		<Form>
			<HStack>
				<Button
					type="submit"
					name="intent"
					value="product"
					colorScheme="pink"
					variant="ghost"
					_hover={{bg: "transparent", textDecoration: "underline", transform: "scale(1.2)"}}
				>
					Products
				</Button>
				<Button
					type="submit"
					name="intent"
					value="order"
					colorScheme="pink"
					variant="ghost"
					_hover={{bg: "transparent", textDecoration: "underline", transform: "scale(1.2)"}}
				>
					Check Orders
				</Button>
			</HStack>
		</Form>
	);
};

export default Nav;
