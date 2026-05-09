const packageButtons = document.querySelectorAll("[data-package]");
const packageSelect = document.querySelector("#packageSelect");
const bookingForm = document.querySelector("#bookingForm");
const bookingMessage = document.querySelector("#bookingMessage");
const playDate = document.querySelector("#playDate");
const paymentSection = document.querySelector("#payment");
const paymentName = document.querySelector("#paymentName");
const paymentPackage = document.querySelector("#paymentPackage");
const paymentSchedule = document.querySelector("#paymentSchedule");
const paymentAmount = document.querySelector("#paymentAmount");
const paymentContent = document.querySelector("#paymentContent");
const copyPaymentContent = document.querySelector("#copyPaymentContent");

const packageAmounts = {
  "Gói Khởi Động": "Chờ xác nhận",
  "Gói Tiêu Chuẩn": "Chờ xác nhận",
  "Gói Cao Cấp": "Chờ xác nhận",
};

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
playDate.value = today.toISOString().slice(0, 10);

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    packageSelect.value = button.dataset.package;
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const name = formData.get("playerName")?.trim() || "Mình";
  const selectedPackage = formData.get("packageSelect");
  const date = formData.get("playDate") || "ngày phù hợp";
  const time = formData.get("playTime") || "giờ linh hoạt";
  const note = formData.get("note")?.trim() || "Chưa có ghi chú thêm.";

  bookingMessage.textContent = `Xin chào Mít và Táo, ${name} muốn khóa kèo ${selectedPackage}.
Ngày chơi: ${date}
Giờ bắt đầu: ${time}
Ghi chú: ${note}`;
  bookingMessage.classList.add("is-visible");

  const transferContent = createTransferContent(name, selectedPackage);
  paymentName.textContent = name;
  paymentPackage.textContent = selectedPackage;
  paymentSchedule.textContent = `${date} • ${time}`;
  paymentAmount.textContent = packageAmounts[selectedPackage] || "Chờ xác nhận";
  paymentContent.textContent = transferContent;
  paymentSection.classList.add("is-visible");
  paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

copyPaymentContent.addEventListener("click", async () => {
  const content = paymentContent.textContent.trim();
  if (!content) {
    return;
  }

  try {
    await navigator.clipboard.writeText(content);
    copyPaymentContent.textContent = "Đã sao chép";
    window.setTimeout(() => {
      copyPaymentContent.textContent = "Sao chép nội dung chuyển khoản";
    }, 1800);
  } catch {
    copyPaymentContent.textContent = "Nội dung đã hiện ở trên";
  }
});

function createTransferContent(name, selectedPackage) {
  return `MITTAO ${normalizeTransferText(name)} ${normalizeTransferText(selectedPackage)}`;
}

function normalizeTransferText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}
