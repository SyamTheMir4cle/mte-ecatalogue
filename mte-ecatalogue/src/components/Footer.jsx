import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = '62817206191';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const contactEmail = 'mte.business08@gmail.com';
  const contactLink = `mailto:${contactEmail}`;


  return (
    <footer id="footer" className="w-full bg-black text-gray-400 py-12 px-4 md:px-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4">Alamat Kantor</h3>
          <p className="text-sm leading-relaxed">
            Jl. Raya Alun-Alun Pangalengan No. 321, <br />
            Pangalengan, kab. Bandung, <br />
            Jawa Barat 40378, Indonesia
          </p>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4">Hubungi Kami</h3>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-500 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={contactLink}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Email
          </a>
        </div>

        <div className="md:col-span-1 flex flex-col items-center md:items-end">
           <img src="/src/assets/mte.png" alt="Logo" className="h-12 mb-4" />
           <p className="text-sm mt-auto">
            &copy; {currentYear} PT Mega Tama Enerco. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;