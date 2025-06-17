import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import studentService from '../services/studentService';
import classService from '../services/classService';
import { useStudentFormActions } from '../actions/studentFormActions';

export function useStudentForm() {
  const router = useRouter();
  const route = useRoute();
  const student = ref({ name: '', birthDate: '', className: '' });
  const classOptions = ref([]);
  const filteredClassOptions = ref([]);
  const searchClass = ref('');
  const showDropdown = ref(false);
  const errors = ref({});
  const isEdit = ref(false);
  const message = ref('');

  function classSort(a, b) {
    const numA = parseInt(a.match(/^\d+/));
    const numB = parseInt(b.match(/^\d+/));
    if (numA !== numB) return numA - numB;
    const suffixA = a.replace(/^\d+/, '');
    const suffixB = b.replace(/^\d+/, '');
    return suffixA.localeCompare(suffixB, undefined, { numeric: true });
  }

  onMounted(() => {
    const all = classService.getAllClasses()
      .map(c => `${c.parent}${c.name}`)
      .sort(classSort);

    classOptions.value = all;
    filteredClassOptions.value = all;

    if (route.params.id) {
      const data = studentService.getStudentById(route.params.id);
      if (data) {
        student.value = { ...data };
        searchClass.value = data.className;
        isEdit.value = true;
      }
    }
  });

  function filterClassOptions() {
    const input = searchClass.value.toLowerCase();
    filteredClassOptions.value = classOptions.value.filter(c =>
      c.toLowerCase().includes(input)
    );
  }

  function selectClass(cls) {
    student.value.className = cls;
    searchClass.value = cls;
    showDropdown.value = false;
  }

  const saveStudent = useStudentFormActions(student, errors, message, isEdit, router);
  return {
    student, errors, saveStudent, message, isEdit,
    searchClass, filteredClassOptions, filterClassOptions,
    showDropdown, selectClass
  };
}
