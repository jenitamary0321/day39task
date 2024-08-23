const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

// Create Mentor
router.post('/', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
