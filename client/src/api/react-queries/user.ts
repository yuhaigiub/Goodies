import {User} from "../../types";
import {getUser} from "../users";

export const userQuery = () => ({
	queryKey: ["user"],
	queryFn: async () => {
		console.log("userQuery()");
		const response = await getUser();
		if (!response.ok) throw new Error("Error on user");
		// const [json] = await Promise.all([response.json(), timeOut(3000)]);
		const json = await response.json();
		return json as {
			user: User;
		};
	},
});
