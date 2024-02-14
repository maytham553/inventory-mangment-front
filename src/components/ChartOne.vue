<template>
    <div
        class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-[30px] pb-5 shadow-default  sm:px-[30px] xl:col-span-8 w-full">
        <div class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div class="flex w-full flex-wrap gap-3 sm:gap-5">
                <div class="flex min-w-[11.875rem]">
                    <span
                        class="mt-1 mr-2 flex h-4 w-full max-w-[16px] items-center justify-center rounded-full border border-primary">
                        <span class="block h-[10px] w-full max-w-[10px] rounded-full bg-primary"></span>
                    </span>
                    <div class="w-full">
                        <p class="font-semibold text-primary">Total Revenue</p>
                        <p class="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                    </div>
                </div>
                <div class="flex  min-w-[11.875rem]">
                    <span
                        class="mt-1 mr-2 flex h-4 w-full max-w-[16px] items-center justify-center rounded-full border border-secondary">
                        <span class="block h-[10px] w-full max-w-[10px] rounded-full bg-secondary"></span>
                    </span>
                    <div class="w-full">
                        <p class="font-semibold text-secondary">Total Sales</p>
                        <p class="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full max-w-[11.25rem] justify-end">
                <div class="inline-flex gap-2 items-center rounded-md bg-whiter p-[6px]">
                    <button
                        class="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card    "
                        @click="changeInterval('day')">
                        Day
                    </button>
                    <button
                        class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card "
                        @click="changeInterval('week')">
                        Week
                    </button>
                    <button
                        class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card "
                        @click="changeInterval('month')">
                        Month
                    </button>
                </div>
            </div>
        </div>

        <div>
            <div   class="-ml-5">
                <apexchart :options="chartOptions" :series="chartData" type="area" height="350"  />  
      
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

import { ref, defineProps } from 'vue';


const ChartProps = defineProps({
    initialSeries: {
        type: Array as () => { name: string; data: number[] }[],
        required: true,
    },
});

const chartOptions = ref({
    legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
            enabled: true,
            color: '#623CEA14',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },

        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: '#fff',
        strokeColors: ['#3056D3', '#80CAEE'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
            size: undefined,
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: 'category',
        categories: [
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: '0px',
            },
        },
        min: 0,
        max: 100,
    },
});

const chartData = ref(ChartProps.initialSeries);

const changeInterval = (interval: string) => {

    console.log(`Interval changed to ${interval}`);
};



</script>
  