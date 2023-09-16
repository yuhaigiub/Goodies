import {ActionFunction, redirect} from "react-router-dom";
import {CreateProductBody} from "../../../types";
import {createProduct} from "../../../api/products";

export const addProductAction: ActionFunction = async ({params, request}) => {
	const id = params.sellerId as string;
	const formData = await request.formData();
	const data = {
		name: formData.get("name"),
		unitPrice: parseInt(formData.get("unitPrice") as string),
		amount: parseInt(formData.get("amount") as string),
	} as CreateProductBody;

	const response = await createProduct(data);
	if (!response.ok) throw new Error("Cannot create product");
	return redirect(`/seller/${id}`);
};
