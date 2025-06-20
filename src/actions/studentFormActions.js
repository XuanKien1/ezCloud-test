import studentService from '../services/studentService';
import { validateStudent } from '../validators/studentValidator';

export function useStudentFormActions(student, errors, message, isEdit, router) {
  return function saveStudent() {
    console.log('▶️ Đã vào saveStudent');
    console.log('🎯 Dữ liệu học sinh trước validate:', student.value);

    errors.value = validateStudent(student.value);
    console.log('🧪 Kết quả validate:', errors.value);

    if (Object.keys(errors.value).length > 0) {
      console.warn('❌ Có lỗi, không lưu:', errors.value);
      message.value = ''; 
      return;
    }

    if (isEdit.value) {
      studentService.updateStudent(student.value);
      console.log('✅ Đã cập nhật học sinh:', student.value);
      message.value = 'Cập nhật học sinh thành công!';
    } else {
      studentService.addStudent(student.value);
      console.log('✅ Đã thêm học sinh:', student.value);
      message.value = 'Thêm học sinh thành công!';
    }

    setTimeout(() => {
      router.push('/');
    }, 1000);
  };
}
