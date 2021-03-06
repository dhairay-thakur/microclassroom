const express = require("express");
const mongoose = require("mongoose");

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

mongoose
  .connect(
    "mongodb://dhairay:LAnej5doJIMuoWpH@cluster0-shard-00-00.minpp.mongodb.net:27017,cluster0-shard-00-01.minpp.mongodb.net:27017,cluster0-shard-00-02.minpp.mongodb.net:27017/subjects?ssl=true&replicaSet=atlas-x4dsc5-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((error) => console.log(error));
