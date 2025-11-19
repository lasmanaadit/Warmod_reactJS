import api from './api';

export const productService = {
  // Get semua products
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await api.get(`/products?category=${category}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query) => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  }
};