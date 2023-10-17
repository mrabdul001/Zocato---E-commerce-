import LocalStrategy from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const init = (Passport) => {
  Passport.use(
    new LocalStrategy({ username: "email" }, async (email, password, done) => {
      // check email exists
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "No user find" });
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            return done(null, user, { message: "Logged in sucsses" });
          }
          return done(null, false, { message: "Wrong user name or password" });
        })
        .catch((err) => {
          return done(null, false, {
            message: "Something went worng",
          });
        });
    })
  );

  Passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  Passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

export default init;
