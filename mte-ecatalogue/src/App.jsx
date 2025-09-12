// src/App.jsx

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';

import './App.css';
import Logo from './assets/mte.svg';

gsap.registerPlugin(SplitText, ScrollTrigger);

const products = [
    {
    title: "Alat Deteksi Korban Bencana",
    description: "Alat deteksi presisi tinggi untuk operasi SAR di darat dan laut. Teknologi sensor canggih mengidentifikasi korban di bawah reruntuhan atau di dalam air untuk mempercepat evakuasi.",
    features: ["Deteksi Akurat: Kombinasi sensor termal, akustik, dan sonar.", "Fungsi Ganda: Efektif di darat (reruntuhan) dan laut.", "Desain Tangguh: Portabel dan tahan di kondisi lapangan.", "Respons Cepat: Mempercepat waktu penemuan korban."]
  },
  {
    title: "Gergaji Pemotong Baja & Beton",
    description: "Gergaji hidrolik untuk memotong material keras seperti baja dan beton pada operasi penyelamatan. Membuka akses cepat untuk menjangkau korban terperangkap.",
    features: ["Kekuatan Tinggi: Memotong material padat secara presisi.", "Andal di Kondisi Ekstrem: Tahan debu, air, dan serpihan.", "Aman Digunakan: Dilengkapi fitur keselamatan operator.", "Tahan Lama: Material berkualitas untuk penggunaan jangka panjang."]
  },
  {
    title: "Perahu Penyelamat (Rescue Boat) 12 Meter",
    description: "Perahu penyelamat 12 meter untuk evakuasi dan patroli. Dilengkapi atap pelindung, stabil, dan cepat untuk berbagai kondisi perairan.",
    features: ["Kapasitas Besar: Mengangkut tim dan korban secara efisien.", "Performa Tinggi: Manuver cepat dan stabil.", "Atap Pelindung: Melindungi dari cuaca ekstrem.", "Material Maritim: Tahan korosi dan benturan."]
  },
  {
    title: "Ambulans Darat",
    description: "Unit ambulans darat sebagai fasilitas medis darurat berjalan. Dilengkapi peralatan canggih untuk stabilisasi pasien di lokasi dan selama transportasi.",
    features: ["Peralatan Medis Lengkap: Defibrilator, ventilator, monitor pasien.", "Kabin Ergonomis: Tata letak efisien untuk tim medis.", "Performa Andal: Mesin optimal untuk respons cepat.", "Dapat Disesuaikan: Spesifikasi sesuai kebutuhan klien."]
  },
  {
    title: "Mesin Es Slurry Daxtro SD30",
    description: "Mesin es slurry untuk pendinginan cepat dan merata di industri perikanan dan pengolahan makanan. Menjaga kesegaran produk secara maksimal.",
    features: ["Kapasitas: 3 ton/24 jam.", "Kompresor: Bitzer Semi Hermatic (Jerman).", "Material: Stainless Steel SUS 316, tahan korosi.", "Daya: 21 KW.", "Pendingin: Sistem pendingin udara.", "Paket: Termasuk instalasi dan peralatan pendukung."]
  },
];

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

function App() {


  return (
    <div style={{ height: '100vh', background: '#1a1a1a' }}>
      <Header
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#ff6b6b"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  );
}

export default App;