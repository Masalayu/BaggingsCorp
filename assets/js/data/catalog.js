// catalog.js
export const catalogData = [
  // Produk IT & Elektronik
  {
    id: "it-01",
    name: "Interactive Flat Panel (IFP) BenQ 65/75/86 inch",
    category: "Produk IT & Elektronik",
    description: "Layar interaktif canggih untuk kebutuhan edukasi dan presentasi korporat. Dilengkapi fitur kolaborasi dan perlindungan mata (Eye-care).",
    price_scheme: { currency: "IDR", min: 45000000, max: 120000000 },
    image: "assets/img/catalog/ifp-benq.jpg"
  },
  {
    id: "it-02",
    name: "Laptop Bisnis & Edukasi",
    category: "Produk IT & Elektronik",
    description: "Laptop spesifikasi tinggi untuk menunjang produktivitas kerja dan proses belajar mengajar. Tersedia berbagai merek ternama.",
    price_scheme: { currency: "IDR", min: 7000000, max: 25000000 },
    image: "assets/img/catalog/laptop.jpg"
  },
  {
    id: "it-03",
    name: "Chromebook",
    category: "Produk IT & Elektronik",
    description: "Perangkat ringan dan cepat berbasis ChromeOS, sangat cocok untuk pembelajaran jarak jauh dan integrasi Google Workspace.",
    price_scheme: { currency: "IDR", min: 4000000, max: 8000000 },
    image: "assets/img/catalog/chromebook.jpg"
  },
  {
    id: "it-04",
    name: "Personal Computer (PC) All-in-One / Desktop",
    category: "Produk IT & Elektronik",
    description: "Solusi komputasi handal untuk kantor dan lab sekolah. Tersedia tipe Desktop tradisional maupun All-in-One (AiO).",
    price_scheme: { currency: "IDR", min: 6000000, max: 30000000 },
    image: "assets/img/catalog/pc.jpg"
  },
  {
    id: "it-05",
    name: "Printer Multifungsi",
    category: "Produk IT & Elektronik",
    description: "Mesin pencetak dokumen efisien dengan fitur scan, copy, dan print nirkabel. Kapasitas cetak tinggi dengan tinta ekonomis.",
    price_scheme: { currency: "IDR", min: 2500000, max: 15000000 },
    image: "assets/img/catalog/printer.jpg"
  },
  {
    id: "it-06",
    name: "Proyektor Bisnis",
    category: "Produk IT & Elektronik",
    description: "Proyektor resolusi tinggi dengan kecerahan maksimal untuk presentasi di ruangan terang.",
    price_scheme: { currency: "IDR", min: 5000000, max: 20000000 },
    image: "assets/img/catalog/projector.jpg"
  },
  {
    id: "it-07",
    name: "Tablet Edukasi & Profesional",
    category: "Produk IT & Elektronik",
    description: "Perangkat portabel serbaguna dengan dukungan stylus untuk menggambar, mencatat, dan presentasi.",
    price_scheme: { currency: "IDR", min: 3000000, max: 18000000 },
    image: "assets/img/catalog/tablet.jpg"
  },
  {
    id: "it-08",
    name: "Smart TV",
    category: "Produk IT & Elektronik",
    description: "Televisi pintar ukuran besar untuk digital signage, ruang meeting, maupun ruang tunggu.",
    price_scheme: { currency: "IDR", min: 4000000, max: 25000000 },
    image: "assets/img/catalog/smart-tv.jpg"
  },
  {
    id: "it-09",
    name: "Air Conditioner (AC)",
    category: "Produk IT & Elektronik",
    description: "Penyejuk ruangan hemat energi dengan teknologi inverter. Tersedia tipe split maupun cassette.",
    price_scheme: { currency: "IDR", min: 3500000, max: 15000000 },
    image: "assets/img/catalog/ac.jpg"
  },
  
  // Peralatan Sekolah/Kantor
  {
    id: "eq-01",
    name: "Meja & Kursi Adjustable",
    category: "Peralatan Sekolah/Kantor",
    description: "Set meja dan kursi ergonomis yang ketinggiannya dapat diatur (adjustable). Cocok untuk berbagai jenjang sekolah dan kantor modern.",
    price_scheme: { currency: "IDR", min: 800000, max: 3500000 },
    image: "assets/img/catalog/meja-kursi.jpg"
  },
  {
    id: "eq-02",
    name: "Lemari Besi (Filing Cabinet)",
    category: "Peralatan Sekolah/Kantor",
    description: "Lemari arsip berbahan metal kuat dan tahan api untuk menyimpan dokumen penting dengan aman.",
    price_scheme: { currency: "IDR", min: 1500000, max: 5000000 },
    image: "assets/img/catalog/lemari-besi.jpg"
  },

  // Software
  {
    id: "sw-01",
    name: "Koding AI",
    category: "Software",
    description: "Platform pembelajaran pemrograman cerdas berbasis kecerdasan buatan (AI) untuk membantu siswa dan profesional belajar coding.",
    price_scheme: { currency: "IDR", type: "Subscription", price_per_year: 2500000 },
    image: "assets/img/catalog/koding-ai.jpg"
  },
  {
    id: "sw-02",
    name: "PerpusKita",
    category: "Software",
    description: "Sistem Informasi Manajemen Perpustakaan digital yang terintegrasi, memudahkan peminjaman, pelacakan buku, dan e-library.",
    price_scheme: { currency: "IDR", type: "License", start_from: 10000000 },
    image: "assets/img/catalog/perpuskita.jpg"
  },
  {
    id: "sw-03",
    name: "Solusi Server & Cloud",
    category: "Software",
    description: "Layanan pengadaan dan konfigurasi server fisik maupun komputasi awan (Cloud) untuk operasional instansi.",
    price_scheme: { currency: "IDR", type: "Custom", description: "Berdasarkan Kebutuhan" },
    image: "assets/img/catalog/server.jpg"
  }
];
