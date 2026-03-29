<template>
  <div
    class="flex flex-col sm:flex-row flex-wrap justify-between items-stretch sm:items-center gap-3 bg-slate-100/90 p-4 rounded-xl border border-slate-200/80"
  >
    <div class="flex flex-wrap items-center gap-3 flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <label for="from" class="text-sm font-semibold text-slate-600 whitespace-nowrap">من</label>
        <input
          v-model="selectedFrom"
          type="date"
          id="from"
          class="border border-slate-300 rounded-lg py-2 px-3 text-sm bg-white focus:ring-2 focus:ring-secondary/30 focus:border-secondary outline-none"
          :max="maxDate"
          :min="minDate"
        />
      </div>
      <div class="flex items-center gap-2">
        <label for="to" class="text-sm font-semibold text-slate-600 whitespace-nowrap">إلى</label>
        <input
          v-model="selectedTo"
          type="date"
          id="to"
          class="border border-slate-300 rounded-lg py-2 px-3 text-sm bg-white focus:ring-2 focus:ring-secondary/30 focus:border-secondary outline-none"
          :min="toMin"
          :max="maxDate"
        />
      </div>
    </div>
    <div class="flex gap-2 shrink-0">
      <button
        v-if="showClearButton"
        type="button"
        @click="clearDates"
        class="text-slate-600 hover:bg-slate-200/80 font-semibold py-2 px-3 rounded-lg text-sm transition-colors"
      >
        مسح التاريخ
      </button>
      <button
        type="button"
        @click="filterByDate"
        class="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-5 rounded-lg text-sm shadow-sm transition-colors"
      >
        تطبيق التاريخ
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const getToday = () => new Date().toISOString().split("T")[0];
const getTwoYearsAgo = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 2);
  return d.toISOString().split("T")[0];
};

const today = getToday();

const props = defineProps({
  filter: {
    type: Function,
    required: true,
  },
  /** `today`: default range is today (dashboard). `none`: empty until user picks (expenses). */
  defaultRange: {
    type: String as () => "today" | "none",
    default: "today",
  },
});

const selectedFrom = ref(props.defaultRange === "today" ? today : "");
const selectedTo = ref(props.defaultRange === "today" ? today : "");

const maxDate = computed(() => getToday());
const minDate = computed(() => getTwoYearsAgo());
const toMin = computed(() => (selectedFrom.value ? selectedFrom.value : minDate.value));

const showClearButton = computed(
  () => props.defaultRange === "none" && (!!selectedFrom.value || !!selectedTo.value)
);

watch(
  () => props.defaultRange,
  (r) => {
    if (r === "today") {
      selectedFrom.value = today;
      selectedTo.value = today;
    }
  }
);

const filterByDate = () => {
  props.filter(selectedFrom.value, selectedTo.value);
};

const clearDates = () => {
  selectedFrom.value = "";
  selectedTo.value = "";
  props.filter("", "");
};
</script>
  