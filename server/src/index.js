const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const orderRoute = require("./router/order");
const productRoute = require("./router/product");

const PORT = process.env.PORT;
const corsOrigin = ["http://localhost:5173"];

const app = express();
app.use(
	cors({
		origin: corsOrigin,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
