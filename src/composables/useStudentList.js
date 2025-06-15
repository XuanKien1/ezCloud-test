import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStudentListActions } from '../actions/studentListActions';

export function useStudentList() {
  const router = useRouter();
  const students = ref([]);
  const filteredStudents = ref([]);
  const selectedClass = ref('');
  const pageSize = 5;
  const currentPage = ref(1);
  const message = ref('');

  const { loadStudents, applyFilter, deleteStudent } =
    useStudentListActions(students, filteredStudents, selectedClass, currentPage, message);

  const totalPages = computed(() => Math.ceil(filteredStudents.value.length / pageSize));
  const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredStudents.value.slice(start, start + pageSize);
  });

  function editStudent(id) { router.push(`/student/${id}`); }
  function goToCreate() { router.push('/student'); }
  function prevPage() { if (currentPage.value > 1) currentPage.value--; }
  function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++; }

  onMounted(loadStudents);

  return {
    paginatedStudents, currentPage, totalPages, selectedClass,
    deleteStudent, editStudent, goToCreate, prevPage, nextPage,
    applyFilter, message
  };
}
