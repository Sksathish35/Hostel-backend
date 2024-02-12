const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./routes/auth");

const adminpage = require("./routes/adminpage");
const adminnodue = require("./routes/adminnodueform");
const adminqueryview = require("./routes/AdminQueryview");
const admin_crud = require("./routes/admin_crud");

const mail = require("./routes/mail");

const studentDetails = require("./routes/studentDetails");
const queries = require("./routes/queries");
const viewdue = require("./routes/viewdue");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// user authentication
app.use("/", authRoute);

// admin authorized routes
app.use("/adminpage", adminpage);
app.use("/adminqueryview", adminqueryview);
app.use("/studentcrud", admin_crud);
app.use("/adminnodue", adminnodue);
app.use("/mail", mail);

//user authorized routes
app.use("/profile", studentDetails);
app.use("/query", queries);
app.use("/viewdue", viewdue);

app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT}`);
});
