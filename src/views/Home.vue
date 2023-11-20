<template>
  <div class=" flex flex-col items-center justify-center min-h-screen py-2">
    <div>Hi {{ auth.user?.name }}</div>
    <div>this route is {{ router.currentRoute.value.name }}</div>
    <button @click="logout">Logout</button>
 >
  </div>
</template>

<script setup lang="ts"> 
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const logout = async () => {
  await auth.logout();
  router.push({ name: "Login" });
};
</script>
