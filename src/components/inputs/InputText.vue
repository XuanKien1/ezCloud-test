<template>
  <div>
    <label>{{ label }}</label>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <span v-if="error" style="color: red;">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  error: String,
});
</script>
