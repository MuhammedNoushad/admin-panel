const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      mobile: req.body.mobile,
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();

    if (userData) {
      res.render("registration", {
        message: "Your registration has been Sucessfull.",
      });
    } else {
      res.render("registration", {
        message: "Your registration has been Failed.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email: email });

    if (userData) {
      const passMatch = await bcrypt.compare(password, userData.password);

      if (passMatch) {
        req.session.user_id = userData._id;
        res.render("home",{
          user:userData
        });
      } else {
        res.render("login", {
          message: "Incorrect password",
        });
      }
    } else {
      res.render("login", {
        message: "Email not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
};
