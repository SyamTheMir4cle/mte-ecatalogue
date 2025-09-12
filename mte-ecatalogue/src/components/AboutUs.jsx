import React from 'react';
import ScrollReveal from './ScrollReveal';

const AboutUs = () => {
  const aboutText = "Selama Lebih dari 22 Tahun, PT Mega Tama Enerco adalah penyedia peralatan khusus berteknologi tinggi di Indonesia. Kami memasok produk berstandar internasional untuk pemerintah, swasta, dan industri. Komitmen kami adalah menyediakan solusi yang efektif dan andal untuk setiap operasi.";

  return (
    <section id="about-us" className="relative w-full min-h-screen flex items-center justify-center text-white py-20 px-4 md:px-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Us</h2>
        </div>

        <div className="md:col-span-2 relative w-full h-[350px] sm:h-[400px] rounded-[30px] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            style={{ transform: 'scale(1.5)' }}
          >
            <source src="/videos/background.webm" type="video/webm" />
            Browser Anda tidak mendukung tag video.
          </video>
          
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          <div className="relative z-20 p-6 sm:p-8 md:p-12 flex items-center h-full">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              textClassName="text-gray-200"
            >
              {aboutText}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;