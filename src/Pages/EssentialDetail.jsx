import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Components/CartProvider";

const EssentialDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [mainImage, setMainImage] = useState(null);


    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/Essential/${id}/`)
            .then((res) => {
                setItem(res.data);
                setMainImage(res.data.image);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!item) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl  p-6">
            <h1 className="text-2xl font-bold mb-6">{item.name}</h1>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {item.images &&
                    item.images.map((img) => (
                        <div
                            key={img.id}
                            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
                        >
                            <img
                                src={`http://127.0.0.1:8000${img.image}`}
                                alt={img.description || "Image"}
                                className="h-56 w-full object-contain mb-2" // increased height
                                onClick={() => setMainImage(img.image)}
                            />
                            <h2 className="font-semibold text-center">{img.description}</h2>
                            <p className="mt-1 font-bold text-lg text-center">
                                ₹ {img.price}
                            </p>
                            <p className="mt-1 text-yellow-500 text-center">⭐ {img.rating}</p>

                            {/* Add to Cart button */}
                            <button
                                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={() =>
                                    addToCart({
                                        id: img.id,
                                        name: item.name,
                                        image: img.image,
                                        amount: img.price,
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default EssentialDetail;
