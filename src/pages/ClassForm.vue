<template>
  <div>
    <h2>{{ isEdit ? 'Sửa lớp' : 'Thêm lớp' }}</h2>
    <form @submit.prevent="saveClass">
      <div>
        <label>Khối:</label>
        <select v-model="cls.parent">
          <option value="">-- Chọn khối chính --</option>
          <option v-for="p in CLASS_PARENTS" :key="p" :value="p">{{ p }}</option>
        </select>
        <span style="color:red">{{ errors.parent }}</span>
      </div>

      <div>
        <label>Lớp:</label>
        <input v-model="cls.name" />
        <span style="color:red">{{ errors.name }}</span>
      </div>

      <button type="submit">Lưu</button>
      <div v-if="message" style="color:green">{{ message }}</div>
    </form>
  </div>
</template>

<script setup>
import { useClassForm } from '../composables/useClassForm';
import { CLASS_PARENTS } from '../constants/classParents';
const { cls, errors, saveClass, message, isEdit } = useClassForm();
</script>
