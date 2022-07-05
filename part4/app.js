const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => console.log("connected"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middleware.errorHandler);
module.exports = app;
