<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none">
        <path d="M18 15L12 9L6 15" :stroke="strokeColor" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
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
  
  
  
  
  
  
  