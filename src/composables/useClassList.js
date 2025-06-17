import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useClassListActions } from '../actions/classListActions';

export function useClassList() {
  const router = useRouter();
  const classes = ref([]);
  const filteredClasses = ref([]);
  const selectedParent = ref('');
  const pageSize = 5;
  const currentPage = ref(1);
  const message = ref('');

  const { loadClasses, applyFilter, deleteClass } = useClassListActions(
    classes, filteredClasses, selectedParent, currentPage, message
  );

  const totalPages = computed(() => Math.ceil(filteredClasses.value.length / pageSize));

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredClasses.value.slice(start, start + pageSize);
  });

  const groupedClasses = computed(() => {
    const groups = {};
    paginatedData.value.forEach(c => {
      if (!groups[c.parent]) groups[c.parent] = [];
      groups[c.parent].push(c);
    });
    return Object.entries(groups).map(([parent, classes]) => ({
      parent,
      classes: classes.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    })).sort((a, b) => parseInt(a.parent) - parseInt(b.parent));
  });

  function editClass(id) { router.push(`/class/${id}`); }
  function goToCreate() { router.push('/class'); }
  function prevPage() { if (currentPage.value > 1) currentPage.value--; }
  function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++; }

  onMounted(loadClasses);

  return {
    groupedClasses, currentPage, totalPages, selectedParent,
    deleteClass, editClass, goToCreate, prevPage, nextPage, applyFilter, message
  };
}
