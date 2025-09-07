<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-slate-900 text-center">
          Number Gua
        </h1>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8">
      <div
        class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-8"
      >
        <label
          for="phone"
          class="block text-sm font-medium text-slate-700 mb-3"
        >
          Enter your phone number
        </label>
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            id="phone"
            v-model="phoneNumber"
            type="text"
            placeholder="Enter phone number..."
            class="w-full sm:flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 text-lg"
            @input="calculateGua"
          />
          <button
            @click="clearInput"
            class="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200 font-medium"
          >
            Clear
          </button>
        </div>
        <p class="text-sm text-slate-500 mt-2">Numbers only (0-9)</p>
      </div>

      <div v-if="results" class="flex flex-col md:flex-row md:gap-8 w-full">
        <section class="flex-1 w-full mb-8 md:mb-0">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">
            主卦（当下）
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer"
              @click="zhuGuaTopClicked = !zhuGuaTopClicked"
            >
              <h3 class="text-lg font-medium text-slate-700 mb-4">
                上卦 ({{ results.totalNumberMod > 3 ? "用" : "体" }})
              </h3>
              <div class="flex items-center gap-4">
                <div class="text-4xl">{{ results.zhuGua.top.symbol }}</div>
                <div>
                  <div
                    v-if="!zhuGuaTopClicked"
                    class="text-xl font-semibold text-slate-900"
                  >
                    {{ results.zhuGua.top.bagua }}
                  </div>
                  <div v-if="!zhuGuaTopClicked" class="text-sm text-slate-600">
                    {{ results.zhuGua.top.element }}
                  </div>
                  <div
                    v-if="zhuGuaTopClicked"
                    class="text-xs text-slate-500 mt-1"
                  >
                    Sum: {{ results.zhuGua.top.sumOfDigits }} <br />
                    Mod: {{ results.zhuGua.top.mod }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer"
              @click="zhuGuaBottomClicked = !zhuGuaBottomClicked"
            >
              <h3 class="text-lg font-medium text-slate-700 mb-4">
                下卦 ({{ results.totalNumberMod < 4 ? "用" : "体" }})
              </h3>
              <div class="flex items-center gap-4">
                <div class="text-4xl">{{ results.zhuGua.bottom.symbol }}</div>
                <div>
                  <div
                    v-if="!zhuGuaBottomClicked"
                    class="text-xl font-semibold text-slate-900"
                  >
                    {{ results.zhuGua.bottom.bagua }}
                  </div>
                  <div
                    v-if="!zhuGuaBottomClicked"
                    class="text-sm text-slate-600"
                  >
                    {{ results.zhuGua.bottom.element }}
                  </div>
                  <div
                    v-if="zhuGuaBottomClicked"
                    class="text-xs text-slate-500 mt-1"
                  >
                    Sum: {{ results.zhuGua.bottom.sumOfDigits }} <br />
                    Mod: {{ results.zhuGua.bottom.mod }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-4"
          >
            <div class="flex flex-row items-center justify-center gap-8">
              <div class="flex flex-col items-center">
                <div class="text-4xl">
                  {{
                    results.totalNumberMod > 3
                      ? results.zhuGua.bottom.symbol
                      : results.zhuGua.top.symbol
                  }}
                  →
                  {{
                    results.totalNumberMod > 3
                      ? results.zhuGua.top.symbol
                      : results.zhuGua.bottom.symbol
                  }}
                </div>
                <div class="text-xs text-slate-500 mt-1">
                  {{
                    results.totalNumberMod > 3
                      ? results.zhuGua.bottom.element
                      : results.zhuGua.top.element
                  }}
                  →
                  {{
                    results.totalNumberMod > 3
                      ? results.zhuGua.top.element
                      : results.zhuGua.bottom.element
                  }}
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div
                  :class="[
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.zhuGua.bottom.element : results.zhuGua.top.element}/${results.totalNumberMod > 3 ? results.zhuGua.top.element : results.zhuGua.bottom.element}`
                    ].type == '吉'
                      ? 'bg-green-200'
                      : 'bg-red-200',
                    'text-xl font-semibold text-slate-900 py-2 px-4.5 rounded-t-lg',
                  ]"
                >
                  {{
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.zhuGua.bottom.element : results.zhuGua.top.element}/${results.totalNumberMod > 3 ? results.zhuGua.top.element : results.zhuGua.bottom.element}`
                    ].type
                  }}
                </div>
                <div
                  :class="[
                    bgColorDescription[
                      elementConnectionGua[
                        `${results.totalNumberMod > 3 ? results.zhuGua.bottom.element : results.zhuGua.top.element}/${results.totalNumberMod > 3 ? results.zhuGua.top.element : results.zhuGua.bottom.element}`
                      ].description
                    ],
                    'text-xl font-semibold text-slate-900 p-2 rounded-b-lg',
                  ]"
                >
                  {{
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.zhuGua.bottom.element : results.zhuGua.top.element}/${results.totalNumberMod > 3 ? results.zhuGua.top.element : results.zhuGua.bottom.element}`
                    ].description
                  }}
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-lg font-bold text-slate-700 mt-4">
                {{
                  sixtyFourGua[
                    `${results.zhuGua.top.bagua}/${results.zhuGua.bottom.bagua}`
                  ]
                    ? sixtyFourGua[
                        `${results.zhuGua.top.bagua}/${results.zhuGua.bottom.bagua}`
                      ].guaName
                    : "Unknown"
                }}
              </div>
              <div
                class="text-xs text-slate-400 mt-1 cursor-pointer select-none"
                @click="showFullZhuGuaMeaning = !showFullZhuGuaMeaning"
              >
                {{ zhuGuaMeaningDisplay }}
              </div>
            </div>
          </div>
        </section>

        <section class="flex-1 w-full mb-8 md:mb-0">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">
            互卦（过程）
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h3 class="text-lg font-medium text-slate-700 mb-4">
                上卦 ({{ results.totalNumberMod > 3 ? "用" : "体" }})
              </h3>
              <div class="flex items-center gap-4">
                <div class="text-4xl">{{ results.huGua.top.symbol }}</div>
                <div>
                  <div class="text-xl font-semibold text-slate-900">
                    {{ results.huGua.top.bagua }}
                  </div>
                  <div class="text-sm text-slate-600">
                    {{ results.huGua.top.element }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h3 class="text-lg font-medium text-slate-700 mb-4">
                下卦 ({{ results.totalNumberMod < 4 ? "用" : "体" }})
              </h3>
              <div class="flex items-center gap-4">
                <div class="text-4xl">{{ results.huGua.bottom.symbol }}</div>
                <div>
                  <div class="text-xl font-semibold text-slate-900">
                    {{ results.huGua.bottom.bagua }}
                  </div>
                  <div class="text-sm text-slate-600">
                    {{ results.huGua.bottom.element }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-4"
          >
            <div class="flex flex-row items-center justify-center gap-8">
              <div class="flex flex-col items-center">
                <div class="text-4xl">
                  {{
                    results.totalNumberMod > 3
                      ? results.huGua.bottom.symbol
                      : results.huGua.top.symbol
                  }}
                  →
                  {{
                    results.totalNumberMod > 3
                      ? results.huGua.top.symbol
                      : results.huGua.bottom.symbol
                  }}
                </div>
                <div class="text-xs text-slate-500 mt-1">
                  {{
                    results.totalNumberMod > 3
                      ? results.huGua.bottom.element
                      : results.huGua.top.element
                  }}
                  →
                  {{
                    results.totalNumberMod > 3
                      ? results.huGua.top.element
                      : results.huGua.bottom.element
                  }}
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div
                  :class="[
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.huGua.bottom.element : results.huGua.top.element}/${results.totalNumberMod > 3 ? results.huGua.top.element : results.huGua.bottom.element}`
                    ].type == '吉'
                      ? 'bg-green-200'
                      : 'bg-red-200',
                    'text-xl font-semibold text-slate-900 py-2 px-4.5 rounded-t-lg',
                  ]"
                >
                  {{
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.huGua.bottom.element : results.huGua.top.element}/${results.totalNumberMod > 3 ? results.huGua.top.element : results.huGua.bottom.element}`
                    ].type
                  }}
                </div>
                <div
                  :class="[
                    bgColorDescription[
                      elementConnectionGua[
                        `${results.totalNumberMod > 3 ? results.huGua.bottom.element : results.huGua.top.element}/${results.totalNumberMod > 3 ? results.huGua.top.element : results.huGua.bottom.element}`
                      ].description
                    ],
                    'text-xl font-semibold text-slate-900 p-2 rounded-b-lg',
                  ]"
                >
                  {{
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.huGua.bottom.element : results.huGua.top.element}/${results.totalNumberMod > 3 ? results.huGua.top.element : results.huGua.bottom.element}`
                    ].description
                  }}
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-lg font-bold text-slate-700 mt-4">
                {{
                  sixtyFourGua[
                    `${results.huGua.top.bagua}/${results.huGua.bottom.bagua}`
                  ]
                    ? sixtyFourGua[
                        `${results.huGua.top.bagua}/${results.huGua.bottom.bagua}`
                      ].guaName
                    : "Unknown"
                }}
              </div>
              <div
                class="text-xs text-slate-400 mt-1 cursor-pointer select-none"
                @click="showFullHuGuaMeaning = !showFullHuGuaMeaning"
              >
                {{ huGuaMeaningDisplay }}
              </div>
            </div>
          </div>
        </section>

        <section class="flex-1 w-full mb-8 md:mb-0">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">
            之卦（结果）
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h3 class="text-lg font-medium text-slate-700 mb-4">
                上卦 ({{ results.totalNumberMod > 3 ? "用" : "体" }})
              </h3>
              <div class="flex items-center gap-4">
                <div class="text-4xl">{{ results.ziGua.top.symbol }}</div>
                <div>
                  <div class="text-xl font-semibold text-slate-900">
                    {{ results.ziGua.top.bagua }}
                  </div>
                  <div class="text-sm text-slate-600">
                    {{ results.ziGua.top.element }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h3 class="text-lg font-medium text-slate-700 mb-4">
                下卦 ({{ results.totalNumberMod < 4 ? "用" : "体" }})
              </h3>
              <div class="flex items-center gap-4">
                <div class="text-4xl">{{ results.ziGua.bottom.symbol }}</div>
                <div>
                  <div class="text-xl font-semibold text-slate-900">
                    {{ results.ziGua.bottom.bagua }}
                  </div>
                  <div class="text-sm text-slate-600">
                    {{ results.ziGua.bottom.element }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-4"
          >
            <div class="flex flex-row items-center justify-center gap-8">
              <div class="flex flex-col items-center">
                <div class="text-4xl">
                  {{
                    results.totalNumberMod > 3
                      ? results.ziGua.bottom.symbol
                      : results.ziGua.top.symbol
                  }}
                  →
                  {{
                    results.totalNumberMod > 3
                      ? results.ziGua.top.symbol
                      : results.ziGua.bottom.symbol
                  }}
                </div>
                <div class="text-xs text-slate-500 mt-1">
                  {{
                    results.totalNumberMod > 3
                      ? results.ziGua.bottom.element
                      : results.ziGua.top.element
                  }}
                  →
                  {{
                    results.totalNumberMod > 3
                      ? results.ziGua.top.element
                      : results.ziGua.bottom.element
                  }}
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div
                  :class="[
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.ziGua.bottom.element : results.ziGua.top.element}/${results.totalNumberMod > 3 ? results.ziGua.top.element : results.ziGua.bottom.element}`
                    ].type == '吉'
                      ? 'bg-green-200'
                      : 'bg-red-200',
                    'text-xl font-semibold text-slate-900 py-2 px-4.5 rounded-t-lg',
                  ]"
                >
                  {{
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.ziGua.bottom.element : results.ziGua.top.element}/${results.totalNumberMod > 3 ? results.ziGua.top.element : results.ziGua.bottom.element}`
                    ].type
                  }}
                </div>
                <div
                  :class="[
                    bgColorDescription[
                      elementConnectionGua[
                        `${results.totalNumberMod > 3 ? results.ziGua.bottom.element : results.ziGua.top.element}/${results.totalNumberMod > 3 ? results.ziGua.top.element : results.ziGua.bottom.element}`
                      ].description
                    ],
                    'text-xl font-semibold text-slate-900 p-2 rounded-b-lg',
                  ]"
                >
                  {{
                    elementConnectionGua[
                      `${results.totalNumberMod > 3 ? results.ziGua.bottom.element : results.ziGua.top.element}/${results.totalNumberMod > 3 ? results.ziGua.top.element : results.ziGua.bottom.element}`
                    ].description
                  }}
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-lg font-bold text-slate-700 mt-4">
                {{
                  sixtyFourGua[
                    `${results.ziGua.top.bagua}/${results.ziGua.bottom.bagua}`
                  ]
                    ? sixtyFourGua[
                        `${results.ziGua.top.bagua}/${results.ziGua.bottom.bagua}`
                      ].guaName
                    : "Unknown"
                }}
              </div>
              <div
                class="text-xs text-slate-400 mt-1 cursor-pointer select-none"
                @click="showFullZiGuaMeaning = !showFullZiGuaMeaning"
              >
                {{ ziGuaMeaningDisplay }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
  <footer class="py-8 text-center text-gray-500 text-sm">
    <p>
      Made with <span class="text-red-500">❤️</span> by
      <a
        href="https://github.com/leecheeyong"
        target="_blank"
        class="text-gray-700 hover:underline"
      >
        Chee Yong Lee
      </a>
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
</template>

<script setup>
import { ref, computed } from "vue";

const phoneNumber = ref("");
const results = ref(null);
const zhuGuaTopClicked = ref(false);
const zhuGuaBottomClicked = ref(false);

const showFullZhuGuaMeaning = ref(false);
const showFullHuGuaMeaning = ref(false);
const showFullZiGuaMeaning = ref(false);

import {
  trigram,
  elementConnectionGua,
  sixtyFourGua,
} from "./composables/data.js";

const bgColorDescription = {
  生入: "bg-green-400",
  克出: "bg-yellow-200",
  比旺: "bg-blue-200",
  克入: "bg-red-400",
  生出: "bg-red-300",
};

const zhuGuaMeaningDisplay = computed(() => {
  if (!results.value) return "";
  const key = `${results.value.zhuGua.top.bagua}/${results.value.zhuGua.bottom.bagua}`;
  const meaning = sixtyFourGua[key]?.meaning || "";
  if (meaning.length > 90 && !showFullZhuGuaMeaning.value) {
    return meaning.slice(0, 90) + "...";
  }
  return meaning;
});

const huGuaMeaningDisplay = computed(() => {
  if (!results.value) return "";
  const key = `${results.value.huGua.top.bagua}/${results.value.huGua.bottom.bagua}`;
  const meaning = sixtyFourGua[key]?.meaning || "";
  if (meaning.length > 90 && !showFullHuGuaMeaning.value) {
    return meaning.slice(0, 90) + "...";
  }
  return meaning;
});

const ziGuaMeaningDisplay = computed(() => {
  if (!results.value) return "";
  const key = `${results.value.ziGua.top.bagua}/${results.value.ziGua.bottom.bagua}`;
  const meaning = sixtyFourGua[key]?.meaning || "";
  if (meaning.length > 90 && !showFullZiGuaMeaning.value) {
    return meaning.slice(0, 90) + "...";
  }
  return meaning;
});

function arraysEqualInOrder(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function getHuGua(top, bottom, direction) {
  const huGuaTopIndex = trigram[top.mod.toString()].index;
  const huGuaBottomIndex = trigram[bottom.mod.toString()].index;
  if (direction === "top") {
    return [huGuaTopIndex[1], huGuaTopIndex[2], huGuaBottomIndex[0]];
  } else {
    return [huGuaTopIndex[2], huGuaBottomIndex[0], huGuaBottomIndex[1]];
  }
}

function calculateGua() {
  const phone = phoneNumber.value.replace(/\D/g, "");
  if (!phone || phone.length === 0) {
    results.value = null;
    return;
  }
  const length = phone.length;
  const processedPhone = phone.split("0").join("8");
  let part1, part2;
  if (length % 2 === 0) {
    part1 = processedPhone.slice(0, length / 2);
    part2 = processedPhone.slice(length / 2);
  } else {
    part1 = processedPhone.slice(0, -Math.round(length / 2));
    part2 = processedPhone.slice(Math.floor(length / 2));
  }

  const zhuGuaTop = {
    sumOfDigits: part1.split("").reduce((sum, digit) => sum + Number(digit), 0),
    mod: part1.split("").reduce((sum, digit) => sum + Number(digit), 0) % 8,
  };

  const zhuGuaBottom = {
    sumOfDigits: part2.split("").reduce((sum, digit) => sum + Number(digit), 0),
    mod: part2.split("").reduce((sum, digit) => sum + Number(digit), 0) % 8,
  };

  if (zhuGuaTop.mod === 0) zhuGuaTop.mod = 8;
  if (zhuGuaBottom.mod === 0) zhuGuaBottom.mod = 8;

  Object.assign(zhuGuaTop, trigram[zhuGuaTop.mod.toString()]);
  Object.assign(zhuGuaBottom, trigram[zhuGuaBottom.mod.toString()]);

  const huGuaTop = Object.values(trigram).find((gua) =>
    arraysEqualInOrder(gua.index, getHuGua(zhuGuaTop, zhuGuaBottom, "top")),
  );
  const huGuaBottom = Object.values(trigram).find((gua) =>
    arraysEqualInOrder(gua.index, getHuGua(zhuGuaTop, zhuGuaBottom, "bottom")),
  );

  const totalNumber = zhuGuaTop.sumOfDigits + zhuGuaBottom.sumOfDigits;
  let totalNumberMod = totalNumber % 6;
  if (totalNumberMod === 0) totalNumberMod = 6;

  const ziGuaIndex = [...zhuGuaTop.index, ...zhuGuaBottom.index];
  const changeIndex = ziGuaIndex.length - totalNumberMod;
  ziGuaIndex[changeIndex] = ziGuaIndex[changeIndex] === 1 ? 0 : 1;

  const ziGuaTop = Object.values(trigram).find((gua) =>
    arraysEqualInOrder(gua.index, ziGuaIndex.slice(0, 3)),
  );
  const ziGuaBottom = Object.values(trigram).find((gua) =>
    arraysEqualInOrder(gua.index, ziGuaIndex.slice(3, 6)),
  );

  results.value = {
    zhuGua: { top: zhuGuaTop, bottom: zhuGuaBottom },
    huGua: { top: huGuaTop, bottom: huGuaBottom },
    ziGua: { top: ziGuaTop, bottom: ziGuaBottom },
    totalNumberMod,
  };
}

function clearInput() {
  phoneNumber.value = "";
  results.value = null;
}
</script>
