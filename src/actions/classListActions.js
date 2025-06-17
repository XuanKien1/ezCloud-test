import classService from '../services/classService';

export function useClassListActions(classes, filteredClasses, selectedParent, currentPage, message) {
  function loadClasses() {
    classes.value = classService.getAllClasses();
    applyFilter();
  }

  function applyFilter() {
    let data = [...classes.value];
    if (selectedParent.value)
      data = data.filter(c => c.parent === selectedParent.value);

    data.sort((a, b) => {
      const parentCompare = parseInt(a.parent) - parseInt(b.parent);
      if (parentCompare !== 0) return parentCompare;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    filteredClasses.value = data;
    if (currentPage.value > totalPages())
      currentPage.value = totalPages() || 1;
  }

  function deleteClass(id) {
    if (confirm('Bạn có chắc muốn xoá?')) {
      classService.deleteClass(id);
      loadClasses();
      message.value = 'Xoá lớp thành công!';
    }
  }

  function totalPages() {
    return Math.ceil(filteredClasses.value.length / 5);
  }

  return { loadClasses, applyFilter, deleteClass };
}
