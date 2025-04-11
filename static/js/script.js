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
audio.volume = 0.3;
audio.muted = true;

// เล่นเพลง
window.addEventListener("load", () => {
  showToast("ยังไม่มีเพลง 🎵");
});

// คลิกหน้าเว็บก่อนค่อยเล่น
let isPlaying = false;

document.addEventListener("click", () => {
  if (!isPlaying) {
    audio.muted = false;
    audio.play()
      .then(() => {
        isPlaying = true;
        console.log("เพลงเริ่มเล่นหลังจากคลิกแรก");
      })
      .catch((e) => {
        console.warn("ยังเล่นเพลงไม่ได้:", e);
        showToast("ยังเล่นเพลงไม่ได้ ลองคลิกอีกครั้ง");
      });
  }
}, { once: true });

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
