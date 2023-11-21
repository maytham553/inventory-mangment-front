<!-- From New Branch -->
<template>
  <div class="lg:w-screen relative z-10 lg:h-screen mx-auto p-0 bg-gray-100">
    <!-- <div class="h-screen col-span-1 p-5 bg-secondary flex flex-col justify-center items-center">
            <h1 class="text-gray-100 font-black	 text-3xl">اهلاً بك مجدداً</h1><br>
            <p class="text-gray-100 font-bold ">أدخل معلوماتك للدخول الى حسابك</p>
                                                                                                        </div> -->
    <div
      class="h-screen col-span-2 flex flex-col justify-center items-center pt-16"
    >
      <h1 class="text-secondary text-4xl font-bold">تسجيل الدخول</h1>
      <p class="my-5 text-gray-500">أدخل معلوماتك للدخول الى حسابك</p>
      <form
        @submit.prevent="login"
        class="w-full mt-10 flex flex-col md:w-2/5 px-10 justify-center items-center"
      >
        <input type="hidden" name="remember" value="true" />

        <input
          id="email-address"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="pr-4 appearance-none border focus:ring-secondary focus:border-secondary focus:outline-none bg-gray-200 w-full h-10 pl-5 rounded-xl text-gray-500 text-sm placeholder:text-gray-500"
          :class="{ 'border-red-500': auth.status.error }"
          placeholder="البريد الإلكتروني"
        /><br />

        <input
          v-model="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="pr-4 appearance-none border focus:ring-secondary focus:border-secondary focus:outline-none bg-gray-200 w-full h-10 pl-5 rounded-xl text-gray-500 text-sm placeholder:text-gray-500"
          :class="{ 'border-red-500': auth.status.error }"
          placeholder="كلمة المرور"
        />
        <br />
        <div v-if="auth.status.error" class="text-red-500 text-center h-10">
          <span>{{ auth.status.message }}</span>
        </div>
        <button
          type="submit"
          :disabled="auth.status.loading"
          class="group relative w-full flex justify-center gap-3 py-2 px-4 border border-transparent text-md font-medium rounded-2xl text-gray-100 bg-secondary hover:bg-primary focus:outline-none"
        >
          تسجيل الدخول
          <Loading v-if="auth.status.loading" />
        </button>
      </form>
    </div>

    <BgView />
  </div>
</template>

<script setup lang="ts">
import BgView from "@/components/icons/BgView.vue";
import Loading from "@/components/icons/Loading.vue";
import { useAuthStore } from "@/stores";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
  await auth.login(email.value, password.value);
};
</script>
