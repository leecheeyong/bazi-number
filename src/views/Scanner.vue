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
        class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-lg active:scale-95"
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
        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-lg active:scale-95"
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
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow-lg"
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
            <img :src="c.photo" class="w-full object-cover" />
            <div class="p-3 text-center">
              <div class="font-semibold text-lg">{{ c.number }}</div>
              <div class="text-gray-600 text-sm">{{ c.time }}</div>
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

const videoRef = ref(null);
const canvasRef = ref(null);
const status = ref("Ready");
const cameraOn = ref(false);
const showGallery = ref(false);
const captures = ref([]);
const useLocal = ref(true);

let stream = null;
let scanning = false;
let processing = false;

const numberPattern = /\b(01[1-9][-\s]?\d{3,4}[-\s]?\d{3,4})\b/g;

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

    const matches = text.match(numberPattern);
    if (matches?.length) {
      const clean = matches.map((n) => n.replace(/\s+/g, "").replace(/-/g, ""));
      const valid = clean.find((n) => /^01[1-9]\d{7,8}$/.test(n));
      if (valid) {
        captureFrame(matches[0]);
        status.value = `Captured: ${matches[0]}`;
      } else {
        status.value = "Text found, no valid number";
      }
    } else {
      status.value = "No number detected";
    }
  } catch (err) {
    console.error(err);
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

function captureFrame(number) {
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
