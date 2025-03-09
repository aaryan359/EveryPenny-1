const express = require("express");
const { verifyClerkToken } = require("../middlewares/VerifyClerkToken");
const { register, login } = require("../controllers/Auth.controller");

const router = express.Router();


router.route("/register").post(verifyClerkToken, register);
router.route("/login").post(verifyClerkToken, login); 


module.exports = router;

