import classService from '../services/classService';
import { validateClass } from '../validators/classValidator';

export function useClassFormActions(cls, errors, message, isEdit, router) {
  return function saveClass() {
    errors.value = validateClass(cls.value);
    if (Object.keys(errors.value).length > 0) return;

    if (isEdit.value) {
      classService.updateClass(cls.value);
      message.value = 'Cập nhật lớp thành công!';
    } else {
      classService.addClass(cls.value);
      message.value = 'Thêm lớp thành công!';
    }

    setTimeout(() => router.push('/class-list'), 1000);
  };
}
