const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const connection= require('./database')

app.use(bodyParser.json());


// In-memory storage for teachers and courses (replace this with a database in a real-world scenario)
let teachers = [
  { teacher_id: 1, name: 'John Doe', is_active: true, designation: 'Math Teacher' },
  { teacher_id: 2, name: 'Jane Smith', is_active: true, designation: 'English Teacher' },
  { teacher_id: 3, name: 'Michael Johnson', is_active: false, designation: 'Science Teacher' }
];

let courses = [
  {
    course_id: 1,
    course_mentor: 1,
    name: 'Mathematics 101',
    start_date: '2023-08-01',
    end_date: '2023-11-30',
    description: 'An introductory math course',
    is_active: true
  },
  {
    course_id: 2,
    course_mentor: 2,
    name: 'English Literature',
    start_date: '2023-09-15',
    end_date: '2024-01-15',
    description: 'Explore the world of English literature',
    is_active: true
  }
];

// Get all teachers
app.get('/api/teachers', (req, res) => {
  res.json(teachers);
});

// Get a specific teacher by teacher_id
app.get('/api/teachers/:teacher_id', (req, res) => {
  const teacherId = parseInt(req.params.teacher_id);
  const teacher = teachers.find((t) => t.teacher_id === teacherId);

  if (teacher) {
    res.json(teacher);
  } else {
    res.status(404).json({ message: 'Teacher not found.' });
  }
});

// Create a new teacher
app.post('/api/teachers', (req, res) => {
  const newTeacher = req.body;
  teachers.push(newTeacher);
  res.json(newTeacher);
});

// Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Get a specific course by course_id
app.get('/api/courses/:course_id', (req, res) => {
  const courseId = parseInt(req.params.course_id);
  const course = courses.find((c) => c.course_id === courseId);

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found.' });
  }
});

// Create a new course
app.post('/api/courses', (req, res) => {
  const newCourse = req.body;
  courses.push(newCourse);
  res.json(newCourse);
});

app.listen(PORT, () => {
  console.log(`JSON API server is running on http://localhost:${PORT}`);
  connection.connect((err)=>{
    if(err){
      console.log(err);
    }
    console.log('Connected to database !');
  })
});