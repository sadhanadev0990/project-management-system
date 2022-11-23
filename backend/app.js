const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require('dotenv');
const cors = require("cors");
const userRouter = require('./routes/UserRoutes');
const projectRouter = require('./routes/ProjectRoutes');
const globalErrorHandler = require('./controllers/ErrorController');

const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", ['http://localhost:8080']);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
  "Access-Control-Allow-Methods",
  "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method, Authorization"
  );
  if (req.method === "OPTIONS") {
  return res.status(200).end();
  }
  next();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

app.use(globalErrorHandler);

module.exports = app;
