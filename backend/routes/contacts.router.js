const express = require("express");
const {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.get("/api/contacts", getContact);
router.post("/api/contacts", createContact);
router.get("/api/contacts/:contactid", getSingleContact);
router.put("/api/contacts/:contactid", updateContact);
router.delete("/api/contacts/:contactid", deleteContact);

module.exports = router;
