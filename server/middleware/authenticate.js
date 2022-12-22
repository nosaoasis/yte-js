const jwt = require("jsonwebtoken")

const adminUserAuthenticateMiddleware = async (req, res, next) => {
  console.log("aaa")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("authenticate token value is ", decodeToken)
    req.token = decodeToken
    next()
  } catch (error) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
  }
}

module.exports = {
  adminUserAuthenticateMiddleware
}