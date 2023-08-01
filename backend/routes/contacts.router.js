const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.get("/api/contacts", getContacts).post("/api/contacts", createContact);
router
  .get("/api/contacts/:contactid", getContact)
  .put("/api/contacts/:contactid", updateContact)
  .delete("/api/contacts/:contactid", deleteContact);

module.exports = router;
