import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const handlePayment = () => {
        const token = localStorage.getItem("jwttoken");

        axios.post(`http://127.0.0.1:8000/api/pay/${orderId}/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                alert("Payment successful!");
                navigate("/orders");  // Redirect to order history
            })
            .catch((err) => alert(err.response?.data?.error || "Payment failed"));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Payment for Order #{orderId}</h1>
            <button
                onClick={handlePayment}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentPage;