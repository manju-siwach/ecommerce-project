import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Components/CartProvider";
import { Link } from "react-router-dom";

const Effect = () => {
    const { addToCart } = useContext(CartContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/price/")
            .then((res) => setItems(res.data))
            .catch((err) => console.error(err));
    }, []);


    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    return (
        <div className="py-10 bg-gray-100 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-7xl w-full mt-20 h-100">
                {items.map((item) => {
                    const mrp = item.mrp || 0;
                    const amount = item.amount || 0;
                    const discount =
                        item.discount || (mrp && amount ? Math.round(((mrp - amount) / mrp) * 100) : 0);


                    const averageRating =
                        item.reviews && item.reviews.length > 0
                            ? Math.round(item.reviews.reduce((acc, r) => acc + r.rating, 0) / item.reviews.length)
                            : 0;

                    return (
                        <div
                            key={item.id}
                            className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition-all duration-300"
                        >
                            <Link to={`/product/${item.id}`}>
                                <div className="w-full h-40 bg-gray-50 rounded flex justify-center items-center overflow-hidden p-4">
                                    <img src={item.image} alt={item.name} className="h-full object-contain" />
                                </div>
                            </Link>

                            <div className="mt-4">
                                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description || "High-quality product with excellent value."}
                                </p>


                                <div className="mt-2 flex items-center gap-2">
                                    <p className="text-gray-500 line-through text-sm">₹{mrp}</p>
                                    <p className="text-lg font-bold text-gray-900">₹{amount}</p>
                                    {discount > 0 && (
                                        <p className="text-green-600 font-semibold text-sm">({discount}% off)</p>
                                    )}
                                </div>


                                <div className="flex items-center gap-2 mt-1">
                                    <div>{renderStars(averageRating)}</div>
                                    <span className="text-gray-600 text-sm">
                                        ({item.reviews ? item.reviews.length : 0} review
                                        {item.reviews && item.reviews.length > 1 ? "s" : ""})
                                    </span>
                                </div>


                                <div className="text-center mt-8!">
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Effect;


// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { CartContext } from "../Components/CartProvider";

// import { useContext } from 'react';
// import { Link } from 'react-router';

// const Effect = () => {
//     const { addToCart } = useContext(CartContext)
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         axios.get("http://127.0.0.1:8000/api/price/")
//             .then((res) => {
//                 console.log("Backend Response:", res.data);
//                 setItems(res.data);
//             })
//             .catch((err) => {
//                 console.error("Axios Error:", err);
//             });
//     }, []);

//     return (
//         <div className="py-10 bg-gray-100 flex flex-col items-center">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-7xl w-full mt-20 h-80">
//                 {items.map((item, index) => {

//                     const mrp = item.mrp || 0;
//                     const amount = item.amount || 0;
//                     const discount = item.Discount || (mrp && amount ? Math.round(((mrp - amount) / mrp) * 100) : 0);

//                     return (
//                         <Link to={`${item.id}/productDetails`}>
//                             <div
//                                 key={index}
//                                 className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition-all duration-300 cursor-pointer "
//                             >

//                                 <div className="w-full h-40 bg-gray-50 rounded flex justify-center items-center overflow-hidden p-4">
//                                     <img
//                                         src={item.Image}
//                                         alt={item.name}
//                                         className="h-full object-contain"
//                                     />
//                                 </div>


//                                 <div className="mt-34 gap-10">
//                                     <h2 className="text-lg font-semibold text-gray-900">
//                                         {item.name}
//                                     </h2>

//                                     <p className="text-sm text-gray-600 mt-10">
//                                         {item.Description || "High-quality product with excellent value."}
//                                     </p>

//                                     <div className='mt-20'>
//                                         <div className="mt-23 flex items-center gap-2">
//                                             <p className="text-gray-500 line-through text-sm">
//                                                 ₹{mrp}
//                                             </p>
//                                             <p className="text-lg font-bold text-gray-900">
//                                                 ₹{amount}
//                                             </p>
//                                             {discount > 0 && (
//                                                 <p className="text-green-600 font-semibold text-sm">
//                                                     ({discount}% off)
//                                                 </p>

//                                             )}
//                                         </div>

//                                         <div className="text-center">
//                                             <button
//                                                 onClick={() => addToCart(item)}
//                                                 className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-50 mt-4!"
//                                             >
//                                                 Add To Cart
//                                             </button>
//                                         </div>


//                                     </div>
//                                 </div>
//                             </div>

//                         </Link>

//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

// export default Effect;
