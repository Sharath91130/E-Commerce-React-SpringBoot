import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../CartFeature/countSlice.js";
import { Link } from "react-router-dom";
import "../assets/styles.css";

export function ProductListForAdmin() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const dispatch = useDispatch();

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:9090/admin/products/get", {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data.products || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError(err.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form submission for updating a product
    const handleUpdateProduct = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const updatedProduct = {
            name,
            description,
            price: parseInt(price), // Ensure price is a number
            stock: parseInt(stock), // Ensure stock is an integer
            images: imageUrl, // Assuming single image for simplicity
        };

        try {
            const response = await fetch(
                `http://localhost:9090/admin/products/update/${selectedProduct.product_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedProduct),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to update product. Status: ${response.status}`);
            }

            alert("Product updated successfully!");
            fetchProducts(); // Refresh the product list after successful update
            resetForm(); // Reset form fields after update
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Error updating product: " + err.message);
        }
    };

    // Reset form fields and selected product state
    const resetForm = () => {
        setName("");
        setCategory("");
        setImageUrl("");
        setDescription("");
        setPrice("");
        setStock("");
        setSelectedProduct(null); // Deselect the product after update
    };

    // Handle delete button click
    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(
                    `http://localhost:9090/admin/products/delete/${productId}`,
                    {
                        method: "DELETE",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to delete product. Status: ${response.status}`);
                }
                alert("Product deleted successfully!");
                setProducts(products.filter((product) => product.product_id !== productId));
            } catch (err) {
                console.error("Error deleting product:", err);
                alert("Error deleting product: " + err.message);
            }
        }
    };

    // Render loading, error, or products
    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;
    if (products.length === 0) return <p className="no-products">No products available.</p>;

    return (
        <div className="product-list">
            {selectedProduct ? (
                <form onSubmit={handleUpdateProduct} className="form-content">
                    <h2>Update Product</h2>
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
                            <option value="">Select Category</option>
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
                    <button type="submit" className="form-button">Update Product</button>
                </form>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.product_id} className="product-card">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="product-image"
                                loading="lazy"
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => {
                                        // Set selected product for editing
                                        setSelectedProduct(product);
                                        // Populate form fields with selected product data
                                        setName(product.name);
                                        setCategory(product.category_id); // Assuming category_id exists in the product object
                                        setImageUrl(product.images[0]);
                                        setDescription(product.description);
                                        setPrice(product.price.toString());
                                        setStock(product.stock.toString());
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteProduct(product.product_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <Link to="/items">View your products</Link>
            </div>
        </div>
    );
}
