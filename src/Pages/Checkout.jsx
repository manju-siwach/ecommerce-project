import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/price/${id}/`)
            .then(res => setProduct(res.data))
            .catch(console.error);
    }, [id]);

    const handleOrder = async () => {
        if (!paymentMethod) return;

        setLoading(true);

        try {
            if (paymentMethod === "cod") {
                // COD Order
                await axios.post("http://127.0.0.1:8000/api/place-order/", {
                    product_id: product.id,
                    payment_method: "COD"
                });

                navigate("/success");
            } else {
                // ONLINE PAYMENT
                const res = await axios.post("http://127.0.0.1:8000/api/create-order/", {
                    amount: product.amount
                });

                const options = {
                    key: "YOUR_RAZORPAY_KEY_ID",
                    amount: res.data.amount,
                    currency: "INR",
                    name: "My Shop",
                    order_id: res.data.id,

                    handler: async function () {
                        await axios.post("http://127.0.0.1:8000/api/place-order/", {
                            product_id: product.id,
                            payment_method: "ONLINE"
                        });

                        navigate("/success");
                    },

                    theme: { color: "#2563eb" }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-4">Checkout</h1>


            <div className="border p-4 rounded mb-4 flex gap-4 items-center">
                <img src={product.image} className="w-24 h-24 object-contain" />
                <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600">₹{product.amount}</p>
                </div>
            </div>


            <div className="border p-4 rounded mb-4">
                <h2 className="font-semibold mb-2">Select Payment Method</h2>

                <label className="block">
                    <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Cash on Delivery</span>
                </label>

                <label className="block mt-2">
                    <input
                        type="radio"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Pay Online (UPI / Card)</span>
                </label>
            </div>


            <button
                onClick={handleOrder}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded w-full"
            >
                {loading ? "Processing..." : "Place Order"}
            </button>
        </div>
    );
};

export default Checkout;