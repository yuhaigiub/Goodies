import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import Layout, {layoutLoader} from "./layout/Layout";
import ErrorElement from "./router/Error";
import {Box} from "@chakra-ui/react";

import Login, {loginLoader, loginAction} from "./router/public/Login";
import Home, {homeLoader} from "./router/public/Home";
import Product, {productLoader} from "./router/public/Product";
import Buyer, {buyerLoader, buyerAction} from "./router/private/Buyer";
import Seller, {sellerLoader} from "./router/private/Seller";
import {sellerAction} from "./router/private/Seller/loaders";
import AddProduct, {addProductAction} from "./router/private/AddProduct";
import DetailProduct, {detailProductAction, detailProductLoader} from "./router/private/DetailProduct";
import PrivateLayout, {privateLayoutLoader} from "./layout/PrivateLayout";
import Cart from "./router/private/Cart";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Layout />} loader={layoutLoader}>
				<Route index element={<Home />} errorElement={<ErrorElement />} loader={homeLoader(queryClient)} />
				<Route path="product">
					<Route path="view/:id" element={<Product />} loader={productLoader(queryClient)} />
					<Route element={<PrivateLayout />} loader={privateLayoutLoader}>
						<Route path="add/:sellerId" element={<AddProduct />} action={addProductAction} />
						<Route
							path="detail/:id"
							element={<DetailProduct />}
							action={detailProductAction(queryClient)}
							loader={detailProductLoader(queryClient)}
						/>
					</Route>
				</Route>
				<Route element={<PrivateLayout />} loader={privateLayoutLoader}>
					<Route path="buyer/:id" element={<Buyer />} action={buyerAction} loader={buyerLoader} />
					<Route
						path="seller/:id"
						element={<Seller />}
						action={sellerAction}
						loader={sellerLoader(queryClient)}
					/>
					<Route path="cart" element={<Cart />} />
				</Route>
			</Route>
			<Route path="login" element={<Login />} action={loginAction} loader={loginLoader} />
		</Route>
	)
);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Box h="100%" bg="gray.50">
				<RouterProvider router={router} />
			</Box>
		</QueryClientProvider>
	);
};

export default App;
