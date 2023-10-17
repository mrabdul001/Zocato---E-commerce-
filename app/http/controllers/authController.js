import User from "../../models/user.js";
import bcrypt from "bcrypt";
import passport from "passport";

const authController = () => {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin() {},
    register(req, res) {
      res.render("auth/register");
    },

    async postRegister(req, res) {
      const { name, email, password } = req.body;
      // validation

      if (!name || !email || !password) {
        req.flash("error", "Please enter all fields");
        req.flash("name", name);
        req.flash("email", email);
      }

      // Check if email exists
      // User.exists({ email: email }, (err, result) => {
      //   if (result) {
      //     req.flash("error", "Email already taken");
      //     req.flash("name", name);
      //     req.flash("email", email);
      //     return res.redirect("/register");
      //   }
      // });

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        req.flash("error", "Email already taken");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          // Login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },
  };
};

export default authController;
