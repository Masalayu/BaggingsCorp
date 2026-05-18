import { catalogData } from '../data/catalog.js';
import { createProductCard } from '../components/productCard.js';

export const renderCatalogPage = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Mendapatkan daftar kategori yang unik
  const categories = ["Semua", ...new Set(catalogData.map(item => item.category))];

  // Membuat HTML untuk Filter Bar
  const filterHTML = `
    <div class="filter-bar">
      ${categories.map(cat => `
        <button class="filter-btn ${cat === 'Semua' ? 'active' : ''}" data-filter="${cat}">
          ${cat}
        </button>
      `).join('')}
    </div>
  `;

  // Membuat HTML untuk Grid Produk
  const gridHTML = `
    <div class="product-grid" id="productGrid">
      ${catalogData.map(product => createProductCard(product)).join('')}
    </div>
  `;

  // Menyusun halaman katalog
  container.innerHTML = `
    <div class="catalog-section">
      ${filterHTML}
      ${gridHTML}
    </div>
  `;

  // Menambahkan Event Listener untuk Filter
  const filterButtons = container.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Ubah status tombol aktif
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const selectedCategory = e.target.getAttribute('data-filter');
      const grid = document.getElementById('productGrid');
      
      // Filter data sesuai kategori
      const filteredData = selectedCategory === 'Semua' 
        ? catalogData 
        : catalogData.filter(item => item.category === selectedCategory);
      
      // Render ulang grid dengan data terfilter
      grid.innerHTML = filteredData.map(product => createProductCard(product)).join('');
    });
  });
};
