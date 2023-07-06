
const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");


const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContactPost = async (req, res, next) => {
  try {
    // const { error } = schemaAddContact.validate(req.body);
    // if (error) {
    //   throw HttpError(400, `Missing required name field`);
    // }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    // const { error } = schemaAddContact.validate(req.body);
    // if (error) {
    //   throw HttpError(400, `missing fields`);
    // }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContactPost,
  deleteContact,
  updateContactById,
};
