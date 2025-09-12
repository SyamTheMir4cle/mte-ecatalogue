import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import product1 from '../assets/product-showcase-1.svg';
import product2 from '../assets/product-showcase-2.svg';
import product3 from '../assets/product-showcase-3.svg';
import product4 from '../assets/product-showcase-4.svg';

const Hero = () => {
  const heroRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const images = [img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current];
      
      if (images.some(img => !img)) {
        console.error("GSAP target image not found.");
        return;
      }
      
      images.forEach((img, i) => {
        const movement = (i + 1) * -50; 
        
        gsap.to(img, {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#products",
      ease: 'power2.inOut',
    });
  };

  return (
    <div ref={heroRef} id="home" className="relative flex flex-col items-center justify-center text-white w-full min-h-screen px-4 pt-24 pb-12 overflow-x-clip">
      
      <div className="relative w-full max-w-4xl flex items-center justify-center">

        <img 
          ref={img1Ref} 
          src={product1} 
          alt="Product 1" 
          className="absolute top-[-2rem] left-[-4rem] w-40 md:top-[-6rem] md:left-[-10rem] md:w-72 transform -rotate-12 drop-shadow-lg pointer-events-none z-0" 
        />
        <img 
          ref={img4Ref} 
          src={product4} 
          alt="Product 4" 
          className="absolute bottom-[-3rem] right-[-5rem] w-40 md:bottom-[-5rem] md:right-[-12rem] md:w-72 transform rotate-12 drop-shadow-lg pointer-events-none z-0" 
        />

        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 sm:p-8 md:p-12 text-center z-10">
          <div className="pointer-events-none">
            <p className="text-base sm:text-lg md:text-xl mb-4 text-gray-200">Hi, Kita Adalah PT Mega Tama Enerco</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              Solusi Andal <br /> 
              Untuk Industri <br />
              & Masa Kritis
            </h1>
          </div>
        </div>

        <img 
          ref={img2Ref} 
          src={product2} 
          alt="Product 2" 
          className="absolute top-[-1rem] right-[-3rem] w-36 md:top-[-3rem] md:right-[-8rem] md:w-56 transform rotate-6 drop-shadow-lg pointer-events-none z-20" 
        />
        <img 
          ref={img3Ref} 
          src={product3} 
          alt="Product 3" 
          className="absolute bottom-[-4rem] left-[-3rem] w-36 md:bottom-[-7rem] md:left-[-8rem] md:w-60 transform -rotate-6 drop-shadow-lg pointer-events-none z-20" 
        />
      </div>

      <div className="absolute bottom-12 sm:bottom-16 z-30 flex items-center gap-4">
        <span className="font-medium text-gray-300 text-sm sm:text-base">Scroll To Explore</span>
        <button 
          onClick={handleScroll}
          className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-indigo-500 transition-colors text-sm sm:text-base"
        >
          Our Products
        </button>
      </div>

      <div className="absolute bottom-[-15rem] w-[150%] max-w-7xl h-[30rem] z-0 opacity-30">
         <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path d="M-100,300 Q500,-100 1100,300" fill="none" stroke="gray" strokeWidth="2" strokeDasharray="8, 8"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;