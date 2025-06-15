<template>
  <div>
    <label>{{ label }}</label>
    <input
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :max="max"
    />
    <span v-if="error" style="color: red;">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  error: String,
  max: String,
});
</script>
