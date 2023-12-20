<template>
  <!-- <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <div> {{ auth.user?.name }}</div>
    <div> {{ auth.user?.type }}</div> -->
    <div class="container pb-16 pt-10 ltr">

  
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[30px]">

    <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
      <EyeGraph iconClasses="fill-primary" iconWidth="22" iconHeight="16" />
    </CardDataStats>
    <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
      <CartGraph iconClasses="fill-primary" iconWidth="20" iconHeight="22" />

    </CardDataStats>
    <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
      <ShoppingBagGraph iconClasses="fill-primary" iconWidth="20" iconHeight="22" />


    </CardDataStats>
    <CardDataStats title="Total Users" total="3.456" rate="0.95%" :levelUp="false" :levelDown="true">
      <PeopleGraph iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
    </CardDataStats>
  </div>  
  
  <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-[30px] 2xl:gap-[30px]">
    
    <ChartOne  :initialSeries="chartData" />
  </div>
  </div>
</template>

<script setup lang="ts">
import CardDataStats from "@/components/CardDataStats.vue";
import ChartOne from "@/components/ChartOne.vue";
import EyeGraph from "@/components/icons/EyeGraph.vue";
import CartGraph from "@/components/icons/CartGraph.vue";
import ShoppingBagGraph from "@/components/icons/ShoppingBagGraph.vue";
import PeopleGraph from "@/components/icons/PeopleGraph.vue";
 
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";
 
const dummyChartData = [
  {
    name: 'Revenue',
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 90, 80],
  },
  {
    name: 'Sales',
    data: [20, 35, 40, 45, 50, 55, 60, 70, 85, 90, 100, 110],
  },
];
 
const chartData = dummyChartData;
 
const auth = useAuthStore();
const router = useRouter();
</script>
