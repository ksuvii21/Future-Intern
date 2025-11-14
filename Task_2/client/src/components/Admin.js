import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = e => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          newProduct,
          config
        );
        setEditingProduct(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/products',
          newProduct,
          config
        );
      }

      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: '',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = product => {
    setNewProduct(product);
    setEditingProduct(product);
  };

  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      stock: '',
                      imageUrl: '',
                    });
                  }}
                  className="w-full mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Product List</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map(product => (
                <div key={product._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <p className="text-green-600 font-bold">${product.price}</p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
