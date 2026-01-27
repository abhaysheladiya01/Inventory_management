export async function loadProducts(
  jsonPath,
  statsIds,
  productsContainerId,
  detailsContainerId,
) {
  const totalEl = document.getElementById(statsIds.total);
  const inStockEl = document.getElementById(statsIds.inStock);
  const outStockEl = document.getElementById(statsIds.outStock);
  const productsContainer = document.getElementById(productsContainerId);
  const detailsContainer = document.getElementById(detailsContainerId);

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

    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition";
      card.innerHTML = `
        <h2 class="font-bold">${product.name}</h2>
        <p>Category: ${product.category} / ${product.sub_category}</p>
        <p>Price: $${product.price}</p>
        <p>${product.in_stock ? "In Stock" : "Out of Stock"}</p>
      `;

      card.addEventListener("click", () => {
        detailsContainer.classList.remove("hidden");
        detailsContainer.innerHTML = `
          <h2 class="font-bold text-xl mb-2">${product.name}</h2>
          <p>ID: ${product.id}</p>
          <p>Category: ${product.category} / ${product.sub_category}</p>
          <p>Price: $${product.price}</p>
          <p>Status: ${product.in_stock ? "In Stock" : "Out of Stock"}</p>
          <p>Description: ${product.description}</p>
        `;
      });

      productsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    productsContainer.innerHTML = `<p class="text-red-600">Failed to load products.</p>`;
  }
}
