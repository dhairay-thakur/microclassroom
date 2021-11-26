import client from "./client";

const endpoint = "/students";

const getStudentById = (id) => client.get(endpoint + "/" + id);

const getScheduleById = (id) => client.get(endpoint + "/schedule/" + id);

export default {
  getStudentById,
  getScheduleById
};
