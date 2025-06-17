import classService from '../services/classService';

export function validateStudent(student) {
  const errors = {};
  const classOptions = classService.getAllClasses().map(c => `${c.parent}${c.name}`);

  if (!student.name) errors.name = 'Vui lòng nhập họ tên';
  if (!student.birthDate) errors.birthDate = 'Vui lòng nhập ngày sinh';
  if (!student.className) {
    errors.className = 'Lớp không tồn tại';
  } else if (!classOptions.includes(student.className)) {
    errors.className = 'Lớp không tồn tại';
  }

  const birthYear = new Date(student.birthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  student.age = currentYear - birthYear;
  if (student.age < 0) errors.birthDate = 'Ngày sinh không hợp lệ';

  return errors;
}
