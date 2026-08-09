<template>
  <div class="container pb-16 pt-10">
    <div class="flex items-center mb-10 px-5 gap-4 justify-between">
      <h1 class="text-4xl shrink-0 text-right font-bold text-secondary">المستخدمين</h1>
      <div class="flex-1 min-w-0 flex items-center justify-center">
        <Search
          :handleSearch="handleUsersSearch"
          placeholder="التسلسل، الاسم، البريد الالكتروني، الصلاحية"
        />
      </div>
      <button
        @click="openCreatePopup"
        class="text-green-500 flex items-center justify-center gap-3 hover:text-green-700 font-bold relative"
      >
        <span
          class="absolute text-green-500 inset-0 flex items-center px-5 py-1 justify-center opacity-0 hover:opacity-100 transition duration-200 delay-75 rounded-r-full ease-in-out transform hover:translate-x-12"
        >
          إضافة
        </span>

        <PlusIcon :size="50" />
      </button>
    </div>

    <div v-if="usersStatus.loading" class="flex justify-center items-center h-full">
      <Loading stroke-color="#8f8f8f" />
    </div>
    <div v-if="usersStatus.error" class="flex justify-center items-center h-full">
      <span class="text-red-500 text-center h-5">
        <span>{{ usersStatus.message }}</span>
      </span>
    </div>
    <div
      v-if="usersStatus.success && !users.length"
      class="flex justify-center items-center h-full"
    >
      <span class="text-gray-500 text-center h-5">
        <span>لا يوجد مستخدمين</span>
      </span>
    </div>
    <UsersList
      v-if="usersStatus.success && users.length"
      :users="users"
      :currentUserId="currentUserId"
      :openUpdateDialog="openUpdateDialog"
      :openDeleteDialog="openDeleteDialog"
    />
  </div>

  <EmptyDialog
    v-if="createPopup"
    title="إضافة مستخدم"
    :onClose="closeCreatePopup"
    :closeDialog="closeCreatePopup"
  >
    <CreateUser :create="createUser" :status="userStatus" />
  </EmptyDialog>
  <EmptyDialog
    v-if="updatePopup"
    title="تعديل مستخدم"
    :onClose="closeUpdatePopup"
    :closeDialog="closeUpdatePopup"
  >
    <UpdateUser :update="updateUser" :status="userStatus" :user="user" />
  </EmptyDialog>
  <TrueOrFalseDialog
    v-if="deletePopup"
    title="حذف"
    :onClose="closeDeletePopup"
    :closeDialog="closeDeletePopup"
    :message="'هل تريد حذف المستخدم ' + user.name + '؟'"
    :trueText="'نعم'"
    :falseText="'لا'"
    :selectOption="handleDelete"
    :status="userStatus"
  >
  </TrueOrFalseDialog>
  <div class="flex items-center w-full bg-white justify-center">
    <PaginationItems
      v-if="!usersStatus.error && users.length"
      :currentPage="pagination.currentPage"
      :totalPages="pagination.lastPage"
      :goToPage="(page: number) => usersStore.fetchUsers(page)"
    />
  </div>
</template>

<script setup lang="ts">
import UsersList from "./UsersList.vue";
import CreateUser from "./CreateUser.vue";
import UpdateUser from "./UpdateUser.vue";
import { useUsersStore, useAuthStore } from "../../stores";
import { computed, onMounted, ref } from "vue";
import type { User } from "../../Types";
import Loading from "../../components/icons/Loading.vue";
import EmptyDialog from "../../components/EmptyDialog.vue";
import { storeToRefs } from "pinia";
import PaginationItems from "../../components/PaginationItems.vue";
import TrueOrFalseDialog from "@/components/TrueOrFalseDialog.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import Search from "@/components/Search.vue";

const usersStore = useUsersStore();
const authStore = useAuthStore();

const currentUserId = computed(() => authStore.user?.id);

const handleUsersSearch = (page: number, search: string) => {
  usersStore.fetchUsers(page, search);
};
const createPopup = ref(false);
const updatePopup = ref(false);
const deletePopup = ref(false);
const usersStatus = storeToRefs(usersStore).usersStatus;
const userStatus = storeToRefs(usersStore).userStatus;
const user = storeToRefs(usersStore).user;
const users = storeToRefs(usersStore).users;
const pagination = storeToRefs(usersStore).pagination;

const openCreatePopup = () => {
  createPopup.value = true;
};
const closeCreatePopup = () => {
  createPopup.value = false;
  usersStore.setUser({} as User);
  usersStore.clearUserStatus();
};
const openUpdateDialog = (user: User) => {
  updatePopup.value = true;
  usersStore.setUser(user);
};
const closeUpdatePopup = () => {
  updatePopup.value = false;
  usersStore.setUser({} as User);
  usersStore.clearUserStatus();
};
const openDeleteDialog = (user: User) => {
  deletePopup.value = true;
  usersStore.setUser(user);
};
const closeDeletePopup = () => {
  deletePopup.value = false;
  usersStore.setUser({} as User);
  usersStore.clearUserStatus();
};
const createUser = async (newUser: User) => {
  await usersStore.createUser(newUser);
  closeCreatePopup();
};
const updateUser = async (id: number, updatedUser: User) => {
  await usersStore.updateUser(id, updatedUser);
  closeUpdatePopup();
};
const handleDelete = async (approve: boolean) => {
  if (!approve) {
    closeDeletePopup();
    return;
  }
  if (user.value.id) {
    await usersStore.deleteUser(user.value.id);
    closeDeletePopup();
  }
};

onMounted(async () => {
  await usersStore.fetchUsers(1);
});
</script>
