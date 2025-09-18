const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Add new event
router.post("/", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json({ message: "Event created", event });
});

// Delete event
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

module.exports = router;
