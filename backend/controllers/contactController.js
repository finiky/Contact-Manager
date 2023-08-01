const getContacts = (request, response) => {
  response.status(200).json({ message: "Get all contacts" });
};
const createContact = (request, response) => {
  response.status(201).json({ message: "Create a contact" });
};
const getContact = (request, response) => {
  response.status(200).json({ message: "Get a single contact" });
};
const updateContact = (request, response) => {
  response.status(200).json({ message: "Update a contact" });
};
const deleteContact = (request, response) => {
  response.status(200).json({ message: "Delete a contact" });
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
