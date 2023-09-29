<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md flex justify-around flex-col w-full space-y-8 h-full bg-white px-10  min-h-[450px]  shadow-sm rounded-3xl overflow-hidden  ">
            <div>
                <!-- <img class="mx-auto h-12 w-auto" src="https://tailwindcss.com/img/logos/workflow-mark-cyan-600.svg"
                    alt="Workflow"> -->
                <h2 class=" mt-6 text-center text-3xl font-extrabold text-gray-900">
                    تسجيل الدخول
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm ">
                    <div>
                        <label for="email-address" class="sr-only">البريد الإلكتروني</label>
                        <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                            :class="{ 'border-red-500': auth.status.error }" placeholder="البريد الإلكتروني">
                    </div>
                    <div>
                        <label for="password" class="sr-only">كلمة المرور</label>
                        <input id="password" v-model="password" name="password" type="password"
                            autocomplete="current-password" required placeholder="كلمة المرور"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                            :class="{ 'border-red-500': auth.status.error }">
                    </div>
                </div>
                <div class="text-red-500 text-center h-5 ">
                    <span v-if="auth.status.error">{{ auth.status.message }}</span>
                </div>
                <div>
                    <button type="submit" :disabled=auth.status.loading
                        class="group relative w-full flex justify-center gap-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                        تسجيل الدخول

                        <svg v-if="auth.status.loading" class="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z">
                            </path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
    await auth.login(email.value, password.value)
    router.push({ name: 'Home' })
}
</script>

