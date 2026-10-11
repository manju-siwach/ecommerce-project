import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Products = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/products/")
            .then((res) => {
                setItems(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.error("Axios Error:", err);
            });
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen  mt-10!">

            <div className="grid grid-cols-4 gap-6 h-90!">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded p-4"
                    >

                        <h2 className="text-lg font-semibold mb-3">
                            {item.heading}
                        </h2>


                        <div className="grid grid-cols-2 grid-rows-2 gap-5! mt-3!">
                            {(item.images ?? []).slice(0, 4).map((img) => (
                                <Link
                                    key={img.id}
                                    to={`/price/${item.id}`}
                                    className="w-full h-28 block"
                                >
                                    <img
                                        src={img.image}
                                        alt={img.text || ""}
                                        className="w-full h-full object-cover rounded cursor-pointer hover:scale-105 transition"
                                    />
                                </Link>
                            ))}


                        </div>


                        <Link
                            to={`/product/${item.id}`}
                            className="text-sm text-blue-600 mt-3 cursor-pointer mt-8 inline-block"
                        >
                            See more
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
