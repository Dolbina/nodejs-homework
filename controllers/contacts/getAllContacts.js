const  Contact  = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  // якщо в параметрах є favorite GET /contacts?favorite=true, тоді фільтрує. Якщо в параметрах є пагінація (скільки контактів на сторінці і яку сторінку треба) GET /contacts?page=1&limit=20, тоді повертає те, що треба в запиті
  if (req.query.favorite) {
    const result = await Contact.find({ owner, favorite }, {}, { skip, limit });
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, {}, { skip, limit });
    res.json(result);
  }
};

module.exports = getAllContacts;