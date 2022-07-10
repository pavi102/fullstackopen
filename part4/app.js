const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => console.log("connected"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.errorHandler);
module.exports = app;
