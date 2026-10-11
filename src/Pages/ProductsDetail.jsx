import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../Components/CartProvider";

const ProductsDetail = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/products/${id}/`)
            .then((res) => {
                setProduct(res.data);
                setSelectedImage(res.data.images?.[0] || null);
            })
            .catch((err) => console.error("Product detail error:", err));
    }, [id]);

    const renderStars = (rating) => (
        <div className="text-yellow-400 text-xs md:text-sm">
            {"★".repeat(Math.round(rating)) +
                "☆".repeat(5 - Math.round(rating))}
        </div>
    );

    if (!product) return <p className="p-10">Loading...</p>;

    return (
        <div className="py-10 bg-gray-100 flex flex-col items-center">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 max-w-7xl w-full bg-white shadow rounded p-6">


                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-200!">
                    {(product.images ?? []).map((img) => {
                        const discount =
                            img.mrp && img.price
                                ? Math.round(((img.mrp - img.price) / img.mrp) * 100)
                                : 0;

                        return (
                            <div
                                key={img.id}
                                onClick={() => setSelectedImage(img)}
                                className={`relative bg-gray-50 rounded overflow-hidden shadow cursor-pointer
                                    ${selectedImage?.id === img.id ? "ring-2 ring-blue-500" : ""}
                                `}
                            >
                                <img
                                    src={`http://127.0.0.1:8000${img.image}`}
                                    alt={img.text || product.heading}
                                    className="w-full h-40 object-cover mt-8!"
                                />

                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs p-1 flex flex-col items-center">
                                    <p className="truncate">{img.text}</p>
                                    <div className="flex gap-1 items-center">
                                        {img.mrp > img.price && (
                                            <p className="line-through text-gray-300 text-xs">
                                                ₹{img.mrp}
                                            </p>
                                        )}
                                        <p className="text-green-400 font-semibold">
                                            ₹{img.price}
                                        </p>
                                        {discount > 0 && (
                                            <p className="text-green-400 text-xs">
                                                ({discount}% off)
                                            </p>
                                        )}
                                    </div>
                                    {renderStars(img.rating)}
                                </div>
                            </div>
                        );
                    })}
                </div>


                <div className="flex flex-col justify-between">
                    <h1 className="text-3xl font-bold">{product.heading}</h1>

                    {selectedImage && (
                        <img
                            src={`http://127.0.0.1:8000${selectedImage.image}`}
                            alt={product.heading}
                            className="w-full h-96 object-cover rounded border mt-4"
                        />
                    )}


                    <div className="mt-4 flex items-center gap-2">
                        <p className="text-xl font-semibold text-gray-900">
                            ₹ {selectedImage?.price}
                        </p>

                        {selectedImage?.mrp > selectedImage?.price && (
                            <p className="text-sm line-through text-gray-400">
                                ₹ {selectedImage?.mrp}
                            </p>
                        )}

                        {selectedImage?.mrp > selectedImage?.price && (
                            <p className="text-sm text-green-600 font-semibold">
                                (
                                {Math.round(
                                    ((selectedImage.mrp - selectedImage.price) /
                                        selectedImage.mrp) *
                                    100
                                )}
                                % off)
                            </p>
                        )}
                    </div>


                    <p className="mt-2 text-sm">
                        ⭐ {selectedImage?.rating} / 5
                    </p>

                    <button
                        onClick={() =>
                            addToCart({ ...product, selectedImage })
                        }
                        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>


            {product.similar_products?.length > 0 && (
                <div className="mt-14 px-6 max-w-7xl w-full">
                    <h2 className="text-2xl font-semibold mb-6">
                        You may also like
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {product.similar_products.map((item) => {
                            const img = item.images?.[0];
                            const discount =
                                img?.mrp && img?.price
                                    ? Math.round(
                                        ((img.mrp - img.price) / img.mrp) * 100
                                    )
                                    : 0;

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition flex flex-col items-center"
                                >
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="w-full h-40 bg-gray-50 rounded flex justify-center items-center overflow-hidden p-2"
                                    >
                                        <img
                                            src={`http://127.0.0.1:8000${img?.image}`}
                                            alt={item.heading}
                                            className="h-full object-contain"
                                        />
                                    </Link>

                                    <h3 className="mt-3 font-medium text-center text-sm md:text-base">
                                        {item.heading}
                                    </h3>

                                    <div className="flex items-center gap-1 mt-1">
                                        {img?.mrp > img?.price && (
                                            <p className="text-gray-500 line-through text-sm">
                                                ₹{img?.mrp}
                                            </p>
                                        )}
                                        <p className="text-green-600 font-semibold">
                                            ₹{img?.price}
                                        </p>
                                        {discount > 0 && (
                                            <p className="text-green-600 text-sm">
                                                ({discount}% off)
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-1">
                                        {renderStars(img?.rating || 0)}
                                    </div>

                                    <button
                                        onClick={() => addToCart(item)}
                                        className="mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 w-full text-sm"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                                
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsDetail;
