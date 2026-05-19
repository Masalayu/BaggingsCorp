import { catalogData } from '../data/catalog.js';
import { createProductCard } from '../components/productCard.js';
import { initScrollReveal } from '../core/animations.js';

let currentCategory = "Semua";
let searchQuery = "";

export const renderCatalogPage = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const categories = ["Semua", ...new Set(catalogData.map(item => item.category))];

  const searchHTML = `
    <div class="search-container">
      <input type="text" id="searchInput" class="search-input" placeholder="Cari nama produk..." />
    </div>
  `;

  const filterHTML = `
    <div class="filter-bar">
      ${categories.map(cat => `
        <button class="filter-btn ${cat === 'Semua' ? 'active' : ''}" data-filter="${cat}">
          ${cat}
        </button>
      `).join('')}
    </div>
  `;

  const modalHTML = `
    <div id="productModal" class="modal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div id="modalBody"></div>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="catalog-section">
      ${searchHTML}
      ${filterHTML}
      <div class="product-grid" id="productGrid"></div>
      ${modalHTML}
    </div>
  `;

  const grid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = container.querySelectorAll('.filter-btn');
  const modal = document.getElementById('productModal');
  const closeModal = document.querySelector('.close-modal');

  const renderGrid = () => {
    const filtered = catalogData.filter(item => {
      const matchCat = currentCategory === "Semua" || item.category === currentCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    
    if (filtered.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Produk tidak ditemukan.</p>';
    } else {
      grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    }
    
    // Inisialisasi animasi scroll
    setTimeout(() => initScrollReveal(), 50);
  };

  // Initial render
  renderGrid();

  // Search Event Listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });

  // Filter Event Listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-filter');
      renderGrid();
    });
  });

  // Modal logic
  closeModal.onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Expose function globally for onclick attribute in productCard
  window.openProductModal = (id) => {
    const product = catalogData.find(p => p.id === id);
    if (!product) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
      <div class="modal-grid">
        <div class="modal-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/img/logo.png'" />
        </div>
        <div class="modal-info">
          <span class="badge category-badge" style="position: static; display: inline-block; margin-bottom: 1rem;">${product.category}</span>
          <h2 class="modal-title">${product.name}</h2>
          <p class="modal-desc">${product.description}</p>
          <button class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="alert('Membuka WhatsApp Sales...')">Hubungi Sales</button>
        </div>
      </div>
    `;
    modal.style.display = "block";
  };
};
