const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const users = require("./Routes/user");
const loan = require("./Routes/loan");
const admin = require("./Routes/adminRoute");
const middleware = require("./Middleware/error");
const paymentRouter = require("./Routes/paymentRoute");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", users);
app.use("/api/v1", loan);
app.use("/api/v1",admin);
app.use("/api/v1",paymentRouter);


app.use(middleware);

module.exports = app;
