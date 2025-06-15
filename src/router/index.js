import { createRouter, createWebHistory } from 'vue-router';
import StudentList from '../pages/StudentList.vue';
import StudentForm from '../pages/StudentForm.vue';

const routes = [
  { path: '/', name: 'StudentList', component: StudentList },
  { path: '/student', name: 'CreateStudent', component: StudentForm },
  { path: '/student/:id', name: 'EditStudent', component: StudentForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
