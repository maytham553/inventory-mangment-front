<template>
  <section class="px-10 py-20 bg-gray-100">
    <div class="flex items-center justify-center w-full">
      <button @click="print" type="button" class="px-4 py-2 font-bold text-white rounded bg-secondary hover:bg-primary">
        طباعة
      </button>
    </div>
    <div id="print" dir="rtl" class="max-w-2xl mx-auto">
      <article class="overflow-hidden shadow-none md:shadow-md md:rounded-md">
        <div class="bg-white md:rounded-b-md">
          <div class="border-gray-200 p-9">
            <div class="border-b border-gray-200">
              <div class="flex justify-between pb-6 items-top ">
                <div class="flex-1 space-y-4">
                  <div>
                    <p class="font-bold ">معمل الصفا لمنتوجات <br>الاسفنج والديباجات</p>
                    <p class="font-bold">٠٧٨٥٩٢٣٣٣٠٠</p>
                    <p class="font-bold">٠٧٨٠٥٨٢٣١٧٥</p>
                  </div>
                </div>
                <div class="flex items-center justify-center flex-1 space-y-2 ">
                  <img class="object-cover h-24 mb-4" :src="logo" />
                </div>
                <div class="flex-1 space-y-4" :dir="'ltr'">
                  <div>
                    <p class="font-bold">Al-Safa factory <br>For sponge and brocade</p>
                    <p class="font-bold">07859233300</p>
                    <p class="font-bold">07805823175</p>
                  </div>
                </div>
              </div>
              <p class="p-1 text-xs font-bold text-center text-gray-800 w-100"> النجف - طريق بحر النجف - شارع المعامل
              </p>
            </div>

            <div class="flex justify-between gap-1 py-2 items-top">
              <div class="flex flex-col flex-1 gap-2 ">
                <div class="p-1 border-2 rounded">
                  <span class="p-1 border-l-2 rounded-lg "> حضرة السيد </span>
                  <span class="mx-2">{{ customer.name }}</span>
                </div>
                <div class="p-1 border-2 rounded">
                  <span class="p-1 border-l-2 rounded-lg "> العنوان </span>
                  <span class="mx-2">{{ customer.address }}</span>
                </div>
                <div class="p-1 border-2 rounded">
                  <span class="p-1 border-l-2 rounded-lg "> هاتف الزبون </span>
                  <span class="mx-2">{{ customer.phone }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 flex-[0.8] ">
                <div class="p-1 border-2 rounded">
                  <span class="p-1 border-l-2 rounded-lg "> رقم القائمة </span>
                  <span class="mx-2">{{ sale.id }}</span>
                </div>
                <div class="p-1 border-2 rounded">
                  <span class="p-1 border-l-2 rounded-lg "> تاريخ الانشاء </span>
                  <span class="mx-2 text-xs">{{ ISO8601DateToHumanDate(sale.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>

          <table class="w-full">
            <thead>
              <tr>
                <th scope="col" class="px-4 py-4 text-xl font-bold text-center text-blue-900 border ">
                  #
                </th>
                <th scope="col" class="px-4 py-4 text-xl font-bold text-center text-blue-900 border ">
                  المنتج
                </th>
                <th scope="col" class="px-4 py-4 text-xl font-bold text-center text-blue-900 border ">
                  الكمية
                </th>
                <th scope="col" class="px-4 py-4 text-center text-blue-900 border text-xlfont-bold ">
                  السعر
                </th>
                <!-- <th scope="col" class="px-4 py-3 font-bold text-center text-blue-900 border ">
                  الخصم
                </th> -->
                <!-- <th scope="col" class="px-4 py-3 font-bold text-center text-blue-900 border ">
                  المبلغ الجزئي
                </th> -->
                <th scope="col" class="px-4 py-3 text-xl font-bold text-center text-blue-900 border ">
                  المبلغ الكلي
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in sale.products" :key="product.id">
                <td class="px-4 font-bold text-center text-gray-900 truncate border ">{{ index + 1 }}</td>
                <td class="flex items-center px-4 py-2 space-x-1 font-bold text-center border ">
                  {{ product.name }}
                </td>
                <td class="px-4 font-bold text-center text-gray-900 truncate border">
                  {{ product.quantity }}
                </td>
                <td class="px-4 font-bold text-center text-gray-900 truncate border">{{ product.unit_price }}</td>
                <!-- <td class="px-4 text-center text-gray-900 truncate border">
                  {{ product.discount_amount }}
                </td> -->
                <!-- <td class="px-4 text-center text-gray-900 truncate border">
                  {{ product.subtotal }}
                </td> -->
                <td class="px-4 font-bold text-center text-gray-900 truncate border">{{ product.total }}</td>

              </tr>
              <tr class="px-4 text-center text-gray-900 truncate border">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <!-- <td>{{ sumDiscount() }}</td>
                <td class="px-4 text-center text-gray-900 truncate border">{{ sale.subtotal_amount }}</td> -->
                <td class="px-4 font-bold text-center text-gray-900 truncate border">{{ sale.total_amount }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex m-2 w-[50%]">
            <div class="flex flex-col flex-1 gap-2">

              <div class="flex justify-between w-full p-2 border-2 rounded ">
                <div>
                  <p class="text-xl font-bold text-blue-900">المبلغ الكلي</p>
                </div>
                <p class="text-xl font-bold text-gray-900">{{ sale.total_amount }}</p>
              </div>
              <div class="flex justify-between w-full p-2 border-2 rounded ">
                <div>
                  <p class="text-xl font-bold text-blue-900">الرصيد السابق</p>
                </div>
                <p class="text-xl font-bold text-gray-900">{{ (sale.previous_balance || 0) * -1 }}</p>
              </div>
              <div class="flex justify-between w-full p-2 border-2 rounded ">
                <div>
                  <p class="text-xl font-bold text-blue-900">الرصيد الحالي</p>
                </div>
                <p class="text-xl font-bold text-gray-900">{{ ((sale.previous_balance || 0) - sale.total_amount) * -1 }}
                </p>
              </div>
            </div>

          </div>

          <div class="flex flex-col gap-4 m-10">
            <div v-if="sale.note" class="flex items-center">
              <span class="p-1 font-bold text-blue-900"> ملاحظات :</span>
              <span class="mx-2 text-gray-800">{{ sale.note }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-4 m-10">
            <div class="flex items-center">
              <span class="p-1 font-bold text-blue-900"> اسم السائق :</span>
              <span class="mx-2 font-bold text-gray-900">{{ sale.driver_name }}</span>
            </div>
            <div class="flex items-center">
              <span class="p-1 font-bold text-blue-900"> منظم الفاتورة :</span>
              <span class="mx-2 font-bold text-gray-900">{{ sale.user?.name }}</span>
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
    // css: "./assets/index-b0bdb90d.css",
    css: 'src/assets/main.css',
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
