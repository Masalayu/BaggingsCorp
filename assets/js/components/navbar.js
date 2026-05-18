export const createNavbar = () => {
  const header = document.createElement('header');
  header.className = 'navbar';
  
  header.innerHTML = `
    <div class="navbar-container">
      <a href="#home" class="navbar-logo">
        <img src="assets/img/logo.png" alt="Baggins Corp" onerror="this.outerHTML='<span class=\\'logo-text\\'>Baggins Corp</span>'" />
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

  // Attach event listener for hamburger menu after element is in DOM
  setTimeout(() => {
    const btn = header.querySelector('#hamburgerBtn');
    const menu = header.querySelector('#navbarMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
      });
      // Close menu when a link is clicked
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
