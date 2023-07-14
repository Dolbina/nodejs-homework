const express = require("express");

const { ctrl }   = require("../../controllers/users/auth");

const { validateBody } = require("../../decorators");

const { schemas } = require("../../models/user");

const { authenticate } = require("../../middlewares");

const router = express.Router();

// signup

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;