import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts';
import { useAuthStore } from './stores'

async function init() {
    const app = createApp(App)
    app.use(createPinia())
    app.use(VueApexCharts);
    const authStore = useAuthStore()
    authStore.isLoggedIn &&  await authStore.fetchCurrentUser()
    app.use(router)
    app.mount('#app')
}
init();





