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

    if (authStore.isLoggedIn) {
        try {
            await authStore.fetchCurrentUser()
        } catch {
            // An expired or revoked token must not stop the app from starting:
            // anything thrown here would skip app.mount() and leave a blank
            // page. The axios interceptor has already cleared the token, and
            // the router guard sends the user to the login screen.
        }
    }

    app.use(router)
    app.mount('#app')
}

init().catch((error) => {
    console.error('Failed to start the application', error)
});





