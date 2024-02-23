<template>
  <div class="container pb-16 pt-10 w-full">
    <div class="mb-5">
      <DateFilter :filter="getSalesStatistics" />
    </div>
    <div v-if="statistics.sales_count <= 0 && totalSales <= 0" class="text-center">لايوجد مدخلات اليوم </div>
    <div v-if="status.loading" class="flex justify-center items-center m-10">
      <Loading stroke-color="#8f8f8f" />
    </div>


    <div v-if="status.success && totalSales > 0"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[30px]">
      <CardDataStats title="صافي الأرباح" :total="String(profit)" levelUp>
        <!-- <CartGraph iconClasses="fill-primary" iconWidth="20" iconHeight="22" /> -->
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>

      <CardDataStats title="المصروفات" :total="String(expenses)" levelDown>
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>

      <CardDataStats title="إجمالي المبيعات" :total="String(totalSales)" levelUp>
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>

      <CardDataStats title="اجمالي الارباج" :total="String(profitWithoutExpenses)" levelUp>
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>


      <CardDataStats title="نسبة صافي الارباح من اجمالي المبيعات" :total="String(profitPercentageFromSales) + '%'">
        <Percentage iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>

      <CardDataStats title="نسبة الصرفيات من اجمالي الارباح " :total="String(expensesPercentageFromSalesProfit) + '%'">
        <Percentage iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>

      <CardDataStats title="نسبة صافي الارباح من اجمالي الارباح" :total="String(profitPercentageFromSalesProfit) + '%'">
        <Percentage iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>

      <CardDataStats title="نسبة اجمالي الارباح من اجمالي المبيعات" :total="String(salesProfitPercentageFromSales) + '%'">
        <Percentage iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>
    </div>

    <div class="mt-10">
      <DayFilter :filter="getSalesStatisticsByDay" />
    </div>
    <div v-if="status.success && statistics.sales_count <= 0" class="text-center">لايوجد مدخلات اليوم </div>

    <div v-if="status.success && statistics.sales_count > 0"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[30px] mt-10">
      <CardDataStats title="عدد المبيعات" :total="String(statistics.sales_count)" levelUp>
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>
      <CardDataStats title="إجمالي المبيعات" :total="String(statistics.total_sales)" levelUp>
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>
      <CardDataStats title="إجمالي الارباح" :total="String(statistics.total_profit)" levelUp>
        <Dollar iconClasses="fill-primary" iconWidth="20" iconHeight="22" />
      </CardDataStats>
    </div>



    <SalesList :sales="sales" v-if="statistics.sales_count > 0" />


    <div class="mt-6" v-if="statistics.sales_count > 0">


      <TransactionsList :transactions="transactions" :sales="transactions" />
    </div>






    <!-- <div className=" w-full mt-4   md:mt-6  2xl:mt-[30px]">
        <ChartOne :initialSeries="chartData" />
      </div> -->
  </div>
</template>
  
<script setup lang="ts">
import CardDataStats from "@/components/CardDataStats.vue";
import Dollar from "@/components/icons/Dollar.vue";
import Percentage from "@/components/icons/Percentage.vue";
import { dashboard as dashboardApi } from "@/services/api"
import DateFilter from "@/components/DateFilter.vue";
import { onMounted, ref, type Ref } from "vue";
import type { Status } from "@/Types";
import Loading from "@/components/icons/Loading.vue";
import type { DashboardSale, DashboardTransaction, DashboardStatistics } from "@/Types";
import SalesList from "../components/dashboard/SalesList.vue";
import TransactionsList from "../components/dashboard/TransactionsList.vue";
import DayFilter from "@/components/DayFilter.vue";

const profit = ref(0);
const expenses = ref(0);
const totalSales = ref(0);
const profitWithoutExpenses = ref(0);
const expensesPercentageFromSalesProfit = ref(0);
const profitPercentageFromSales = ref(0);
const profitPercentageFromSalesProfit = ref(0);
const salesProfitPercentageFromSales = ref(0);
const sales: Ref<DashboardSale[]> = ref([] as DashboardSale[]);
const transactions: Ref<DashboardTransaction[]> = ref([] as DashboardTransaction[])
const statistics: Ref<DashboardStatistics> = ref({} as DashboardStatistics);
const status: Ref<Status> = ref({
  success: false,
  loading: false,
  error: false,
  message: '',
})

//   const dummyChartData = [
//     {
//       name: 'Revenue',
//       data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 90, 80],
//     },
//     {
//       name: 'Sales',
//       data: [20, 35, 40, 45, 50, 55, 60, 70, 85, 90, 100, 110],
//     },
//   ];


//   const chartData = dummyChartData;

const getSalesStatistics = async (from = '', to = '') => {
  try {
    status.value.loading = true;
    status.value.error = false;
    const { data } = await dashboardApi.getSalesStatistics(from, to);
    profit.value = data.data.profit;
    expenses.value = data.data.expenses;
    totalSales.value = data.data.total_sales;
    profitWithoutExpenses.value = data.data.sales_profit;
    expensesPercentageFromSalesProfit.value = parseFloat((expenses.value / profitWithoutExpenses.value * 100).toFixed(2));
    profitPercentageFromSales.value = parseFloat((profit.value / totalSales.value * 100).toFixed(2));
    profitPercentageFromSalesProfit.value = parseFloat((profit.value / profitWithoutExpenses.value * 100).toFixed(2));
    salesProfitPercentageFromSales.value = parseFloat((profitWithoutExpenses.value / totalSales.value * 100).toFixed(2));
    status.value.success = true;
  } catch (error: any) {
    status.value.error = true;
    status.value.message = error.message;
  } finally {
    status.value.loading = false;
  }

};


const getSalesStatisticsByDay = async (date: string) => {
  try {
    status.value.loading = true;
    status.value.error = false;
    const { data } = await dashboardApi.getSalesStatisticsByDay(date);
    const response = data.data;

    sales.value = response.sales;
    transactions.value = response.transactions;
    statistics.value = response.statistics;

    console.log(sales.value[0])
    status.value.success = true;

  } catch (error: any) {
    status.value.error = true;
    status.value.message = error.message;
  } finally {
    status.value.loading = false;
  }
};

onMounted(async () => {
  const date = new Date();
  const todayDate = date.toISOString().split('T')[0];
  await getSalesStatistics(todayDate, todayDate);
  await getSalesStatisticsByDay(todayDate);
});
</script>


