const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create Student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assign a Mentor to a Student
router.put('/assign-mentor', async (req, res) => {
  const { studentId, mentorId } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.mentor = mentorId;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Change Mentor for a Student
router.put('/change-mentor', async (req, res) => {
  const { studentId, newMentorId } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.mentor = newMentorId;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Students for a Particular Mentor
router.get('/mentor/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  try {
    const students = await Student.find({ mentor: mentorId });
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Previously Assigned Mentor for a Student
router.get('/student/:studentId/previous-mentor', async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId).populate('mentor');
    if (!student) return res.status(404).json({ error: 'Student not found' });

    res.status(200).json(student.mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Students Not Assigned to Any Mentor
router.get('/unassigned', async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
