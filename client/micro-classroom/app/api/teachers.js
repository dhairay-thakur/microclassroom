import client from "./client";

const endpoint = "/teachers";

const getTeacherById = (id) => client.get(endpoint + "/" + id);

const getScheduleById = (id) => client.get(endpoint + "/schedule/" + id);

export default {
  getTeacherById,
  getScheduleById,
};
