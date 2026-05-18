import { catalogData } from '../data/catalog.js';
import { createProductCard } from '../components/productCard.js';

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
    
    // Calculate Lease to Own Pricing
    // Extract base price (using min for price_scheme, or fallback)
    const basePrice = product.price_scheme.min || product.price_scheme.price_per_year || product.price_scheme.start_from || 0;
    
    let tableHTML = "";
    if (basePrice > 0) {
      // 6 months: base * 1.1 / 6
      // 12 months: base * 1.15 / 12
      const price6 = Math.round(basePrice * 1.1 / 6);
      const price12 = Math.round(basePrice * 1.15 / 12);
      
      const formatCurrency = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

      tableHTML = `
        <h4 class="modal-subtitle">Skema Sewa Milik (Lease to Own)</h4>
        <table class="pricing-table">
          <thead>
            <tr>
              <th>Tenor</th>
              <th>Cicilan per Bulan</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6 Bulan</td>
              <td>${formatCurrency(price6)}</td>
              <td>${formatCurrency(price6 * 6)}</td>
            </tr>
            <tr>
              <td>12 Bulan</td>
              <td>${formatCurrency(price12)}</td>
              <td>${formatCurrency(price12 * 12)}</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">*Harga simulasi (asumsi bunga +10% untuk 6 bulan & +15% untuk 12 bulan). Syarat dan ketentuan berlaku.</p>
      `;
    }

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
          ${tableHTML}
          <button class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="alert('Membuka WhatsApp Sales...')">Hubungi Sales</button>
        </div>
      </div>
    `;
    modal.style.display = "block";
  };
};
