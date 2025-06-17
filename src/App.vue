<template>
  <div>
    <h1>ezStudy</h1>
    <nav style="margin-bottom: 20px;">
      <router-link to="/">Học sinh</router-link> |
      <router-link to="/class-list">Lớp</router-link>
    </nav>
    <router-view />
  </div>
</template>
