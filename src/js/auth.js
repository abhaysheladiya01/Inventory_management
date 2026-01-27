import { users } from "./users.js";

if (
  window.location.pathname.includes("index.html") &&
  localStorage.getItem("authUser")
) {
  window.location.href = "dashboard.html";
}

export function handleLogin(formId, errorId) {
  const form = document.getElementById(formId);
  const errorEl = document.getElementById(errorId);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      errorEl.textContent = "Invalid credentials";
      errorEl.classList.remove("hidden");
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  });
}

export function checkAuth() {
  const user = JSON.parse(localStorage.getItem("authUser"));
  if (!user) {
    window.location.href = "index.html";
  }
  return user;
}

export function handleLogout(logoutBtnId) {
  const logoutBtn = document.getElementById(logoutBtnId);
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("authUser");
    window.location.href = "index.html";
  });
}
