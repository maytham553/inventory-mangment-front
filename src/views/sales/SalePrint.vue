<template>
  <section class="bg-gray-100 py-20 px-10">
    <div class="flex justify-center items-center w-full">
      <button @click="print" type="button" class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded">
        طباعة
      </button>
    </div>
    <div id="print" dir="rtl" class="max-w-2xl mx-auto">
      <article class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
        <div class="md:rounded-b-md bg-white">
          <div class="p-9 border-b border-gray-200">
            <div class="space-y-6">
              <div class="flex justify-between items-top">
                <div class="space-y-4">
                  <div>
                    <img class="h-16 object-cover mb-4" :src="logo" />
                    <p class="font-bold text-lg">فاتورة بيع</p>
                    <p class="font-bold">معمل الصفا لمنتوجات الاسفنج والديباجات</p>
                    <p class="font-bold"> العراق - النجف - طريق بحر النجف - شارع المعامل</p>
                    <p class="font-bold">07859233300</p>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-400">حضرة السيد</p>
                    <p>{{ customer.name }}</p>
                    <p v-if="customer.email">{{ customer.email }}</p>
                    <p>{{ customer.phone }}</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <div>
                    <p class="font-medium text-sm text-gray-400">
                      تسلسل الفاتورة
                    </p>
                    <p>{{ sale.id }}</p>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-400">
                      تاريخ انشاء الفاتورة
                    </p>
                    <p>{{ ISO8601DateToHumanDate(sale.created_at) }}</p>
                  </div>
                  <div v-if="sale.created_at != sale.updated_at">
                    <p class="font-medium text-sm text-gray-400">
                      تاريخ تحديث الفاتورة
                    </p>
                    <p>{{ ISO8601DateToHumanDate(sale.updated_at) }}</p>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-gray-400">الحالة</p>
                    <p>{{ convertPurchaseStatusToArabic(sale.status) }}</p>
                  </div> 
                  <div>
                    <p class="font-medium text-sm text-gray-400">معرف منظم الفاتورة</p>
                    <p>{{ sale.user_id
                     }}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div v-if="sale.note" class="p-9 border-b border-gray-200">
            <p class="font-medium text-sm text-gray-400">ملاحظات</p>
            <p class="text-sm">{{ sale.note }}</p>
          </div>
          <table class="w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th scope="col" class="px-3 py-4 text-right font-semibold text-gray-400">
                  تسلسل
                </th>
                <th scope="col" class="px-3 py-4 text-right font-semibold text-gray-400">
                  المنتج
                </th>
                <th scope="col" class="px-3 py-4 text-right font-semibold text-gray-400">
                  الكمية
                </th>
                <th scope="col" class="px-3 py-4 text-right font-semibold text-gray-400">
                  السعر
                </th>
                <th scope="col" class="px-3 py-3 text-right font-semibold text-gray-400">
                  الخصم
                </th>
                <th scope="col" class="px-3 py-3 text-right font-semibold text-gray-400">
                  المبلغ الجزئي
                </th>
                <th scope="col" class="px-3 py-3 text-right font-semibold text-gray-400">
                  المبلغ الكلي
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(product, index) in sale.products" :key="product.id">
                <td class="px-3 text-gray-600 truncate">{{ index + 1 }}</td>
                <td class="px-3 py-5 space-x-1 flex items-center">
                  {{ product.name }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ product.quantity }}
                </td>
                <td class="px-3 text-gray-600 truncate">{{ product.price }}</td>
                <td class="px-3 text-gray-600 truncate">
                  {{ product.discount_amount }}
                </td>
                <td class="px-3 text-gray-600 truncate">
                  {{ product.subtotal }}
                </td>
                <td class="px-3 text-gray-600 truncate">{{ product.total }}</td>
              </tr>
            </tbody>
          </table>

          <div class="space-y-3 flex flex-col justify-between items-center m-10">
            <div class="flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg">
              <div>
                <p class="text-gray-500 text-sm">المجموع الجزئي</p>
              </div>
              <p class="text-gray-500 text-sm">
                {{ sale.subtotal_amount }}
              </p>
            </div>
            <div class="flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg">
              <div>
                <p class="text-gray-500 text-sm">خصم</p>
              </div>
              <p class="text-gray-500 text-sm">{{ sale.discount_amount }}</p>
            </div>
            <div class="flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg">
              <div>
                <p class="text-gray-500 text-sm">المجموع الكلي</p>
              </div>
              <p class="text-gray-500 text-sm">{{ sale.total_amount }}</p>
            </div>
            <div class="flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg">
              <div>
                <p class="text-gray-500 text-sm">الرصيد السابق</p>
              </div>
              <p class="text-gray-500 text-sm">{{ (sale.previous_balance || 0) * -1 }}</p>
            </div>
            <div class="flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg">
              <div>
                <p class="text-gray-500 text-sm">الرصيد الحالي</p>
              </div>
              <p class="text-gray-500 text-sm">{{ ((sale.previous_balance || 0) - sale.total_amount) * -1 }}</p>
            </div>
            <div class="flex justify-between w-full border-b-2 bg-gray-200 p-2 rounded-lg">
              <div>
                <p class="text-gray-500 text-sm">اسم السائق</p>
              </div>
              <p class="text-gray-500 text-sm">{{ sale.driver_name }}</p>
            </div>
          </div>
        </div>  
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import {
  ISO8601DateToHumanDate,
  convertPurchaseStatusToArabic,
} from "@/services/helper/helperFunctions";
import type { Customer, Sale } from "@/Types";
import logo from "@/assets/logo.png";
import printJS from "print-js";

const props = defineProps({
  sale: {
    type: Object as () => Sale,
    required: true,
  },
  customer: {
    type: Object as () => Customer,
    required: true,
  },
  closeDialog: {
    type: Function,
    required: true,
  },
});

const print = () => {
  printJS({
    printable: "print",
    type: "html",
    css: "./assets/index-60698d9d.css",
    scanStyles: false,
    targetStyles: ["*"],
    style: `
        @media print {
            .print {
                width: 100%;
                height: 100%;
                overflow: scroll;
            }
        }
        `,
  });
};

onMounted(() => {
  print();
  props.closeDialog();
});
</script>
