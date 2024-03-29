const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

const connectDB = () => {
  mongoose
    .connect(mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
  mongoose.set("strictQuery", false);
};

module.exports = connectDB;
