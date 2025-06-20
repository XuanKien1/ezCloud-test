const STORAGE_KEY = 'students';

function getAllStudents() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAllStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function addStudent(student) {
  const students = getAllStudents();
  student.id = Date.now().toString();
  students.push(student);
  saveAllStudents(students);
}

function updateStudent(student) {
  const students = getAllStudents();
  const index = students.findIndex(s => s.id === student.id);
  if (index !== -1) {
    students[index] = student;
    saveAllStudents(students);
  }
}

function deleteStudent(id) {
  let students = getAllStudents();
  students = students.filter(s => s.id !== id);
  saveAllStudents(students);
}

function getStudentById(id) {
  const students = getAllStudents();
  return students.find(s => s.id === id);
}

export default {
  getAllStudents,
  saveAllStudents, // ✅ thêm dòng này để classFormActions.js hoạt động
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById
};
