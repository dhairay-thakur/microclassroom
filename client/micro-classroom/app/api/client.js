import { create } from "apisauce";
// import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://172.17.59.204:5000/api",
});

// apiClient.addAsyncRequestTransform(async (request) => {
//   const authToken = await authStorage.getToken();
//   if (!authToken) return;
//   request.headers["authorization"] = authToken;
// });

export default apiClient;