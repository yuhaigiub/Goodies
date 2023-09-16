import React from "react";
import {LoaderFunction, Outlet, redirect} from "react-router-dom";
import {validate} from "../api/authentication";

const PrivateLayout: React.FC = () => {
	return <Outlet />;
};

export default PrivateLayout;

export const privateLayoutLoader: LoaderFunction = async () => {
	console.log('privateLayoutLoader()');
	const isLoggedIn = await validate();
	if (!isLoggedIn) return redirect("/login");
	return null;
};
