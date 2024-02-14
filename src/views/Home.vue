<template>
  <div class="container pb-16 pt-10 w-full h-screen bg-black flex justify-center items-center ">
    <div class="flex flex-col justify-center items-center gap-4">
      <h1 class="text-5xl text-white">مرحبا بك {{ userName }}</h1>
      <p class="text-2xl text-white">نوع الحساب: {{ adminType }}</p>

      <button @click="auth.logout" class="bg-primary text-white px-4 py-2 rounded-md">تسجيل خروج</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';
const auth = useAuthStore();
const router = useRouter();

const userName = auth.user?.name;
const adminType = auth.user?.type;
</script>
