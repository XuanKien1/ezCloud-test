import { CLASS_PARENTS } from '../constants/classParents';
import classService from '../services/classService';

export function validateClass(cls, isEdit = false) {
  const errors = {};

  if (!cls.name) {
    errors.name = 'Vui lòng nhập hậu tố lớp';
  } else if (!/^[A-Z][0-9]*$/.test(cls.name)) {
    errors.name = 'Hậu tố phải bắt đầu bằng A-Z, theo sau là số';
  }

  if (!cls.parent) {
    errors.parent = 'Vui lòng chọn khối chính';
  } else if (!CLASS_PARENTS.includes(cls.parent)) {
    errors.parent = 'Khối chính không hợp lệ';
  }

  const fullName = cls.parent + cls.name;
  const classes = classService.getAllClasses();
  const exists = classes.find(c => (c.parent + c.name) === fullName && c.id !== cls.id);
  if (exists) {
    errors.name = 'Lớp đã tồn tại';
  }

  return errors;
}
