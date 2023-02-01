const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
      { jwtId, jwttoken: "jwttoken", isLoggedIn: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "180s" }
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

  const { firstname, lastname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const registeredAdmin = await Admin.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  if (!registeredAdmin) {
    res.status(404).json({ msg: "Failed" });
    return;
  }
  const { _id } = registeredAdmin;
  const ntoken = await jwt.sign({ _id, email, jwttoken: "admin", isLoggedIn: true }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .json({ msg: "Success", response: registeredAdmin, token: ntoken });
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
    const isPasswordMatched = bcrypt.compareSync(password, adminUser.password);
    if (!isPasswordMatched) {
      res.status(401).json({ msg: "Error", response: "Unauthorized" });
      return;
    }
    const token = await jwt.sign({ email, jwttoken: "admin", isLoggedIn: true }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ msg: "Success", response: adminUser, token });
  } catch (error) {
    res.status(401).json({ msg: "Error", response: "Unauthorized" });
  }
};

module.exports = {
  secretKey,
  adminRegister,
  adminLogin,
};
