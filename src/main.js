import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initData } from './initData';

initData();

createApp(App).use(router).mount('#app');
