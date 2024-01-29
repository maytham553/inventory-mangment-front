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
          <div class="p-9  border-gray-200">
            <div class="border-b  border-gray-200" >
              <div class="flex justify-between items-top pb-6 ">
              <div class="space-y-4 flex-1">
                <div>
                  <p class="font-bold ">معمل الصفا لمنتوجات <br>الاسفنج والديباجات</p>
                  <p class="font-bold">٠٧٨٥٩٢٣٣٣٠٠</p>
                  <p class="font-bold">٠٧٨٠٥٨٨٣١٧٥</p>
                </div>
              </div>
              <div class="space-y-2 flex-1 flex justify-center items-center ">
                <img class="h-24 object-cover mb-4" :src="logo" />
              </div>
              <div class="space-y-4 flex-1" :dir="'ltr'">
                <div>
                  <p class="font-bold">Al-Safa factory <br>For sponge and brocade</p>
                  <p class="font-bold">07859233300</p>
                  <p class="font-bold">07805883175</p>
                </div>
              </div>
            </div>
            <p class=" text-xs p-1 w-100 text-center text-gray-800 ">  النجف - طريق بحر النجف - شارع المعامل</p>
            </div>
            
            <div class="flex justify-between items-top py-2 gap-1">
              <div class=" flex flex-col gap-2 flex-1 ">
                <div class="border-2 p-1 rounded">
                  <span class="border-l-2 rounded-lg p-1 "> حضرة السيد </span>
                  <span class="mx-2">{{ customer.name }}</span>
                </div>
                <div class="border-2 p-1 rounded">
                  <span class="border-l-2 rounded-lg p-1 "> العنوان </span>
                  <span class="mx-2">{{ customer.address }}</span>
                </div>
                <div class="border-2 p-1 rounded">
                  <span class="border-l-2 rounded-lg p-1 "> الهاتف </span>
                  <span class="mx-2">{{ customer.phone }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 flex-[0.8] ">
                <div class="border-2 p-1 rounded">
                  <span class="border-l-2 rounded-lg p-1 "> رقم القائمة </span>
                  <span class="mx-2">{{ sale.id }}</span>
                </div>
                <div class="border-2 p-1 rounded">
                  <span class="border-l-2 rounded-lg p-1 "> تاريخ الانشاء </span>
                  <span class="mx-2 text-xs">{{ ISO8601DateToHumanDate(sale.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>

          <table class="w-full">
            <thead>
              <tr>
                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                  #
                </th>
                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                  المنتج
                </th>
                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                  الكمية
                </th>
                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                  السعر
                </th>
                <th scope="col" class="px-4 py-3 text-center font-semibold text-gray-400 border ">
                  الخصم
                </th>
                <th scope="col" class="px-4 py-3 text-center font-semibold text-gray-400 border ">
                  المبلغ الجزئي
                </th>
                <th scope="col" class="px-4 py-3 text-center font-semibold text-gray-400 border ">
                  المبلغ الكلي
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in sale.products" :key="product.id">
                <td class="px-4 text-gray-600 truncate text-center border ">{{ index + 1 }}</td>
                <td class="px-4 py-2 space-x-1 flex items-center text-center border ">
                  {{ product.name }}
                </td>
                <td class="px-4 text-gray-600 truncate text-center border">
                  {{ product.quantity }}
                </td>
                <td class="px-4 text-gray-600 truncate text-center border">{{ product.unit_price }}</td>
                <td class="px-4 text-gray-600 truncate text-center border">
                  {{ product.discount_amount }}
                </td>
                <td class="px-4 text-gray-600 truncate text-center border">
                  {{ product.subtotal }}
                </td>
                <td class="px-4 text-gray-600 truncate text-center border">{{ product.total }}</td>

              </tr>
              <tr class="px-4 text-gray-600 truncate text-center border">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {{ sumDiscount() }}
                </td>
                <td class="px-4 text-gray-600 truncate text-center border">{{ sale.subtotal_amount }}</td>
                <td class="px-4 text-gray-600 truncate text-center border">{{ sale.total_amount }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex m-2 w-[50%]">
            <div class="flex-1 flex flex-col gap-2">
             
              <div class="flex justify-between w-full border-2 p-2 rounded ">
                <div>
                  <p class="text-gray-500 text-sm">المبلغ الكلي</p>
                </div>
                <p class="text-gray-500 text-sm">{{ sale.total_amount }}</p>
              </div>
              <div class="flex justify-between w-full border-2 p-2 rounded ">
                <div>
                  <p class="text-gray-500 text-sm">الرصيد السابق</p>
                </div>
                <p class="text-gray-500 text-sm">{{ (sale.previous_balance || 0) * -1 }}</p>
              </div>
              <div class="flex justify-between w-full border-2 p-2 rounded ">
                <div>
                  <p class="text-gray-500 text-sm">الرصيد الحالي</p>
                </div>
                <p class="text-gray-500 text-sm">{{ ((sale.previous_balance || 0) - sale.total_amount) * -1 }}</p>
              </div>
            </div>

          </div>

          <div class="flex flex-col gap-5 m-10  ">
            <div>
              <span class="p-1"> اسم السائق :</span>
              <span class="mx-2">{{ sale.driver_name }}</span>
            </div>
            <div v-if="sale.note">
              <span class="p-1"> ملاحظات :</span>
              <span class="mx-2">{{ sale.note }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-5 m-10  ">
            <div>
              <span class="p-1"> معرف منظم الفاتورة :</span>
              <span class="mx-2">{{ sale.user_id }}</span>
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

const sumDiscount = () => {
  return props.sale.products.reduce((acc, product) => acc + (product.discount_amount * product.quantity!), 0);
}

const print = () => {
  printJS({
    printable: "print",
    type: "html",
    css: "./assets/index-60406bbf .css",
    // css: 'src/assets/main.css',
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
