/* =========================================================
   1) เนื้อหาจดหมาย 3 ฉบับ
      แก้ "text" ใส่ข้อความ  และแก้ "image" ใส่ path รูป
      (รูปวางไว้ในโฟลเดอร์ images/ แล้วพิมพ์ชื่อไฟล์ตรงนี้)
   ========================================================= */
const letters = [
  {
    image: "khao1.jpg",      // ⬅️ รูปจดหมายฉบับที่ 1
    text: `สุขสันต์วันครบรอบน้าค้าบบบบ เค้ารักที่รักที่สุดเลยยยย ถ้าเค้าทำรายรายให้ไม่พอใจเค้าปรับให้หมดเลยน้าาาา `   // ⬅️ ข้อความจดหมายฉบับที่ 1
  },
  {
    image: "images/khao3.jpg",      // ⬅️ รูปจดหมายฉบับที่ 2
    text: `เค้าม่ายมีของขวัญให้ เเต่มีเเวปน่าร้ากๆให้้้ ชอบมั้ยยยยยย เค้าตั้งใจทำน้าาาาาา `   // ⬅️ ข้อความจดหมายฉบับที่ 2
  },
  {
    image: "images/khao4.jpg",      // ⬅️ รูปจดหมายฉบับที่ 3
    text: `อยู่กับเค้าตลอดไปน้าาาาาาาาา ทุกภพทุกชาติต้องคู่กานน้าาาาาา💕`   // ⬅️ ข้อความจดหมายฉบับที่ 3
  }
];

/* =========================================================
   2) รูปภาพหน้ารวมความทรงจำ (หน้าสุดท้าย)
      เพิ่ม/ลบบรรทัดในลิสต์นี้ได้ตามจำนวนรูปที่มี
   ========================================================= */
const galleryImages = [
  "images/khao5.jpg",   // ⬅️ รูปที่ 1
  "images/khao6.jpg",   // ⬅️ รูปที่ 2
  "images/khao7.jpg",   // ⬅️ รูปที่ 3
  "images/khao8.jpg",   // ⬅️ รูปที่ 4
  "images/khao10.jpg",   // ⬅️ รูปที่ 5
  "images/khao11.jpg"    // ⬅️ รูปที่ 6
];

/* =========================================================
   3) โค้ดการทำงานของแอป (ไม่จำเป็นต้องแก้ส่วนนี้)
   ========================================================= */

// ---- สลับหน้า (พร้อมเอฟเฟกต์เด้ง) ----
function goToPage(pageId){
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
    p.classList.remove("page-in");
  });
  const next = document.getElementById(pageId);
  next.classList.add("active");
  window.scrollTo({ top:0, behavior:"instant" });

  // trigger the bounce-in animation (reflow ก่อนเพื่อให้ animation เล่นใหม่ทุกครั้ง)
  void next.offsetWidth;
  next.classList.add("page-in");
}

document.getElementById("startBtn").addEventListener("click", () => {
  goToPage("page2");
});

document.getElementById("toGalleryBtn").addEventListener("click", () => {
  goToPage("page3");
});

// ---- หัวใจลอยหน้าแรก ----
const heartsContainer = document.getElementById("heartsContainer");
function spawnHeart(){
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  heart.style.animationDuration = 6 + Math.random() * 6 + "s";
  heart.style.fontSize = 14 + Math.random() * 16 + "px";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}
setInterval(spawnHeart, 700);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);

document.getElementById("page1").classList.add("page-in");

// ---- ซองจดหมาย: ต้องเปิดเรียงจากซ้ายไปขวา ----
const envelopeEls = Array.from(document.querySelectorAll(".envelope"));
const letterModal = document.getElementById("letterModal");
const letterPhoto = document.getElementById("letterPhoto");
const letterText = document.getElementById("letterText");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const toGalleryBtn = document.getElementById("toGalleryBtn");

let openedCount = 0;

function refreshEnvelopeStates(){
  envelopeEls.forEach((el) => {
    const idx = Number(el.dataset.index); // 1,2,3
    el.classList.remove("locked", "unlocked");
    if (el.classList.contains("opened")) return;
    if (idx === openedCount + 1) el.classList.add("unlocked");
    else el.classList.add("locked");
  });
}
refreshEnvelopeStates();

envelopeEls.forEach((el) => {
  el.addEventListener("click", () => {
    const idx = Number(el.dataset.index);
    if (!el.classList.contains("unlocked")) return; // ยังไม่ถึงคิวเปิด

    el.classList.add("opened");
    openedCount = Math.max(openedCount, idx);
    refreshEnvelopeStates();

    const letter = letters[idx - 1];
    letterPhoto.style.backgroundImage = `url('${letter.image}')`;
    letterText.textContent = letter.text;
    letterModal.classList.add("show");

    if (openedCount >= 3) {
      toGalleryBtn.classList.remove("btn-hidden");
      toGalleryBtn.classList.add("btn-visible");
    }
  });
});

closeLetterBtn.addEventListener("click", () => {
  letterModal.classList.remove("show");
});
letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) letterModal.classList.remove("show");
});

// ---- สร้างแกลเลอรีหน้าสุดท้าย: สายพานรูปที่เลื่อนไหลเองไม่หยุด ----
const galleryScroll = document.getElementById("galleryScroll");
const galleryTrack = document.createElement("div");
galleryTrack.className = "gallery-track";
galleryScroll.appendChild(galleryTrack);

function buildGalleryItem(src){
  const item = document.createElement("div");
  item.className = "gallery-item";
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  item.appendChild(img);
  return item;
}

// เพิ่มรูปชุดเดียวกัน 2 รอบต่อกัน เพื่อให้สายพานไหลวนได้ต่อเนื่องไม่มีรอยต่อ
[...galleryImages, ...galleryImages].forEach((src) => {
  galleryTrack.appendChild(buildGalleryItem(src));
});

// ยิ่งรูปเยอะ สายพานยิ่งยาว จึงปรับความเร็ว (เวลาต่อรอบ) ตามจำนวนรูปให้ความเร็วสม่ำเสมอ
const conveyorDuration = Math.max(18, galleryImages.length * 5.5);
galleryScroll.style.setProperty("--conveyor-duration", conveyorDuration + "s");
