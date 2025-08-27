const jwt = require("jsonwebtoken");
const env = require("dotenv");

const jwtMiddleware = (req, res, next) => {
  try {
    // Checking first request header has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "Invalid Token" });

    //Extract the jwt token from request header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error : ", err);
  }
};

generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_TOKEN);
};

module.exports = { jwtMiddleware, generateJwtToken };
