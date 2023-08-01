// 2desc Get all contacts
// @route GET /api/contacts
// public access
const getContact = (request, response) => {
  response.status(200).json({ message: "Get all contacts" });
};
const createContact = (request, response) => {
  response.status(200).json({ message: "Create a contact" });
};
const getSingleContact = (request, response) => {
  response.status(200).json({ message: "Get a single contact" });
};
const updateContact = (request, response) => {
  response.status(200).json({ message: "Update a contact" });
};
const deleteContact = (request, response) => {
  response.status(200).json({ message: "Delete a contact" });
};

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
