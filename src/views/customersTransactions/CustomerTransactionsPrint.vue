<template>
    <section class="bg-gray-100 py-20 px-10">
        <div class="flex justify-center items-center w-full">
            <button @click="print" type="button"
                class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded">
                طباعة
            </button>
        </div>
        <div id="print" dir="rtl" class="max-w-2xl mx-auto">
            <article class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                <div class="md:rounded-b-md bg-white">
                    <div class="p-9  border-gray-200">
                        <div class="border-b  border-gray-200">
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
                            <p class=" text-xs p-1 w-100 text-center text-gray-800 "> النجف - طريق بحر النجف - شارع المعامل
                            </p>
                        </div>

                        <div class="flex justify-between items-top py-2 gap-1">
                            <div class=" flex flex-col gap-2 flex-1 ">
                                <div class="border-2 p-1 rounded">
                                    <span class="border-l-2 rounded-lg p-1 "> حضرة السيد </span>
                                    <span class="mx-2">{{ props.customerName }}</span>
                                </div>
                            </div>

                            <div class="flex flex-col gap-2 flex-[0.8] ">
                                <div class="border-2 p-1 rounded">
                                    <span class="border-l-2 rounded-lg p-1 "> كشف حساب للمدة من </span>
                                    <span class="mx-2">{{ props.from }}</span>
                                </div>
                                <div class="border-2 p-1 rounded">
                                    <span class="border-l-2 rounded-lg p-1 "> الى </span>
                                    <span class="mx-2">{{ props.to }}</span>
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
                                    المبلغ
                                </th>
                                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                                    النوع
                                </th>
                                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                                    التاريخ
                                </th>
                                <th scope="col" class="px-4 py-4 text-center font-semibold text-gray-400 border ">
                                    ملاحظات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(transaction) in customerTransactions" :key="transaction.id">
                                <td class="px-4 text-gray-600 truncate text-center border ">{{ transaction.id }}</td>
                                <td class="px-4 py-2 space-x-1 flex items-center text-center border ">
                                    {{ transaction.amount }}
                                </td>
                                <td class="px-4 text-gray-600 truncate text-center border">
                                    {{ convertTransactionTypeToArabic(transaction.type) }}
                                </td>
                                <td class="px-4 text-gray-600 truncate text-center border">
                                    {{ ISO8601DateToHumanDate(transaction.created_at!) }}
                                </td>
                                <td class="px-4 text-gray-600 truncate text-center border">
                                    {{ transaction.note }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="flex m-2 w-[50%]">
                        <div class="flex-1 flex flex-col gap-2">

                            <div class="flex justify-between w-full border-2 p-2 rounded ">
                                <div>
                                    <p class="text-gray-500 text-sm">الرصيد الحالي</p>
                                </div>
                                <p class="text-gray-500 text-sm">{{ customerBalance }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
  
<script lang="ts" setup>
import { onMounted } from "vue";
import { ISO8601DateToHumanDate, convertTransactionTypeToArabic } from "@/services/helper/helperFunctions";
import type { Customer, CustomerTransaction } from "@/Types";
import logo from "@/assets/logo.png";
import printJS from "print-js";

const props = defineProps({
    customerTransactions: {
        type: Array as () => CustomerTransaction[],
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerId: {
        type: Number,
        required: true,
    },
    customerBalance: {
        type: Number,
        required: true,
    },
    closeDialog: {
        type: Function,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
});

const print = () => {
    printJS({
        printable: "print",
        type: "html",
        css: "./assets/index-60406bbf.css",
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
  