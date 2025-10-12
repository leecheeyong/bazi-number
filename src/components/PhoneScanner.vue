<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-white"
  >
    <video
      ref="videoRef"
      autoplay
      playsinline
      class="rounded-2xl w-[90vw] max-w-[500px] h-auto object-cover border-4 border-green-400"
    ></video>

    <div class="mt-4 text-center space-y-2">
      <p class="text-lg font-semibold">{{ status }}</p>
      <ul class="text-green-300 space-y-1">
        <li v-for="num in detectedNumbers" :key="num" class="text-xl font-bold">
          {{ num }}
        </li>
      </ul>
    </div>

    <button
      @click="toggleScan"
      class="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-lg font-semibold"
    >
      {{ scanning ? "Stop Scanning" : "Start Scanning" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const videoRef = ref(null);
const scanning = ref(false);
const status = ref("Idle");
const detectedNumbers = ref([]);

let stream = null;
let intervalId = null;
const apiKey = "K81308403788957";

const allowedPrefixes = [
  "011",
  "012",
  "013",
  "014",
  "016",
  "017",
  "018",
  "019",
];

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoRef.value.srcObject = stream;
    await videoRef.value.play();
    status.value = "Camera ready";
  } catch (err) {
    status.value = "Camera error: " + err.message;
  }
}

async function toggleScan() {
  if (scanning.value) {
    stopScan();
    return;
  }

  await startCamera();
  scanning.value = true;
  status.value = "Scanning...";
  intervalId = setInterval(captureAndRecognize, 3000);
}

function stopScan() {
  scanning.value = false;
  clearInterval(intervalId);
  if (stream) stream.getTracks().forEach((t) => t.stop());
  status.value = "Stopped";
}

async function captureAndRecognize() {
  const video = videoRef.value;
  if (!video.videoWidth) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const w = video.videoWidth;
  const h = video.videoHeight;
  const cropX = w * 0.1;
  const cropY = h * 0.2;
  const cropW = w * 0.8;
  const cropH = h * 0.6;
  canvas.width = cropW;
  canvas.height = cropH;
  ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

  const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.9));
  const form = new FormData();
  form.append("apikey", apiKey);
  form.append("language", "eng");
  form.append("OCREngine", "2");
  form.append("file", blob, "frame.jpg");

  try {
    const res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    const text = data?.ParsedResults?.[0]?.ParsedText || "";
    console.log("OCR Text:", text);
    extractMalaysianNumbers(text);
  } catch (e) {
    status.value = "Error: " + e.message;
  }
}

function extractMalaysianNumbers(text) {
  const cleaned = text.replace(/\n/g, " ").replace(/[^\d+\-()\s]/g, " ");
  const phoneRegex = /\b0\d{1,2}[\s\-]?\d{3,4}[\s\-]?\d{3,4}\b/g;
  const matches = cleaned.match(phoneRegex) || [];

  const validNumbers = new Set();

  for (const raw of matches) {
    const digitsOnly = raw.replace(/\D/g, "");
    const prefix = digitsOnly.slice(0, 3);
    if (allowedPrefixes.includes(prefix)) {
      const phone = parsePhoneNumberFromString(
        `+60${digitsOnly.slice(1)}`,
        "MY",
      );
      if (phone && phone.isValid()) {
        validNumbers.add(raw.trim());
      }
    }
  }

  if (validNumbers.size > 0) {
    detectedNumbers.value = Array.from(validNumbers);
    status.value = `Found ${validNumbers.size} valid number(s)`;
  } else {
    status.value = "No valid local mobile number detected";
  }
}

onUnmounted(() => stopScan());
</script>
