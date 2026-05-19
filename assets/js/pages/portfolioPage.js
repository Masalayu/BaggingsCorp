import { portfolioData } from '../data/portfolio.js';
import { initScrollReveal } from '../core/animations.js';

let currentView = 'timeline'; // 'timeline' or 'table'
let filterYear = 'Semua';
let filterSumber = 'Semua';

export const renderPortfolioPage = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const years = ["Semua", ...new Set(portfolioData.map(item => item.year).sort((a,b)=>b-a))];
  const sumberDanas = ["Semua", "DAK", "BOS", "APBD", "DAU"];

  const filterHTML = `
    <div class="portfolio-controls">
      <div style="display:flex; gap:1.5rem; flex-wrap:wrap;">
        <div class="filter-group">
          <label>Filter Tahun:</label>
          <select id="yearFilter" class="select-filter">
            ${years.map(y => `<option value="${y}" ${filterYear == y ? 'selected' : ''}>${y}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label>Sumber Dana:</label>
          <select id="sumberFilter" class="select-filter">
            ${sumberDanas.map(s => `<option value="${s}" ${filterSumber === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="view-toggle">
        <button class="btn btn-outline-gold ${currentView === 'timeline' ? 'active' : ''}" id="btnTimeline">Timeline View</button>
        <button class="btn btn-outline-gold ${currentView === 'table' ? 'active' : ''}" id="btnTable">Table View</button>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="portfolio-section">
      <h2 class="section-title">Portofolio Proyek (2024 - 2025)</h2>
      ${filterHTML}
      <div id="portfolioContent" class="portfolio-content"></div>
    </div>
  `;

  const contentDiv = document.getElementById('portfolioContent');
  const yearFilter = document.getElementById('yearFilter');
  const sumberFilter = document.getElementById('sumberFilter');
  const btnTimeline = document.getElementById('btnTimeline');
  const btnTable = document.getElementById('btnTable');

  const renderContent = () => {
    // Apply filters
    const filtered = portfolioData.filter(item => {
      const matchYear = filterYear === 'Semua' || item.year.toString() === filterYear;
      const matchSumber = filterSumber === 'Semua' || item.sumber_dana === filterSumber;
      return matchYear && matchSumber;
    });

    if (currentView === 'timeline') {
      // Timeline View
      const grouped = {};
      filtered.forEach(item => {
        if (!grouped[item.year]) grouped[item.year] = [];
        grouped[item.year].push(item);
      });

      const sortedYears = Object.keys(grouped).sort((a,b) => b-a);
      
      let html = '<div class="timeline">';
      if (sortedYears.length === 0) {
        html += '<p style="text-align:center; margin-top:2rem;">Data proyek tidak ditemukan.</p>';
      } else {
        sortedYears.forEach(year => {
          html += `
            <div class="timeline-year">
              <div class="year-label">${year}</div>
              <div class="timeline-items">
                ${grouped[year].map(item => `
                  <div class="timeline-item reveal">
                    <div class="timeline-content">
                      ${item.image ? `<img src="${item.image}" alt="${item.title}" style="display:block; max-width:100%; max-height:250px; border-radius:8px; margin-bottom:1rem;" onerror="this.style.display='none'">` : ''}
                      <span class="badge" style="background:var(--color-primary); color:white; margin-bottom:0.5rem; display:inline-block;">${item.sumber_dana}</span>
                      <h3 style="color:var(--color-primary); margin:0.5rem 0;">${item.title}</h3>
                      <p><strong>Instansi:</strong> ${item.client_instansi}</p>
                      <p style="font-size:0.9rem; margin-top:1rem; color:#555; line-height:1.5;">${item.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        });
      }
      html += '</div>';
      contentDiv.innerHTML = html;

    } else {
      // Table View
      let html = `
        <div class="table-responsive reveal">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tahun</th>
                <th>Sumber</th>
                <th>Instansi</th>
                <th>Judul Paket</th>
              </tr>
            </thead>
            <tbody>
      `;
      if (filtered.length === 0) {
        html += `<tr><td colspan="4" style="text-align:center;">Data proyek tidak ditemukan.</td></tr>`;
      } else {
        filtered.forEach(item => {
          html += `
            <tr>
              <td>${item.year}</td>
              <td><span class="badge" style="background:#e2e8f0; color:#333; padding:0.2rem 0.5rem; border-radius:4px; font-weight:bold;">${item.sumber_dana}</span></td>
              <td>${item.client_instansi}</td>
              <td>${item.title}</td>
            </tr>
          `;
        });
      }
      html += `</tbody></table></div>`;
      contentDiv.innerHTML = html;
    }
    
    setTimeout(() => initScrollReveal(), 50);
  };

  // Initial Render
  renderContent();

  // Event Listeners for Filters and View Toggles
  yearFilter.addEventListener('change', (e) => {
    filterYear = e.target.value;
    renderContent();
  });
  
  sumberFilter.addEventListener('change', (e) => {
    filterSumber = e.target.value;
    renderContent();
  });
  
  btnTimeline.addEventListener('click', () => {
    currentView = 'timeline';
    btnTimeline.classList.add('active');
    btnTable.classList.remove('active');
    renderContent();
  });
  
  btnTable.addEventListener('click', () => {
    currentView = 'table';
    btnTable.classList.add('active');
    btnTimeline.classList.remove('active');
    renderContent();
  });
};
