<template>
  <div class="container pb-16 pt-10">
    <div class="flex items-center mb-8 px-5 gap-4 justify-between">
      <h1 class="text-4xl shrink-0 text-right font-bold text-secondary">النسخ الاحتياطية</h1>
      <button
        @click="create"
        :disabled="backupStatus.loading"
        class="bg-secondary hover:bg-primary text-white font-bold py-2 px-6 rounded flex items-center justify-center gap-3 disabled:opacity-60"
      >
        {{ backupStatus.loading ? "جاري العمل..." : "إنشاء نسخة احتياطية" }}
        <Loading v-if="backupStatus.loading" />
      </button>
    </div>

    <div class="px-5">
      <div
        class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm text-amber-900 leading-6"
      >
        <span v-if="keepLimit">
          يُحتفظ بآخر {{ keepLimit }} نسخة فقط، وتُحذف الأقدم تلقائياً عند إنشاء نسخة جديدة.
        </span>
        الملفات تحتوي بيانات النظام كاملة بما فيها بيانات المستخدمين — لا تشاركها.
      </div>

      <!-- While the delete dialog is open it shows this same message itself. -->
      <p v-if="backupStatus.error && !deletePopup" class="text-red-500 text-sm mb-4">
        {{ backupStatus.message }}
      </p>

      <div v-if="backupsStatus.loading" class="flex justify-center items-center py-10">
        <Loading stroke-color="#8f8f8f" />
      </div>
      <div v-else-if="backupsStatus.error" class="flex justify-center items-center py-10">
        <span class="text-red-500">{{ backupsStatus.message }}</span>
      </div>
      <div v-else-if="!backups.length" class="flex justify-center items-center py-10">
        <span class="text-gray-500">لا توجد نسخ احتياطية بعد</span>
      </div>

      <div
        v-else
        class="mb-4 overflow-x-auto shadow-md bg-white rounded-xl border border-slate-200/80"
      >
        <table class="w-full divide-y divide-slate-100 text-xs font-bold min-w-[640px]">
          <thead>
            <tr>
              <th class="px-3 py-4 font-semibold text-slate-500 text-right">اسم الملف</th>
              <th class="px-3 py-4 font-semibold text-slate-500 text-center">الحجم</th>
              <th class="px-3 py-4 font-semibold text-slate-500 text-center">تاريخ الإنشاء</th>
              <th class="px-3 py-4 font-semibold text-slate-500 text-center">عمليات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(item, index) in backups"
              :key="item.name"
              class="h-10 hover:bg-secondary/50"
              :class="{ 'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0 }"
            >
              <td class="px-3 text-gray-600 text-right truncate ltr">{{ item.name }}</td>
              <td class="px-3 text-gray-600 text-center truncate">
                {{ formatFileSize(item.size) }}
              </td>
              <td class="px-3 text-gray-600 text-center truncate ltr">
                {{ ISO8601DateToHumanDate(item.created_at) }}
              </td>
              <td class="px-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    class="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
                    @click="download(item)"
                  >
                    تحميل
                  </button>
                  <button
                    type="button"
                    class="bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                    @click="openDeleteDialog(item)"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <TrueOrFalseDialog
    v-if="deletePopup"
    title="حذف"
    :onClose="closeDeleteDialog"
    :closeDialog="closeDeleteDialog"
    :message="'هل تريد حذف النسخة ' + selected.name + '؟'"
    :trueText="'نعم'"
    :falseText="'لا'"
    :selectOption="handleDelete"
    :status="backupStatus"
  >
  </TrueOrFalseDialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBackupStore } from "../../stores";
import type { Backup } from "../../Types";
import Loading from "../../components/icons/Loading.vue";
import TrueOrFalseDialog from "@/components/TrueOrFalseDialog.vue";
import {
  ISO8601DateToHumanDate,
  formatFileSize,
} from "../../services/helper/helperFunctions";

const backupStore = useBackupStore();
const backups = storeToRefs(backupStore).backups;
const keepLimit = storeToRefs(backupStore).keepLimit;
const backupsStatus = storeToRefs(backupStore).backupsStatus;
const backupStatus = storeToRefs(backupStore).backupStatus;

const deletePopup = ref(false);
const selected = ref({} as Backup);

const create = async () => {
  try {
    await backupStore.createBackup();
  } catch {
    // the message is already on the store status
  }
};

const download = async (item: Backup) => {
  try {
    await backupStore.downloadBackup(item.name);
  } catch {
    // the message is already on the store status
  }
};

const openDeleteDialog = (item: Backup) => {
  selected.value = item;
  deletePopup.value = true;
};

const closeDeleteDialog = () => {
  deletePopup.value = false;
  selected.value = {} as Backup;
  backupStore.clearBackupStatus();
};

const handleDelete = async (approve: boolean) => {
  if (!approve) {
    closeDeleteDialog();
    return;
  }
  try {
    await backupStore.deleteBackup(selected.value.name);
    closeDeleteDialog();
  } catch {
    // the dialog stays open and shows the message
  }
};

onMounted(async () => {
  await backupStore.fetchBackups();
});
</script>
