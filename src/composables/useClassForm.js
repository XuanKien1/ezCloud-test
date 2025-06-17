import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import classService from '../services/classService';
import { useClassFormActions } from '../actions/classFormActions';

export function useClassForm() {
  const router = useRouter();
  const route = useRoute();
  const cls = ref({ name: '', parent: '' });
  const errors = ref({});
  const isEdit = ref(false);
  const message = ref('');

  onMounted(() => {
    if (route.params.id) {
      const data = classService.getClassById(route.params.id);
      if (data) {
        cls.value = { ...data };
        isEdit.value = true;
      }
    }
  });

  const saveClass = useClassFormActions(cls, errors, message, isEdit, router);
  return { cls, errors, saveClass, message, isEdit };
}
