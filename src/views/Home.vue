<template>
  <div class=" flex flex-col items-center justify-center min-h-screen py-2">
    <div> {{ auth.user?.name }}</div>
    <div> {{ auth.user?.type }}</div>
    
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
</script>
