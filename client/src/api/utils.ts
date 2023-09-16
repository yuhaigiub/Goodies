export const timeOut = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatCurrency = (s: number) => {
	return new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(s);
};
