import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation';
import { ProductList } from './ProductList';
import { Footer } from './Footer';
import { Header } from './Header';
import './assets/styles.css';
import {fetchCartCount} from "./CartFeature/countSlice.js";
import {useNavigate} from "react-router-dom";
import CheckAuth from "./Auth.jsx";

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('Guest');
  const [cartError, setCartError] = useState(false); // State for cart fetch error
  const [isCartLoading, setIsCartLoading] = useState(false);
  const[productid,setProductId]=useState(5)
  // State for cart loading
  const navigate = useNavigate();

  // Fetch products when the component mounts or the username changes
  useEffect(() => {
    fetchProducts();
    if (username !== 'Guest') {
      fetchCartCount(); // Fetch cart count only if a user is logged in
    }

  }, [username]);

  const fetchProducts = async (category = '') => {
    try {
      const response = await fetch(
          `http://localhost:9090/api/products${category ? `?category=${category}` : '?category=Shirts'}`,
          { credentials: 'include' }
      );
      const data = await response.json();
      setUsername(data.user?.name || 'Guest');
      // Extract username
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };



  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    console.log(username)
    if (username === 'Guest') {
      console.error('Username is required to add items to the cart');
      return;
    }
    try {
      const response = await fetch("http://localhost:9090/api/cart/additem", {

        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchCartCount(); // Update cart count
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (

      <div className="customer-homepage">
        <CheckAuth/>
        <Header
            cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
            username={username}
        />
        <nav className="navigation">
          <CategoryNavigation onCategoryClick={handleCategoryClick} />
        </nav>
        <main className="main-content">
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </main>
        <Footer />
      </div>
  );
}
