import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Shield, Truck, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import axios from 'axios';

const offers = [
  {
    logo: true,
  },
  {
    emoji: '👠',
    title: 'Designer Shoes',
    discount: '60% OFF',
    description: 'Luxury Footwear Collection'
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        // Ensure that products is always an array
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Auto-rotate offers every 4 seconds
    const offerInterval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(offerInterval);
  }, []);

  const categories = [
    'All',
    ...new Set(products.map(product => product.category)),
  ];

  const filteredProducts = products.filter(product => {
    return selectedCategory === 'All' || product.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full">
                  <span className="text-[#ea698b] text-sm font-medium">✨ New Season Collection</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Elegance
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Discover our curated collection of luxury fashion, exquisite jewelry, and timeless accessories that define sophisticated style.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300 hover:scale-105">
                    Shop Collection
                  </button>
                  <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                    Explore More
                  </button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-bold text-white">500+</p>
                    <p className="text-sm text-gray-400">Premium Products</p>
                  </div>
                  <div className="w-px h-12 bg-[#571089]/30"></div>
                  <div>
                    <p className="text-3xl font-bold text-white">50k+</p>
                    <p className="text-sm text-gray-400">Happy Customers</p>
                  </div>
                  <div className="w-px h-12 bg-[#571089]/30"></div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#ea698b] text-[#ea698b]" />
                      <p className="text-3xl font-bold text-white">4.9</p>
                    </div>
                    <p className="text-sm text-gray-400">Customer Rating</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ea698b] to-[#822faf] rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative">
                  {/* Rotating Offers */}
                  <div className="bg-gradient-to-br from-[#1a0a2e] to-[#571089]/20 p-8 rounded-3xl border border-[#571089]/30 backdrop-blur-sm transition-all duration-500">
                    <div className="text-center mb-4">
                      {offers[currentOffer].logo ? (
                        <img src="/logo.png" alt="Fansee Rebel" className="w-58 h-56 rounded-lg mx-auto" />
                      ) : (
                        <div className="text-9xl">{offers[currentOffer].emoji}</div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white mb-2">{offers[currentOffer].title}</p>
                      <p className="text-[#ea698b] text-4xl font-bold mb-4">{offers[currentOffer].discount}</p>
                      <p className="text-gray-400">{offers[currentOffer].description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ₹{
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                      : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedCategory === 'All' ? 'Featured Collection' : selectedCategory}
                </h2>
                <p className="text-gray-400">{filteredProducts.length} exquisite items</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-[#ea698b] hover:text-[#d55d92] transition-colors">
                <span>View All</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#ea698b]/20 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#571089]/20 to-[#47126b]/20 aspect-square">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                          const existingItem = wishlist.find(item => item._id === product._id);

                          if (!existingItem) {
                            wishlist.push(product);
                            localStorage.setItem('wishlist', JSON.stringify(wishlist));
                            alert('Added to wishlist!');
                          } else {
                            alert('Already in wishlist!');
                          }
                        }}
                        className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#ea698b]"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <Link
                          to={`/product/₹{product._id}`}
                          className="block w-full py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all text-center"
                        >
                          Quick View
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#ea698b] font-medium px-3 py-1 bg-[#ea698b]/10 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#ea698b] text-[#ea698b]" />
                          <span className="text-sm text-gray-400">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.numReviews})</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ea698b] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                          ₹{product.price}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                            const existingItem = cart.find(item => item._id === product._id);

                            if (existingItem) {
                              existingItem.quantity += 1;
                            } else {
                              cart.push({ ...product, quantity: 1 });
                            }

                            localStorage.setItem('cart', JSON.stringify(cart));
                            alert('Added to cart!');
                          }}
                          className="p-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#ea698b]/10 to-[#d55d92]/10 border border-[#ea698b]/30 rounded-2xl p-8 text-center hover:border-[#ea698b]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ea698b] to-[#d55d92] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Free Shipping</h3>
                <p className="text-gray-400">On all orders over ₹50</p>
              </div>
              <div className="bg-gradient-to-br from-[#c05299]/10 to-[#ac46a1]/10 border border-[#c05299]/30 rounded-2xl p-8 text-center hover:border-[#c05299]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c05299] to-[#ac46a1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure Payment</h3>
                <p className="text-gray-400">100% protected transactions</p>
              </div>
              <div className="bg-gradient-to-br from-[#822faf]/10 to-[#6d23b6]/10 border border-[#822faf]/30 rounded-2xl p-8 text-center hover:border-[#822faf]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#822faf] to-[#6d23b6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Easy Returns</h3>
                <p className="text-gray-400">30-day hassle-free returns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#571089]/20 border border-[#571089]/30 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Stay In Style</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Subscribe to receive exclusive offers, new arrivals, and style inspiration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/5 border border-[#571089]/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>


    </div>
  );
};

export default Home;