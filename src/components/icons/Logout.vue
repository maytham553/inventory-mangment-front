// logout svg 
<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12H16M16 12L12 16M16 12L12 8" :stroke="strokeColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M22 2L22 22L2 22L2 2L22 2Z" stroke="currentColor" stroke-width="2" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        size: {
            type: Number,
            default: 24,
        },
        strokeColor: {
            type: String,
            default: 'currentColor',
        },
    },
});
</script>