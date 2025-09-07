<template>
  <div
    :class="
      isDark
        ? 'min-h-screen bg-gray-900 text-gray-100'
        : 'min-h-screen bg-slate-50 text-black'
    "
  >
    <header
      :class="
        isDark
          ? 'bg-gray-800 border-b border-gray-700'
          : 'bg-white border-b border-slate-200'
      "
    >
      <div
        class="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1
          class="text-3xl font-bold text-center"
          :class="isDark ? 'text-gray-100' : 'text-slate-900'"
        >
          Bazi Lunar
        </h1>
        <button
          @click="isDark = !isDark"
          class="rounded-lg px-3 py-2 text-sm font-medium border transition-colors duration-200"
          :class="
            isDark
              ? 'bg-gray-700 text-gray-100 border-gray-500 hover:bg-gray-600 hover:text-white'
              : 'bg-white text-black border-gray-300 hover:bg-gray-200 hover:text-black'
          "
        >
          {{ isDark ? "☀️ Light" : "🌙 Dark" }}
        </button>
      </div>
    </header>
    <main class="max-w-4xl mx-auto py-8 px-4">
      <div
        :class="[
          isDark
            ? 'bg-gray-800 text-gray-100 border-gray-600'
            : 'bg-white/80 text-black border-slate-200',
          'rounded-xl shadow-sm border p-6 mb-8',
        ]"
      >
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              :class="
                isDark
                  ? 'block text-sm font-medium text-gray-200 mb-1'
                  : 'block text-sm font-medium text-slate-700 mb-1'
              "
              >Year</label
            >
            <input
              v-model="year"
              type="number"
              :class="
                isDark
                  ? 'w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-400'
                  : 'w-full px-3 py-2 border border-slate-300 rounded-lg'
              "
            />
          </div>
          <div>
            <label
              :class="
                isDark
                  ? 'block text-sm font-medium text-gray-200 mb-1'
                  : 'block text-sm font-medium text-slate-700 mb-1'
              "
              >Month</label
            >
            <input
              v-model="month"
              type="number"
              :class="
                isDark
                  ? 'w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-400'
                  : 'w-full px-3 py-2 border border-slate-300 rounded-lg'
              "
            />
          </div>
          <div>
            <label
              :class="
                isDark
                  ? 'block text-sm font-medium text-gray-200 mb-1'
                  : 'block text-sm font-medium text-slate-700 mb-1'
              "
              >Day</label
            >
            <input
              v-model="day"
              type="number"
              :class="
                isDark
                  ? 'w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-400'
                  : 'w-full px-3 py-2 border border-slate-300 rounded-lg'
              "
            />
          </div>
          <div>
            <label
              :class="
                isDark
                  ? 'block text-sm font-medium text-gray-200 mb-1'
                  : 'block text-sm font-medium text-slate-700 mb-1'
              "
              >Hour</label
            >
            <input
              v-model="hour"
              type="number"
              :class="
                isDark
                  ? 'w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-400'
                  : 'w-full px-3 py-2 border border-slate-300 rounded-lg'
              "
            />
          </div>
        </div>
        <button
          @click="fetchLunarData"
          :class="
            isDark
              ? 'w-full py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition'
              : 'w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition'
          "
        >
          Query
        </button>
      </div>
      <div v-if="loading" class="flex justify-center py-8">
        <span>Loading...</span>
      </div>
      <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
      <div
        v-if="result"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-stretch"
      >
        <div
          v-for="(value, key) in filteredResult"
          :key="key"
          :class="[
            isDark
              ? 'bg-gray-800 text-gray-100 border-gray-600'
              : 'bg-white/80 text-black border-slate-200',
            'rounded-xl shadow-sm border p-4 flex flex-col justify-between w-full',
          ]"
        >
          <div
            class="text-xs mb-2 uppercase tracking-wide font-semibold"
            :class="isDark ? 'text-blue-300' : 'text-blue-700'"
          >
            {{ key }}
          </div>
          <div
            class="text-xl font-bold break-words"
            :class="isDark ? 'text-yellow-200' : 'text-slate-700'"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </main>
    <footer
      :class="
        isDark
          ? 'bg-gray-900 text-gray-400 border-t border-gray-700'
          : 'bg-white text-gray-500 border-t border-slate-200'
      "
      class="py-8 text-center text-sm"
    >
      <p>
        Made with <span class="text-red-500">❤️</span> by
        <a
          href="https://github.com/leecheeyong"
          target="_blank"
          class="text-gray-700 hover:underline"
          >Chee Yong Lee</a
        >
      </p>
      <p class="mt-1">
        Project available as open source under the terms of
        <a
          href="https://github.com/leecheeyong/number-gua/blob/main/LICENSE"
          target="_blank"
          class="text-gray-700 hover:underline"
          >MIT License</a
        >
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isDark = ref(true);
const year = ref("");
const month = ref("");
const day = ref("");
const hour = ref("");
const result = ref(null);
const loading = ref(false);
const error = ref("");

const omitFields = [
  "chineseTimes",
  "year",
  "month",
  "day",
  "chineseTimesTenGod",
  "chineseTimeTenGod",
  "chineseYearTenGod",
  "chineseMonthTenGod",
  "chineseDayTenGod",
  "lunarPerMonthHasDays",
  "solarTermDistance",
  "purpleWhites",
];

const filteredResult = computed(() => {
  if (!result.value) return {};
  const obj = {};
  for (const key in result.value) {
    if (!omitFields.includes(key)) {
      obj[key] = result.value[key];
    }
  }
  return obj;
});

async function fetchLunarData() {
  error.value = "";
  result.value = null;
  loading.value = true;
  try {
    const url = `https://leecheeyong.vercel.app/lunar?year=${year.value}&month=${String(month.value).padStart(2, "0")}&date=${String(day.value).padStart(2, "0")}&hour=${String(hour.value).padStart(2, "0")}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    result.value = await res.json();
  } catch (e) {
    error.value = e.message || "Error occurred";
  } finally {
    loading.value = false;
  }
}
</script>
