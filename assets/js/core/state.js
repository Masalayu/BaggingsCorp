/**
 * state.js
 * Central State Management (Single Source of Truth)
 * Menggunakan Module Pattern (IIFE)
 */

const Store = (() => {
  // Private State
  let _state = {
    currentPage: 'home',
    catalog: {
      selectedCategory: 'all',
      searchQuery: '',
      activeProduct: null,
    },
    portfolio: {
      selectedYear: 'all',
      selectedSource: 'all',
      viewMode: 'timeline',
    },
  };

  // Private Listeners
  let _listeners = [];

  /**
   * Mengambil data state
   * @param {string} [key] - (Opsional) Kunci spesifik dari slice state (misal: 'catalog').
   * @returns {Object|any} - Shallow copy seluruh state atau slice state spesifik.
   */
  const get = (key) => {
    if (key) {
      if (typeof _state[key] === 'object' && _state[key] !== null) {
        return { ..._state[key] };
      }
      return _state[key];
    }
    return { ..._state };
  };

  /**
   * Mengupdate data state dan memanggil seluruh subscriber
   * @param {string} key - Kunci slice state (misal: 'catalog')
   * @param {any} value - Nilai baru. Jika object, akan dilakukan shallow merge.
   */
  const set = (key, value) => {
    if (typeof _state[key] === 'object' && _state[key] !== null && typeof value === 'object' && value !== null) {
      // Lakukan shallow merge untuk tidak menghapus field lain di slice tersebut
      _state[key] = { ..._state[key], ...value };
    } else {
      // Replace langsung untuk tipe data primitif
      _state[key] = value;
    }
    
    // Notify all subscribers
    _listeners.forEach(listener => listener(_state));
  };

  /**
   * Mendaftarkan listener untuk memantau perubahan state
   * @param {Function} fn - Callback function yang dipanggil saat state berubah
   * @returns {Function} - Fungsi untuk melakukan unsubscribe
   */
  const subscribe = (fn) => {
    _listeners.push(fn);
    return () => {
      _listeners = _listeners.filter(listener => listener !== fn);
    };
  };

  // Expose public API
  return {
    get,
    set,
    subscribe
  };
})();

export default Store;

/* ==============================================================================
 * CONTOH PENGGUNAAN (EXAMPLE USAGE)
 * ==============================================================================
 * 
 * 1. Update filter kategori dari catalogPage.js:
 *    import Store from '../core/state.js';
 *    
 *    Store.set('catalog', { selectedCategory: 'Software' });
 *    console.log(Store.get('catalog').selectedCategory); // 'Software'
 * 
 * 2. Update viewMode dari portfolioPage.js:
 *    import Store from '../core/state.js';
 *    
 *    Store.set('portfolio', { viewMode: 'table' });
 *    // Nilai lain dalam 'portfolio' (selectedYear, selectedSource) tidak akan terhapus
 * 
 * 3. Subscribe perubahan state dari komponen navbar:
 *    import Store from '../core/state.js';
 *    
 *    const unsubscribe = Store.subscribe((state) => {
 *       if (state.currentPage === 'catalog') {
 *          // Lakukan perubahan UI, misalnya menambahkan class 'active' ke menu katalog
 *       }
 *    });
 * 
 * 4. Unsubscribe saat komponen di-unmount (misal ketika ganti halaman SPA):
 *    // Panggil fungsi yang direturn oleh metode subscribe() sebelumnya
 *    unsubscribe();
 * 
 * ==============================================================================
 */
