import {redirect, ActionFunction, LoaderFunction} from "react-router-dom";
import {login, validate} from "../../../api/authentication";
import {setCookie} from "../../../api/cookies";
import {InferType, ValidationError, object, string} from "yup";

const schema = object({
	password: string().min(1).required(),
	email: string().email().required(),
});

export const loginAction: ActionFunction = async ({request}) => {
	const formData = await request.formData();
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	} as InferType<typeof schema>;

	// form validation
	try {
		await schema.validate(data);
	} catch (err) {
		if (err instanceof ValidationError) {
			console.log(err.path);
			return {
				field: err.path,
				message: err.message,
			};
		}
	}

	const response = await login(data);
	const json = await response.json();

	if (!response.ok) {
		return json;
	}

	setCookie("accessToken", json.accessToken);
	setCookie("refreshToken", json.refreshToken);

	return redirect("/");
};

export const loginLoader: LoaderFunction = async () => {
	const isLoggedIn = await validate();
	if (!isLoggedIn) return null;
	return redirect("/");
};
