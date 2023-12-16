import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores'

async function init() {
    const app = createApp(App)
    app.use(createPinia())
    const authStore = useAuthStore()
    authStore.isLoggedIn &&  await authStore.fetchCurrentUser()
    app.use(router)
    app.mount('#app')
}
init();





