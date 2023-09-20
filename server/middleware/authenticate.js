const jwt = require("jsonwebtoken");

const adminUserAuthenticateMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Auth header error");
    res.status(401).json({ msg: "Error", response: "Unauthorized web token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decodeToken;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Error", response: "Unauthorized web token" });
  }
};



module.exports = {
  adminUserAuthenticateMiddleware
};
