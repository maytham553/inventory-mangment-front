<template>
  <div
    class="mb-4 h-auto overflow-x-auto overflow-y-auto shadow-md bg-white rounded-xl border border-slate-200/80"
  >
    <table class="w-full divide-y divide-slate-100 text-xs font-bold min-w-[640px]">
      <thead>
        <tr>
          <th class="pr-2 px-3 py-4 font-semibold text-slate-500 w-[20px]">التسلسل</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-right">الاسم</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-right">البريد الالكتروني</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-center">الصلاحية</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-center">تاريخ الانشاء</th>
          <th class="px-3 py-4 font-semibold text-slate-500 text-center">عمليات</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr
          v-for="user in users"
          :key="user.id"
          class="h-10 hover:bg-secondary/50"
          :class="{ 'bg-gray-100': user.id % 2 === 0, 'bg-white': user.id % 2 !== 0 }"
        >
          <td class="px-1 text-gray-600 w-[20px] truncate text-center">{{ user.id }}</td>
          <td class="px-1 text-gray-600 text-right truncate">{{ user.name }}</td>
          <td class="px-1 text-gray-600 text-right truncate ltr">{{ user.email }}</td>
          <td class="px-1 text-gray-600 text-center truncate">
            {{ convertUserTypeToArabic(user.type) }}
          </td>
          <td class="px-1 text-gray-600 text-center truncate ltr">
            {{ ISO8601DateToHumanDate(user.created_at || "") }}
          </td>
          <td class="px-1 text-center">
            <div class="flex items-center justify-center gap-2">
              <button
                type="button"
                class="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                @click="openUpdateDialog(user)"
              >
                تعديل
              </button>
              <button
                v-if="user.id !== currentUserId"
                type="button"
                class="bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                @click="openDeleteDialog(user)"
              >
                حذف
              </button>
              <span v-else class="text-slate-400 text-xs px-2 py-1">حسابك</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { User } from "../../Types";
import {
  ISO8601DateToHumanDate,
  convertUserTypeToArabic,
} from "../../services/helper/helperFunctions";

const props = defineProps({
  users: {
    type: Array as () => User[],
    required: true,
  },
  currentUserId: {
    type: Number,
    required: false,
  },
  openUpdateDialog: {
    type: Function,
    required: true,
  },
  openDeleteDialog: {
    type: Function,
    required: true,
  },
});
</script>
