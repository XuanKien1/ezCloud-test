import { calculateAge } from '../utils/dateUtils';
import studentService from '../services/studentService';
import { validateStudent } from '../validators/studentValidator';

export function useStudentFormActions(student, errors, message, isEdit, router) {
  return function saveStudent() {
    errors.value = validateStudent(student.value);
    if (Object.keys(errors.value).length > 0) return;

    const age = calculateAge(student.value.birthday);
    const dataToSave = { ...student.value, age };

    if (isEdit.value) {
      studentService.updateStudent(dataToSave);
    } else {
      studentService.addStudent(dataToSave);
      message.value = 'Thêm học sinh thành công!';
    }

    setTimeout(() => router.push('/'), 1000);
  };
}
