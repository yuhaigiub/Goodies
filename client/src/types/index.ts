export interface CreateProductBody {
	name: string;
	unitPrice: number;
	amount: number;
}

export interface Product {
	id: string;
	sellerId: string;
	name: string;
	unitPrice: number;
	amount: number;
	bought: number;
}

export interface User {
	id: string;
	email: string;
	password: string;
	seller: boolean;
}

export interface Order {
	id: string;
	buyerId: string;
	sellerId: string;
	productId: string;
	amount: number;
	status: string;
	address: string;
}
