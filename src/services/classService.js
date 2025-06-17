const STORAGE_KEY = 'classes';

function getAllClasses() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAllClasses(classes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
}

function addClass(cls) {
  const classes = getAllClasses();
  cls.id = Date.now().toString();
  classes.push(cls);
  saveAllClasses(classes);
}

function updateClass(cls) {
  const classes = getAllClasses();
  const index = classes.findIndex(c => c.id === cls.id);
  if (index !== -1) {
    classes[index] = cls;
    saveAllClasses(classes);
  }
}

function deleteClass(id) {
  let classes = getAllClasses();
  classes = classes.filter(c => c.id !== id);
  saveAllClasses(classes);
}

function getClassById(id) {
  const classes = getAllClasses();
  return classes.find(c => c.id === id);
}

export default { getAllClasses, addClass, updateClass, deleteClass, getClassById };
