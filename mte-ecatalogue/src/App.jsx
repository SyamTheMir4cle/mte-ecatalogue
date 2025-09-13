import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import React, { useRef } from 'react'; // Pastikan useRef diimpor dari react

import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/footer';
import './App.css';
import Logo from './assets/mte.png'; // Ubah dari .svg menjadi .png

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

const productList = [
  {
    title: "Alat Deteksi Korban Bencana",
    description: "Peralatan canggih dengan sensor termal dan akustik untuk mendeteksi tanda-tanda kehidupan di darat (reruntuhan bangunan) dan di perairan, mempercepat operasi pencarian dan penyelamatan (SAR).",
    features: ["Sensor ganda (termal & akustik)", "Mode darat & air", "Desain portabel & kokoh", "Standar Basarnas"],
    image: "/images/radar.png",
  },
  {
    title: "Gergaji Pemotong Baja & Beton",
    description: "Gergaji hidrolik heavy-duty yang dirancang khusus untuk tim penyelamat. Mampu memotong material reruntuhan seperti baja tulangan dan beton untuk membuka akses evakuasi korban.",
    features: ["Tenaga hidrolik", "Mata pisau industrial", "Fitur keamanan operator", "Tahan di kondisi ekstrem"],
    image: "/images/saw.png",
  },
  {
    title: "Rescue Boat 12 Meter",
    description: "Kapal penyelamat (RIB) dengan panjang 12 meter yang dilengkapi atap pelindung (hard top). Dirancang untuk stabilitas tinggi dan kecepatan dalam operasi evakuasi di berbagai kondisi perairan.",
    features: ["Panjang 12 meter", "Material fiberglass maritim", "Atap pelindung (Hard Top)", "Kapasitas evakuasi besar"],
    image: "/images/rescue.png",
  },
  {
    title: "Ambulans Darat Lengkap",
    description: "Kendaraan ambulans modern yang sepenuhnya dilengkapi dengan peralatan medis darurat sesuai standar Kementerian Kesehatan, siap digunakan untuk penanganan pertama dan transportasi pasien kritis.",
    features: ["Peralatan medis ICU", "Kabin ergonomis", "Sistem suspensi khusus", "Sesuai standar Kemenkes"],
    image: "/images/ambulance.png",
  },
  {
    title: "Slurry Ice Machine",
    description: "Mesin penghasil es bubur (slurry) yang efektif menjaga kesegaran hasil laut di kapal penangkap ikan (di atas 30 GT) atau industri pengolahan. Menggunakan air laut sebagai bahan baku utama.",
    features: ["Pendinginan cepat & merata", "Bahan baku dari air laut", "Komposisi es dapat diatur", "Material food grade SUS 316"],
    image: "/images/slurry.png",
  },
];

const menuItems = [
  { label: 'Home', link: '#home' },
  { label: 'About Us', link: '#about-us' },
  { label: 'Products', link: '#products' },
  { label: 'Contact', link: '#contact' }
];


function App() {
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  
  const maskSections = [aboutRef, productsRef, contactRef, footerRef];

  return (
    <div className="relative w-full" style={{ background: '#1a1a1a' }}>
      <Header
        items={menuItems}
        logoUrl={Logo}
        maskSections={maskSections}
      />
      <main>
        <Hero />
        <div ref={aboutRef}><AboutUs /></div>
        <div ref={productsRef}><Products productList={productList} /></div>
        <div ref={contactRef}><Contact productList={productList} /></div>
      </main>
      <div ref={footerRef}><Footer /></div>
    </div>
  );
}

export default App;