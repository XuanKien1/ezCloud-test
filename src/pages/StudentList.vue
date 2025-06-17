<template>
  <div>
    <h2>Danh sách học sinh</h2>
    <div style="margin-bottom: 10px;">
      <label>Lớp:</label>
      <input v-model="selectedClass" placeholder="Nhập lớp" />
      <label style="margin-left: 10px;">Họ tên:</label>
      <input v-model="searchName" placeholder="Nhập họ tên" />
      <label style="margin-left: 10px;">Tuổi:</label>
      <input v-model="searchAge" placeholder="Nhập tuổi" type="number" />
      <button @click="onSearch" style="margin-left: 20px;">Tìm kiếm</button>
    </div>

    <button @click="goToCreate">Thêm học sinh</button>

    <table border="1">
      <thead>
        <tr><th>#</th><th>Họ tên</th><th>Ngày sinh</th><th>Tuổi</th><th>Lớp</th><th>Thao tác</th></tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in paginatedStudents" :key="student.id">
          <td>{{ index + 1 + (currentPage - 1) * 5 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.birthDate }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.className }}</td>
          <td>
            <button @click="editStudent(student.id)">Sửa</button>
            <button @click="deleteStudent(student.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :currentPage="currentPage" :totalPages="totalPages" @prev="prevPage" @next="nextPage" />
    <div v-if="message" style="color:green; margin-top:10px">{{ message }}</div>
  </div>
</template>

<script setup>
import { useStudentList } from '../composables/useStudentList';
import Pagination from '../components/Pagination.vue';

const {
  paginatedStudents, currentPage, totalPages,
  selectedClass, searchName, searchAge,
  deleteStudent, editStudent, goToCreate,
  prevPage, nextPage, applyFilter, message
} = useStudentList();

function onSearch() {
  currentPage.value = 1;
  applyFilter();
}
</script>
