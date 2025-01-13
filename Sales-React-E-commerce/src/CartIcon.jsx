import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartCount } from './CartFeature/countSlice.js';

export function CartIcon() {
    const dispatch = useDispatch();
    const countcart = useSelector((state) => state.count.value); // Access cart count from Redux state

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCartCount()); // Fetch cart count when the component mounts
    }, [dispatch]);

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to the cart page
    };

    return (
        <div className="cart-icon" onClick={handleCartClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="cart-icon-svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h18l-2 9H5L3 3zM8.5 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                />
            </svg>
            <span className="cart-badge">{countcart}</span> {/* Display cart count */}
        </div>
    );
}
