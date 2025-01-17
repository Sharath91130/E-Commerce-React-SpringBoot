import React from "react";
import {useNavigate} from "react-router-dom";

const PaymentCheck = ({ totalAmount, cartItems }) => {
    const navigate = useNavigate();
    const handleCheckout = async () => {

        try {
            // Prepare the request body for the backend API
            const requestBody = {
                totalAmount, // Use prop for total amount
                cartItems: cartItems.map((item) => ({
                    productId: item.product_id,
                    quantity: item.quantity,
                    price: item.price_per_unit,
                })),
            };

            // Step 1: Create a Razorpay order via the backend
            const response = await fetch("http://localhost:9090/api/payment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(await response.text());
            const razorpayOrderId = await response.text(); // Retrieve the order ID

            // Step 2: Configure Razorpay checkout options
            const options = {
                key: "rzp_test_l7ldGLrAD76Cem", // Replace with your Razorpay Key ID
                amount: totalAmount * 100, // Razorpay expects the amount in paise
                currency: "INR",
                name: "SalesSavvy",
                description: "Test Transaction",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    try {
                        // Payment success, verify it on the backend
                        const verifyResponse = await fetch(
                            "http://localhost:9090/api/payment/verify",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                                body: JSON.stringify({
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature,
                                }),
                            }
                        );
                        const result = await verifyResponse.text();
                        if (verifyResponse.ok) {

                            alert("Payment verified successfully!");
                            navigate("/customerhome")

                            console.log("Redirecting to customer home...");
                        } else {
                            alert("Payment verification failed: " + result);
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error);
                        alert("Payment verification failed. Please try again.");
                    }
                },
                prefill: {
                    name: "SHARATH SOMAPPA KSOMAPPA",
                    email: "sharathkurer8055@gmail.com",
                    contact: "9113065023",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            // Step 3: Initialize Razorpay and open the payment interface
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            alert("Payment failed. Please try again.");
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div>
            <h1>Payment Checkout</h1>
            <button onClick={handleCheckout}>Pay Now</button>
        </div>
    );
};

export default PaymentCheck;
