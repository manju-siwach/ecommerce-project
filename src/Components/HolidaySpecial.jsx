import React from "react";
import { Row, Col, Carousel } from "antd";

const categories = [
    { title: "Holiday deals", img: "gift.jpg" },
    { title: "Most loved deals", img: "loved.jpg" },
    { title: "Deals under $50", img: "pillow.jpg" },
    { title: "Deals on Computer", img: "laptop.jpg" },
    { title: "Deals on Fashion", img: "fashion.jpg" },
    { title: "Deals on Toys & Gifts", img: "teddy.jpg" },
    { title: "Jwellery", img: "jwe.jpg" },
    { title: "Festival", img: "festiv.jpg" },
    { title: "Deals under $50", img: "sandal.jpg" },
    { title: "Pots", img: "pot.jpg" },
    { title: "Deals on Electric", img: "electronic.jpg" },
    { title: "Greenery", img: "gardens.jpg" },


];

function HolidaySpecial() {
    return (
        <div className="w-full bg-white p-6">
            {/* Heading */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Here come Holiday Specials</h2>
                <a href="#" className="text-blue-600 hover:underline text-lg">
                    Explore now
                </a>
            </div>

            {/* Scrollable Row */}
            <div className="overflow-x-auto">
                <Row gutter={[24, 24]} className="flex-nowrap flex-row" wrap={false}>
                    {categories.map((item, i) => (
                        <Col
                            key={i}
                            className="flex-shrink-0 flex flex-col items-center"
                        >
                            <div className="w-44 h-44 bg-green-900 rounded-full flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-24 h-24 object-contain"
                                />
                            </div>
                            <p className="mt-3 font-semibold text-lg text-center">{item.title}</p>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default HolidaySpecial;


