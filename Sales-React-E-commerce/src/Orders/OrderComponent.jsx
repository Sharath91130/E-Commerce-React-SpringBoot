import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {Header} from "../Header.jsx";
import '../assets/styles.css';
import CheckAuth from "../Auth.jsx";

export function OrderDetails() {


    const [apiData, setApiData] = useState(null); // State to store API data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        // Fetch API data
        fetch('http://localhost:9090/api/orders', {
            credentials: 'include', // Include credentials (cookies, HTTP auth, etc.)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setApiData(data); // Set the fetched data
                setLoading(false); // Set loading to false
            })
            .catch((err) => {
                setError(err.message); // Capture any errors
                setLoading(false); // Set loading to false
            });
    }, []); // Run only once when the component mounts

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {



        return <div className="text-center text-danger">Error: {error}</div>;
    }

    return (
        <div>

        <div className="container mt-5">


            <Header username={apiData.username}/>

            <div className="order-details-container">
                <h2 className="order-details-heading">Order Details</h2>
            </div>
            <p className="text-center text-muted">
                {/*Role: {apiData.role} | Username: {apiData.username}*/}
            </p>
            <div className="row">
                {apiData.products.map((product, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <div className="card h-100 shadow-sm rounded">
                            <img
                                src={product.image_url}
                                className="card-img-top rounded-top"
                                alt={product.name}
                                style={{height: '200px', objectFit: 'cover'}}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-muted">{product.description}</p>
                                <p className="card-text">
                                    <strong>Price:</strong> ${product.price_per_unit.toFixed(2)}
                                </p>
                                <p className="card-text">
                                    <strong>Quantity:</strong> {product.quantity}
                                </p>
                                <p className="card-text">
                                    <strong>Total:</strong> ${product.total_price.toFixed(2)}
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-primary btn-sm mt-auto rounded-pill"
                                >
                                    View Order {product.order_id}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
