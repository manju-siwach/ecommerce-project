import { useContext } from "react";
import { Select } from "antd";
import { FaSearch, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import amazonLogo from "../assets/amazon_logo.png";
import Footerlanguage from "./Footerlanguage";
import { CartContext } from "./CartProvider";

function Header() {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate(); // useNavigate hook

    return (
        <div className="w-full">
            {/* Top Navbar */}
            <div className="h-16 bg-[#131921] text-white flex items-center px-6 gap-6">
                {/* Logo */}
                <div className="flex items-center cursor-pointer">
                    <Link to="/">
                        <img src={amazonLogo} alt="Amazon" className="w-24 object-contain" />
                    </Link>
                </div>

                {/* Deliver to */}
                <div className="flex items-center cursor-pointer">
                    <FaMapMarkerAlt className="text-xl" />
                    <div className="ml-1 leading-tight">
                        <p className="text-xs text-gray-300">Deliver to</p>
                        <p className="text-sm font-semibold">India</p>
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-1 h-8">
                    <Select
                        defaultValue="All"
                        className="rounded-l-md bg-gray-100 text-black text-sm"
                        dropdownStyle={{ width: 120 }}
                        options={[
                            { value: "all", label: "All" },
                            { value: "electronics", label: "Electronics" },
                            { value: "fashion", label: "Fashion" },
                        ]}
                        style={{ width: 100 }}
                    />
                    <input
                        type="text"
                        placeholder="Search Amazon"
                        className="flex-1 px-3 outline-none text-black bg-white"
                    />
                    <button className="bg-[#febd69] px-4 flex items-center justify-center rounded-r-md">
                        <FaSearch className="text-black text-xl" />
                    </button>
                </div>

                {/* Language */}
                <Footerlanguage />

                {/* Account */}
                <div className="cursor-pointer leading-tight">
                    <Link to="/Login" className="flex flex-col">
                        <p className="text-xs">Hello, sign in</p>
                        <p className="font-semibold text-sm flex items-center gap-1">
                            Account & Lists <DownOutlined className="text-[10px]" />
                        </p>
                    </Link>
                </div>


                <div className="cursor-pointer leading-tight">
                    <p className="text-xs">Returns</p>
                    <p className="font-semibold text-sm">& Orders</p>
                </div>


                <div
                    className="relative flex items-center cursor-pointer"
                    onClick={() => navigate("/cart")}
                >
                    <FaShoppingCart className="text-3xl" />
                    <span className="font-semibold text-sm mt-2 ml-1">{cart.length}</span>
                </div>
            </div>


            <div className="h-10 bg-[#232f3e] text-sm px-6 text-white flex items-center gap-5">
                <span className="font-semibold">All</span>
                <span>Fresh</span>
                <span>MX Player</span>
                <span>Sell</span>
                <span>Bestsellers</span>
                <span>Mobiles</span>
                <span>Today's Deals</span>
                <span>Customer Service</span>
                <span>New Releases</span>
                <span>Prime ▾</span>
            </div>
        </div>
    );
}

export default Header;
