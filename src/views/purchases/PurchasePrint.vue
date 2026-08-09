<template>
  <!-- Everything here is chrome around the receipt. The printed document is
       #print and below, so nothing inside it may change. -->
  <section class="min-h-full px-4 py-6 -mt-8 -mx-8 bg-whiten sm:px-6">
    <div class="flex flex-wrap items-center justify-between max-w-2xl gap-3 mx-auto mb-4">
      <p class="text-sm text-body">
        <span class="font-bold text-black">فاتورة شراء رقم {{ purchase.id }}</span>
        <span class="mx-2 text-bodydark">|</span>
        <span>{{ ISO8601DateToHumanDate(purchase.created_at) }}</span>
      </p>
      <button
        @click="print"
        type="button"
        class="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-white transition rounded-lg bg-primary shadow-default hover:bg-opacity-90"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
          <path d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
          <path d="M6 14h12v7H6z" />
        </svg>
        طباعة
      </button>
    </div>
    <div class="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-default">
    <div id="print" dir="rtl" class="max-w-2xl mx-auto">
      <article class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
        <div class="md:rounded-b-md bg-white">
          <div class="p-9 border-b border-gray-200">
            <div class="space-y-6">
              <div class="flex justify-between items-top">
                <div class="space-y-4">
                  <div>
                    <img class="h-16 object-cover mb-4" :src="logo" />
                    <p class="font-bold text-lg">فاتورة شراء</p>
                    <p class="font-bold">معمل الصفا للاسفنج</p>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-400">حضرة السيد</p>
                    <p>{{ supplier.name }}</p>
                    <p v-if="supplier.email">{{ supplier.email }}</p>
                    <p>{{ supplier.phone }}</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <div>
                    <p class="font-medium text-sm text-gray-400">
                      تسلسل الفاتورة
                    </p>
                    <p>{{ purchase.id }}</p>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-400">
                      تاريخ انشاء الفاتورة
                    </p>
                    <p>{{ ISO8601DateToHumanDate(purchase.created_at) }}</p>
                  </div>
                  <div v-if="purchase.created_at != purchase.updated_at">
                    <p class="font-medium text-sm text-gray-400">
                      تاريخ تحديث الفاتورة
                    </p>
                    <p>{{ ISO8601DateToHumanDate(purchase.updated_at) }}</p>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-400">الحالة</p>
                    <p>{{ convertPurchaseStatusToArabic(purchase.status) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="purchase.note" class="p-9 border-b border-gray-200">
            <p class="font-medium text-sm text-gray-400">ملاحظات</p>
            <p class="text-sm">{{ purchase.note }}</p>
          </div>

          <table class="w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-3 py-4 text-right font-semibold text-gray-400"
                >
                  تسلسل
                </th>
                <th
                  scope="col"
                  class="px-3 py-4 text-right font-semibold text-gray-400"
                >
                  المنتج
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
                  class="px-3 py-3 text-right font-semibold text-gray-400"
                >
                  الخصم
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 text-right font-semibold text-gray-400"
                >
                  المبلغ الجزئي
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 text-right font-semibold text-gray-400"
                >
                  المبلغ الكلي
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(rawMaterial, index) in purchase.raw_materials"
                :key="rawMaterial.id"
              >
                <td class="px-3 text-gray-600 truncate">{{ index + 1 }}</td>
                <td class="px-3 py-5 space-x-1 flex items-center">
                  {{ rawMaterial.name }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ rawMaterial.quantity }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ rawMaterial.cost }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ rawMaterial.discount_amount }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ rawMaterial.subtotal }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ rawMaterial.total }}
                </td>
              </tr>
            </tbody>
          </table>

          <div
            class="space-y-3 flex flex-col justify-between items-center m-10"
          >
            <div
              class="=flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg"
            >
              <div>
                <p class="text-gray-500 text-sm">المجموع الجزئي</p>
              </div>
              <p class="text-gray-500 text-sm">
                {{ purchase.subtotal_amount }}
              </p>
            </div>
            <div
              class="=flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg"
            >
              <div>
                <p class="text-gray-500 text-sm">خصم</p>
              </div>
              <p class="text-gray-500 text-sm">
                {{ purchase.discount_amount }}
              </p>
            </div>
            <div
              class="=flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg"
            >
              <div>
                <p class="text-gray-500 text-sm">المجموع الكلي</p>
              </div>
              <p class="text-gray-500 text-sm">{{ purchase.total_amount }}</p>
            </div>
          </div>
          <div class="p-9 border-t border-gray-200">
            <p class="font-medium text-sm text-gray-400">منظم الفاتورة</p>
            <p class="text-sm">{{ purchase.user?.name }}</p>
          </div>
        </div>
      </article>
    </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import {
  ISO8601DateToHumanDate,
  convertPurchaseStatusToArabic,
  getPrintCssPath,
  printPageStyle,
} from "@/services/helper/helperFunctions";
import type { Purchase, Supplier } from "@/Types";
import logo from "@/assets/logo.png";
import printJS from "print-js";

const props = defineProps({
  purchase: {
    type: Object as () => Purchase,
    required: true,
  },
  supplier: {
    type: Object as () => Supplier,
    required: true,
  },
  closeDialog: {
    type: Function,
    required: true,
  },
  autoPrint: {
    type: Boolean,
    default: true,
  },
});

const print = () => {
  printJS({
    printable: "print",
    type: "html",
    css: getPrintCssPath(),
    scanStyles: false,
    targetStyles: ["*"],
    style: printPageStyle,
  });
};

// The save-and-print buttons want the browser dialog straight away. Opening a
// purchase from «عرض» is a preview instead: keep it on screen and let the طباعة
// button above it decide when to print.
onMounted(() => {
  if (!props.autoPrint) {
    return;
  }
  print();
  props.closeDialog();
});
</script>
