import React from 'react';

const MaskedLogo = React.forwardRef(({ logoUrl, clipRectRef }, ref) => {
  return (
    <div ref={ref} className="relative h-10 w-auto">
      {/* 1. Logo Asli (Putih) - Latar Belakang */}
      <img
        src={logoUrl}
        alt="Logo"
        className="absolute top-0 left-0 h-full w-full object-contain"
      />
      {/* 2. Logo Terpotong (Hitam) - Latar Depan */}
      <svg className="absolute top-0 left-0 h-full w-full" viewBox="0 0 110 40" preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="logo-clip">
            {/* Persegi ini akan dianimasikan oleh GSAP untuk membuat efek masking */}
            <rect ref={clipRectRef} x="0" y="0" width="110" height="0" />
          </clipPath>
        </defs>
        {/* Gambar ini akan dipotong oleh clipPath di atas */}
        <image
          href={logoUrl}
          width="110"
          height="40"
          clipPath="url(#logo-clip)"
          className="invert" // Kelas 'invert' membuat logo menjadi hitam
        />
      </svg>
    </div>
  );
});

export default MaskedLogo;