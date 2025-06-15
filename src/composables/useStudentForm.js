import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import studentService from '../services/studentService';
import { useStudentFormActions } from '../actions/studentFormActions';

export function useStudentForm() {
  const router = useRouter();
  const route = useRoute();

  const student = ref({ name: '', birthday: '', class: '' });
  const errors = ref({});
  const isEdit = ref(false);
  const message = ref('');
  const today = new Date().toISOString().split('T')[0];

  onMounted(() => {
    if (route.params.id) {
      const data = studentService.getStudentById(route.params.id);
      if (data) {
        student.value = { ...data };
        isEdit.value = true;
      }
    }
  });

  const saveStudent = useStudentFormActions(student, errors, message, isEdit, router);

  return { student, errors, today, saveStudent, isEdit, message };
}
