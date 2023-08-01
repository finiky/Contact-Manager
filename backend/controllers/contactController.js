const getContacts = (request, response) => {
  response.status(200).json({ message: "Get all contacts" });
};
const createContact = (request, response) => {
  const { name, email, phone } = request.body;
  if (!name || !email || !phone) {
    response.status(400);
    throw new Error(
      "Kindly ensure that the name, email and phone fields are filled."
    );
  }
  response.status(201).json({ name: name, email: email, phone: phone });
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
