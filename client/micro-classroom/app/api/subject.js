import client from "./client";

const endpoint = "/subject";

const createClass = (classDetails, teacherId) => {
  const newClassDetails = {
    ...classDetails,
    teacher: teacherId,
    attendees: [],
    schedule: [[], [], [], [], [], [], []],
  };
  return client.post(endpoint, newClassDetails);
};

const editClass = (classDetails, subjectId) => {
  return client.patch(endpoint + "/" + subjectId, { ...classDetails });
};

const updateSchedule = (schedule, subjectId, maxCapacity, numStudents) => {
  let scheduleArray = [];
  for (let i = "0"; i < "7"; i++) {
    if (schedule[i].length > 2) {
      scheduleArray.push([schedule[i][0], schedule[i][1]]);
    } else scheduleArray.push(schedule[i]);
  }
  let start = 0;
  for (let i = 0; i < 7; i++) {
    if (scheduleArray[i].length > 0) {
      scheduleArray[i].push(start);
      start += maxCapacity;
      start %= numStudents;
    }
  }
  return client.patch(endpoint + "/" + subjectId, { schedule: scheduleArray });
};

const joinClass = (studentId, subjectId) => {
  const data = { studentId };
  return client.patch(endpoint + "/join/" + subjectId, data);
};

export default {
  joinClass,
  createClass,
  updateSchedule,
  editClass,
};
