const jwt = require("jsonwebtoken")

const adminUserAuthenticateMiddleware = async (req, res, next) => {
  console.log("aaa")
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  console.log("bbb")
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("ccc")
    console.log("authenticate token value is ", decodeToken)
    req.token = decodeToken
    next()
  } catch (error) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
  }
}

const authLoginRegisterPage = (req, res) => {
  console.log("authenticating page access....")
  
  const authHeader = req.headers.authorization;
  console.log("authheader values is ", authHeader)
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return
  }
  
  const token = authHeader.split(" ")[1];
  console.log("====",token)
  
  if (token === "null") {
    console.log("dfknmfkmklf")
    return res.status(401).json({ msg: "Error", response: "Unauthorized" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("ccc")
    console.log("authenticate token value is ", decodeToken)
    res.status(200).json({msg: "Success", response: decodeToken})

    // next()
  } catch (error) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
  }
  // next()
  // return res.status(401).json({ msg: "Success", response: "Authorized" });
}

module.exports = {
  adminUserAuthenticateMiddleware,
  authLoginRegisterPage
}