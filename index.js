const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

mongoose.connect("mongodb://127.0.0.1:27017/user_management");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assests", express.static(path.join(__dirname, "public/assets")));

app.set("view engine", "ejs");
app.set("views", "./views/users");

app.use("/", userRoute);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port}`);
});
