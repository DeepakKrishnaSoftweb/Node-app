const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

/// Create Authentication
passport.use(
  new localStrategy(async (userName, userPassword, done) => {
    try {
      console.log("Recieved data is :", userName, userPassword);
      const user = await Person.findOne({ username: userName });

      if (!user) return done(null, false, { message: "Username not found" });

      const matchUserPassword = user.comparePassword(userPassword);

      if (matchUserPassword) return done(null, user);
      else return done(null, false, { message: "Incorrect password" });
    } catch (err) {
      return done({ error: err });
    }
  })
);

// /// Create middleware function
// const logRequest = (req, res, next) => {
//   console.log(
//     new Date().toLocaleString(),
//     "Request made to : ",
//     req.originalUrl
//   );
//   next();
// };

module.exports = passport;
