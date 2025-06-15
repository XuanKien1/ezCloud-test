import studentService from '../services/studentService';
import { sortByClassOrder } from '../utils/sortUtils';

export function useStudentListActions(students, filteredStudents, selectedClass, currentPage, message) {
  function loadStudents() {
    students.value = studentService.getAllStudents();
    applyFilter();
  }

  function applyFilter() {
    let data = [...students.value];
    if (selectedClass.value) data = data.filter(s => s.class === selectedClass.value);
    data.sort(sortByClassOrder);
    filteredStudents.value = data;
    if (currentPage.value > totalPages()) currentPage.value = totalPages() || 1;
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
