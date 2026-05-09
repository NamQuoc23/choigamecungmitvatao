const packageButtons = document.querySelectorAll("[data-package]");
const packageSelect = document.querySelector("#packageSelect");
const bookingForm = document.querySelector("#bookingForm");
const bookingMessage = document.querySelector("#bookingMessage");
const playDate = document.querySelector("#playDate");

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

  bookingMessage.textContent = `Xin chào Mít và Táo, ${name} muốn đặt ${selectedPackage}.
Ngày chơi: ${date}
Giờ bắt đầu: ${time}
Ghi chú: ${note}`;
  bookingMessage.classList.add("is-visible");
});
