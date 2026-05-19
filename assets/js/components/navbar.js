export const createNavbar = () => {
  const header = document.createElement('header');
  header.className = 'navbar';
  
  header.innerHTML = `
    <div class="navbar-container">
      <a href="#home" class="navbar-logo">
        <!-- Tempat untuk menaruh Logo PT Anda (ganti src dengan path logo) -->
        <img src="assets/img/logo.jpg" alt="Logo PT" class="pt-logo" style="height: 40px; margin-right: 12px;" onerror="this.style.display='none'" />
        <!-- Teks Nama Perusahaan -->
        <span class="logo-text">Baggins Corp</span>
      </a>
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <nav class="navbar-menu" id="navbarMenu">
        <a href="#home" class="nav-link">Beranda</a>
        <a href="#catalog" class="nav-link">Katalog Produk</a>
        <a href="#portfolio" class="nav-link">Portofolio</a>
        <a href="#contact" class="nav-link">Kontak</a>
      </nav>
    </div>
  `;

  setTimeout(() => {
    const btn = header.querySelector('#hamburgerBtn');
    const menu = header.querySelector('#navbarMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
      });
      menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          btn.classList.remove('active');
          menu.classList.remove('active');
        });
      });
    }
  }, 0);

  return header;
};
