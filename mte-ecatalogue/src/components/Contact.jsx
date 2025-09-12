import React, { useState } from 'react';

const Contact = ({ productList }) => {
  const [selectedProduct, setSelectedProduct] = useState(productList[0]?.title || '');

  const handleSubmit = (event) => {
    event.preventDefault();

    const phoneNumber = '6282310086347'; 

    const message = `Halo, saya ingin bertanya apakah produk "${selectedProduct}" masih tersedia? Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="w-full min-h-screen flex items-center justify-center bg-black py-20 px-4 md:px-8">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Hubungi Kami</h2>
        <p className="text-gray-400 mb-8">
          Punya pertanyaan tentang produk kami? Pilih produk di bawah dan tanyakan langsung melalui WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="w-full max-w-md">
            <label htmlFor="product-select" className="sr-only">Pilih Produk</label>
            <select
              id="product-select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {productList && productList.map((product) => (
                <option key={product.title} value={product.title}>
                  {product.title}
                </option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-500 transition-colors text-lg"
          >
            Tanya via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;