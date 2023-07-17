const { ctrlWrapper } = require("../../decorators");

const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContactPost = require("./addContactPost");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");


module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContactPost: ctrlWrapper(addContactPost),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
  
};
