const contactModel = require("../models/contactModel");
const ObjectId = require("mongodb").ObjectId;
const getContacts = async (request, response) => {
  try {
    const { _id } = request.user;
    const contacts = await contactModel.find({ user_id: _id });
    response.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const createContact = async (request, response, next) => {
  try {
    const { name, email, phone } = request.body;
    const { _id } = request.user;
    if (!name || !email || !phone) {
      response.status(400);
      throw new Error(
        "Kindly ensure that the name, email and phone fields are filled."
      );
    }
    const contact = await contactModel.create({
      user_id: _id,
      name,
      email,
      phone,
    });
    if (contact.length) {
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
    const { _id } = request.user;
    const { contactid } = request.params;
    if (!ObjectId.isValid(request.params.contactid)) {
      response.status(400);
      throw new Error("Contact Id is invalid");
    }
    const contact = await contactModel.find({
      _id: contactid,
      user_id: _id,
    });
    if (!contact.length) {
      response.status(404);
      throw new Error("Contact not found");
    }
    if (contact.length === 1 && contact[0].user_id.toString() === _id) {
      response.status(200).json(contact);
    } else {
      response.status(400);
      throw new Error("Unable to validate the request.");
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (request, response, next) => {
  try {
    const { _id } = request.user;
    const contactid = request.params.contactid;
    if (!ObjectId.isValid(request.params.contactid)) {
      response.status(400);
      throw new Error("Contact Id is invalid");
    }
    const contact = await contactModel.find({
      _id: contactid,
      user_id: _id,
    });
    if (!contact.length) {
      response.status(404);
      throw new Error("Contact not found");
    }
    if (contact.length === 1 && contact[0].user_id.toString() === _id) {
      const updatedContact = await contactModel.findByIdAndUpdate(
        contactid,
        request.body,
        { new: true }
      );
      if (updateContact) {
        response.status(200).json(updatedContact);
      } else {
        response.status(400);
        throw new Error("Error updating the contact. Kindly try again.");
      }
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (request, response, next) => {
  try {
    const { _id } = request.user;
    const contactid = request.params.contactid;
    if (!ObjectId.isValid(request.params.contactid)) {
      response.status(400);
      throw new Error("Contact Id is invalid");
    }
    const contact = await contactModel.find({
      _id: contactid,
      user_id: _id,
    });
    if (!contact.length) {
      response.status(404);
      throw new Error("Contact not found");
    }
    if (contact.length === 1 && contact[0].user_id.toString() === _id) {
      const deletedContact = await contactModel.findByIdAndRemove(contactid);
      if (deletedContact) {
        response.status(200).json(deletedContact);
      } else {
        response.status(400);
        throw new Error("Error deleting the contact. Kindly try again.");
      }
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
