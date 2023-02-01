const express = require("express");
const router = express.Router();

const { adminRegister, secretKey, adminLogin } = require("../controllers/AdminController");
const {adminUserAuthenticateMiddleware, authLoginRegisterPage} = require("../middleware/authenticate")

router.post("/secret",  secretKey);
router.post("/register",adminUserAuthenticateMiddleware, adminRegister);
router.post("/login", adminLogin);
router.get("/auth_login_register_page", authLoginRegisterPage)

module.exports = router;
