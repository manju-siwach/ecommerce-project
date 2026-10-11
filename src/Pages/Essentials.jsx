import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Essentials = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/Essential/")
            .then((res) => setItems(res.data))
            .catch((err) => console.error(err));
    }, []);

    const goToDetail = (id) => {
        navigate(`/essential/${id}`);
    };

    return (
        <div className="py-10 bg-gray-100 flex flex-col items-center ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-7xl w-full h-90!">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer "
                    >
                        <h2 className="text-lg font-semibold mt-5!">{item.name}</h2>
                        {item.image && (
                            <img
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt={item.name}
                                className="h-60 object-contain w-full mb-2"
                                onClick={() => goToDetail(item.id)}
                            />
                        )}

                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-10!"
                            onClick={() => goToDetail(item.id)}
                        >
                            Shop More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Essentials;
