const express = require("express");

const ctrl = require("../../controllers/users/auth");

const { validateBody } = require("../../decorators");

const schemas = require("../../schemas/user-schemas");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

// signup

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// verify

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerify);

// signin

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/subscription", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatarUser);

module.exports = router;
