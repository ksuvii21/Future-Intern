import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, MapPin, MessageCircle, Award, Send, Share } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import axios from 'axios';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewImages, setReviewImages] = useState([]);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Load review draft from localStorage
    const savedReview = JSON.parse(localStorage.getItem(`reviewDraft-${id}`) || '{}');
    if (savedReview.rating) setReviewRating(savedReview.rating);
    if (savedReview.comment) setReviewComment(savedReview.comment);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/api/products/${id}`
        );
        setProduct(response.data);

        // Check URL parameters for color selection
        const urlParams = new URLSearchParams(location.search);
        const colorParam = urlParams.get('color');

        // Set default selected color to first variant if available, or from URL param
        if (response.data.variants && response.data.variants.length > 0) {
          const defaultColor = colorParam && response.data.variants.find(v => v.color === colorParam)
            ? colorParam
            : response.data.variants[0].color;
          setSelectedColor(defaultColor);

          // Set selected image index to the variant's image
          const variant = response.data.variants.find(v => v.color === defaultColor);
          if (variant) {
            const allImagesTemp = response.data.variants.map(v => ({ src: v.imageUrl }));
            const imageIndex = allImagesTemp.findIndex(img => img.src === variant.imageUrl);
            if (imageIndex !== -1) setSelectedImageIndex(imageIndex);
          }
        } else {
          setSelectedImageIndex(0);
        }

        // Fetch similar products
        const allProductsResponse = await axios.get('/api/products');
        const similar = allProductsResponse.data.products.filter(p => p &&
          p.category === response.data.category && p._id !== response.data._id
        ).slice(0, 4);
        setSimilarProducts(similar);

        // Add to recently viewed
        const viewedItems = JSON.parse(localStorage.getItem('viewedItems') || '[]');
        // Remove if already exists to move it to the front
        const newViewedItems = viewedItems.filter(item => item._id !== response.data._id);
        // Add to the beginning of the array
        newViewedItems.unshift(response.data);
        // Keep only the last 10 viewed items
        localStorage.setItem('viewedItems', JSON.stringify(newViewedItems.slice(0, 10)));
        // Dispatch a storage event to notify other components like the wishlist page
        window.dispatchEvent(new Event('storage'));

        setLoading(false);
      } catch (error) {
        if (error.response?.status === 404) {
          setError('Product not found');
        } else if (error.response?.status === 400) {
          setError('Invalid product ID');
        } else {
          setError('Error fetching product details');
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.search]);

  // Get the current variant based on selected color
  const currentVariant = product?.variants?.find(v => v.color === selectedColor);

  // Get all images for the lightbox (variant images + default if no variants)
  const allImages = product?.variants && product.variants.length > 0
    ? product.variants.map(v => ({ src: v.imageUrl }))
    : (product?.imageUrl ? [{ src: product.imageUrl }] : []);

  // Get additional product images for thumbnails (simulating different perspectives)
  const productImages = product?.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls.map(url => ({ src: url }))
    : allImages;

  // Combine variant images and product images for comprehensive view
  const thumbnailImages = [...allImages, ...productImages.filter(img =>
    !allImages.some(variantImg => variantImg.src === img.src)
  )].slice(0, 4); // Limit to 4 thumbnails

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Guest user cart logic
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];
      const existingItemIndex = cart.findIndex(item => item.product._id === product._id && item.selectedColor === selectedColor && item.selectedSize === selectedSize);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({
          product: product,
          quantity,
          selectedColor: selectedColor,
          selectedSize: selectedSize
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
      window.dispatchEvent(new Event('storage')); // Trigger cart count update
      return;
    }
    try {
      await axios.post('/api/cart', {
        productId: product._id,
        quantity: quantity,
        selectedColor: selectedColor,
        selectedSize: selectedSize
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product added to cart!');
      // Trigger cart count update
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error adding to cart", error);
      if (error.response?.status === 401) {
        alert('Please log in to add items to your cart.');
      } else {
        alert('Failed to add item to cart.');
      }
    }
  };

  const buyNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      // Directly set the cart with the current product
      const cartItem = {
        product: product,
        quantity: quantity,
        selectedColor: selectedColor,
        selectedSize: selectedSize
      };
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      window.dispatchEvent(new Event('storage'));

      // Then, navigate to the checkout page
      navigate('/checkout');
    } catch (error) {
      console.error("Error during buy now process", error);
      alert('Failed to proceed to checkout.');
    }
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to your wishlist');
        return;
      }

      await axios.post('http://localhost:5000/api/wishlist', {
        productId: product._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Product added to wishlist!');
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Product already in wishlist!');
      } else {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add product to wishlist');
      }
    }
  };

  const shareProduct = () => {
    const url = window.location.href;
    const title = product.name;
    const text = `Check out this amazing product: ${product.name}`;

    if (navigator.share) {
      navigator.share({
        title,
        text,
        url,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert('Product link copied to clipboard!');
      }).catch(() => {
        alert('Unable to copy link. Please copy the URL manually.');
      });
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      // Mock delivery calculation
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 7) + 2);
      setDeliveryInfo({
        available: true,
        date: deliveryDate.toLocaleDateString(),
        location: 'Your Area'
      });
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');
    setIsSubmittingReview(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setReviewError('You must be logged in to submit a review.');
      setIsSubmittingReview(false);
      return;
    }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const reviewData = new FormData();
        reviewData.append('rating', reviewRating);
        reviewData.append('comment', reviewComment);
        reviewImages.forEach((image, index) => {
          reviewData.append('images', image);
        });
        await axios.post(`/api/products/${id}/reviews`, reviewData, config);

      setReviewSuccess('Review submitted successfully! It will be visible after refreshing.');
      setReviewRating(0);
      setReviewComment('');
    } catch (error) {
      setReviewError(error.response?.data?.message || 'Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/" className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/" className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-[#571089]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-300 hover:text-[#ea698b] transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="space-y-2">
            <div className="group bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-xl overflow-hidden relative aspect-[4/3] cursor-pointer" onClick={() => setLightboxOpen(true)}>
              {thumbnailImages.length > 0 && thumbnailImages[selectedImageIndex] ? (
                <img
                  src={thumbnailImages[selectedImageIndex].src}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                  }}
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-[#571089]/20 to-[#47126b]/20 flex items-center justify-center">
                  <span className="text-8xl">🛍️</span>
                </div>
              )}
            </div>
            {thumbnailImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {thumbnailImages.map((img, index) => (

                  <div
                    key={index}
                    className={`border-2 rounded-md overflow-hidden aspect-square cursor-pointer transition-all ${
                      selectedImageIndex === index
                        ? 'border-[#ea698b] ring-2 ring-[#ea698b]/50'

                        : 'border-[#571089]/30 hover:border-[#571089]/50'
                    }`}
                    onClick={() => {
                      if (index < allImages.length) {
                        // It's a variant image
                        const variant = product.variants[index];
                        setSelectedColor(variant.color);
                        setSelectedImageIndex(index);
                        const newUrl = `/product/${product._id}?color=${encodeURIComponent(variant.color)}`;
                        navigate(newUrl);
                      } else {
                        // It's an additional image, just set the index
                        setSelectedImageIndex(index);
                      }
                    }}
                  >
                    <img
                      src={img.src}
                      alt={`${product.name} view ${index + 1}`}

                      className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWNhNGIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                      }}
                    />
                    {selectedImageIndex === index && (
                      <div className="inset-0 bg-[#ea698b]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full"></div>
                      </div>
                    )}
                  </div>

                ))}
              </div>
            )}
            {product.isNewArrival && (
              <div className="inline-block bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white text-sm font-bold px-4 py-2 rounded-full">
                NEW ARRIVAL
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-[#ea698b] font-medium px-3 py-1 bg-[#ea698b]/10 rounded-full">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#ea698b] text-[#ea698b]" />
                    <span className="text-sm text-gray-400">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            
            {/* Color Selection */}
            {product?.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-gray-300 font-medium text-sm">Color Variants:</label>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map(variant => (
                    <button
                      key={`color-button-${variant.color}`}
                      onClick={() => {
                        setSelectedColor(variant.color);
                        const imageIndex = allImages.findIndex(img => img.src === variant.imageUrl);
                        if (imageIndex !== -1) setSelectedImageIndex(imageIndex);
                        const newUrl = `/product/${product._id}?color=${encodeURIComponent(variant.color)}`;
                        navigate(newUrl);
                      }}
                      className={`px-3 py-1 rounded-md border-2 transition-all text-sm ${
                        selectedColor === variant.color
                          ? 'border-[#ea698b] bg-[#ea698b]/20 text-[#ea698b] '
                          : 'border-[#571089]/30 bg-white/5 text-gray-300 hover:border-[#571089]/50'
                      }`}
                    >
                      {variant.color}
                    </button>

                  ))}
                </div>
                {/* Color Variant Images */}
                <div className="flex gap-2 flex-wrap ">
                  {product.variants.map(variant => (
                    <div
                      key={`img-${variant.color}`}
                      className={`relative w-12 h-12 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedColor === variant.color
                          ? 'border-[#ea698b] ring-2 ring-[#ea698b]/50'
                          : 'border-[#571089]/30 hover:border-[#571089]/50'
                      }`}
                      onClick={() => {
                        setSelectedColor(variant.color);
                        // Find the index of this variant's image in the allImages array and update the main image
                        const imageIndex = allImages.findIndex(img => img.src === variant.imageUrl);
                        if (imageIndex !== -1) setSelectedImageIndex(imageIndex);
                        const newUrl = `/product/${product._id}?color=${encodeURIComponent(variant.color)}`;
                        navigate(newUrl);
                      }}
                    >
                      <img
                        src={variant.imageUrl}
                        alt={`${product.name} - ${variant.color}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjI0IiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                        }}
                      />
                      {selectedColor === variant.color && (
                        <div className="absolute inset-0 bg-[#ea698b]/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#ea698b] rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            )}

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-gray-300 font-medium">Size:</label>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-[#ea698b] hover:text-[#d55d92] text-sm underline"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-[#ea698b] bg-[#ea698b]/20 text-[#ea698b]'
                        : 'border-[#571089]/30 bg-white/5 text-gray-300 hover:border-[#571089]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Chart Modal */}
            {showSizeChart && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Size Chart</h3>
                    <button
                      onClick={() => setShowSizeChart(false)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-6 gap-4 text-center text-sm font-medium text-gray-300 border-b border-[#571089]/30 pb-2">
                      <div>Size</div>
                      <div>Chest (in)</div>
                      <div>Chest (cm)</div>
                      <div>Length (in)</div>
                      <div>Length (cm)</div>
                      <div>Shoulder (in)</div>
                    </div>
                    {[
                      { size: 'S', chestIn: 36, chestCm: 91, lengthIn: 27, lengthCm: 69, shoulder: 16 },
                      { size: 'M', chestIn: 38, chestCm: 97, lengthIn: 28, lengthCm: 71, shoulder: 17 },
                      { size: 'L', chestIn: 40, chestCm: 102, lengthIn: 29, lengthCm: 74, shoulder: 18 },
                      { size: 'XL', chestIn: 42, chestCm: 107, lengthIn: 30, lengthCm: 76, shoulder: 19 },
                      { size: 'XXL', chestIn: 44, chestCm: 112, lengthIn: 31, lengthCm: 79, shoulder: 20 }
                    ].map(row => (
                      <div key={row.size} className="grid grid-cols-6 gap-4 text-center text-gray-400 border-b border-[#571089]/20 py-2">
                        <div className="font-medium text-white">{row.size}</div>
                        <div>{row.chestIn}"</div>
                        <div>{row.chestCm}cm</div>
                        <div>{row.lengthIn}"</div>
                        <div>{row.lengthCm}cm</div>
                        <div>{row.shoulder}"</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-[#571089]/10 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">How to Measure</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Chest: Measure around the fullest part of your chest</li>
                      <li>• Length: Measure from shoulder to bottom hem</li>
                      <li>• Shoulder: Measure from shoulder seam to shoulder seam</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <label className="text-gray-300 font-medium text-sm">Quantity:</label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-white/5 border border-[#571089]/30 rounded-md text-white hover:bg-white/10 transition-all text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center text-white font-semibold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 bg-white/5 border border-[#571089]/30 rounded-md text-white hover:bg-white/10 transition-all text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={buyNow}
                disabled={product.stock === 0}
                className={`w-full sm:flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  product.stock === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105'
                }`}
              >
                <Award className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
              </button>
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                className={`w-full sm:flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  product.stock === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white hover:shadow-lg hover:shadow-[#ea698b]/50 transform hover:scale-105'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <div className="flex gap-4 w-full sm:w-auto">
                <button
                  onClick={addToWishlist}
                  className="flex-1 sm:flex-none p-4 bg-white/5 border border-[#571089]/30 rounded-xl text-white hover:bg-white/10 hover:border-[#ea698b]/50 transition-all"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={shareProduct}
                  className="flex-1 sm:flex-none p-4 bg-white/5 border border-[#571089]/30 rounded-xl text-white hover:bg-white/10 hover:border-[#ea698b]/50 transition-all"
                >
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-3 pt-4 border-t border-[#571089]/30">
              <h3 className="text-base font-semibold text-white">Delivery & Returns</h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-[#571089]/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] text-sm"
                    maxLength="6"
                  />
                </div>
                <button
                  onClick={checkDelivery}
                  disabled={pincode.length !== 6}
                  className="px-4 py-2 bg-[#ea698b] text-white rounded-md hover:bg-[#d55d92] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                  Check
                </button>
              </div>
              {deliveryInfo && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium text-sm">Delivery Available</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Estimated delivery by <span className="text-white font-medium">{deliveryInfo.date}</span> to {deliveryInfo.location}
                  </p>
                </div>
              )}
            </div>

            {/* Sold By */}
            <div className="pt-6 border-t border-[#571089]/30">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#ea698b]" />
                <span className="text-gray-300">Sold by <span className="text-white font-medium">EleganceHub</span></span>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-[#571089]/30">
              <h3 className="text-lg font-semibold text-white mb-4">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Fabric:</span>
                  <span className="text-white">Premium Cotton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Length:</span>
                  <span className="text-white">Regular</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pattern:</span>
                  <span className="text-white">Solid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Occasion:</span>
                  <span className="text-white">Casual</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#571089]/30">
              <div className="flex items-center gap-2 text-gray-300">
                <Truck className="w-4 h-4 text-[#ea698b]" />
                <span className="text-xs">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Shield className="w-4 h-4 text-[#ea698b]" />
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <RotateCcw className="w-4 h-4 text-[#ea698b]" />
                <span className="text-xs">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={thumbnailImages.map(img => ({ src: img.src }))}
        index={selectedImageIndex}
        on={{ view: ({ index }) => setSelectedImageIndex(index) }}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(10, 0, 21, .9)" } }}
      />

      {/* Customer Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-7 h-7 text-[#ea698b]" />
            <h2 className="text-3xl font-bold text-white">Customer Reviews & Ratings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.round(product.rating) ? 'fill-[#ea698b] text-[#ea698b]' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-white font-medium text-lg">{product.rating.toFixed(1)} out of 5</span>
                <span className="text-gray-400">({product.numReviews} reviews)</span>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                  const percentage = product.numReviews > 0 ? (product.reviews.filter(r => Math.round(r.rating) === star).length / product.numReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm text-gray-400 w-8">{star}★</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-[#ea698b] h-2 rounded-full"style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-12 text-right">{percentage.toFixed(0)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write a review */}
            <div className="p-4 bg-white/5 rounded-md border border-[#571089]/30">
              <h3 className="text-lg font-bold text-white mb-3">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-300 mb-2 block">Your Rating</label>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}className={`w-7 h-7 cursor-pointer transition-colors ${i < reviewRating ? 'fill-[#ea698b] text-[#ea698b]' : 'text-gray-600 hover:text-gray-400'}`}
                        onClick={() => setReviewRating(i + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="reviewComment" className="text-gray-300 mb-2 block">Your Review</label>
                  <textarea
                    id="reviewComment"
                    rows="4"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]"
                    placeholder="Share your thoughts about the product..."
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="text-gray-300 mb-2 block">Add Images (Optional)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setReviewImages(files);
                    }}
                    className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#ea698b] file:text-white hover:file:bg-[#d55d92]"
                  />
                  <p className="text-xs text-gray-400 mt-1">Upload up to 5 images (max 5MB each)</p>
                  {reviewImages.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {reviewImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Review ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-md border border-[#571089]/30"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = reviewImages.filter((_, i) => i !== index);
                              setReviewImages(newImages);
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {reviewError && <p className="text-red-400 text-sm">{reviewError}</p>}
                {reviewSuccess && <p className="text-green-400 text-sm">{reviewSuccess}</p>}
                <button
                  type="submit"
                  disabled={isSubmittingReview || reviewRating === 0}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          {/* Existing Reviews */}
          <div className="mt-8">
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map(review => (
                  <div key={review._id} className="p-4 bg-white/5 rounded-md border border-[#571089]/30">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-[#ea698b] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-white font-medium text-sm">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#ea698b] text-[#ea698b]' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        {review.verified && (
                          <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                            <Shield className="w-3 h-3" /> Verified Purchase
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-2">{review.comment}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt=""
                            className="w-16 h-16 object-cover rounded-md border border-[#571089]/30 cursor-pointer hover:opacity-80"
                            onClick={() => {
                              // Open image in lightbox or new tab
                              window.open(image, '_blank');
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-6 text-sm">Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Recently Viewed Products */}
        <RecentlyViewedProducts currentProductId={id} />

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations currentProduct={product} />

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map(p => (
                <div key={p._id} className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={(p.imageUrls && p.imageUrls[0]) || p.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
                      alt={p.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                    {p.isNewArrival && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{p.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                        ₹{p.price.toLocaleString('en-IN')}</span>
                      <Link
                        to={`/product/${p._id}`}
                        className="px-4 py-2 bg-[#ea698b] text-white text-sm rounded-lg hover:bg-[#d55d92] transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
