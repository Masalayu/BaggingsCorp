import { renderCatalogPage } from '../pages/catalogPage.js';
import { renderPortfolioPage } from '../pages/portfolioPage.js';

const routes = {
  '#home': () => {
    document.getElementById('app').innerHTML = `
      <div style="text-align:center; padding: 6rem 1rem;">
        <h1 style="color:var(--color-primary); font-size:3rem; margin-bottom:1rem; font-family:var(--font-heading);">Baggins Corp</h1>
        <p style="font-size:1.2rem; color:var(--color-text); margin-bottom: 2rem;">Solusi Terpercaya untuk Kebutuhan IT & Peralatan Instansi Anda.</p>
        <a href="#catalog" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">Jelajahi Katalog</a>
      </div>
    `;
  },
  '#catalog': () => renderCatalogPage('app'),
  '#portfolio': () => renderPortfolioPage('app'),
  '#contact': () => {
    document.getElementById('app').innerHTML = `
      <div style="text-align:center; padding: 4rem 1rem; max-width: 600px; margin: 0 auto;">
        <h2 style="color:var(--color-primary); margin-bottom:1rem; font-size:2.5rem;">Hubungi Kami</h2>
        <p style="color:var(--color-text); margin-bottom:2rem;">Tim sales kami siap membantu Anda dengan penawaran terbaik dan simulasi skema pengadaan yang paling sesuai.</p>
        <div style="background:#fff; padding:2rem; border-radius:8px; box-shadow:0 4px 10px rgba(13,43,85,0.1); text-align:left;">
          <p><strong>Email:</strong> sales@bagginscorp.co.id</p>
          <p style="margin-top:1rem;"><strong>Telepon:</strong> (021) 1234567</p>
          <p style="margin-top:1rem;"><strong>Alamat:</strong> Gedung Baggins Lt. 4, Jakarta Pusat</p>
        </div>
      </div>
    `;
  }
};

export const initRouter = () => {
  const router = () => {
    // Default to #home if hash is empty
    const hash = window.location.hash || '#home';
    const renderPage = routes[hash];
    
    if (renderPage) {
      document.getElementById('app').innerHTML = ''; // Clear current content
      renderPage();
    } else {
      document.getElementById('app').innerHTML = `
        <div style="text-align:center; padding: 4rem 1rem;">
          <h2 style="font-size:3rem; color:var(--color-primary);">404</h2>
          <p style="margin-bottom:2rem;">Halaman tidak ditemukan.</p>
          <a href="#home" class="btn btn-outline-gold">Kembali ke Beranda</a>
        </div>
      `;
    }

    // Update active nav link class
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      }
    });
  };

  // Listen to hash changes and initial load
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  
  // Trigger router on initialization
  router();
};
