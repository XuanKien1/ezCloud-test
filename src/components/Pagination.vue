<template>
  <div style="margin-top: 10px;">
    <button @click="$emit('prev')" :disabled="currentPage === 1">Trước</button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('next')" :disabled="currentPage === totalPages">Sau</button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
});
</script>
