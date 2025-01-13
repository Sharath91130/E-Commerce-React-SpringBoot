import React, { useContext, useState } from 'react';
import './assets/styles.css';
import { CartIcon } from './CartIcon.jsx';
import CartCountContext from './Context/CartCountContext.jsx';
import {useDispatch, useSelector} from "react-redux";
import {incrementByAmount} from "./CartFeature/countSlice.js";

export function ProductList({ products, onAddToCart }) {
    //const { cartCount, setCartCount } = useContext(CartCountContext); // Context to update cart count
    const [count, setCount] = useState(0);
    const value = useSelector((state) => state.count.value); // Access the state
    const dispatch = useDispatch();

  //  const {setCartCount}=useContext(CartCountContext)

    const inc = () => {
        if (count < 20) {
            alert('Added to the cart. Check it out!');
            const newCount = count + 1;
            setCount(newCount); // Update local state
            setCartCount(cartCount + 1); // Update global cart count
        } else {
            alert('Maximum limit reached (20 items).');
        }
    };

    if (products.length === 0) {
        return <p className="no-products">No products available.</p>;
    }

    return (
        <div className="product-list">
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.product_id} className="product-card">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                            }}
                        />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => {
                                    onAddToCart(product.product_id); // Call the provided callback
                                    dispatch(incrementByAmount(1));
                                    // Increment both local and global cart counts
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
