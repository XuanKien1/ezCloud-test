import { CLASS_LIST } from '../constants/classes';
import { calculateAge } from '../utils/dateUtils';

export function validateStudent(student) {
  const errors = {};

  if (!student.name) {
    errors.name = 'Vui lòng nhập họ và tên';
  } else if (/\d/.test(student.name)) {
    errors.name = 'Họ và tên không được chứa số';
  }

  if (!student.birthday) {
    errors.birthday = 'Vui lòng chọn ngày sinh';
  } else {
    const birthday = new Date(student.birthday);
    const now = new Date();

    if (birthday > now) {
      errors.birthday = 'Ngày sinh không được lớn hơn thời điểm hiện tại';
    }

    const age = calculateAge(student.birthday);
    if (age > 150) {
      errors.birthday = 'Tuổi không hợp lệ (quá 150 tuổi)';
    }
  }

  if (!student.class) {
    errors.class = 'Vui lòng chọn lớp';
  } else if (!CLASS_LIST.includes(student.class)) {
    errors.class = 'Lớp không hợp lệ';
  }

  return errors;
}
