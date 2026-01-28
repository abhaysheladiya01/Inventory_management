export async function loadProducts(jsonPath, statsIds, productsContainerId) {
  const totalEl = document.getElementById(statsIds.total);
  const inStockEl = document.getElementById(statsIds.inStock);
  const outStockEl = document.getElementById(statsIds.outStock);
  const inStockBox = document.getElementById("inStockBox");
  const outStockBox = document.getElementById("outStockBox");
  const productsContainer = document.getElementById(productsContainerId);

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  try {
    const response = await fetch(jsonPath);
    if (!response.ok)
      throw new Error(`Failed to fetch products: ${response.status}`);

    const products = await response.json();

    const total = products.length;
    const inStock = products.filter((p) => p.in_stock).length;
    const outStock = products.filter((p) => !p.in_stock).length;

    totalEl.textContent = total;
    inStockEl.textContent = inStock;
    outStockEl.textContent = outStock;

    if (inStock > 0) {
      inStockBox.classList.remove("bg-green-100");
      inStockBox.classList.add("bg-green-200");
    } else {
      inStockBox.classList.remove("bg-green-200");
      inStockBox.classList.add("bg-green-100");
    }

    if (outStock > 0) {
      outStockBox.classList.remove("bg-red-100");
      outStockBox.classList.add("bg-red-200");
    } else {
      outStockBox.classList.remove("bg-red-200");
      outStockBox.classList.add("bg-red-100");
    }

    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition";
      card.innerHTML = `
        <h2 class="font-bold">${product.name}</h2>
        <p>Category: ${product.category} / ${product.sub_category}</p>
        <p>Price: $${product.price}</p>
        <p class="${product.in_stock ? "text-green-600" : "text-red-600"} font-semibold">
          ${product.in_stock ? "In Stock" : "Out of Stock"}
        </p>
      `;

      card.addEventListener("click", () => {
        modal.classList.remove("hidden");

        const bgColor = product.in_stock ? "bg-green-500" : "bg-red-500";
        modalContent.className = `rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 p-6 relative transition ${bgColor}`;

        modalBody.innerHTML = `
          <h2 class="font-bold text-xl mb-2 text-white">${product.name}</h2>
          <p class="text-white">ID: ${product.id}</p>
          <p class="text-white">Category: ${product.category} / ${product.sub_category}</p>
          <p class="text-white">Price: $${product.price}</p>
          <p class="text-white">Status: ${product.in_stock ? "In Stock" : "Out of Stock"}</p>
          <p class="text-white">Description: ${product.description}</p>
        `;
      });

      productsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    productsContainer.innerHTML = `<p class="text-red-600">Failed to load products.</p>`;
  }
}
