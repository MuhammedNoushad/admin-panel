const express = require("express");
const app = express();
const session = require("express-session");
const config = require("../config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secrete: config.sessionSecret,
  })
);



app.set("view engine", "ejs");
app.set("views", "./views/admin");

const auth = require('../middleware/adminAuth')

const adminController = require("../controllers/adminController");

app.get("/", auth.isLogout,adminController.loadLogin);
app.post("/", adminController.verifyLogin);

app.get("/home",auth.isLogin, adminController.loadDashboard);
app.get('/logout',auth.isLogin,adminController.logout)

app.get('/dashboard',auth.isLogin,adminController.adminDashboard)

app.get('/new-user',auth.isLogin,adminController.newUserAdd)
app.post('/new-user',adminController.addUser)

app.get('/edit-user',auth.isLogin,adminController.editUser)
app.post('/edit-user',adminController.updateUser)

app.get('/delete-user',adminController.deleteUser)


app.get("*", (req, res) => {
  res.redirect("/admin");
});
module.exports = app;
