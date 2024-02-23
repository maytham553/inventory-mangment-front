<template>
    <div>
        <button @click="toggleTable" class="flex items-center justify-between w-full mt-6   bg-gray-200 p-3 rounded-lg ">

            <h2 class="text-title-md font-bold text-black  ">تعاملات اليوم</h2>
            <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" :class="{
                'w-3 h-3 mr-2 text-black transform rotate-180': showTable,
                'w-3 h-3 mr-2 text-black': !showTable
            }" class="transition-transform duration-300">
                <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" />
            </svg>
        </button>

        <table v-if="showTable" class="min-w-full  divide-y divide-gray-200 ">
            <thead>
                <tr>
                    <th
                        class="p-1 py-2 whitespace-nowrap bg-gray-50 text-right text-md font-medium text-gray-500 uppercase tracking-wider">
                        الزبون</th>
                    <th
                        class="p-1 py-2 whitespace-nowrap bg-gray-50 text-right text-md font-medium text-gray-500 uppercase tracking-wider">
                        المقدار</th>
                    <th
                        class="p-1 py-2 whitespace-nowrap bg-gray-50 text-right text-md font-medium text-gray-500 uppercase tracking-wider">
                        المستخدم</th>
                    <th
                        class="p-1 py-2 whitespace-nowrap bg-gray-50 text-right text-md font-medium text-gray-500 uppercase tracking-wider">
                        النوع</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(transaction, index) in transactions" :key="index">

                    <td class="p-1 pr-2 whitespace-nowrap border-b border-gray-200 ">{{ transaction.customer_name }}</td>
                    <td class="p-1 pr-2 whitespace-nowrap border-b border-gray-200  ">{{ transaction.amount }}</td>
                    <td class="p-1 pr-2 whitespace-nowrap border-b border-gray-200 ">{{ transaction.user_name }}</td>
                    <td class="p-1 pr-2 whitespace-nowrap border-b border-gray-200 ">{{
                        convertTransactionTypeToArabic(transaction.type) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { convertTransactionTypeToArabic } from "@/services/helper/helperFunctions";
import type { DashboardTransaction } from "../../Types";

const props = defineProps({
    transactions: {
        type: Array as () => DashboardTransaction[],
        required: true
    }
});

const showTable = ref(false);

function toggleTable() {
    showTable.value = !showTable.value;
}
</script>
  