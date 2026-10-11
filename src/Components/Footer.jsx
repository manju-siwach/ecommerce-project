import React from "react";
import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

const { Option } = Select;

const Footer = () => {
    const handleLanguageChange = (value) => {
        console.log("Selected language:", value);
    };

    return (
        <footer className="mt-10 ">


            <div
                className="bg-[#37475A] text-white text-center py-5 cursor-pointer hover:bg-[#485769] "
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                Back to top
            </div>


            <div className="bg-[#232F3E] text-white py-20 px-6 md:px-20 h-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 ">

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Get to Know Us</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li className="hover:underline cursor-pointer">About Us</li>
                            <li className="hover:underline cursor-pointer">Careers</li>
                            <li className="hover:underline cursor-pointer">Press Releases</li>
                            <li className="hover:underline cursor-pointer">Amazon Science</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Connect with Us</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li className="hover:underline cursor-pointer">Facebook</li>
                            <li className="hover:underline cursor-pointer">Twitter</li>
                            <li className="hover:underline cursor-pointer">Instagram</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Make Money with Us</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li className="hover:underline cursor-pointer">Sell on Amazon</li>
                            <li className="hover:underline cursor-pointer">Protect your Brand</li>
                            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
                            <li className="hover:underline cursor-pointer">Advertise Products</li>
                            <li className="hover:underline cursor-pointer">Sell globally</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">Let Us Help You</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li className="hover:underline cursor-pointer">Your Account</li>
                            <li className="hover:underline cursor-pointer">Returns Centre</li>
                            <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
                            <li className="hover:underline cursor-pointer">Help</li>
                        </ul>
                    </div>

                </div>
            </div>


            <div className="bg-[#232F3E] border-t border-gray-700 py-8 flex flex-col md:flex-row justify-center items-center px-6 md:px-20 space-y-4 md:space-y-0">


                <img
                    src="/ama.png"
                    alt="Amazon Logo"
                    className="w-26 object-contain h-10 "
                />


                <Select
                    defaultValue="en"
                    onChange={handleLanguageChange}
                    style={{ width: 150 }}
                    dropdownClassName="text-black"
                    suffixIcon={<GlobalOutlined />}
                >
                    <Option value="en">🇺🇸 English</Option>
                    <Option value="es">🇪🇸 Español</Option>
                    <Option value="fr">🇫🇷 Français</Option>
                    <Option value="de">🇩🇪 Deutsch</Option>
                    <Option value="hi">🇮🇳 हिंदी</Option>
                    <Option value="zh">🇨🇳 中文</Option>
                </Select>
            </div>

            <div className="bg-[#131A22] text-gray-300 text-xs py-12 text-center space-y-2">
                <div className="space-x-4">
                    <span className="hover:underline cursor-pointer">Conditions of Use</span>
                    <span className="hover:underline cursor-pointer">Privacy Notice</span>
                    <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
                </div>
                <p className="text-gray-400">© 2024 Amazon Clone — Built for learning</p>
            </div>

        </footer>
    );
};

export default Footer;
