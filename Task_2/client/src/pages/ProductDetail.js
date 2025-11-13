import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {product.imageUrl && (
                <img
                  className="h-96 w-full object-cover md:w-96"
                  src={product.imageUrl}
                  alt={product.name}
                />
              )}
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                {product.category}
              </div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                {product.name}
              </h1>
              <p className="mt-2 text-gray-500">{product.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-600">Stock: {product.stock}</span>
              </div>
              <div className="mt-6">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-4">
                  Add to Cart
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
