<template>
  <div
    class="relative flex flex-col items-center justify-center w-full h-screen bg-black text-white overflow-hidden"
  >
    <video
      ref="videoRef"
      autoplay
      playsinline
      muted
      class="w-full h-full object-cover"
    ></video>

    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        class="border-4 border-white/70 rounded-2xl w-[90%] h-[50%] shadow-[0_0_15px_rgba(255,255,255,0.4)]"
      ></div>
    </div>

    <div class="absolute bottom-24 text-center text-base text-white/90">
      {{ status }}
    </div>

    <div class="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
      <button
        @click="toggleCamera"
        class="bg-gray-800/60 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors duration-200 font-medium px-4 py-2 rounded-xl shadow-lg active:scale-95"
      >
        {{ cameraOn ? "Stop" : "Start" }}
      </button>
      <button
        @click="toggleGallery"
        class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md"
      >
        Gallery
      </button>
      <button
        @click="toggleEngine"
        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-lg active:scale-95 opacity-85"
      >
        {{ useLocal ? "Engine: Local" : "Engine: API" }}
      </button>
    </div>

    <canvas ref="canvasRef" class="hidden"></canvas>

    <transition name="fade">
      <div
        v-if="showGallery"
        class="absolute inset-0 bg-black/90 backdrop-blur-md p-5 overflow-y-auto z-50 flex flex-col items-center"
      >
        <div class="flex justify-between items-center w-full mb-4">
          <h2 class="text-2xl font-semibold text-white">Captured Numbers</h2>
          <button
            @click="toggleGallery"
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow-lg opacity-85 active:scale-85"
          >
            Close
          </button>
        </div>

        <div v-if="captures.length === 0" class="text-gray-400 mt-20">
          No captures yet
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md"
        >
          <div
            v-for="(c, i) in captures"
            :key="i"
            class="bg-white text-black rounded-2xl overflow-hidden shadow-md"
          >
            <div @click="toggleImage(i)" class="cursor-pointer select-none">
              <img
                v-if="shownImageIndex === i"
                :src="c.photo"
                class="w-full object-cover rounded-t-2xl"
                style="max-height: 220px; object-fit: cover"
              />
              <div
                v-else
                class="w-full min-h-44 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 px-3 py-2 text-center gap-2"
                style="border-radius: 1rem 1rem 0 0"
              >
                <template v-if="c.results">
                  <div class="flex flex-col gap-2 w-full">
                    <div
                      v-for="(gua, idx) in [
                        {
                          label: '主卦',
                          key: 'zhuGua',
                          color: 'from-blue-400/70 to-blue-100/80',
                        },
                        {
                          label: '互卦',
                          key: 'huGua',
                          color: 'from-purple-400/70 to-purple-100/80',
                        },
                        {
                          label: '之卦',
                          key: 'ziGua',
                          color: 'from-pink-400/70 to-pink-100/80',
                        },
                      ]"
                      :key="gua.key"
                      class="flex items-center gap-2 rounded-lg bg-gradient-to-r"
                      :class="gua.color"
                      style="padding: 0.4rem 0.7rem; min-height: 2.2em"
                    >
                      <span class="font-bold text-xs min-w-[2.5em]">{{
                        gua.label
                      }}</span>
                      <span
                        class="text-xs font-semibold text-black truncate max-w-[5em]"
                      >
                        {{
                          sixtyFourGua[
                            `${c.results[gua.key].top.bagua}/${c.results[gua.key].bottom.bagua}`
                          ]?.guaName || "未知"
                        }}
                      </span>
                      <span class="flex items-center gap-1 text-xs ml-2">
                        <span class="font-mono">{{
                          c.results[gua.key].top.element
                        }}</span>
                        <span class="text-gray-400">/</span>
                        <span class="font-mono">{{
                          c.results[gua.key].bottom.element
                        }}</span>
                      </span>
                      <span class="flex-1"></span>
                      <span
                        class="rounded px-2 py-0.5 text-xs font-semibold"
                        :class="[
                          elementConnectionGua[
                            `${c.results.totalNumberMod > 3 ? c.results[gua.key].bottom.element : c.results[gua.key].top.element}/${c.results.totalNumberMod > 3 ? c.results[gua.key].top.element : c.results[gua.key].bottom.element}`
                          ].type == '吉'
                            ? 'bg-green-500/90 text-white'
                            : 'bg-red-400/90 text-white',
                        ]"
                      >
                        {{
                          elementConnectionGua[
                            `${c.results.totalNumberMod > 3 ? c.results[gua.key].bottom.element : c.results[gua.key].top.element}/${c.results.totalNumberMod > 3 ? c.results[gua.key].top.element : c.results[gua.key].bottom.element}`
                          ].type
                        }}
                      </span>
                      <span
                        class="rounded px-2 py-0.5 text-xs ml-1"
                        :class="
                          bgColorDescription[
                            elementConnectionGua[
                              `${c.results.totalNumberMod > 3 ? c.results[gua.key].bottom.element : c.results[gua.key].top.element}/${c.results.totalNumberMod > 3 ? c.results[gua.key].top.element : c.results[gua.key].bottom.element}`
                            ].description
                          ]
                        "
                      >
                        {{
                          elementConnectionGua[
                            `${c.results.totalNumberMod > 3 ? c.results[gua.key].bottom.element : c.results[gua.key].top.element}/${c.results.totalNumberMod > 3 ? c.results[gua.key].top.element : c.results[gua.key].bottom.element}`
                          ].description
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col items-center mt-2 w-full">
                    <div class="text-xs font-bold mb-1 text-gray-700">
                      总元素统计
                    </div>
                    <div
                      class="flex flex-row items-center justify-center gap-2 w-full"
                    >
                      <span
                        v-for="el in ['金', '木', '水', '火', '土']"
                        :key="el"
                        class="text-xs font-bold px-2 py-1 rounded-lg flex flex-col items-center"
                        :class="[
                          c.results.counts[el] == 0
                            ? 'text-red-400 bg-gray-200'
                            : 'text-gray-800 bg-gray-300',
                        ]"
                        style="min-width: 2.5em"
                      >
                        {{ el }}
                        <span class="font-semibold">{{
                          c.results.counts[el]
                        }}</span>
                      </span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <span class="text-gray-400">No info</span>
                </template>
              </div>
            </div>
            <div class="p-3 text-center bg-white rounded-b-2xl">
              <div class="font-semibold text-lg truncate">{{ c.number }}</div>
              <div class="text-gray-600 text-xs">{{ c.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import Tesseract from "tesseract.js";
import {
  trigram,
  elementConnectionGua,
  sixtyFourGua,
} from "../composables/data.js";
const bgColorDescription = {
  生入: "bg-green-400 text-black",
  克出: "bg-yellow-200 text-black",
  比旺: "bg-blue-200 text-black",
  克入: "bg-red-400 text-black",
  生出: "bg-red-300 text-black",
};

const videoRef = ref(null);
const canvasRef = ref(null);
const status = ref("Ready");
const cameraOn = ref(false);
const showGallery = ref(false);
const captures = ref([]);
const useLocal = ref(true);
const seenNumbers = new Set();
const shownImageIndex = ref(null);

let stream = null;
let scanning = false;
let processing = false;

//const numberPattern = /\b(01[1-9][-\s]?\d{3,4}[-\s]?\d{3,4})\b/g;
const numberPattern = /(0?1[1-9][\s\-]*\d{2,4}[\s\-]*\d{3,5})/g;

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

function wantedFilter(number) {
  const phone = String(number).replace(/\D/g, "");
  if (!phone || phone.length === 0) return false;
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

  var results = {
    zhuGua: { top: zhuGuaTop, bottom: zhuGuaBottom },
    huGua: { top: huGuaTop, bottom: huGuaBottom },
    ziGua: { top: ziGuaTop, bottom: ziGuaBottom },
    totalNumberMod,
  };
  const counts = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
  const guas = [results.zhuGua, results.huGua, results.ziGua];
  for (const gua of guas) {
    if (gua?.top?.element) counts[gua.top.element]++;
    if (gua?.bottom?.element) counts[gua.bottom.element]++;
  }
  results.counts = counts;
  if (
    elementConnectionGua[
      `${results.totalNumberMod > 3 ? results.zhuGua.bottom.element : results.zhuGua.top.element}/${results.totalNumberMod > 3 ? results.zhuGua.top.element : results.zhuGua.bottom.element}`
    ].type == "吉" &&
    elementConnectionGua[
      `${results.totalNumberMod > 3 ? results.huGua.bottom.element : results.huGua.top.element}/${results.totalNumberMod > 3 ? results.huGua.top.element : results.huGua.bottom.element}`
    ].type == "吉" &&
    elementConnectionGua[
      `${results.totalNumberMod > 3 ? results.ziGua.bottom.element : results.ziGua.top.element}/${results.totalNumberMod > 3 ? results.ziGua.top.element : results.ziGua.bottom.element}`
    ].type == "吉"
  ) {
    return results;
  } else {
    return false;
  }
}

function toggleEngine() {
  useLocal.value = !useLocal.value;
  status.value = useLocal.value
    ? "Switched to Local OCR"
    : "Switched to API OCR";
}

async function toggleCamera() {
  if (cameraOn.value) stopCamera();
  else await startCamera();
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    videoRef.value.srcObject = stream;
    cameraOn.value = true;
    status.value = "Scanning...";
    scanning = true;
    continuousScan();
  } catch (err) {
    status.value = "Camera error: " + err.message;
  }
}

function stopCamera() {
  if (stream) stream.getTracks().forEach((t) => t.stop());
  scanning = false;
  cameraOn.value = false;
  status.value = "Stopped";
}

function toggleGallery() {
  showGallery.value = !showGallery.value;
}

function toggleImage(idx) {
  shownImageIndex.value = shownImageIndex.value === idx ? null : idx;
}

async function continuousScan() {
  while (scanning) {
    if (!processing) {
      processing = true;
      await processFrame();
      processing = false;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
}

async function processFrame() {
  const video = videoRef.value;
  const canvas = canvasRef.value;
  if (!video || video.videoWidth === 0) return;

  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth * 0.8;
  canvas.height = video.videoHeight * 0.8;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  status.value = useLocal.value
    ? "Processing (Local)..."
    : "Processing (API)...";
  const imageData = canvas.toDataURL("image/jpeg", 0.8);

  try {
    const text = useLocal.value
      ? await recognizeLocal(canvas)
      : await recognizeWithAPI(imageData);

    if (!text) {
      status.value = "No text detected";
      return;
    }

    //const matches = text.match(numberPattern);
    const matches = [...text.matchAll(numberPattern)].map((m) => m[1]);
    if (matches?.length) {
      //   const clean = matches.map((n) => n.replace(/\s+/g, "").replace(/-/g, ""));
      //   const valid = clean.find((n) => /^01[1-9]\d{7,8}$/.test(n));
      const valid = matches
        .map((n) => n.replace(/[^\d]/g, ""))
        .filter((n) => n.startsWith("01") && n.length >= 9 && n.length <= 11)
        .filter((n) => !seenNumbers.has(n));
      if (valid) {
        valid.forEach((n) => {
          seenNumbers.add(n);
          var wanted = wantedFilter(n);
          if (wanted) {
            captureFrame(n, wanted);
            status.value = `Captured: ${n}`;
          } else {
            status.value = `Unwanted: ${n}`;
          }
        });
      } else {
        status.value = "Text found, no valid number";
      }
    } else {
      status.value = "No number detected";
    }
  } catch (err) {
    console.error(err);
    alert(err);
    status.value = "Recognition error";
  }
}

async function recognizeLocal(canvas) {
  const result = await Tesseract.recognize(canvas, "eng", {
    tessedit_char_whitelist: "0123456789 -",
  });
  return result.data.text.trim();
}
const keys = [
  "K81903541588957",
  "K81308403788957",
  "K82308403788957",
  "K81308403788957",
  "K86678146088957",
];
async function recognizeWithAPI(imageData) {
  const blob = await (await fetch(imageData)).blob();
  const form = new FormData();
  form.append("apikey", keys[Math.floor(Math.random() * keys.length)]);
  // form.append("apikey", "helloworld");
  form.append("language", "eng");
  form.append("isOverlayRequired", "false");
  form.append("scale", "true");
  form.append("OCREngine", "2");
  form.append("file", blob, "frame.jpg");

  const res = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    body: form,
  });
  const json = await res.json();
  if (!json.ParsedResults || !json.ParsedResults[0]?.ParsedText) return "";
  return json.ParsedResults[0].ParsedText.trim();
}

function captureFrame(number, results) {
  if (!results) return;
  if (captures.value.find((c) => c.number === number)) {
    status.value = `Already captured: ${number}`;
    return;
  }
  const video = videoRef.value;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const photo = canvas.toDataURL("image/jpeg", 0.9);

  captures.value.unshift({
    number,
    photo,
    results,
    time: new Date().toLocaleTimeString(),
  });

  if ("vibrate" in navigator) navigator.vibrate(100);
}

onUnmounted(stopCamera);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
