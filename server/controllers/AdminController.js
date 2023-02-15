const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");

const secretKey = async (req, res) => {
  const secret_key = process.env.ADMIN_SECRET_KEY;
  const { secretKey } = req.body;
  if (secretKey !== secret_key) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return;
  }

  if (secretKey === secret_key) {
    const jwtId = new Date().toLocaleString();
    const token = await jwt.sign(
      { jwtId, jwttoken: "jwttoken" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.SECRET_KEY_ROUTE_VALIDITY }
    );
    if (!token) {
      res.status(500).json({ msg: "Server Error", response: null });
      return;
    }
    res.status(200).json({ msg: "Successful Request", response: true, token });
    return;
  }
  res.status(500).json({ msg: "Server Error", response: null });
};

const adminRegister = async (req, res) => {
  if (req.token.jwttoken !== "jwttoken") {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return;
  }

  try {
    const registeredAdmin = await Admin.create({ ...req.body });
    const ntoken = registeredAdmin.createJWT();

    res
      .status(200)
      .json({ msg: "Success", response: registeredAdmin, token: ntoken });
  } catch (error) {
    res.status(500).json({ msg: "Error", response: error });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
    return;
  }

  try {
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
      res.status(401).json({ msg: "Error", response: "Unauthorized" });
      return;
    }
    const isPasswordMatched = adminUser.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(401).json({ msg: "Error", response: "Unauthorized" });
      return;
    }
    const token = await jwt.sign(
      { email, isLoggedIn: true },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.SECRET_VALIDITY,
      }
    );

    res.status(200).json({ msg: "Success", response: adminUser, token });
  } catch (error) {
    res.status(500).json({ msg: "Error", response: "Server Error" });
  }
};

const authenticateRoute = async (req, res) => {
  const { token } = req.params;

  try {
    const loggedIn = jwt.verify(token, process.env.JWT_SECRET);
    if (loggedIn) {
      res.status(200).json({ msg: "Success", response: loggedIn, tokenExpired: false });
      return
    }

    res.status(401).json({ msg: "Error", response: "Unauthorized", tokenExpired: true });
  } catch (error) {
    res.status(500).json({ msg: "Error", response: "Server Error" });
  }
};

module.exports = {
  secretKey,
  adminRegister,
  adminLogin,
  authenticateRoute,
};
