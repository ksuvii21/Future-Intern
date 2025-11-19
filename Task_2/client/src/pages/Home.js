import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Shield, Truck, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import Silk from '../components/Silk';

const offers = [
  {
    logo: true,
    title: 'Fansee Rebel',
    description: 'Luxury Fashion & Accessories'
  },
  {
    emoji: '👠',
    title: 'Designer Shoes',
    discount: '60% OFF',
    description: 'Luxury Footwear Collection'
  },
  {
    emoji: '💎',
    title: 'Exquisite Jewelry',
    discount: '40% OFF',
    description: 'Shine with our latest collection'
  }
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over ₹5000',
    colors: 'from-[#ea698b]/10 to-[#d55d92]/10 border-[#ea698b]/30 hover:border-[#ea698b]/50',
    iconColors: 'from-[#ea698b] to-[#d55d92]'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% protected transactions',
    colors: 'from-[#c05299]/10 to-[#ac46a1]/10 border-[#c05299]/30 hover:border-[#c05299]/50',
    iconColors: 'from-[#c05299] to-[#ac46a1]'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
    colors: 'from-[#822faf]/10 to-[#6d23b6]/10 border-[#822faf]/30 hover:border-[#822faf]/50',
    iconColors: 'from-[#822faf] to-[#6d23b6]'
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentOffer, setCurrentOffer] = useState(0);
  const categoriesRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products without pagination for proper category filtering
        const response = await axios.get('http://localhost:5000/api/products?limit=100');
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

  const handleShopNowClick = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="absolute inset-0">
            <Silk speed={3} scale={1.2} color="#3b1665ff" noiseIntensity={1.0} rotation={0.2} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full">
                  <span className="text-[#ea698b] text-sm font-medium">✨ New Season Collection</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Elegance
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                  Discover our curated collection of luxury fashion, exquisite jewelry, and timeless accessories that define sophisticated style.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/search" className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300 hover:scale-105 inline-block text-center">
                    Advanced Search
                  </Link>
                  <button onClick={handleShopNowClick} className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                    Shop Collection
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
                <div className="relative h-80 sm:h-96 w-full max-w-xl mx-auto">
                  {/* Rotating Offers */}
                  {offers.map((offer, index) => {
                    const isCurrent = index === currentOffer;

                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 bg-gradient-to-br from-[#1a0a2e] to-[#571089]/20 p-8 rounded-3xl border border-[#571089]/30 backdrop-blur-sm transition-all duration-700 ease-in-out`}
                        style={{
                          transform: isCurrent ? 'scale(1)' : 'scale(0.95)',
                          opacity: isCurrent ? 1 : 0,
                          zIndex: isCurrent ? 10 : 0,
                        }}
                      >
                        {offer.logo ? (
                          <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <img src="/logo.png" alt="Fansee Rebel" className="w-50 h-48 rounded-lg mx-auto mb-4" />
                            <p className="text-3xl font-bold text-white mb-2">{offer.title}</p>
                            <p className="text-gray-300">{offer.description}</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center h-full">
                            <div className="text-center hidden sm:block">
                              <div className="text-8xl">{offer.emoji}</div>
                            </div>
                            <div className="text-left">
                              <p className="text-3xl font-bold text-white mb-2">{offer.title}</p>
                              <p className="text-[#ea698b] text-5xl font-bold mb-4">{offer.discount}</p>
                              <p className="text-gray-300">{offer.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section ref={categoriesRef} className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative px-8 py-3.5 rounded-full font-medium transition-all duration-500 overflow-hidden ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/40 scale-105'
                      : 'bg-white/5 backdrop-blur-md border border-[#571089]/40 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/60 hover:scale-105'
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {selectedCategory !== category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ea698b]/0 via-[#ea698b]/5 to-[#d55d92]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div className="text-center md:text-left w-full md:w-auto">
                <h2 className="text-4xl font-bold mb-3">
                  <span className="text-white">
                    {selectedCategory === 'All' ? 'Featured ' : ''}
                  </span>
                  <span className="bg-gradient-to-r from-[#ea698b] to-[#822faf] bg-clip-text text-transparent">
                    {selectedCategory === 'All' ? 'Collection' : selectedCategory}
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-[#ea698b] to-[#d55d92] rounded-full"></div>
                  <p className="text-gray-400">{filteredProducts.length} exquisite pieces</p>
                </div>
              </div>
              <button className="self-center md:self-auto flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-[#571089]/40 rounded-full text-[#ea698b] hover:bg-white/10 hover:border-[#ea698b]/60 transition-all duration-300 hover:scale-105 group">
                <span>View All Collection</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const token = localStorage.getItem('token');
                            if (!token) {
                              alert('Please log in to add items to your wishlist.');
                              return;
                            }

                            try {
                              await axios.post('http://localhost:5000/api/wishlist', {
                                productId: product._id
                              }, {
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              alert('Added to wishlist!');
                            } catch (error) {
                              console.error('Error adding to wishlist:', error);
                              if (error.response?.status === 400) {
                                alert('Already in wishlist!');
                              } else {
                                alert('Failed to add to wishlist.');
                              }
                            }
                          }}
                          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#ea698b]"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <Link
                          to={`/product/${product._id}`}
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
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent link navigation
                            const token = localStorage.getItem('token');
                            if (!token) {
                              alert('Please log in to add items to your cart.');
                              return;
                            }
                            try {
                              await axios.post('http://localhost:5000/api/cart', {
                                productId: product._id,
                                quantity: 1,
                                selectedColor: product.variants?.[0]?.color || 'Default',
                                selectedSize: 'M' // Default size
                              }, {
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              alert('Added to cart!');
                            } catch (err) {
                              console.error("Error adding to cart", err);
                              alert('Failed to add to cart.');
                            }
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
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#571089]/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-[#ea698b]/10 to-[#822faf]/10 border border-[#ea698b]/20 rounded-full text-[#ea698b] text-sm font-medium backdrop-blur-sm">
                  Premium Benefits
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose <span className="bg-gradient-to-r from-[#ea698b] to-[#822faf] bg-clip-text text-transparent">Fansee Rebel</span>?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Experience unparalleled luxury shopping with exclusive benefits designed to elevate your style journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ea698b]/20 to-[#822faf]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className={`relative bg-gradient-to-br ${feature.colors} backdrop-blur-xl rounded-3xl p-8 text-center md:text-left border transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-2xl`}>
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-md"></div>
                        <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.iconColors} rounded-2xl flex items-center justify-center mx-auto md:mx-0 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                        <feature.icon className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#ea698b] group-hover:to-[#d55d92] group-hover:bg-clip-text group-hover:text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <button className="text-[#ea698b] text-sm font-medium flex items-center gap-2 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        Learn More
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ea698b]/10 via-transparent to-[#822faf]/10 animate-pulse"></div>
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative bg-gradient-to-br from-[#1a0a2e]/90 via-[#571089]/30 to-[#1a0a2e]/90 backdrop-blur-xl border border-[#571089]/40 rounded-[2rem] p-12 md:p-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ea698b]/20 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#822faf]/20 to-transparent rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-block mb-6">
                    <span className="px-5 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full text-[#ea698b] text-sm font-medium backdrop-blur-sm">
                      ✉ Join Our VIP Club
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    <span className="text-white">Stay </span>
                    <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
                      In Style
                    </span>
                  </h2>
                  
                  <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join our exclusive community and be the first to discover new collections, limited editions, and receive personalized style recommendations
                  </p>
                  
                  <div className="max-w-xl mx-auto">
                    <div className="relative group/input">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ea698b] to-[#822faf] rounded-full opacity-0 group-hover/input:opacity-100 blur transition-opacity duration-500"></div>
                      <div className="relative flex flex-col sm:flex-row gap-3 bg-white/5 backdrop-blur-md border border-[#571089]/40 rounded-full p-2">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="flex-1 px-6 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                        />
                        <button className="group/btn relative px-8 py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#ea698b]/50 hover:scale-105">
                          <span className="relative z-10 flex items-center gap-2 justify-center">
                            Subscribe Now
                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#d55d92] to-[#ea698b] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Exclusive Offers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Early Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Style Tips</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;