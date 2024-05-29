const express = require("express");
const router = express.Router();
const {
  signup,
  Login,
  ForgetPassword,
  ResetPassword,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", Login);
router.post("/forgetPassword", ForgetPassword);
router.post("/resetPassword", ResetPassword);

module.exports = router;
