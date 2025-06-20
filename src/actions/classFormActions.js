import classService from '../services/classService';
import studentService from '../services/studentService';
import { validateClass } from '../validators/classValidator';

function getFullClassName(cls) {
  return cls.parent + cls.name;
}

export function useClassFormActions(cls, errors, message, isEdit, router) {
  return function saveClass() {
    errors.value = validateClass(cls.value);
    if (Object.keys(errors.value).length > 0) return;

    if (isEdit.value) {
      console.log('🔍 ĐANG SỬA LỚP:', cls.value);

      const oldClass = classService.getClassById(cls.value.id);
      if (!oldClass) {
        alert('❌ Không tìm thấy lớp để sửa');
        return;
      }

      const oldFullName = getFullClassName(oldClass);
      const newFullName = getFullClassName(cls.value);

      console.log('🔁 old:', oldFullName, '→ new:', newFullName);

      classService.updateClass(cls.value);

      const students = studentService.getAllStudents();
      let count = 0;
      const updatedStudents = students.map(s => {
        if (s.className === oldFullName) {
          count++;
          return { ...s, className: newFullName };
        }
        return s;
      });

      studentService.saveAllStudents(updatedStudents);
      console.log(`✅ Đã cập nhật ${count} học sinh từ lớp ${oldFullName} sang ${newFullName}`);

      message.value = 'Cập nhật lớp thành công!';
    } else {
      classService.addClass(cls.value);
      message.value = 'Thêm lớp thành công!';
    }

    setTimeout(() => {
      router.push('/class-list');
    }, 1000);
  };
}
