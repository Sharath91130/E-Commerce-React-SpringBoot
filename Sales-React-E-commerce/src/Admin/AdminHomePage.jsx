import React, { useState } from "react";
import "../assets/styles.css";
import {Link} from "react-router-dom";

export default function ProductForm() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("1"); // Default to "Shirts" category
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch("http://localhost:9090/admin/products/add", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    stock,
                    categoryId: category,
                    imageUrl,
                }),
            });

            const contentType = response.headers.get("content-type");
            let data = null;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = { error: await response.text() }; // Handle non-JSON responses
            }

            if (response.ok) {
                console.log("Product added successfully:", data);
                alert("Product added successfully!");
                // Clear the form
                setName("");
                setCategory("1"); // Reset to default category
                setImageUrl("");
                setPrice("");
                setStock("");
                setDescription("");
            } else {
                throw new Error(data.error || "Failed to add product");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
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
                            <option value="5">Mobile Accessories</option>
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
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Enter product description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
            <div>
                <Link to="/items">View your products</Link> {/* Navigate to Profile page */}
               {/*// <Link to="/orders">Orders</Link> /!* Navigate to Orders page *!/*/}



            </div>
        </div>
    );
}
