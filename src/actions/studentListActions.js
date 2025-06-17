import studentService from '../services/studentService';

export function useStudentListActions(students, filteredStudents, selectedClass, searchName, searchAge, currentPage, message) {
  function loadStudents() {
    students.value = studentService.getAllStudents();
    applyFilter();
  }

  function applyFilter() {
    let data = [...students.value];
    if (selectedClass.value)
      data = data.filter(s => s.className === selectedClass.value);
    if (searchName.value)
      data = data.filter(s => s.name.toLowerCase().includes(searchName.value.toLowerCase()));
    if (searchAge.value)
      data = data.filter(s => s.age == searchAge.value);
    filteredStudents.value = data;
    if (currentPage.value > totalPages())
      currentPage.value = totalPages() || 1;
  }

  function deleteStudent(id) {
    if (confirm('Bạn có chắc muốn xoá?')) {
      studentService.deleteStudent(id);
      loadStudents();
      message.value = 'Xoá học sinh thành công!';
    }
  }

  function totalPages() {
    return Math.ceil(filteredStudents.value.length / 5);
  }

  return { loadStudents, applyFilter, deleteStudent };
}
