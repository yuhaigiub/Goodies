import {ActionFunction, LoaderFunction, redirect} from "react-router-dom";
import {validate} from "../../../api/authentication";
import {getUser, updateUser} from "../../../api/users";

export const buyerLoader: LoaderFunction = async () => {
	const isLoggedIn = await validate();
	if (!isLoggedIn) return redirect("/login");

	const response = await getUser();
	if (!response.ok) return null;
	return response;
};

export const buyerAction: ActionFunction = async ({request}) => {
	const formData = await request.formData();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};
	const response = await updateUser(data);
	console.log(response.status);
	if (!response.ok) {
		if (response.status === 401) return redirect("/login");

		return {
			status: 404,
			message: "Fail to update user information. Please try again later",
		};
	}

	return {
		status: 200,
		message: "Success",
	};
};
