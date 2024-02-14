<template>
    <div class="rounded-sm border border-stroke bg-white py-6 px-[30px] shadow-default dark:border-strokedark dark:bg-boxdark">
      <div class="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <slot></slot>
      </div>
  
      <div class="mt-4 flex items-end justify-between">
        <div>
          <h4 class="text-title-md font-bold text-black dark:text-white">{{ total }}</h4>
          <span class="text-sm font-medium  text-black dark:text-white">{{ title }}</span>
        </div>
  
        <span :class="['flex items-center gap-1 text-sm font-medium', levelUp ? 'text-meta-3' : '', levelDown ? 'text-meta-5' : '']">
          {{ rate }}
          
          <svg v-if="levelUp" class="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill=""/>
          </svg>
          
          <svg v-if="levelDown" class="fill-meta-5" width="10" height="11" viewBox="0 0 10 11" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z" fill=""/>
          </svg>
        </span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
      title: {
          type: String,
          required: true
      },
      total: {
          type: String,
          required: true
      },
      rate: {
          type: String,
          required: false
      },
      levelUp: {
          type: Boolean,
          required: false
      },
      levelDown: {
          type: Boolean,
          default: false 
      }
  })
  </script>
  
  
 
  