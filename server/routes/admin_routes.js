const express = require("express");
const router = express.Router();

const { adminRegister, secretKey, adminLogin } = require("../controllers/AdminController");
const {adminUserAuthenticateMiddleware} = require("../middleware/authenticate")

router.post("/secret",  secretKey);
router.post("/register",adminUserAuthenticateMiddleware, adminRegister);
router.post("/login", adminLogin);

module.exports = router;
