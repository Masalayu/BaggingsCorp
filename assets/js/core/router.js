import { renderCatalogPage } from '../pages/catalogPage.js';
import { renderPortfolioPage } from '../pages/portfolioPage.js';

const routes = {
  '#home': () => {
    document.getElementById('app').innerHTML = `
      <div class="home-hero">
        <div class="home-bg-layer" id="homeBackgrounds">
          <div class="hero-photo-grid">
            <div class="hero-frame"><img src="assets/img/hero1.png" onerror="this.style.display='none'"></div>
            <div class="hero-frame"><img src="assets/img/hero2.png" onerror="this.style.display='none'"></div>
            <div class="hero-frame"><img src="assets/img/hero3.png" onerror="this.style.display='none'"></div>
            <div class="hero-frame"><img src="assets/img/hero4.png" onerror="this.style.display='none'"></div>
            <div class="hero-frame"><img src="assets/img/hero5.png" onerror="this.style.display='none'"></div>
            <div class="hero-frame"><img src="assets/img/hero6.png" onerror="this.style.display='none'"></div>
          </div>
        </div>
        <div class="home-hero-content">
          <h1 style="color:var(--color-primary); font-size:3rem; margin-bottom:1rem; font-family:var(--font-heading);">Baggins Corp</h1>
          <p style="font-size:1.2rem; color:var(--color-text); margin-bottom: 2rem;">Kami Hadir dengan Membawa Solusi untuk Pembelajaran Digital melalui IFP (Interactive Flat Panel) yang didukung oleh E-book dan Koding Next.</p>
          <a href="#catalog" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">Jelajahi Katalog</a>
        </div>
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
          <p style="margin-top:1rem;"><strong>Telepon:</strong> 082135444400 </p>
          <p style="margin-top:1rem;"><strong>Alamat:</strong> Jl. Puncak Gadog-Seusasupan No.358 / GD BSI, Bedungan, Bogor</p>
        </div>
      </div>
    `;
  }
};

export const initRouter = () => {
  const router = () => {
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

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);

  router();
};
