import client from "./client";

const endpoint = "/students";

const getStudentById = (id) => client.get(endpoint + "/" + id);

const getScheduleById = (id) => client.get(endpoint + "/schedule/" + id);

const login = (email, password) =>
  client.post(endpoint + "/login", { email, password });

const register = (userInfo) => client.post(endpoint + "/signup", userInfo);

export default {
  getStudentById,
  getScheduleById,
  login,
  register,
};
