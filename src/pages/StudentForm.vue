<template>
  <div>
    <h2>{{ isEdit ? 'Sửa học sinh' : 'Thêm học sinh' }}</h2>
    <form @submit.prevent="saveStudent">
      <div>
        <label>Họ tên:</label>
        <input v-model="student.name" />
        <span style="color:red">{{ errors.name }}</span>
      </div>

      <div>
        <label>Ngày sinh:</label>
        <input v-model="student.birthDate" type="date" />
        <span style="color:red">{{ errors.birthDate }}</span>
      </div>

      <div style="position: relative;">
        <label>Lớp:</label>
        <input v-model="searchClass" @input="filterClassOptions" @focus="showDropdown = true" placeholder="Nhập lớp cần tìm" />
        <ul v-if="showDropdown && filteredClassOptions.length" style="position:absolute; border:1px solid #ccc; width:200px; max-height:150px; overflow:auto; background:white; z-index:10; padding:0; margin:0;">
          <li v-for="cls in filteredClassOptions" :key="cls"
              style="list-style:none; padding:5px; cursor:pointer;"
              @click="selectClass(cls)">
            {{ cls }}
          </li>
        </ul>
        <span style="color:red">{{ errors.className }}</span>
      </div>

      <button type="submit">Lưu</button>
      <div v-if="message" style="color:green">{{ message }}</div>
    </form>
  </div>
</template>

<script setup>
import { useStudentForm } from '../composables/useStudentForm';
const {
  student, errors, saveStudent, message, isEdit,
  searchClass, filteredClassOptions, filterClassOptions,
  showDropdown, selectClass
} = useStudentForm();
</script>
