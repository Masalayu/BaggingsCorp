// productCard.js
export const createProductCard = (product) => {
  return `
    <div class="product-card" data-category="${product.category}">
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/img/logo.png'" />
        <span class="badge category-badge">${product.category}</span>
      </div>
      <div class="card-content">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="card-footer">
          <button class="btn btn-outline-gold" onclick="console.log('Detail ${product.id}')">Lihat Detail</button>
        </div>
      </div>
    </div>
  `;
};
