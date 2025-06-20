<template>
  <div>
    <h2>{{ isEdit ? 'Sửa học sinh' : 'Thêm học sinh' }}</h2>

    <label>Họ tên:</label>
    <input v-model="student.name" type="text" />
    <p v-if="errors.name" style="color: red">{{ errors.name }}</p>

    <label>Ngày sinh:</label>
    <input v-model="student.birthDate" type="date" />
    <p v-if="errors.birthDate" style="color: red">{{ errors.birthDate }}</p>

    <label>Lớp:</label>
    <input
      v-model="searchClass"
      @input="filterClassOptions"
      @focus="showDropdown = true"
      @blur="handleBlur"
    />
    <ul
      v-if="showDropdown"
      style="border: 1px solid #ccc; max-height: 150px; overflow-y: auto; margin: 0; padding: 0;"
    >
      <li
        v-for="cls in filteredClassOptions"
        :key="cls"
        @click="selectClass(cls)"
        style="padding: 4px; cursor: pointer;"
      >
        {{ cls }}
      </li>
    </ul>
    <p v-if="errors.className" style="color: red">{{ errors.className }}</p>

    <button @click="handleSave">Lưu</button>
    <p v-if="message" style="color: green">{{ message }}</p>
  </div>
</template>

<script setup>
import { useStudentForm } from '../composables/useStudentForm';

const {
  student,
  errors,
  saveStudent,
  message,
  isEdit,
  searchClass,
  filteredClassOptions,
  filterClassOptions,
  showDropdown,
  selectClass
} = useStudentForm();

function handleBlur() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
}

function handleSave() {
  student.value.className = searchClass.value;
  saveStudent();
}
</script>
