const express = require('express');

const contactController = require("../../controllers/contacts-controllers");

const schemas = require("../../schemas/contact-schemas");

const { validateBody }  = require("../../decorators/validateBody");

const router = express.Router();

router.get('/', contactController.getAllContacts);

router.get('/:contactId', contactController.getContactById);

router.post("/", validateBody(schemas.schemaAddContact),contactController.addContactPost);

router.delete("/:contactId", contactController.deleteContact);

router.put("/:contactId", validateBody(schemas.schemaAddContact), contactController.updateContactById);

module.exports = router;
