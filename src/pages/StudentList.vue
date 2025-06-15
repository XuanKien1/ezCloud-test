<template>
  <div>
    <h2>Danh sách học sinh</h2>
    <div style="margin-bottom: 10px;">
      <label>Lớp:</label>
      <select v-model="selectedClass">
        <option value="">-- Tất cả --</option>
        <option v-for="classItem in CLASS_LIST" :key="classItem" :value="classItem">{{ classItem }}</option>
      </select>
      <label style="margin-left: 20px;">Tên:</label>
      <input v-model="nameKeyword" placeholder="Nhập tên" />
      <label style="margin-left: 20px;">Tuổi:</label>
      <input v-model.number="ageFilter" type="number" placeholder="Nhập tuổi" />
      <button style="margin-left: 20px;" @click="onSearch">Tìm kiếm</button>
    </div>

    <button @click="goToCreate">Thêm học sinh</button>

    <table border="1">
      <thead>
        <tr><th>#</th><th>Họ và tên</th><th>Tuổi</th><th>Lớp</th><th>Thao tác</th></tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in paginatedStudents" :key="student.id">
          <td>{{ index + 1 + (currentPage - 1) * 5 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.class }}</td>
          <td>
            <button @click="editStudent(student.id)">Sửa</button>
            <button @click="deleteStudent(student.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :currentPage="currentPage" :totalPages="totalPages" @prev="prevPage" @next="nextPage" />
    <div v-if="message" style="color: green; margin-top: 10px;">{{ message }}</div>
  </div>
</template>

<script setup>
import { CLASS_LIST } from '../constants/classes';
import { useStudentList } from '../composables/useStudentList';
import Pagination from '../components/Pagination.vue';

const {
  paginatedStudents, currentPage, totalPages, selectedClass, nameKeyword, ageFilter,
  deleteStudent, editStudent, goToCreate, prevPage, nextPage, applyFilter, message
} = useStudentList();

function onSearch() {
  currentPage.value = 1;
  applyFilter();
}
</script>
