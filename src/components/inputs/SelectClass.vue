<template>
  <div>
    <label>{{ label }}</label>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="">--Chọn lớp--</option>
      <option v-for="classItem in classList" :key="classItem" :value="classItem">
        {{ classItem }}
      </option>
    </select>
    <span v-if="error" style="color: red;">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  error: String,
  classList: Array,
});
</script>
