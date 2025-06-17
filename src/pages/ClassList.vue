<template>
  <div>
    <h2>Danh sách lớp</h2>
    <div style="margin-bottom: 10px;">
      <label>Lọc khối:</label>
      <select v-model="selectedParent">
        <option value="">-- Tất cả --</option>
        <option v-for="p in CLASS_PARENTS" :key="p" :value="p">{{ p }}</option>
      </select>
      <button @click="onSearch" style="margin-left: 20px;">Tìm kiếm</button>
    </div>

    <button @click="goToCreate">Tạo lớp</button>

    <table border="1">
      <thead>
        <tr><th>#</th><th>Lớp</th><th>Thao tác</th></tr>
      </thead>
      <tbody>
        <template v-for="(group, parentIndex) in groupedClasses" :key="parentIndex">
          <tr><td colspan="3"><b>Khối {{ group.parent }}</b></td></tr>
          <tr v-for="(cls, index) in group.classes" :key="cls.id">
            <td>{{ index + 1 }}</td>
            <td>Lớp {{ cls.parent }}{{ cls.name }}</td>
            <td>
              <button @click="editClass(cls.id)">Sửa</button>
              <button @click="deleteClass(cls.id)">Xoá</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <Pagination :currentPage="currentPage" :totalPages="totalPages" @prev="prevPage" @next="nextPage" />
    <div v-if="message" style="color:green; margin-top:10px">{{ message }}</div>
  </div>
</template>

<script setup>
import { CLASS_PARENTS } from '../constants/classParents';
import { useClassList } from '../composables/useClassList';
import Pagination from '../components/Pagination.vue';

const {
  groupedClasses, currentPage, totalPages, selectedParent,
  deleteClass, editClass, goToCreate, prevPage, nextPage, applyFilter, message
} = useClassList();

function onSearch() {
  currentPage.value = 1;
  applyFilter();
}
</script>
