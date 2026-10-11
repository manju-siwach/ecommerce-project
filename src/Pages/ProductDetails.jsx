import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReviews, setShowReviews] = useState(false);

    const [username, setUsername] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");

    // FETCH PRODUCT
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/price/${id}/`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    // STARS
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    // REVIEW
    const handleSubmitReview = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/reviews/", {
            product: product.id,
            username,
            rating,
            comment,
        })
            .then((res) => {
                setProduct((prev) => ({
                    ...prev,
                    reviews: [...prev.reviews, res.data],
                }));
                setReviewMessage("Review added!");
                setUsername("");
                setRating(5);
                setComment("");
            })
            .catch(console.error);
    };



    const averageRating =
        product.reviews?.length > 0
            ? Math.round(product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length)
            : 0;

    return (
        <div className="max-w-6xl mx-auto p-6">

            <div className="flex flex-col md:flex-row gap-6">

                {/* IMAGE */}
                <div className="w-full md:w-1/2 h-96 bg-gray-50 flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain"
                    />
                </div>

                {/* DETAILS */}
                <div className="md:w-1/2 flex flex-col justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="mt-2 text-gray-600">{product.description}</p>

                        {/* PRICE */}
                        <div className="mt-4 flex items-center gap-2">
                            <p className="line-through text-gray-500">₹{product.mrp}</p>
                            <p className="text-2xl font-bold">₹{product.amount}</p>
                            {product.discount > 0 && (
                                <p className="text-green-600">({product.discount}% off)</p>
                            )}
                        </div>

                        {/* RATING */}
                        <div className="flex items-center gap-2 mt-2">
                            <div>{renderStars(averageRating)}</div>

                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setShowReviews(!showReviews)}
                            >
                                ({product.reviews.length} reviews)
                            </span>
                        </div>

                        {/* BUY BUTTON */}
                        <button
                            onClick={() => navigate(`/checkout/${product.id}`)}
                            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* REVIEWS */}
                    {showReviews && (
                        <div className="mt-6">

                            <h2 className="text-xl font-semibold mb-2">Reviews</h2>

                            {product.reviews?.map((r) => (
                                <div key={r.id} className="border-b py-2">
                                    <p className="font-bold">{r.username}</p>
                                    <div>{renderStars(r.rating)}</div>
                                    <p>{r.comment}</p>
                                </div>
                            ))}

                            {/* ADD REVIEW */}
                            <form onSubmit={handleSubmitReview} className="mt-4 flex flex-col gap-2">

                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Name"
                                    className="border p-2 rounded"
                                    required
                                />

                                <select
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="border p-2 rounded"
                                >
                                    {[5, 4, 3, 2, 1].map(r => (
                                        <option key={r}>{r}</option>
                                    ))}
                                </select>

                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Comment"
                                    className="border p-2 rounded"
                                    required
                                />

                                <button className="bg-blue-600 text-white p-2 rounded">
                                    Submit Review
                                </button>
                            </form>

                            {reviewMessage && (
                                <p className="text-green-600 mt-2">{reviewMessage}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;