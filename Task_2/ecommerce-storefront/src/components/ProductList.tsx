// components/ProductList.tsx
import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products and implement filter/search logic
}