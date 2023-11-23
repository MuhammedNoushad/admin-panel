const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.is_admin === 0) {
          res.render("login", {
            message: "Email and Password Incorrect",
          });
        } else {
          req.session.user_id = userData._id;
          res.render("home");
        }
      } else {
        res.render("login", {
          message: "Email and Password Incorrect",
        });
      }
    } else {
      res.render("login", {
        message: "Email and Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadDashboard = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};

const adminDashboard = async (req, res) => {
  try {
    const usersData = await User.find({ is_admin: 0 });

    res.render("dashboard", { users: usersData });
  } catch (error) {
    console.log(error.message);
  }
};

const newUserAdd = async (req, res) => {
  try {
    res.render("new-user");
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const spassword = await bcrypt.hash(req.body.password, 10);

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
      res.redirect("/admin/dashboard");
    } else {
      res.render("new-user", {
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.query.id;

    const userData = await User.findById({ _id: id });

    console.log(userData);
    if (userData) {
      res.render("edit-user", {
        user: userData,
      });
    } else {
      res.redirect("/admin/dashboard");
    }

    res.render("edit-user");
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          age: req.body.age,
        },
      }
    );
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;

    await User.deleteOne({ _id: id });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  adminDashboard,
  newUserAdd,
  addUser,
  editUser,
  updateUser,
  deleteUser,
};
