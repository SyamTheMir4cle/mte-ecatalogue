import React from 'react';

const Products = ({ productList }) => {
  return (
    <section id="products" className="w-full min-h-screen py-20 px-4 md:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productList && productList.map((product, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, fIndex) => (
                    <span key={fIndex} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;