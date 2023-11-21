<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-gray-100 flex flex-col justify-between rounded-lg overflow-auto"
  >
    <div class="mb-4 h-auto overflow-y-auto bg-gray-200 rounded-xl">
      <table class="w-full divide-y divide-gray-100 text-xs font-bold">
        <thead>
          <tr>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              التسلسل
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              المادة الخام
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              الكمية
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              السعر
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              مبلغ الخصم
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              نسبة الخصم
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              المجموع الجزئي
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              المبلغ الكلي
            </th>
            <th
              scope="col"
              class="px-3 py-4 text-right font-semibold text-gray-400"
            >
              -
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(rawMaterial, index) in purchase.raw_materials"
            :key="rawMaterial.id"
            :class="{ 'bg-gray-100': index % 2 == 1 }"
          >
            <td class="px-3 text-gray-600 truncate text-center">
              {{ index + 1 }}
            </td>
            <td class="px-3 text-gray-600 truncate">{{ rawMaterial.name }}</td>
            <td class="px-3 text-gray-600 truncate">
              <input
                placeholder="الكمية"
                type="number"
                :id="'quantity' + rawMaterial.id"
                v-model="rawMaterial.quantity"
                class="rounded-xl px-2"
              />
            </td>
            <td class="px-3 text-gray-600 truncate">
              <input
                placeholder="السعر"
                type="number"
                :id="'unitPrice' + rawMaterial.id"
                v-model="rawMaterial.unit_price"
                class="rounded-xl px-2 w-[100px]"
              />
            </td>
            <td class="px-3 text-gray-600 truncate">
              <input
                placeholder="مبلغ الخصم"
                type="number"
                :id="'discountAmount' + rawMaterial.id"
                v-model="rawMaterial.discount_amount"
                class="rounded-xl px-2 w-[100px]"
              />
            </td>
            <td class="px-3 text-gray-600 truncate">
              {{ rawMaterial.discount_percentage }}
            </td>
            <td class="px-3 text-gray-600 truncate">
              {{ rawMaterial.subtotal }}
            </td>
            <td class="px-3 text-gray-600 truncate">{{ rawMaterial.total }}</td>
            <td class="px-3 text-gray-600 truncate">
              <button
                @click="removeItem(rawMaterial.id!)"
                type="button"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-1"
              >
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex container gap-1">
      <div class="flex w-1/2 flex-col gap-1">
        <div class="flex items-center w-72 justify-between">
          <label for="discountAmount">مبلغ الخصم</label>
          <input
            placeholder="مبلغ الخصم"
            type="number"
            id="discountAmount"
            v-model="purchase.discount_amount"
            class="w-[100px] text-left p-1 rounded-lg bg-gray-200"
          />
        </div>

        <div class="flex items-center w-72 justify-between">
          <label for="discountPercentage">نسبة الخصم</label>
          <span
            id="discountPercentage"
            class="min-w-[100px] text-left p-1 rounded-lg bg-gray-200"
          >
            {{ purchase.discount_percentage }}
          </span>
        </div>

        <div class="flex items-center w-72 justify-between">
          <label for="subtotalAmount">المجموع الجزئي</label>
          <span
            id="subtotalAmount"
            class="min-w-[100px] text-left p-1 rounded-lg bg-gray-200"
          >
            {{ purchase.subtotal_amount }}
          </span>
        </div>

        <div class="flex items-center w-72 justify-between">
          <label for="totalAmount">المجموع الكلي</label>

          <span
            id="totalAmount"
            class="min-w-[100px] text-left p-1 rounded-lg bg-gray-200"
          >
            {{ purchase.total_amount }}
          </span>
        </div>
      </div>
      <div class="flex w-1/2 flex-col gap-1 justify-between">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-10 justify-between">
            <label for="status">الحالة</label>
            <select
              id="status"
              v-model="purchase.status"
              required
              class="text-left p-1 py-2 rounded-lg bg-gray-200"
            >
              <option value="" disabled selected>اختر الحالة</option>
              <option
                v-for="status in PurchaseStatus"
                :key="status"
                :value="status"
              >
                {{ status }}
              </option>
            </select>
          </div>

          <div class="flex items-start w-full justify-start gap-5 my-2">
            <label for="note">ملاحظات</label>
            <textarea
              placeholder="ملاحظات"
              id="note"
              rows="5"
              v-model="purchase.note"
              class="p-1 rounded-lg w-full bg-gray-200"
            >
            </textarea>
          </div>
        </div>

        <div
          class="flex items-center py-1 justify-self-end justify-center gap-2"
        >
          <button
            type="submit"
            class="bg-secondary h-auto hover:bg-primary text-white font-bold py-2 px-4 rounded flex justify-center gap-3"
            :class="{ 'bg-blue-300': status.loading }"
            :disabled="status.loading"
          >
            {{ submitButtonText }}
            <Loading v-if="status.loading" class="-mr-1 ml-3" />
          </button>
          <button
            type="button"
            @click="handleSubmitAndPrint"
            class="bg-secondary h-auto hover:bg-primary text-white font-bold py-2 px-4 rounded flex justify-center gap-3"
            :class="{ 'bg-blue-300': status.loading }"
            :disabled="status.loading"
          >
            {{ submitButtonText + " و طباعة " }}
            <Loading v-if="status.loading" class="-mr-1 ml-3" />
          </button>

          <button
            type="button"
            @click="printWithoutSave"
            class="bg-secondary h-auto hover:bg-primary text-white font-bold py-2 px-4 rounded flex justify-center gap-3"
            :class="{ 'bg-blue-300': status.loading }"
            :disabled="status.loading"
          >
            طباعة
          </button>
          <div v-if="status.error" class="text-red-500 text-sm">
            {{ status.message }}
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Purchase, Status } from "../../Types";
import { PurchaseStatus } from "../../Types";
import { defineProps, onBeforeUpdate } from "vue";
import Loading from "@/components/icons/Loading.vue";

const props = defineProps({
  purchase: {
    type: Object as () => Purchase,
    required: true,
  },
  status: {
    type: Object as () => Status,
    required: true,
  },
  removeItem: {
    type: Function,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
  submitButtonText: {
    type: String,
    required: true,
  },
  reCalculatePurchaseAfterChange: {
    type: Function,
    required: true,
  },
  print: {
    type: Function,
    required: true,
  },
  closeDialog: {
    type: Function,
    required: false,
    default: () => {},
  },
  clearForm: {
    type: Function,
    required: false,
    default: () => {},
  },
});

const handleSubmit = async () => {
  await props.onSubmit(props.purchase);
};
const printWithoutSave = async () => {
  await props.print();
};
const handleSubmitAndPrint = async () => {
  await props.onSubmit(props.purchase, true);
  await props.print();
  props.clearForm();
};
const removeItem = (rawMaterialId: number) => {
  props.removeItem(rawMaterialId);
};

onBeforeUpdate(() => {
  props.reCalculatePurchaseAfterChange();
});
</script>
