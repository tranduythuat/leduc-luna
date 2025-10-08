"use strict";

// -------------------------
// 1. Function chạy sau khi load
// -------------------------
function initPage() {
  console.log("Trang đã load xong!");
}

// -------------------------
// 2. Function xử lý khi submit form
// -------------------------
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    confirm: confirm,
    name: name,
    guest_number: guest_number,
    confirm_vegetarian: confirm_vegetarian,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: "Đang gửi /Sending/...",
    text: "Vui lòng chờ trong giây lát /Please wait a moment/",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url =
    "https://script.google.com/macros/s/AKfycbx8wH-rWUrAkD2tytqAhXy6oZs-AVnO6nZgy5o0pYsTJbSxwMksIR8Xi22d3b-Vt3Jz_w/exec?sheet=sheet-1";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        confirm_vegetarian,
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công /Success/!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha /Thank you for your feedback, the information has been sent to the bride and groom./",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
    });
  }
}

// -------------------------
// 3. Gắn sự kiện khi DOM ready
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  initPage();

  const form = document.forms["rsvp-form"];
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
