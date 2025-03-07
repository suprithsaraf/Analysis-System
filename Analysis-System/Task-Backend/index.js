require(dotenv).configureDB();
const express = require("express");
const app = express();
const port = 3050;
const cors = require("cors");
app.use(express.json());

app.use(cors());

const configureDB = require("./config/db");
const userCltr = require("./app/controllers/userCltr");
const buildCltr = require("./app/controllers/buildCltr");
const analysisCltr = require("./app/controllers/analysisCltr");
const { checkSchema } = require("express-validator");

configureDB();

//Middleware
const authenticateUser = require("./app/middleware/Authenicate");
const authorization = require("./app/middleware/Authorization");

//user Models and validation for Register and Login this is optional.
const userRegistervalidation = require("./app/validations/user-validationSchema");
const userLoginValidationSchema = require("./app/validations/user-login-validation");

//user Url These are optional
app.post(
  "/users/register",
  checkSchema(userRegistervalidation),
  userCltr.register
);
app.post(
  "/users/login",
  checkSchema(userLoginValidationSchema),
  userCltr.login
);

app.post("/api/create", buildCltr.create);
app.get("/api/:id/alldetails", buildCltr.alldetails);
app.get("/api/:id/single", buildCltr.single);
app.delete("/api/:id/delete", buildCltr.delete);

app.post("api/analysis/calculate", analysisCltr.calculateHeat);
app.get("/api/analysis/cities", analysisCltr.city);

app.listen(port, () => {
  console.log("server running on the port", port);
});
