import { createRouter, createWebHistory } from 'vue-router';
import StudentList from '../pages/StudentList.vue';
import StudentForm from '../pages/StudentForm.vue';
import ClassList from '../pages/ClassList.vue';
import ClassForm from '../pages/ClassForm.vue';

const routes = [
  { path: '/', component: StudentList },
  { path: '/student', component: StudentForm },
  { path: '/student/:id', component: StudentForm },
  { path: '/class-list', component: ClassList },
  { path: '/class', component: ClassForm },
  { path: '/class/:id', component: ClassForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
