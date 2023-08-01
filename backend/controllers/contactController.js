const getContacts = async (request, response) => {
  try {
    response.status(200).json({ message: "Get all contacts" });
  } catch (error) {
    next(error);
  }
};
const createContact = async (request, response, next) => {
  try {
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
      response.status(400);
      throw new Error(
        "Kindly ensure that the name, email and phone fields are filled."
      );
    }
    response.status(201).json({ name: name, email: email, phone: phone });
  } catch (error) {
    next(error);
  }
};
const getContact = async (request, response, next) => {
  try {
    response.status(200).json({ message: "Get a single contact" });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (request, response) => {
  try {
    response.status(200).json({ message: "Update a contact" });
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (request, response) => {
  try {
    response.status(200).json({ message: "Delete a contact" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
