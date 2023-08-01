const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.get("/api/contacts", getContacts);
router.post("/api/contacts", createContact);
router.get("/api/contacts/:contactid", getContact);
router.put("/api/contacts/:contactid", updateContact);
router.delete("/api/contacts/:contactid", deleteContact);

module.exports = router;
