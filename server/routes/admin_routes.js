const express = require("express");
const router = express.Router();

const { adminRegister, secretKey, adminLogin, authenticateRoute } = require("../controllers/AdminController");
const {adminUserAuthenticateMiddleware, } = require("../middleware/authenticate")

router.post("/secret",  secretKey);
router.post("/register", adminUserAuthenticateMiddleware, adminRegister);
router.post("/login", adminLogin);
router.get("/authenticate_route/:token", authenticateRoute)

module.exports = router;
