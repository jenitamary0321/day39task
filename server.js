const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mentor-student-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/mentors', require('./routes/mentors'));
app.use('/api/students', require('./routes/students'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
