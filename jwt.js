const jwt = require("jsonwebtoken");
const env = require("dotenv");

const jwtMiddleware = (req, res, next) => {
  //Extract the jwt token from request header
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //Verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error", err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

generateToken = (userData) => {
  // Generating anew JWT token using user data

  return jwt.sign(userData, process.env.JWT_TOKEN);
};

module.exports = { jwtMiddleware, generateToken };
