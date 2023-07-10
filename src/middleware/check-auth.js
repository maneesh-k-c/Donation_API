
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    console.log(req);
    const token = req.header.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = { username: decodedToken.username, userId: decodedToken.userId, userRole: decodedToken.userRole };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};