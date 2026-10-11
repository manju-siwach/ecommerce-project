import { useContext, useState } from "react";
import { CartContext } from "../Components/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getAmount = (amount) => {
        if (!amount) return 0;
        if (typeof amount === "string") return Number(amount.replace(/[^0-9.]/g, "")) || 0;
        return amount;
    };

    const getImageUrl = (image) => {
        if (!image) return "";
        return image.startsWith("http") ? image : `http://127.0.0.1:8000${image}`;
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return alert("Cart is empty");

        setLoading(true);
        const token = localStorage.getItem("jwttoken");

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/create/",
                { items: cart.map((item) => ({ product_id: item.id, quantity: item.quantity })) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Clear cart after creating order
            clearCart();

            // Redirect to payment page for that order
            navigate(`/payment/${res.data.id}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Something went wrong during checkout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100vh] bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                Your Shopping Cart ({cart.length})
            </h1>

            {cart.length === 0 ? (
                <div className="text-center mt-10">
                    <p className="text-lg">Your cart is empty.</p>
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 flex flex-col gap-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-6 bg-white p-6 rounded shadow"
                            >
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.name}
                                    className="w-32 h-32 object-contain"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{item.name}</p>
                                    <p className="text-gray-700 text-lg">₹ {getAmount(item.amount)}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:underline font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-8 rounded shadow h-fit">
                        <h2 className="font-bold text-2xl mb-6">Order Summary</h2>
                        <p className="mb-3 text-lg">
                            Total Items: <span className="font-semibold">{cart.length}</span>
                        </p>
                        <p className="mb-6 text-lg">
                            Total Amount:{" "}
                            <span className="font-semibold">
                                ₹ {cart.reduce((acc, item) => acc + getAmount(item.amount), 0)}
                            </span>
                        </p>
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 text-lg"
                        >
                            {loading ? "Processing..." : "Proceed to Checkout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;