
import { Link } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between h-56!">


            <Link to={`/price/${product.id}`} className="flex justify-center">
                <img
                    src={`${API_BASE}${product.images?.[0]?.image}`}
                    alt={product.heading}
                    className="w-full h-54 object-contain mb-4 rounded"
                />
            </Link>


            <h3 className="text-sm font-semibold line-clamp-2 text-gray-800 hover:text-orange-600 mb-2 ">
                {product.heading}
            </h3>


            <div className="flex items-center text-sm text-gray-700 mb-1">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="ml-2">{product.rating} ({product.review_count})</span>
            </div>


            <p className="text-xs text-gray-500 mb-2">
                {product.bought_count}+ bought in past month
            </p>


            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                {product.mrp > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                        ₹{product.mrp}
                    </span>
                )}
            </div>


            <Link
                to={`/price/${product.id}`}
                className="mt-auto block text-center bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded transition"
            >
                See options
            </Link>
        </div>
    );
};

export default ProductCard;
