const express = require("express");

const  contactController  = require("../../controllers/contacts");

const schemas = require("../../schemas/contact-schemas");

const { validateBody } = require("../../decorators");

const { isValidId, authenticate  } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate,  contactController.getAllContacts);

router.get("/:contactId", authenticate, isValidId, contactController.getContactById);

router.post("/", authenticate, validateBody(schemas.schemaAddContact), contactController.addContactPost);

router.delete("/:contactId", authenticate, isValidId, contactController.deleteContact);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.schemaAddContact), contactController.updateContactById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), contactController.updateFavorite);


module.exports = router;
