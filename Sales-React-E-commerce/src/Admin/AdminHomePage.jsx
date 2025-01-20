import React, { useState } from "react";
import "../assets/styles.css";

export default function ProductForm() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Shirts");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [error, setError] = useState(null);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch("http://localhost:9090/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, category, imageUrl, price, stock }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Product added successfully:", data);
                alert("Product added successfully!");
                // Clear the form
                setName("");
                setCategory("Shirts");
                setImageUrl("");
                setPrice("");
                setStock("");
            } else {
                throw new Error(data.error || "Failed to add product");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-title">Add Product</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleAddProduct} className="form-content">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="form-select"
                        >
                            <option value="1">Shirts</option>
                            <option value="2">Pants</option>
                            <option value="3">Accessories</option>
                            <option value="4">Mobiles</option>
                            <option value="5">Mobiles Accessories </option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl" className="form-label">Image URL</label>
                        <input
                            id="imageUrl"
                            type="url"
                            placeholder="Enter image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="Enter stock quantity"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">Add Product</button>
                </form>
            </div>
        </div>
    );
}
