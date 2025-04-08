// วันที่และเวลา
const today = new Date();
document.getElementById("date").textContent = today.toLocaleDateString("th-TH");

function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString("th-TH", {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}
setInterval(updateTime, 1000);
updateTime();

// เพลง (โหลดจาก backend)
const audio = new Audio('/song');
audio.loop = true;
audio.volume = 0.6;
audio.muted = true;

window.addEventListener("load", () => {
  audio.play().catch(() => {

    const startAudio = () => {
      audio.muted = false;
      audio.play().then(() => {
        console.log("เล่นเพลงสำเร็จหลังคลิกแรก");
        showToast("🎵 กำลังเล่นเพลงแล้ว");
      }).catch((e) => {
        console.warn("ยังเล่นเพลงไม่ได้:", e);
      });

      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
    };

    document.addEventListener("click", startAudio);
    document.addEventListener("keydown", startAudio);
  });
});

// ปุ่มควบคุมเสียง
document.getElementById("muteBtn").onclick = () => {
  audio.muted = !audio.muted;
};

document.getElementById("volDown").onclick = () => {
  audio.volume = Math.max(0, audio.volume - 0.1);
};

document.getElementById("volUp").onclick = () => {
  audio.volume = Math.min(1, audio.volume + 0.1);
};

// Toast Function
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg z-50";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ป้องกัน Inspect / Copy / View Source
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showToast("คลิกขวาไม่ได้นะครับ");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "F12") {
    e.preventDefault();
    showToast("ไม่อณุญาติให้ DevTools นะครับ");
  }

  if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
    e.preventDefault();
    showToast("อย่าคิด Inspect");
  }

  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
    showToast("ไม่ต้องมาส่องเลย");
  }

  if (e.ctrlKey && ["c", "x", "s", "a"].includes(e.key.toLowerCase())) {
    e.preventDefault();
    showToast("ไม่ให้ก็อปนะ อิอิ");
  }
});
