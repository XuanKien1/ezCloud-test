import studentService from '../services/studentService';
import { validateStudent } from '../validators/studentValidator';

export function useStudentFormActions(student, errors, message, isEdit, router) {
  return function saveStudent() {
    errors.value = validateStudent(student.value);
    if (Object.keys(errors.value).length > 0) return;

    if (isEdit.value) {
      studentService.updateStudent(student.value);
      message.value = 'Cập nhật học sinh thành công!';
    } else {
      studentService.addStudent(student.value);
      message.value = 'Thêm học sinh thành công!';
    }

    setTimeout(() => router.push('/'), 1000);
  };
}
