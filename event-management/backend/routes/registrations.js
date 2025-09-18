const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// Register user for event
router.post("/", async (req, res) => {
  const registration = new Registration(req.body);
  await registration.save();
  res.json({ message: "Registered successfully", registration });
});

// Get all registrations (Admin view)
router.get("/", async (req, res) => {
  const registrations = await Registration.find().populate("eventId");
  res.json(registrations);
});

// Delete a registration (optional)
router.delete("/:id", async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: "Registration deleted" });
});

// DELETE all registrations (safe with confirm query)
router.delete("/", async (req, res) => {
  if (req.query.confirm !== "true") {
    return res
      .status(400)
      .json({ message: "⚠️ Please confirm by adding ?confirm=true" });
  }

  try {
    const result = await Registration.deleteMany({});
    res.json({
      message: "✅ All registrations deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Error deleting all registrations:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
