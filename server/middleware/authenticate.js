const jwt = require("jsonwebtoken");

const adminUserAuthenticateMiddleware = async (req, res, next) => {
  console.log("aaa");
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  console.log("bbb");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("auth error", 123)
    console.log("Auth header error");
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("ccc");
    console.log("authenticate token value is ", decodeToken);
    req.token = decodeToken;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
  }
};



module.exports = {
  adminUserAuthenticateMiddleware
};
