import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "https://micro-classroom.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["authorization"] = authToken;
});

export default apiClient;
