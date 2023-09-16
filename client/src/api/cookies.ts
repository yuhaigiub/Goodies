import Cookies, {CookieSetOptions} from "universal-cookie";

const cookies = new Cookies(null, {
	path: "/",
});

export const getCookie = (key: string) => {
	return cookies.get(key);
};

export const setCookie = (key: string, value: string, options?: CookieSetOptions) => {
	cookies.set(key, value, {
		...options,
		path: "/",
		expires: new Date(Date.now() + 1000 * 60 * 10), // 10 mins
	});
};

export const removeCookie = (key: string) => {
	cookies.remove(key, {
		path: "/",
	});
};
