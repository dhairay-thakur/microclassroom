const express = require("express");

const studentsRoutes = require("./routes/students-routes");
const teachersRoutes = require("./routes/teachers-routes");
const subjectRoutes = require("./routes/subject-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use("/api/students", studentsRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/subject", subjectRoutes);

//if we get a request that we dont want to handle
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
