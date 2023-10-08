<template class="font-['apple']">
    <div class="w-screen h-screen bg-gray-100 grid grid-cols-3">

    <div class="h-screen col-span-1 p-5 bg-blue-500 flex flex-col justify-center items-center">
                    <h1 class="text-gray-100 text-3xl">اهلاً بك مجدداً</h1><br>
                    <p class="text-gray-100">أدخل معلوماتك للدخول الى حسابك</p>
                </div>
        <div class="h-screen col-span-2  flex flex-col justify-center items-center pt-16">

                <h1 class="text-blue-500 text-4xl">تسجيل الدخول</h1>

                <form @submit.prevent="login" class="w-full h-screen flex flex-col justify-center items-center">
                    <input type="hidden" name="remember" value="true">

                    <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required
                        class="pr-4 appearance-none border border-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 
                            bg-gray-200 w-2/5 h-10 pl-5 rounded text-gray-500 text-sm placeholder:text-gray-500"
                        :class="{ 'border-red-500': auth.status.error }" placeholder="البريد الإلكتروني"><br>

                    <input v-model="password" name="password" type="password" autocomplete="current-password" required
                        class="pr-4 appearance-none border border-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 
                        bg-gray-200 w-2/5 h-10 pl-5 rounded text-gray-500 text-sm placeholder:text-gray-500"
                        :class="{ 'border-red-500': auth.status.error }" placeholder="كلمة المرور">
                    <br>

                    <button type="submit" :disabled=auth.status.loading
                        class="group relative w-1/3 flex justify-center gap-3 py-2 px-4 border border-transparent text-md font-medium rounded-2xl text-gray-100 bg-blue-500 hover:bg-blue-700 focus:outline-none ">
                        تسجيل الدخول
                        <svg v-if="auth.status.loading" class="animate-spin -mr-1 ml-3 h-5 w-5 text-gray-100"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z">
                            </path>
                        </svg>
                    </button>
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

