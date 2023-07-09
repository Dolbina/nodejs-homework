const express = require("express");

const  contactController  = require("../../controllers/contacts");

const schemas = require("../../schemas/contact-schemas");

const { validateBody } = require("../../decorators");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", isValidId, contactController.getContactById);

router.post("/", validateBody(schemas.schemaAddContact), contactController.addContactPost);

router.delete("/:contactId", isValidId,contactController.deleteContact);

router.put("/:contactId", isValidId, validateBody(schemas.schemaAddContact), contactController.updateContactById);

router.patch("/:contactId/favorite", isValidId,validateBody(schemas.schemaUpdateFavorite), contactController.updateFavorite);

module.exports = router;
