const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const userRouter = require("./src/router/user.routes");
const recruiterRoute = require("./src/router/recruiter.routes");

const app = express();

app.use(express.static("public"));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(userRouter);
app.use(recruiterRoute);

app.listen(4002, () => {
	console.log("Server berjalan di port 4002");
});
