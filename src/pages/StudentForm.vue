<template>
  <div>
    <h2>{{ isEdit ? 'Sửa học sinh' : 'Thêm học sinh' }}</h2>

    <form @submit.prevent="saveStudent">
      <InputText v-model="student.name" label="Họ và tên" :error="errors.name" />
      <InputDate v-model="student.birthday" label="Ngày sinh" :error="errors.birthday" :max="today" />
      <SelectClass v-model="student.class" label="Lớp" :error="errors.class" :classList="CLASS_LIST" />
      <button type="submit">Lưu</button>
    </form>

    <div v-if="message" style="color: green; margin-top: 10px;">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { useStudentForm } from '../composables/useStudentForm';
import { CLASS_LIST } from '../constants/classes';
import InputText from '../components/inputs/InputText.vue';
import InputDate from '../components/inputs/InputDate.vue';
import SelectClass from '../components/inputs/SelectClass.vue';

const { student, errors, today, saveStudent, isEdit, message } = useStudentForm();
</script>
