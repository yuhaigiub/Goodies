import React from "react";
import ReactDOM from "react-dom/client";

import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import App from "./App.tsx";
import "./scss/index.scss";
import {chakraTheme} from "./constants/theme.ts";

const theme = extendTheme(chakraTheme);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
