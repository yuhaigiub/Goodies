const devURL = "http://localhost:3000";
const prodURL = "";
export const baseURL = import.meta.env.DEV ? devURL : prodURL;
