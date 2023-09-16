import {Center, Heading, Button, Flex} from "@chakra-ui/react";
import {Form, useActionData} from "react-router-dom";
import InputField from "../../../components/InputField";

const Login = () => {
	const data = useActionData() as {field: string; message: string} | undefined;

	return (
		<Center h="100vh" flexDirection="column" w={{base: "100vw"}}>
			<Heading fontSize="4xl" mb="24px">
				Login
			</Heading>
			<Form autoComplete="off" method="post" noValidate style={{width: "100%"}}>
				<Flex direction="column" gap="12px" w={{base: "80%", lg: "25%"}} mx="auto">
					<InputField
						name="email"
						type="email"
						placeholder="Email"
						label="Email"
						isRequired={true}
						isInvalid={data?.field === "email"}
						errorMessage={data?.message || ""}
					/>
					<InputField
						name="password"
						type="password"
						placeholder="Password"
						label="Password"
						isRequired={true}
						isInvalid={data?.field === "password"}
						errorMessage={data?.message || ""}
					/>
					<Button w="100%" type="submit" colorScheme="pink">
						Login
					</Button>
				</Flex>
			</Form>
		</Center>
	);
};

export default Login;
