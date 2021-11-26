import client from "./client";

const endpoint = "/teachers";

const getTeacherById = (id) => client.get(endpoint + "/" + id);

const getScheduleById = (id) => client.get(endpoint + "/schedule/" + id);

const login = (email, password) => {
  return client.post(endpoint + "/login", { email, password });
};

const register = (userInfo) => client.post(endpoint + "/signup", userInfo);

export default {
  getTeacherById,
  getScheduleById,
  login,
  register,
};
