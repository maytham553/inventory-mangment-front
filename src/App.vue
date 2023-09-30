<template>
  <div class="flex h-screen">
    <SideBar v-if="isLoginRoute" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue';
import { ref, watch } from 'vue';

const isLoginRoute = ref(false)
const route = useRoute()
watch(() => route.name, (name) => {
  if (name === 'Login') {
    isLoginRoute.value = false
  } else {
    isLoginRoute.value = true
  }
})


</script>