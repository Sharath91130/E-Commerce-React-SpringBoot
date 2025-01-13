// Context/CartCountProvider.jsx
import React, { useState } from 'react';
import CartCountContext from './CartCountContext.jsx'; // Import the CartCountContext

export function CartCountProvider({ children }) {
    const [cartCount, setCartCount] = useState(0); // Initial cart count state

    return (
        // Provide the cartCount and setCartCount to the component tree
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartCountContext.Provider>
    );
}
