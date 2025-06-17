<template>
  <div style="margin-top: 20px;">
    <button @click="$emit('prev')" :disabled="currentPage <= 1">Trước</button>
    <span style="margin: 0 10px;">{{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('next')" :disabled="currentPage >= totalPages">Sau</button>
  </div>
</template>

<script setup>
defineProps(['currentPage', 'totalPages']);
</script>
