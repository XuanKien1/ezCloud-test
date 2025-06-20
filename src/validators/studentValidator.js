import classService from '../services/classService';

export function validateStudent(student) {
  console.log('🔍 [validateStudent] Kiểm tra dữ liệu:', student);

  const errors = {};
  const classOptions = classService.getAllClasses().map(c => `${c.parent}${c.name}`);
  console.log('📚 Danh sách lớp hiện có:', classOptions);

  if (!student.name) {
    errors.name = 'Vui lòng nhập họ tên';
  }

  if (!student.birthDate) {
    errors.birthDate = 'Vui lòng nhập ngày sinh';
  }

  if (!student.className) {
    errors.className = 'Vui lòng nhập lớp';
  } else if (!classOptions.includes(student.className)) {
    errors.className = 'Lớp không tồn tại';
    console.warn('⚠️ Lớp không tồn tại:', student.className);
  }

  const birthDate = new Date(student.birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (birthDate > today) {
    errors.birthDate = 'Ngày sinh không hợp lệ';
    console.warn('⚠️ Ngày sinh không hợp lệ:', student.birthDate);
  } else {
    student.age = age;
  }

  console.log('✅ Kết quả validate:', errors);
  return errors;
}
