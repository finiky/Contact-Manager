const express = require("express");
const router = express.Router();
router.get("/api/contacts", (request, response) => {
  response.status(200).json({ message: "Get all contacts" });
});
router.post("/api/contacts", (request, response) => {
  response.status(200).json({ message: "Create a contact" });
});
router.get("/api/contacts/:contactid", (request, response) => {
  response.status(200).json({ message: "Get a contact" });
});
router.put("/api/contacts/:contactid", (request, response) => {
  response.status(200).json({ message: "Update a contact" });
});
router.delete("/api/contacts/:contactid", (request, response) => {
  response.status(200).json({ message: "Delete a contact" });
});

module.exports = router;
