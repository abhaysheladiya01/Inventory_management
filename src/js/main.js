import { handleLogin, checkAuth, handleLogout } from "./auth.js";
import { loadProducts } from "./dashboard.js";

if (window.location.pathname.includes("index.html")) {
  handleLogin("loginForm", "error");
}

if (window.location.pathname.includes("dashboard.html")) {
  const user = checkAuth();
  document.getElementById("username").textContent = user.name;
  handleLogout("logout");

  loadProducts(
    "./data/products.json",
    { total: "total", inStock: "inStock", outStock: "outStock" },
    "products",
    "details",
  );
}
