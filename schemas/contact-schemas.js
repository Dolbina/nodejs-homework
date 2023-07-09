const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean(),
});

const schemaUpdateFavorite = Joi.object({ favorite: Joi.boolean() });

module.exports = { schemaAddContact, schemaUpdateFavorite };