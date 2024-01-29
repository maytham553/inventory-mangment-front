<template>
  <div class="flex justify-between items-center text-white flex-col h-full w-full sm:w-[20rem]  bg-black">
    <div
      class="flex justify-start items-start flex-col xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500 w-full">
      <div class="flex flex-col justify-end items-center px-6 border-b border-gray-200 w-full hover:bg-secondary/70">
        <button @click="toggleMenu3" class="text-left flex justify-between items-center w-full py-5">
          <div class="flex items-center justify-start gap-3">
            <People :size="25" fill="white" />
            <p class="text-[1.2rem] leading-5 uppercase">العملاء</p>
          </div>
          <div>
            <ArrowDown v-if="!menu3Visible" name="arrow-down" />
            <ArrowUp v-if="menu3Visible" name="arrow-up" />
          </div>
        </button>
        <div v-if="menu3Visible" class="flex flex-col justify-between items-start h-full pb-6 pr-5 w-full">
          <div class="flex justify-start flex-col items-start w-full text-gray-400">
            <RouterLink to="/customers"
              class="flex justify-start gap-4 items-center hover:bg-secondary/80 w-full rounded text-right py-2">
              <p class="text-base leading-4">كل العملاء</p>
            </RouterLink>
            <RouterLink to="/customers/create"
              class="flex justify-start items-center hover:bg-secondary/80 w-full gap-4 rounded text-right py-2">
              <p class="text-base leading-4">اضافة عميل</p>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-start items-center px-6 border-b border-gray-200 w-full hover:bg-secondary/70">
        <button @click="toggleMenu2" class="flex justify-between items-center w-full py-5">
          <div class="flex items-center justify-start gap-3">
            <Supplier :size="25" fill="white" />
            <p class="text-[1.2rem] leading-5 uppercase">الموردين</p>
          </div>

          <div>
            <ArrowDown v-if="!menu2Visible" name="arrow-down" />
            <ArrowUp v-if="menu2Visible" name="arrow-up" />
          </div>
        </button>
        <div v-if="menu2Visible" class="flex flex-col justify-between items-start h-full pb-6 pr-5  w-full">
          <div class="flex justify-start flex-col items-start w-full text-gray-400">
            <RouterLink to="/suppliers"
              class="flex justify-start items-center hover:bg-secondary/80 w-full gap-4 rounded-md text-right py-2">
              <!-- <AllSuppliers /> -->
              <p class="text-base leading-4">كل الموردين</p>
            </RouterLink>
            <RouterLink to="/suppliers/create"
              class="flex justify-start items-center gap-4 hover:bg-secondary/80 w-full rounded-md text-right py-2">
              <!-- <AddSupplier /> -->
              <p class="text-base leading-4">اضافة مورد</p>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="isAdmin" class="flex flex-col justify-start items-center px-6 border-b w-full hover:bg-secondary/70">
        <button @click="toggleMenu1" class="flex justify-between items-center w-full py-5">
          <div class="flex items-center justify-start gap-3">
            <Box />
            <p class="text-[1.2rem] leading-5 uppercase">المواد</p>
          </div>

          <div>
            <ArrowDown v-if="!menu1Visible" name="arrow-down" />
            <ArrowUp v-if="menu1Visible" name="arrow-up" />
          </div>
        </button>
        <div v-if="menu1Visible" class="flex flex-col justify-between items-start h-full pb-6 pr-5  w-full">
          <div class="flex justify-start flex-col items-start w-full text-gray-400">
            <RouterLink to="/products"
              class="flex justify-start w-full items-center hover:bg-secondary/80 gap-4 rounded-md text-right py-2">
              <p class="text-base leading-4">المنتجات</p>
            </RouterLink>
            <RouterLink to="/rawMaterials"
              class="flex justify-start items-center hover:bg-secondary/80 w-full gap-4 rounded-md text-right py-2">
              <!-- <Dolly /> -->
              <p class="text-base leading-4">المواد الخام</p>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="isAdmin"
        class="flex flex-col justify-start items-center px-6 border-b border-gray-200 w-full hover:text-white focus:bg-gray-700 focus:text-white hover:bg-secondary/70">
        <RouterLink to="/expenses" class="text-left gap-3 flex justify-start items-center w-full py-5">
          <Money :size="25" fill="white" />
          <p class="text-[1.2rem] leading-5 uppercase">صرفيات</p>
        </RouterLink>
      </div>
      <div v-if="isUser"
        class="flex flex-col justify-start items-center px-6 border-b border-gray-200 w-full hover:text-white focus:bg-gray-700 focus:text-white hover:bg-secondary/70">
        <RouterLink to="/expenses/create" class="text-left gap-3 flex justify-start items-center w-full py-5">
          <Money :size="25" fill="white" />
          <p class="text-[1.2rem] leading-5 uppercase">اضافة صرفيات</p>
        </RouterLink>
      </div>
    </div>
    <button @click="logout"
      class="text-left py-3 px-8 mb-3 gap-4 flex hover:bg-secondary/70 justify-start items-center w-full">
      <Logout name="logout" :size="25" />
      <p class="text-[1.2rem] leading-5 uppercase">تسجيل خروج</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import ArrowUp from "@/components/icons/ArrowUp.vue";
import Logout from "@/components/icons/Logout.vue";
import People from "./icons/People.vue";
import Box from "./icons/Box.vue";
import Supplier from "./icons/Supplier.vue";
import Money from "./icons/Money.vue";

const logout = async () => {
  const auth = useAuthStore();
  const router = useRouter();
  await auth.logout();
};
const menu1Visible = ref(false);
const menu2Visible = ref(false);
const menu3Visible = ref(false);
const isAdmin = useAuthStore().isAdmin;
const isUser = useAuthStore().isUser;

const toggleMenu1 = () => {
  menu1Visible.value = !menu1Visible.value;
};
const toggleMenu2 = () => {
  menu2Visible.value = !menu2Visible.value;
};
const toggleMenu3 = () => {
  menu3Visible.value = !menu3Visible.value;
};
</script>
