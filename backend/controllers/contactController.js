const contactSchema = require("../models/contactModel");
const ObjectId = require("mongodb").ObjectId;
const getContacts = async (request, response) => {
  try {
    const contacts = await contactSchema.find();
    response.status(200).json(contacts);
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
    const contact = await contactSchema.create({
      name,
      email,
      phone,
    });
    if (contact) {
      response.status(201).json(contact);
    } else {
      response.status(400);
      throw new Error("Error creating the contact. Kindly try again.");
    }
  } catch (error) {
    next(error);
  }
};

const getContact = async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.contactid)) {
      response.status(400);
      throw new Error("Contact Id is invalid");
    }
    const contact = await contactSchema.findById(request.params.contactid);
    if (!contact) {
      response.status(404);
      throw new Error("Contact not found");
    }
    response.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.contactid)) {
      response.status(400);
      throw new Error("Contact Id is invalid");
    }
    const contact = await contactSchema.findById(request.params.contactid);
    if (!contact) {
      response.status(404);
      throw new Error("Contact not found");
    }
    const updatedContact = await contactSchema.findByIdAndUpdate(
      request.params.contactid,
      request.body,
      { new: true }
    );
    if (updateContact) {
      response.status(200).json(updatedContact);
    } else {
      response.status(400);
      throw new Error("Error updating the contact. Kindly try again.");
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.contactid)) {
      response.status(400);
      throw new Error("Contact Id is invalid");
    }
    const contact = await contactSchema.findById(request.params.contactid);
    if (!contact) {
      response.status(404);
      throw new Error("Contact not found");
    }
    const deletedContact = await contactSchema.findByIdAndRemove(
      request.params.contactid
    );
    if (deletedContact) {
      response.status(200).json(deletedContact);
    } else {
      response.status(400);
      throw new Error("Error deleting the contact. Kindly try again.");
    }
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
