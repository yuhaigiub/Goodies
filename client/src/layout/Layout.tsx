import {LoaderFunction, Outlet, useLoaderData, Link} from "react-router-dom";
import {Flex, Box, Spacer, HStack, Heading, Button, Text} from "@chakra-ui/react";
import {getUser} from "../api/users";
import {User} from "../types";
import {logOut} from "../api/authentication";
import {removeCookie} from "../api/cookies";

const Layout = () => {
	const data = useLoaderData() as {user: User} | null;

	const handleLogOut = async () => {
		await logOut();
		removeCookie("refreshToken");
		removeCookie("accessToken");
		window.location.href = "/";
	};

	return (
		<Box minH="100vh">
			<Flex as="header" bg="pink.400" h="60px" px="5" alignItems="center">
				<Heading fontSize="lg">
					<Link to="/">Goodies</Link>
				</Heading>
				<Spacer />
				<Box display={{base: "none", md: "block"}}>
					{data ? (
						<HStack>
							<Text>
								Hello{" "}
								<Text
									as="span"
									_hover={{
										textDecor: "underline",
										color: "blue.800",
									}}
									fontWeight="bold"
								>
									<Link to={`/buyer/${data.user.id}`}>{data.user.email}</Link>
								</Text>
							</Text>
							<Button onClick={handleLogOut} h="32px">
								LogOut
							</Button>
						</HStack>
					) : (
						<Button p={0} h="32px">
							<Link
								to="/login"
								style={{
									width: "100%",
									height: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									paddingInline: "12px",
								}}
							>
								Login
							</Link>
						</Button>
					)}
				</Box>
				<Box display={{base: "block", md: "none"}}>
					{data ? (
						<HStack>
							<Button p={0} h="32px">
								<Link
									to={`/buyer/${data.user.id}`}
									style={{
										width: "100%",
										height: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										paddingInline: "12px",
									}}
								>
									Profile
								</Link>
							</Button>
							<Button onClick={handleLogOut} h="32px">
								LogOut
							</Button>
						</HStack>
					) : (
						<Button p={0} h="32px">
							<Link
								to="/login"
								style={{
									width: "100%",
									height: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									paddingInline: "12px",
								}}
							>
								Login
							</Link>
						</Button>
					)}
				</Box>
			</Flex>
			<Box px={{base: "4px", lg: "120px"}} py="48px">
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;

export const layoutLoader: LoaderFunction = async () => {
	console.log("layoutLoader()");
	const response = await getUser();
	if (!response.ok) return null;
	const json = await response.json();
	return json;
};
