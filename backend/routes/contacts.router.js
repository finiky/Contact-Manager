const express = require("express");
const userValidation = require("../middleware/validateToken");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router
  .get("/api/contacts", userValidation, getContacts)
  .post("/api/contacts", userValidation, createContact);
router
  .get("/api/contacts/:contactid", userValidation, getContact)
  .put("/api/contacts/:contactid", userValidation, updateContact)
  .delete("/api/contacts/:contactid", userValidation, deleteContact);

module.exports = router;
