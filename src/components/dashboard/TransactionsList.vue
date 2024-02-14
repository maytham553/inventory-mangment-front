<template>
    <div>
        <div v-for="(transaction , index ) in transactions" :key="index">
            <div class="flex justify-between items-center">
                <p>{{ transaction.amount }}</p>
                <p>
                   {{ convertTransactionTypeToArabic(transaction.type) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { convertTransactionTypeToArabic } from "@/services/helper/helperFunctions";
import type { DashboardTransaction } from "../../Types";

const props = defineProps({
    transactions: {
        type: Array as () => DashboardTransaction[],
        required: true
    },
})

</script>